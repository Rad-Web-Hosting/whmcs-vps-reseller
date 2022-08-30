<?php
// Last updated : 22/08/2022
// Version : 2.2.1
use WHMCS\Database\Capsule;
use WHMCS\Auth;

include_once('virtualizor_conf.php');
include_once('functions.php');
include_once(dirname(__FILE__).'/sdk/enduser.php');


function virtualizor_cloud_ConfigOptions() {
	
	global $virtualizor_conf, $whmcsmysql;	
	
	// Get the Servers
	$res = Capsule::table('tblservers')->where('type','virtualizor_cloud')->get();
	
	if(empty($res)){
		echo '<font color="#FF0000">The virtualizor Cloud servers could not be found. Please add the Virtualizor Server and Server group to proceed</font>';
		return;
	}
	$server_list = array();
	
	 foreach($res as $re){
		$server_list[$re->id] = $re->id.' - '.trim($re->name);
		$server_data[$re->id] = (array) $re;
	}
	
	# Should return an array of the module options for each product - Minimum of 24
    $config_array = array(
	 "Type" => array( "Type" => "dropdown", "Options" => "OpenVZ,Xen PV,Xen HVM,KVM,XCP HVM,XCP PV,LXC,Virtuozzo OpenVZ,Virtuozzo KVM,Proxmox KVM,Proxmox OpenVZ,Proxmox LXC"),
	 "Disk Space" => array( "Type" => "text", "Size" => "25", "Description" => "GB"),
	 "Guaranteed RAM" => array( "Type" => "text", "Size" => "25", "Description" => "MB"),
	 "Burstable RAM" => array( "Type" => "text", "Size" => "25", "Description" => "MB (OpenVZ)"), 
	 "SWAP RAM" => array( "Type" => "text", "Size" => "25", "Description" => "MB (Xen, XCP and KVM)"), 
	 "Bandwidth" => array( "Type" => "text", "Size" => "25", "Description" => "GB (Zero or empty for unlimited)"),
	 "CPU Cores" => array( "Type" => "text", "Size" => "25", "Description" => ""),
	 "VNC" => array( "Type" => "yesno", "Description" => "Enable VNC (Xen, XCP and KVM)"),
	 "IPs" => array( "Type" => "text", "Size" => "25", "Description" => "Number of IPs"),
	 "IPv6" => array( "Type" => "text", "Size" => "25", "Description" => "Number of IPv6 Address"),
	 "Region" => array( "Type" => "text", "Size" => "25", "Description" => "The region to create the VPS in"),
	 "IPv6 Subnets" => array( "Type" => "text", "Size" => "25", "Description" => "Number of IPv6 Subnets"),
	 "Network Speed (KB)" => array( "Type" => "text", "Size" => "25"),
	 "Upload Speed (KB)" => array( "Type" => "text", "Size" => "25"),
	);
	
	// Get the product ID
	$pid = (int) $_REQUEST['id'];
	
	// First get the configoption1 to check if the user is on OLD method or New method.
	$res = Capsule::table('tblproducts')->where('id',$pid)->get();
	
	$row = (array) $res[0];
	//rprint($row);
	
	$configarray = array(
		'Virtualizor Servers' => array("Type" => "dropdown", "Options" => implode(',', array_values($server_list)))
	);
	
	// If this is filled up then user is using the OLD method
	if((!empty($row['configoption1']) && in_array($row['configoption1'], array('OpenVZ', 'Xen PV', 'Xen HVM', 'KVM', 'XCP HVM', 'XCP PV', 'LXC', 'Virtuozzo OpenVZ' , 'Virtuozzo KVM', 'Proxmox KVM', 'Proxmox OpenVZ', 'Proxmox LXC'))) || !empty($virtualizor_conf['no_virt_plans'])){
		
		//array_values($server_list)
		$tmp_type = array('OpenVZ', 'Xen PV', 'Xen HVM', 'KVM', 'XCP HVM', 'XCP PV', 'LXC', 'Virtuozzo OpenVZ' , 'Virtuozzo KVM', 'Proxmox KVM', 'Proxmox OpenVZ', 'Proxmox LXC');
		array_push($tmp_type, implode(',', array_values($server_list)));
		
		$config_array['Type']['Options'] = implode(',', $tmp_type);
		$configarray = $config_array;
	
	// If we get the Virtualizor server in configoption1, we will make an API call and load other fields
	}elseif(!empty($row['configoption1']) && in_array($row['configoption1'], array_values($server_list))){
		
		// Get the server ID
		$ser_id = array_search($row['configoption1'], $server_list);
		$ser_data = $server_data[$ser_id];
		
		$tmp_hostname = $ser_data['hostname'];
		if(empty($tmp_hostname)){
			$tmp_hostname = $ser_data['ipaddress'];
		}
		
		// Get the data from virtualizor
		$data = VirtCloud_Curl::e_make_api_call($tmp_hostname, $ser_data['username'], get_server_pass_from_whmcs($ser_data['password']), 0, 'index.php?act=create');
		//logActivity('data--: '.var_export($data, 1));
		if(empty($data)){
			return $configarray;
		}
		
		// If this user has billing enabled then only we will provide plan selection
		if(!empty($data['inhouse_billing'])){
			
			$available_resource = $data['resources'];
			$pricing = $data['pricing'];
			$plan_list = $data['plans'];
			//logActivity('plan_list: '.var_export($plan_list, 1));
			$tmp = $row['configoption3'];
			$tmp_selected_plan = explode('-',$tmp);
			$selected_plan = trim($tmp_selected_plan[0]);

			$tmp = $row['configoption2'];
			$tmp_selected_region = explode('-',$tmp);
			$selected_region = trim($tmp_selected_region[0]);

			$used_core = $data['usage'];

			if($pricing[$selected_region]['x'.$selected_plan]['plid'] != $selected_plan){
			   /// throw new Exception('Plan is not available for selected Region. Please choose another plan.');
			}

			foreach($data['servergroups'] as $k => $v){
			
				$tmp_default_node_grp[$k] = $k.' - '.$v['sg_name'];
				
				foreach ($data['servers'] as $m => $n){
					if($n['sgid'] == $k){
						$tmp_default_node_grp[$n['server_name']] = $m." - ".$n['server_name'];
					}
				}
			}
			
			$configarray['Region'] = array("Type" => "dropdown", "Options" => implode(',', array_values($tmp_default_node_grp)), "Description" => 'Regions available');
			
			// Build the options list to show Plans
			foreach($plan_list as $k => $v){
					$tmp_plans[$v['plid']] = $v['plid'].' - '.$v['plan_name'];
				}
			
			$configarray['Select Plan'] = array("Type" => "dropdown", "Options" => implode(',', $tmp_plans));
			
		}else{
			return $config_array;
		}
		
	}
	
	return $configarray;
}

function virtualizor_cloud_CreateAccount($params) {

	global $virtualizor_conf, $whmcsmysql;

    # ** The variables listed below are passed into all module functions **
	
	$loglevel = (int) @$_REQUEST['loglevel'];
	
	if(!empty($virtualizor_conf['loglevel'])){
		$loglevel = $virtualizor_conf['loglevel'];
	}
	
    $serviceid = $params["serviceid"]; # Unique ID of the product/service in the WHMCS Database
    $pid = $params["pid"]; # Product/Service ID
    $producttype = $params["producttype"]; # Product Type: hostingaccount, reselleraccount, server or other
    $domain = $params["domain"];
	$username = $params["username"];
	$password = $params["password"];
    $clientsdetails = $params["clientsdetails"]; # Array of clients details - firstname, lastname, email, country, etc...
    $customfields = $params["customfields"]; # Array of custom field values for the product
    $configoptions = $params["configoptions"]; # Array of configurable option values for the product
	
	if(!empty($params["customfields"]['vpsid'])){
		return 'The VPS exists';
	}

    # Additional variables if the product/service is linked to a server
    $server = $params["server"]; # True if linked to a server
    $serverid = $params["serverid"];
    $serverip = $params["serverip"];
    $serverusername = $params["serverusername"];
    $serverpassword = $params["serverpassword"];
    $serveraccesshash = $params["serveraccesshash"];
    $serversecure = $params["serversecure"]; # If set, SSL Mode is enabled in the server config
	$virttype = (preg_match('/xen/is', $params['configoption1']) ? 'xen' : (preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1'])));
	
	// If its Virtuozzo
	if(preg_match('/virtuozzo/is', $virttype)){
		
		$tmp_virt = explode(' ', $virttype);
		
		if($tmp_virt[1] == 'openvz'){
			$virttype = 'vzo';
		}elseif($tmp_virt[1] == 'kvm'){
			$virttype = 'vzk';
		}
	}
	
	if(preg_match('/proxmox/is', $virttype)){
		
		$tmp_virt = explode(' ', $virttype);
		
		if($tmp_virt[1] == 'openvz'){
			$virttype = 'proxo';
		}elseif($tmp_virt[1] == 'kvm'){
			$virttype = 'proxk';
		}elseif($tmp_virt[1] == 'lxc'){
			$virttype = 'proxl';
		}
	}
	
	//$hvm = (preg_match('/hvm/is', $params['configoption1']) ? 1 : 0);
	//$Nvirt = $virttype.(empty($hvm) ? '' : 'hvm');
	
	$ctrlpanel = (empty($params['configoptions'][v_fn('ctrlpanel')]) ? -1 : strtolower(trim($params['configoptions'][v_fn('ctrlpanel')])));
	if($loglevel > 0) logActivity('VIRT : '.$virttype.' - '.$hvm.' | '.$Nvirt);
	if($loglevel > 0) logActivity(var_export($params, 1));
	
	// Get the Data
	$data = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=create');
	//logActivity('Data:'.var_export($data, 1));
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}
		
	if($loglevel > 3) logActivity(var_export($data, 1));
	
	$sgid = -1;
	
	// Server group selection
	//$region = $params['configoption11'];
	$region = $params['configoption2'];
	if(!empty($params['configoptions']['Region'])){
		$region = $params['configoptions']['Region'];
	}
	
	
	// Is there a Region ?
	if(!empty($region) && $region != 'auto'){
		
		foreach($data['servergroups'] as $k => $v){
			
			// Match the Server Group
			if(trim(strtolower($v['sg_reseller_name'])) == trim(strtolower($region))){
				$sgid = $k;
			}
			
		}
	
		// OH SHIT ! We didnt find anything 
		if(!isset($sgid)){
			return 'Could not find the Region - '.$region.'. Please correct the <b>Product / Service</b> with the right slave server name.';
		}
		
		if($loglevel > 1) logActivity('Region Chosen : '.$sgid);
	
	}
	
	$post = array();
	
	// Set the server group
	$post['sgid'] = $sgid;
	
	$post['node_select'] = 1;
	$post['server_group'] = $sgid;
	
	// Is there a control panel installation
	if(!empty($ctrlpanel)){
		$post['control_panel'] = $ctrlpanel;
	}
	
	if(!isset($sgid)){
		$post['server_group'] = 'auto';
	}
	
	// Search does the user exist
	foreach($data['users'] as $k => $v){
		if(strtolower($v['email']) == strtolower($params["clientsdetails"]['email'])){
			$post['uid'] = $v['uid'];
		}
	}
	
	// Was the user there ?
	if(empty($post['uid'])){
		$post['user_email'] = $params["clientsdetails"]['email'];
		$post['user_pass'] = $params["password"];
	}
	
	$new_module = false;
	
	// Are you using NEW Method
	if(!in_array($params['configoption1'], array('OpenVZ', 'Xen PV', 'Xen HVM', 'KVM', 'XCP HVM', 'XCP PV', 'LXC',  'Virtuozzo OpenVZ' , 'Virtuozzo KVM', 'Proxmox KVM', 'Proxmox OpenVZ', 'Proxmox LXC'))){

		$new_module = true;
		//Post values : Array ( [sgid] => -1 [node_select] => 1 [server_group] => -1 [control_panel] => -1 [user_email] => chirag@chirag.com [user_pass] => 7ZOg5.aHz(Wi72 )
		$OS = strtolower(trim($params['configoptions'][v_fn('OS')]));
		if(empty($OS)){
			$OS = strtolower(trim($params["customfields"]['OS']));
		}

		// Search the OS ID
		if($OS != 'none'){
			
			foreach($data['ostemplates'] as $k => $v){
				// Does the String match ?
				if(strtolower($v['name']) == $OS){
					$post['osid'] = $k;
				}
			
			}
		
		}
	
		// Is the OS template there
		if(empty($post['osid']) && $OS != 'none'){
			return 'Could not find the OS Template '.$OS;
		}
	
		// Search the ISO
		if(!empty($params["customfields"]['iso']) && strtolower($params["customfields"]['iso']) != 'none'){
			
			// ISO restricted in OVZ and XEN-PV
			if(in_array($virttype, array('openvz', 'vzo', 'proxo', 'lxc')) || (($virttype == 'xen' || $virttype == 'xcp') && empty($hvm))){
				return 'You can not select ISO for OpenVZ, LXC, Virtuozzo OpenVZ, Proxmox OpenVZ, XEN-PV and XCP-PV VPS';
			}
		
			foreach($data['isos'] as $k => $v){
			
				foreach($v as $kk => $vv){
					
					//echo $vv['name'].' - '.$params["customfields"]['iso'].'<br>';
					
					// Does the String match ?
					if(strtolower($vv) == strtolower(trim($params["customfields"]['iso']))){
						$post['iso'] = $vv;
					}
				}
			}
			
			// Is the ISO there
			if(empty($post['iso'])){
				return 'Could not find the ISO '.$params["customfields"]['iso'];
			}
		}
	
		// If ISO and OS both not selected ?
		if(empty($post['iso']) && empty($post['osid']) && strtolower($params["customfields"]['iso']) == 'none' && $OS == 'none'){
			return 'ISO or OS is not selected';
		}
		
		// No emails
		if(!empty($params["customfields"]['noemail'])){
			$post['noemail'] = 1;
		}
	
		$post_osid = $post['osid'];

		$Nvirt = $data['ostemplates'][$post_osid]['Nvirt'];
		$post['virt'] = $Nvirt;
		
		if(empty($virtualizor_conf['vps_control']['custom_hname'])){
			$post['hostname'] = $params['domain'];
		}else{
			// Select the Order ID
			$res = Capsule::table('tblhosting')->where('id',$params['serviceid'])->get();
			
			$hosting_details = (array) $res[0];
			
			$post['hostname'] = str_replace('{ID}', $hosting_details['orderid'], $virtualizor_conf['vps_control']['custom_hname']);
			if(preg_match('/(\{RAND(\d{1,3})\})/is', $post['hostname'], $matches)){
				$post['hostname'] = str_replace($matches[1], generateRandStr($matches[2]), $post['hostname']);
			}
			
			// Change the Hostname to the email
			Capsule::table('tblhosting')->where('id',$params['serviceid'])->update(array('domain'=>$post['hostname']));
			
		}
		$post['rootpass'] = $params['password'];
		$post['addvs'] = 1;
		
		// Is is OpenVZ
		if($virttype == 'openvz' || $virttype == 'vzo'){
		
			$post['burst'] = $params['configoption4'];
			
		// Is it Xen PV?
		}elseif(in_array($virttype, array('xen', 'xcp', 'kvm', 'vzk', 'proxk'))){
		
			$post['swap'] = $params['configoption5'];
			
		}
		
		// VNC
		if($params['configoption8'] == 'yes' || $params['configoption8'] == 'on'){
			$post['vnc'] = 1;
			$post['vncpass'] = generateRandStr(8);
		}
		
		// Are there any configurable options
		if(!empty($params['configoptions'])){
			foreach($params['configoptions'] as $k => $v){
				if(!isset($post[$k])){
					$post[$k] = $v;
				}
			}
		}
		
		if($loglevel > 0) logActivity('POST : '.var_export($post, 1));
		
		// Setup cPanel licenses if cPanel configurable option is set
		if($ctrlpanel != -1 && $ctrlpanel != 'none'){
		
			if($ctrlpanel == 'cpanel' && !empty($virtualizor_conf['cp']['buy_cpanel_login']) && !empty($virtualizor_conf['cp']['buy_cpanel_apikey'])){
				logActivity("CPANEL : cPanel issued for ip $_ips[0] of ordertype $cpanel");
				
				$url = 'https://www.buycpanel.com/api/order.php?';
				$login = 'login='.$virtualizor_conf['cp']['buy_cpanel_login'].'&';
				$key = 'key='.$virtualizor_conf['cp']['buy_cpanel_apikey'].'&';
				$domain = 'domain='.$params['domain'].'&';
				$serverip = 'serverip='.$_ips[0].'&';
				$ordertype = 'ordertype=10';
				
				$url .= $login.$key.$domain.$serverip.$ordertype;
				
				$ret = file_get_contents($url);
				
				$ret = json_decode($ret);
					
				if($ret->success == 0){
					return 'Errors : cPanel Licensing : '.$ret->faultstring;
				}
			}
		}

		$tmp_pid = explode('-', $params['configoption3']);
		$post['plid'] = trim($tmp_pid[0]);

	// OLD METHOD
	}else{
		$hvm = (preg_match('/hvm/is', $params['configoption1']) ? 1 : 0);
		$Nvirt = $virttype.(empty($hvm) ? '' : 'hvm');
		// Get the OS from the fields set
		$OS = strtolower(trim($params['configoptions'][v_fn('OS')]));
		if(empty($OS)){
			$OS = strtolower(trim($params["customfields"]['OS']));
		}
		// Search the OS ID
		if($OS != 'none'){
			foreach($data['ostemplates'] as $k => $v){
			// Does the String match ?
				if(strtolower($v['name']) == $OS && $v['Nvirt'] == $Nvirt){
				$post['osid'] = $k;
				}
			}
		}
		// Is the OS template there
		if(empty($post['osid']) && $OS != 'none'){
			return 'Could not find the OS Template '.$OS;
		}
		// Search the ISO
		if(!empty($params["customfields"]['iso']) && strtolower($params["customfields"]['iso']) != 'none'){
			// ISO restricted in OVZ and XEN-PV
			if(in_array($virttype, array('openvz', 'vzo', 'proxo', 'lxc')) || (($virttype == 'xen' || $virttype == 'xcp') && empty($hvm))){
				return 'You can not select ISO for OpenVZ, LXC, Virtuozzo OpenVZ, Proxmox OpenVZ, XEN-PV and XCP-PV VPS';
			}
			foreach($data['isos'] as $k => $v){
				foreach($v as $kk => $vv){
					// Does the String match ?
					if(strtolower($vv) == strtolower(trim($params["customfields"]['iso']))){
						$post['iso'] = $vv;
					}
				}
			}
			// Is the ISO there
			if(empty($post['iso'])){
				return 'Could not find the ISO '.$params["customfields"]['iso'];
			}
		}
		// If ISO and OS both not selected ?
		if(empty($post['iso']) && empty($post['osid']) && strtolower($params["customfields"]['iso']) == 'none' && $OS == 'none'){
			return 'ISO or OS is not selected';
		}
		// No emails
		if(!empty($params["customfields"]['noemail'])){
			$post['noemail'] = 1;
		}
		
		$post['virt'] = $Nvirt;
		if(empty($virtualizor_conf['vps_control']['custom_hname'])){
			$post['hostname'] = $params['domain'];
		}else{
			// Select the Order ID
			$res = Capsule::table('tblhosting')->where('id',$params['serviceid'])->get();
			
			$hosting_details = (array) $res[0];
			
			$post['hostname'] = str_replace('{ID}', $hosting_details['orderid'], $virtualizor_conf['vps_control']['custom_hname']);
			if(preg_match('/(\{RAND(\d{1,3})\})/is', $post['hostname'], $matches)){
				$post['hostname'] = str_replace($matches[1], generateRandStr($matches[2]), $post['hostname']);
			}
			
			// Change the Hostname to the email
			Capsule::table('tblhosting')->where('id',$params['serviceid'])->update(array('domain'=>$post['hostname']));
			
		}
		$post['rootpass'] = $params['password'];
		$post['space'] = (empty($params['configoptions'][v_fn('space')]) || $params['configoptions'][v_fn('space')] == 0 ? $params['configoption2'] : $params['configoptions'][v_fn('space')]);
		$post['ram'] = (empty($params['configoptions'][v_fn('ram')]) || $params['configoptions'][v_fn('ram')] == 0 ? $params['configoption3'] : $params['configoptions'][v_fn('ram')]);
		$post['bandwidth'] = (empty($params['configoptions'][v_fn('bandwidth')]) || $params['configoptions'][v_fn('bandwidth')] == 0 ? (empty($params['configoption6']) ? '0' : $params['configoption6']) : $params['configoptions'][v_fn('bandwidth')]);
		$post['cores'] = (empty($params['configoptions'][v_fn('cores')]) || $params['configoptions'][v_fn('cores')] == 0 ? $params['configoption7'] : $params['configoptions'][v_fn('cores')]);
		$post['network_speed'] = (empty($params['configoptions'][v_fn('network_speed')]) || $params['configoptions'][v_fn('network_speed')] == 0 ? $params['configoption13'] : $params['configoptions'][v_fn('network_speed')]);
		$post['upload_speed'] = (empty($params['configoptions'][v_fn('upload_speed')]) || $params['configoptions'][v_fn('upload_speed')] == 0 ? $params['configoption14'] : $params['configoptions'][v_fn('upload_speed')]);
		$post['addvs'] = 1;
		// Is is OpenVZ
		if($virttype == 'openvz' || $virttype == 'vzo'){
		
			$post['burst'] = $params['configoption4'];
			
		// Is it Xen PV?
		}elseif(in_array($virttype, array('xen', 'xcp', 'kvm', 'vzk', 'proxk'))){
		
			$post['swap'] = $params['configoption5'];
			
		}
		
		// VNC
		if($params['configoption8'] == 'yes' || $params['configoption8'] == 'on'){
			$post['vnc'] = 1;
			$post['vncpass'] = generateRandStr(8);
		}
		
		// Are there any configurable options
		if(!empty($params['configoptions'])){
			foreach($params['configoptions'] as $k => $v){
				if(!isset($post[$k])){
					$post[$k] = $v;
				}
			}
		}
		// Setup cPanel licenses if cPanel configurable option is set
		if($ctrlpanel != -1 && $ctrlpanel != 'none'){
		
			if($ctrlpanel == 'cpanel' && !empty($virtualizor_conf['cp']['buy_cpanel_login']) && !empty($virtualizor_conf['cp']['buy_cpanel_apikey'])){
				//logActivity("CPANEL : cPanel issued for ip $_ips[0] of ordertype $cpanel");
				
				$url = 'https://www.buycpanel.com/api/order.php?';
				$login = 'login='.$virtualizor_conf['cp']['buy_cpanel_login'].'&';
				$key = 'key='.$virtualizor_conf['cp']['buy_cpanel_apikey'].'&';
				$domain = 'domain='.$params['domain'].'&';
				$serverip = 'serverip='.$_ips[0].'&';
				$ordertype = 'ordertype=10';
				
				$url .= $login.$key.$domain.$serverip.$ordertype;
				
				$ret = file_get_contents($url);
				
				$ret = json_decode($ret);
				
				if($ret->success == 0){
					return 'Errors : cPanel Licensing : '.$ret->faultstring;
				}
			}
		}
	}

	$numips = (empty($params['configoptions'][v_fn('ips')]) || $params['configoptions'][v_fn('ips')] == 0 ? ( empty($new_module) ? $params['configoption9'] : 0 )  : $params['configoptions'][v_fn('ips')]);
	$numips6 = (empty($params['configoptions'][v_fn('ips6')]) || $params['configoptions'][v_fn('ips6')] == 0 ? ( empty($new_module) ? $params['configoption10'] : 0 ) : $params['configoptions'][v_fn('ips6')]);
	$numips6_subnet = (empty($params['configoptions'][v_fn('ips6_subnet')]) || $params['configoptions'][v_fn('ips6_subnet')] == 0 ? ( empty($new_module) ? $params['configoption12'] : 0 ) : $params['configoptions'][v_fn('ips6_subnet')]);

	// Are there any IPv4 to assign ?
	if($numips > 0){
		$post['ips'] = $numips;
	}
	
	// Are there any IPv6 to assign ?
	if($numips6 > 0){
		$post['ipv6'] = $numips6;	
	}
	
	// Are there any IPv6 Subnets to assign ?
	if($numips6_subnet > 0){
		$post['ipv6_subnet'] = $numips6_subnet;	
	}

	if(!empty($params['configoptions'][v_fn('ips')])){
		$post['num_ips'] = $params['configoptions'][v_fn('ips')];
	}
	
	if(!empty($params['configoptions'][v_fn('ips_int')])){
		$post['num_ips_int'] = $params['configoptions'][v_fn('ips_int')];
	}
	
	if(!empty($params['configoptions'][v_fn('ips6')])){
		$post['num_ips6'] = $params['configoptions'][v_fn('ips6')];
	}
	
	if(!empty($params['configoptions'][v_fn('ips6_subnet')])){
		$post['num_ips6_subnet'] = $params['configoptions'][v_fn('ips6_subnet')];
	}
	
	if(!empty($params['configoptions']['ippoolid'])){
		$post['ippoolid'] = $params['configoptions']['ippoolid'];
	}
	
	if(!empty($params['configoptions'][v_fn('space')])){
		$post['space'] = $params['configoptions'][v_fn('space')];
	}
	
	if(!empty($params['configoptions'][v_fn('ram')])){
		$post['ram'] = $params['configoptions'][v_fn('ram')];
	}
	
	if(!empty($params['configoptions'][v_fn('cores')])){
		$post['cores'] = $params['configoptions'][v_fn('cores')];
	}
		
	if(!empty($params['configoptions'][v_fn('ctrlpanel')])){
		$post['control_panel'] = $params['configoptions'][v_fn('ctrlpanel')];
	}

	if(!empty($params['configoptions'][v_fn('network_speed')])){
		$post['network_speed'] = $params['configoptions'][v_fn('network_speed')];
	}

	if(!empty($params['configoptions'][v_fn('upload_speed')])){
		$post['upload_speed'] = $params['configoptions'][v_fn('upload_speed')];
	}

	//logActivity('post : '.var_export($post, 1));
	
	$ret = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=create', $post);
	
	//logActivity('Returned:'.var_export($ret, 1));
	
	if($loglevel > 1) logActivity('Return Values : '.var_export($ret, 1));
	
	// Was the VPS Inserted
	if(!empty($ret['newvs']['vpsid'])){
		
		// vpsid of virtualizor
		$query = Capsule::table('tblcustomfields')
			->where('relid',$pid)
			->where('fieldname','vpsid')
			->get();
		$res = (array) $query[0];
		
		// We will check if there is an entry if not we will insert it.
		$query = Capsule::table('tblcustomfieldsvalues')
			->select('relid')
			->where('relid',$serviceid)
			->where('fieldid',$res[id])
			->get();
		$sel_res = (array) $query[0];
		
		if($loglevel > 0) logActivity('Did we found anything : '.var_export($sel_res, 1));
		
		// We will insert it if not found anything
		if(empty($sel_res['relid'])){
	
			Capsule::table('tblcustomfieldsvalues')
				->insert(
					array(
					'value'=> $ret['newvs']['vpsid'],
					'relid'=> $serviceid,
					'fieldid'=> $res[id]
					)
				);
			
		}else{
			
			Capsule::table('tblcustomfieldsvalues')
				->where('relid',$serviceid)
				->where('fieldid',$res[id])
				->update(
					array('value'=>$ret['newvs']['vpsid'])
				);
		}
		
		Capsule::table('tblhosting')
				->where('id',$serviceid)
				->update(
					array('username'=>$params['clientsdetails']['email'])
				);

		// The Dedicated IP
		Capsule::table('tblhosting')
				->where('id',$serviceid)
				->update(
					array(
						'dedicatedip'=> (!empty($ret['newvs']['ips'][0]) ? $ret['newvs']['ips'][0] : $ret['newvs']['ipv6'][0])
					)
				);
		
		$tmp_ips = empty($ret['newvs']['ips']) ? array() : $ret['newvs']['ips'];
		
		if(!empty( $ret['newvs']['ipv6_subnet'])){
			foreach($ret['newvs']['ipv6_subnet'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
		
		if(!empty( $ret['newvs']['ipv6'])){
			foreach($ret['newvs']['ipv6'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
		
		// Extra IPs
		if(count($tmp_ips) > 1){
			unset($tmp_ips[0]);
			Capsule::table('tblhosting')
				->where('id',$serviceid)
				->update(
					array(
						'assignedips'=> implode("\n", $tmp_ips)
					)
				);
		}
		
		// Did it start ?
		if(!empty($ret['done'])){		
			return 'success';	
		}else{
			return 'Errors : '.implode('<br>', $ret['error']);
		}
		
	} else {
		return 'Errors : '.implode('<br>', $ret['error']);
	}
	
}


function virtualizor_cloud_TerminateAccount($params) {

	global $virtualizor_conf, $whmcsmysql;
	
	$ctrlpanel = (empty($params['configoptions'][v_fn('ctrlpanel')]) ? -1 : $params['configoptions'][v_fn('ctrlpanel')]);
	
	if(!empty($virtualizor_conf['admin_ui']['disable_terminate'])){
		return 'Termination has been disabled by the Global Administrator';
	}

	// Setup cPanel licenses if cPanel configurable option is set
	if($ctrlpanel != -1 && $ctrlpanel != 'none'){
		
		if($ctrlpanel == 'cpanel' && !empty($virtualizor_conf['cp']['buy_cpanel_login']) && !empty($virtualizor_conf['cp']['buy_cpanel_apikey'])){
		
			$data = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=listvs');

			$data = $data['vs'][$params['customfields']['vpsid']]['ips'];
		
			list($cpanel_ip_id, $cpanel_ip) = array_shift($data);
			
			//logActivity("CPANEL : cPanel delete for ip $_ips[0]");
			
			$url = 'https://www.buycpanel.com/api/cancel.php?';
			$login = 'login='.$virtualizor_conf['cp']['buy_cpanel_login'].'&';
			$key = 'key='.$virtualizor_conf['cp']['buy_cpanel_apikey'].'&';
			$currentip = 'currentip='.$cpanel_ip.'&';
			$url .= $login.$key.$currentip;
			
			$ret = file_get_contents($url);
			
			$ret = json_decode($ret);
			
			if($ret->success == 0){
				return 'Errors : cPanel Licensing : '.$ret->faultstring;
			}
		}
	}

	$data = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=listvs&delvs='.$params['customfields']['vpsid']);
			
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}
	
	// If the VPS has been deleted
    if (!empty($data['delvs']['done'])) {
	
		// vpsid of virtualizor
		$query = Capsule::table('tblcustomfields')
			->select('id')
			->where('relid',$params["pid"])
			->where('fieldname','vpsid')
			->get();
		
		$res = (array) $query[0];
		
		Capsule::table('tblcustomfieldsvalues')
			->where('relid',$params["serviceid"])
			->where('fieldid',$res[id])
			->update(
				array('value'=>'')
			);
		
		
		// The Dedicated IP
		Capsule::table('tblhosting')
			->where('id',$params["serviceid"])
			->update(
				array('dedicatedip'=>'','assignedips'=>'')
			);
		
		
		
		$result = "success";
	} else {
		$result = "There was some error deleting the VPS";
	}
	
	return $result;
}

function virtualizor_cloud_AdminServicesTabFields($params) {
	
	if(!empty($_GET['vapi_mode'])){
		ob_end_clean();
	}
	
	$code = virtualizor_cloudUI($params, 'clientsservices.php?vapi_mode=1&userid='.$params['userid'], '../modules/servers');
	
    $fieldsarray = array(
     'VPS Information' => '<div style="width:100%" id="tab1"></div>'.$code,
    );
    return $fieldsarray;

}

function virtualizor_cloud_SuspendAccount($params) {

	$data = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=listvs&suspend='.$params['customfields']['vpsid']);
			
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}

    if ($data['suspend']['done']) {
		$result = "success";
	} else {
		$result = "There was some error suspending the VPS";
	}
	
	return $result;
}

function virtualizor_cloud_UnsuspendAccount($params) {

	$data = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=listvs&unsuspend='.$params['customfields']['vpsid']);
			
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}

    if ($data['unsuspend']['done']) {
		$result = "success";
	} else {
		$result = "There was some error unsuspending the VPS";
	}
	
	return $result;
}

function virtualizor_cloud_ChangePassword($params) {

	# Code to perform action goes here...
	$data = VirtCloud_Curl::e_make_api_call($params["serverip"], $params['serverusername'], $params['serverpassword'], 0, 'index.php?act=editvm&vid='.$params['customfields']['vpsid']);
	
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}
	$post_vps = $data['vps'];
	
	// Are there any configurable options
	if(!empty($params['configoptions'])){

		foreach($params['configoptions'] as $k => $v){
			if(!isset($post_vps[$k])){
				$post_vps[$k] = $v;
			}
		}
		
	}

	$post_vps['ips'] = count($post_vps['ips']);
	$post_vps['ips6'] = count($post_vps['ips6']);
	$post_vps['ips6_subnet'] = count($post_vps['ips6_subnet']);
	$post_vps['ips_int'] = count($post_vps['ips_int']);
	$post_vps['editvm'] = 1;
	
	$post_vps['rootpass'] = $params['password'];
		
	if($loglevel > 0) logActivity('Post Array : '.var_export($post_vps, 1));
	
	$ret = VirtCloud_Curl::e_make_api_call($params["serverip"], $params['serverusername'], $params['serverpassword'], 0, 'index.php?act=editvm&vid='.$params['customfields']['vpsid'], $post_vps);
	
	unset($ret['scripts']);
	unset($ret['iscripts']);
	unset($ret['ostemplates']);
	unset($ret['isos']);
	
	if($loglevel > 0) logActivity('Post Result : '.var_export($ret, 1));
	
	if(empty($ret)){
		return 'Could not load the server data after processing.'.VirtCloud_Curl::error($params["serverip"]);
	}
	
	if(!empty($ret['done'])){
		
		$result = "success";
		
		$tmp_ips = array();
		
		if(!empty($ret['editvm_vps']['ips'])){
			foreach($ret['editvm_vps']['ips'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}

		if(!empty($ret['editvm_vps']['ips6_subnet'])){
			foreach($ret['editvm_vps']['ips6_subnet'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}

		if(!empty($ret['editvm_vps']['ips6'])){
			foreach($ret['editvm_vps']['ips6'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}

		if(!empty($ret['editvm_vps']['ips_int'])){
			foreach($ret['editvm_vps']['ips_int'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
		
		if(!empty($tmp_ips)){
		
			// The Dedicated IP
			Capsule::table('tblhosting')->where('id',$serviceid)->update(
				array('dedicatedip'=>$tmp_ips[0])
			);
		
			// Extra IPs
			$tmp_cnt = count($tmp_ips);
			if(!empty($tmp_cnt)){
				unset($tmp_ips[0]);
				Capsule::table('tblhosting')->where('id',$serviceid)->update(
					array('assignedips'=>implode("\n", $tmp_ips))
				);
			}
			
		}
		
	}else{
				
		if(!empty($ret['error'])){
			return 'Errors : '.implode('<br>', $ret['error']);
		}
			
		$result = 'Unknown error occured. Please check logs';
			
	}
	
	return $result;
}

function virtualizor_cloud_ChangePackage($params) {

	global $virtualizor_conf;
	
	$loglevel = (int) @$_REQUEST['loglevel'];
	
	$serviceid = $params["serviceid"]; # Unique ID of the product/service in the WHMCS Database
	
	if(!empty($virtualizor_conf['loglevel'])){
		$loglevel = $virtualizor_conf['loglevel'];
	}

	// Get the Data
	$data = VirtCloud_Curl::e_make_api_call($params["serverip"], $params['serverusername'], $params['serverpassword'], 0, 'index.php?act=editvm&vid='.$params['customfields']['vpsid']);
	
	if(empty($data)){
		return 'Could not load the server data.'.VirtCloud_Curl::error($params["serverip"]);
	}
	
	$post_vps = $data['vps'];
	if($loglevel > 0) logActivity('Change Package Params : '.var_export($params, 1));
	if($loglevel > 0) logActivity('Orig VPS : '.var_export($post_vps, 1));
	
	$new_module = false;

	// Are you using New module ?
	if(!in_array($params['configoption1'], array('OpenVZ', 'Xen PV', 'Xen HVM', 'KVM', 'XCP HVM', 'XCP PV', 'LXC', 'Virtuozzo OpenVZ' , 'Virtuozzo KVM', 'Proxmox KVM', 'Proxmox OpenVZ', 'Proxmox LXC'))){
		
		$new_module = true;
		
		// Now get the plan ID to post
		$tmp_plid = explode('-', $params['configoption3']);
		$post_vps['plid'] = trim($tmp_plid[0]);
		$virttype = $data['vps']['virt'];
		$post_vps['user_email'] = $params["clientsdetails"]['email'];
		$tmp_region = explode('-', $params['configoption2']);
		$post_vps['sgid'] = (int) trim($tmp_region[0]);
		
		// Are there any configurable options
		if(!empty($params['configoptions'])){
			foreach($params['configoptions'] as $k => $v){
				if(!isset($post_vps[$k])){
					$post_vps[$k] = $v;
				}
			}
		}
		//logActivity('Params : '.var_export($params, 1));
		
		if($loglevel > 0) logActivity('params : '.var_export($params, 1));
		
		//logActivity('Post Array : '.var_export($post_vps, 1));
		if($loglevel > 0) logActivity('Post Array : '.var_export($post_vps, 1));
	
	// This is OLD Module
	}else{
		
		// POST Variables
		$post_vps['space'] = (empty($params['configoptions'][v_fn('space')]) || $params['configoptions'][v_fn('space')] == 0 ? $params['configoption2'] : $params['configoptions'][v_fn('space')]);
		$post_vps['ram'] = (empty($params['configoptions'][v_fn('ram')]) || $params['configoptions'][v_fn('ram')] == 0 ? $params['configoption3'] : $params['configoptions'][v_fn('ram')]);
		$post_vps['bandwidth'] = (empty($params['configoptions'][v_fn('bandwidth')]) || $params['configoptions'][v_fn('bandwidth')] == 0 ? (empty($params['configoption6']) ? '0' : $params['configoption7']) : $params['configoptions'][v_fn('bandwidth')]);
		$post_vps['cores'] = (empty($params['configoptions'][v_fn('cores')]) || $params['configoptions'][v_fn('cores')] == 0 ? $params['configoption7'] : $params['configoptions'][v_fn('cores')]);
		$post_vps['network_speed'] = (empty($params['configoptions'][v_fn('network_speed')]) || $params['configoptions'][v_fn('network_speed')] == 0 ? $params['configoption13'] : $params['configoptions'][v_fn('network_speed')]);
		$post_vps['upload_speed'] = (empty($params['configoptions'][v_fn('upload_speed')]) || $params['configoptions'][v_fn('upload_speed')] == 0 ? $params['configoption14'] : $params['configoptions'][v_fn('upload_speed')]);
		$post_vps['cpu_percent'] = (empty($params['configoptions'][v_fn('cpu_percent')]) || $params['configoptions'][v_fn('cpu_percent')] == 0 ? $params['configoption10'] : $params['configoptions'][v_fn('cpu_percent')]);
		$post_vps['cpu'] = $params['configoption8'];

		$post_vps['inodes'] = $params['configoption3'];
		$post_vps['burst'] = $params['configoption5'];
		$post_vps['priority'] = $params['configoption11'];
		$post_vps['swapram'] = $params['configoption5'];
		
		// Fixes for SolusVM imported ConfigOptions
		if(empty($post_vps['ram']) && !empty($params['configoptions']['Memory'])){
			$post_vps['ram'] = $params['configoptions']['Memory'];
		}
		if(empty($post_vps['space']) && !empty($params['configoptions']['Disk Space'])){
			$post_vps['space'] = $params['configoptions']['Disk Space'];
		}
		if(empty($post_vps['cores']) && !empty($params['configoptions']['CPU'])){
				$post_vps['cores'] = $params['configoptions']['CPU'];
			}
			
		if($params['configoption8'] == 'yes' || $params['configoption8'] == 'on'){
			$post_vps['vnc'] = 1;
			if(empty($vps['vnc'])){
				$post_vps['vncpass'] = generateRandStr(8);
			}
		}
		
		$virttype = $post_vps['virt'];
		
		// IPs are the same always
		$post_vps['ips'] = $post_vps['ips'];
		
		// Add the IPv6
		if(!empty($post_vps['ips6'])){
			$post_vps['ips6'] = $post_vps['ips6'];
		}
		
		if(!empty($post_vps['ips6_subnet'])){
			$post_vps['ips6_subnet'] = $post_vps['ips6_subnet'];
			foreach($post_vps['ips6_subnet'] as $k => $v){
				$tmp = explode('/', $v);
				$post_vps['ips6_subnet'][$k] = $tmp[0];
			}
		}
		
	}//End of OLD Module

	$numips = (empty($params['configoptions'][v_fn('ips')]) || $params['configoptions'][v_fn('ips')] == 0 ? ( empty($new_module) ? $params['configoption9'] : 0 )  : $params['configoptions'][v_fn('ips')]);
	$numips6 = (empty($params['configoptions'][v_fn('ips6')]) || $params['configoptions'][v_fn('ips6')] == 0 ? ( empty($new_module) ? $params['configoption10'] : 0 ) : $params['configoptions'][v_fn('ips6')]);
	$numips6_subnet = (empty($params['configoptions'][v_fn('ips6_subnet')]) || $params['configoptions'][v_fn('ips6_subnet')] == 0 ? ( empty($new_module) ? $params['configoption12'] : 0 ) : $params['configoptions'][v_fn('ips6_subnet')]);

	// Are there any IPv4 to assign ?
	if($numips > 0){
		$post['ips'] = $numips;
	}
	
	// Are there any IPv6 to assign ?
	if($numips6 > 0){
		$post['ipv6'] = $numips6;	
	}
	
	// Are there any IPv6 Subnets to assign ?
	if($numips6_subnet > 0){
		$post['ipv6_subnet'] = $numips6_subnet;	
	}
	
	// Fixes for SolusVM imported ConfigOptions
	if(empty($numips) && !empty($params['configoptions']['Extra IP Address'])){
		$numips = $params['configoptions']['Extra IP Address'];
	}
	
	// Are there any configurable options
	if(!empty($params['configoptions'])){
		foreach($params['configoptions'] as $k => $v){
			if(!isset($post_vps[$k])){
				$post_vps[$k] = $v;
			}
		}
	}

	$post_vps['ips'] = count($post_vps['ips']);
    	$post_vps['ips6'] = count($post_vps['ips6']);
	$post_vps['ips6_subnet'] = count($post_vps['ips6_subnet']);
	$post_vps['ips_int'] = count($post_vps['ips_int']);
    	$post_vps['hostname'] = $params['domain'];	
	
	$post_vps['editvm'] = 1;
		
	$ret = VirtCloud_Curl::e_make_api_call($params["serverip"], $params['serverusername'], $params['serverpassword'], 0, 'index.php?act=editvm&vid='.$params['customfields']['vpsid'], $post_vps);
	//logActivity('Return after Edit: '.var_export($ret, 1));
	
	unset($ret['scripts']);
	unset($ret['iscripts']);
	unset($ret['ostemplates']);
	unset($ret['isos']);
	
	//logActivity('Returned done:'.var_export($ret,1));
	if($loglevel > 0) logActivity('Post Result : '.var_export($ret, 1));
	
	if(empty($ret)){
		return 'Could not load the server data after processing.'.VirtCloud_Curl::error($params["serverip"]);
	}
	
	if(!empty($ret['done'])){
		
		$result = "success";
		
		$tmp_ips = array();
		
		if(!empty($ret['editvm_vps']['ips'])){
			foreach($ret['editvm_vps']['ips'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
	
		if(!empty($ret['editvm_vps']['ips6_subnet'])){
			foreach($ret['editvm_vps']['ips6_subnet'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
	
		if(!empty($ret['editvm_vps']['ips6'])){
			foreach($ret['editvm_vps']['ips6'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}

		if(!empty($ret['editvm_vps']['ips_int'])){
			foreach($ret['editvm_vps']['ips_int'] as $k => $v){
				$tmp_ips[] = $v;
			}
		}
		
	    if(!empty($tmp_ips)){
	    
	        // The Dedicated IP
    		Capsule::table('tblhosting')->where('id',$serviceid)->update(
    			array('dedicatedip'=>$tmp_ips[0])
    		);
    	
    		// Extra IPs
    		$tmp_cnt = count($tmp_ips);
    		if(!empty($tmp_cnt)){
    			unset($tmp_ips[0]);
    			Capsule::table('tblhosting')->where('id',$serviceid)->update(
    				array('assignedips'=>implode("\n", $tmp_ips))
    			);
    		}
    		
	    }
		
	}else{
				
		if(!empty($ret['error'])){
			return 'Errors : '.implode('<br>', $ret['error']);
		}
			
		$result = 'Unknown error occured. Please check logs';
			
	}
	
	return $result;

}

function virtualizor_cloud_AdminLink($params) {
	$code = '<a href="https://'.$params["serverip"].':4083/index.php?act=login" target="_blank">Virtualizor Panel</a>';
	return $code;
}

function virtualizor_cloud_LoginLink($params) {
	$code =  "<a href=\"https://".$params["serverip"].":4083/\" target=\"_blank\" style=\"color:#cc0000\">Login to Virtualizor</a>";
	
	return $code;
}

function virtualizor_cloud_AdminCustomButtonArray() {
	# This function can define additional functions your module supports, the example here is a reboot button and then the reboot function is defined below
    $buttonarray = array(
	 "Start VPS" => "admin_start",
	 "Reboot VPS" => "admin_reboot",
 	 "Stop VPS"=> "admin_stop",
	 "Poweroff VPS"=> "admin_poweroff"
	);
	return $buttonarray;
}


function virtualizor_cloud_ClientAreaCustomButtonArray() {
	# This function can define additional functions your module supports, the example here is a reboot button and then the reboot function is defined below
    $buttonarray = array(
	 "Start VPS" => "start",
	 "Reboot VPS" => "reboot",
 	 "Stop VPS"=> "stop",
	 "Poweroff VPS"=> "poweroff", 
	 "Launch VNC"=> "vnc"	  
	);
	return $buttonarray;
}


class VirtCloud_Curl {
	
	public static function error($ip = ''){
		
		$err = '';
		
		if(!empty($GLOBALS['virt_curl_err'])){
			$err .= ' Curl Error: '.$GLOBALS['virt_curl_err'];
		}
		
		if(!empty($ip)){
			$err .= ' (Server IP : '.$ip.')';
		}
		
		return $err;
	}
	
	public static function call($ip, $userkey, $pass, $path, $post = array(), $cookies = array()){

		$v = new Virtualizor_Enduser_Cloud_API($ip, $userkey, $pass);
		
		return $v->call($path, $post, $cookies);
		
	}	
	
	public static function make_api_call($ip, $pass, $path, $data = array(), $post = array(), $cookies = array()){
		
		global $virtualizor_conf, $whmcsmysql;
		
		$key = generateRandStr(8);
		$apikey = make_apikey($key, $pass);
		
		$url = 'https://'.$ip.':4085/'.$path;	
		$url .= (strstr($url, '?') ? '' : '?');	
		$url .= '&api=serialize&apikey='.rawurlencode($apikey).'&skip_callback=whmcs';
		
		// Pass some data if there
		if(!empty($data)){
			$url .= '&apidata='.rawurlencode(base64_encode(serialize($data)));
		}
	
		if($virtualizor_conf['loglevel'] > 0){
			logActivity('URL : '. $url);
		}
		
		// Set the curl parameters.
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
			
		// Time OUT
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
		
		// Turn off the server and peer verification (TrustManager Concept).
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
			
		// UserAgent
		curl_setopt($ch, CURLOPT_USERAGENT, 'Softaculous');
		
		// Cookies
		if(!empty($cookies)){
			curl_setopt($ch, CURLOPT_COOKIESESSION, true);
			curl_setopt($ch, CURLOPT_COOKIE, http_build_query($cookies, '', '; '));
		}
		
		if(!empty($post)){
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
		}
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		
		// Get response from the server.
		$resp = curl_exec($ch);
		
		if(empty($resp)){
			$GLOBALS['virt_curl_err'] = curl_error($ch);
		}
			
		curl_close($ch);
		
		// The following line is a method to test
		//if(preg_match('/sync/is', $url)) echo $resp;
		
		if(empty($resp)){
			return false;
		}
		
		// As a security prevention measure - Though this cannot happen
		$resp = str_replace($pass, '12345678901234567890123456789012', $resp);
		
		$r = _unserialize($resp);
		
		if(empty($r)){
			return false;
		}
		
		return $r;
	}

	public static function e_make_api_call($ip, $userkey, $pass, $vid, $path, $post = array()){
		
		$v = new Virtualizor_Enduser_Cloud_API($ip, $userkey, $pass);
		$path = $path.'&skip_callback=whmcs';
		if(!empty($vid)){
		    $path = $path.'&svs='.$vid;
		}
		
		return $v->call($path, $post);
		
	}	
	
	public static function action($params, $action, $post = array()){
		
		global $virt_verify, $virt_errors;
		
		/*// Verify its this user
		if(empty($virt_verify)){
		
			$virt_verify = VirtCloud_Curl::call($params["serverip"], $params["serverusername"], $params["serverpassword"], 'index.php?act=addvs');
			
		}*/
		
		// Make the call
		$response = VirtCloud_Curl::e_make_api_call($params["serverip"], $params['serverusername'], $params['serverpassword'], $params['customfields']['vpsid'], 'index.php?'.$action, $post);
		
		if(empty($response)){
			$virt_errors[] = 'The action could not be completed as no response was received.';
			return false;
		}
		
		return $response;
	
	} // function virt_curl_action ends	

} // class VirtCloud_Curl ends


function virtualizor_cloud_ClientArea($params) {
	
	global $virt_action_display, $virt_errors, $virt_resp, $virtualizor_conf, $whmcsmysql;
	
	return virtualizor_cloudUI($params);

}

function virtualizor_cloudUI($params, $url_prefix = 'clientarea.php?action=productdetails', $modules_url = 'modules/servers'){
	
	global $virt_action_display, $virt_errors, $virt_resp, $virtualizor_conf, $whmcsmysql;
	
	//Is the VPS there?
	if(empty($params['customfields']['vpsid'])){
		return 'VPS not Provisioned';
	}
	
	// New method of Virtualizor Module
	if(isset($_GET['give'])){
		
		$var['APP'] = 'Virtualizor';
		$var['site_name'] = 'WHMCS';
		$var['API'] = $url_prefix.'&id='.$params['serviceid'].'&api=json&';		
		$var['giver'] = $url_prefix.'&id='.$params['serviceid'].'&';
		$var['url'] = $url_prefix.'&id='.$params['serviceid'].'&';
		$var['copyright'] = 'Virtualizor';
		$var['version'] = '2.2.1';
		$var['logo'] = '';
		$var['theme'] = $modules_url.'/virtualizor_cloud/ui/';
		$var['theme_path'] = dirname(__FILE__).'/ui/';
		$var['images'] = $var['theme'].'images/';
		$var['virt_dev_license'] = ' ';
		$var['virt_pirated_license'] = ' ';

		// For short name of VPS
		if(!empty($virtualizor_conf['vm_short'])){
			define('VM_SHORT', $virtualizor_conf['vm_short']);
		}else{
			define('VM_SHORT', 'VPS');
		}

		// For long name of VPS
		if(!empty($virtualizor_conf['vm_long'])){
			define('VM_LONG', $virtualizor_conf['vm_long']);
		}else{
			define('VM_LONG', 'Virtual Server');
		}
		
		if($_GET['give'] == 'index.html'){
			
			// Zipping if possible
			if(function_exists('ob_gzhandler')){
				ob_start('ob_gzhandler');
			}
				
			//Read the file
			$data = file_get_contents($var['theme_path'].'index.html');
		
			$filetime = filemtime($var['theme_path'].'index.html');
		}
	
		if($_GET['give'] == 'combined.js'){
			
			//Read the File
			$data = '';
			$jspath = $var['theme_path'].'js2/';
			$files = array('jquery.min.js',
							'jquery.dataTables.min.js',
							'jquery.tablesorter.min.js',
							'jquery.flot.min.js',
							'jquery.flot.pie.min.js',
							'jquery.flot.stack.min.js',
							'jquery.flot.time.min.js',
							'jquery.flot.tooltip.min.js',
							'jquery.flot.symbol.min.js',
							'jquery.flot.axislabels.js',
							'jquery.flot.selection.min.js',
							'jquery.flot.resize.min.js',
							'jquery.scrollbar.min.js',
							'popper.min.js',
							'select2.js',
							'bootstrap.min.js',
							'jquery.responsivetabs.js',
							'virtualizor.js',
							'haproxy.js',
						);
						
			foreach($files as $k => $v){
				$data .= file_get_contents($jspath.'/'.$v)."\n\n";
			}
			
			// We are zipping if possible
			if(function_exists('ob_gzhandler')){
				ob_start('ob_gzhandler');
			}
			
			// Type javascript
			header("Content-type: text/javascript; charset: UTF-8");
			
			// Set a zero Mtime
			$filetime = filemtime($var['theme_path'].'/js2/virtualizor.js');
			
		}
		
		if($_GET['give'] == 'style.css'){
			
			// Read the file
			$data = '';
			$jspath = $var['theme_path'].'css2/';
			$files = array('bootstrap.min.css',
							'all.min.css',
							'jquery.dataTables.min.css',
							'select2.css',
							'jquery.scrollbar.css',
							'style.css',
						);
			foreach($files as $k => $v){
				$data .= file_get_contents($jspath.'/'.$v)."\n\n";
			}
			
			// Type CSS
			header("Content-type: text/css; charset: UTF-8");
		
			// We are zipping if possible
			if(function_exists('ob_gzhandler')){
			ob_start('ob_gzhandler');
			}
		}
		
		foreach($var as $k => $v){
			$data = str_replace('[['.$k.']]', $v, $data);
		}
		
		$lang = $params['clientsdetails']['language'];
		
		// Sets the language preferred by the clients 
		if(!empty($virtualizor_conf['default_language'])){
			$lang = $virtualizor_conf['default_language'];
		}
		
		// Parse the languages
		vload_lang($lang);
		echo vparse_lang($data);
		
		die();
		exit(0);		
	
	}
	
	if($_REQUEST['api'] == 'json'){
		
		// Overwrite certain variables
		$_GET['svs'] = $params['customfields']['vpsid'];
		$_GET['SET_REMOTE_IP'] = $_SERVER['REMOTE_ADDR'];
		
		// The list of the VPS Action allowed for VPS USER ONLY !!!
		$vps_actions = array('vpsmanage', 'usersettings', 'managezone', 'tasks', 'self_shutdown', 'logs', 'system_alerts', 'statuslogs', 'stop', 'restart', 'start', 'poweroff', 'backup', 'rescue', 'ostemplate', 'monitor', 'cpu', 'ram', 'processes', 'disk', 'services', 'performance', 'ssh', 'console', 'statuslogs', 'system_alerts', 'logs', 'bandwidth', 'changepassword', 'controlpanel', 'hostname', 'rdns', 'vnc', 'vncpass', 'ips', 'hvmsettings', 'listrecipes', 'managezone', 'managesubnets', 'tasks', 'backup2', 'addiso', 'euiso', 'managevdf', 'sshkeys', 'webuzo', 'editsshkey');		

		if(!in_array($_GET['act'], $vps_actions)){
			$_GET['act'] = 'vpsmanage';
		}
		
		$res = VirtCloud_Curl::action($params, http_build_query($_GET), $_POST);
		
		//$res['uid'] = 0;
		
		echo json_encode($res);
		die();
		exit(0);
	}

	if($_GET['b'] == 'novnc' || (!empty($_REQUEST['novnc'])) && $_REQUEST['act'] == 'vnc'){
		
		$data = VirtCloud_Curl::action($params, 'act=vnc&novnc=1');
		
		// Find the servers hostname
		$res = Capsule::table('tblservers')->select('hostname')->where('id',$params['serviceid'])->get();
		
		$server_details = (array) $res[0];
		$params['serverhostname'] = $server_details['hostname'];
		
		// fetch the novnc file
		$modules_url_vnc = $modules_url.'/virtualizor_cloud';
		$novnc_viewer = file_get_contents($modules_url_vnc.'/novnc/vnc_auto_virt.html');
		
		$novnc_password = $data['info']['password'];
		$vpsid = $params['customfields']['vpsid'];
		$novnc_serverip = empty($params['serverhostname']) ? $params['serverip'] : $params['serverhostname'];
		$proto = 'http';
		$port = 4081;
		$virt_port = 4082;
		$websockify = 'websockify';
		if(!empty($_SERVER['HTTPS']) || @$_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'){
			$proto = 'https';
			$port = 4083;
			$virt_port = 4083;
			$websockify = 'novnc/';
			$novnc_serverip = empty($params['serverhostname']) ? $params['serverip'] : $params['serverhostname'];
		}
		
		if($data['info']['virt'] == 'xcp'){
			$vpsid .= '-'.$data['info']['password'];
			
			if(!empty($data['info']['host']) && !empty($data['info']['serid'])){
				$novnc_serverip = $data['info']['host'];
			}
		}
		
		echo $novnc_viewer = vlang_vars_name($novnc_viewer, array('HOST' => $novnc_serverip,
															'PORT' => $port,
															'VIRTPORT' => $virt_port,
															'PROTO' => $proto,
															'WEBSOCKET' => $websockify,
															'TOKEN' => $vpsid,
															'PASSWORD' => $novnc_password,
															'MODULE_URL' => $modules_url_vnc));
		
		die();
	}
	
	// Java VNC
	if($_REQUEST['act'] == 'vnc' && !empty($_REQUEST['launch'])){
		
		$response = VirtCloud_Curl::action($params, 'act=vnc&launch=1&giveapplet=1', '', true);

		if(empty($response)){
			return false;
		}
		
		// Is the applet code in the API Response ?
		if(!empty($response['info']['applet'])){
			
			$applet = $response['info']['applet'];
		}else{
			
			$virttype = preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']);
			
			// NonXCP
			if($virttype != 'xcp'){
				
				if(!empty($response['info']['port']) && !empty($response['info']['ip']) && !empty($response['info']['password'])){	
					$applet = '<APPLET ARCHIVE="https://s2.softaculous.com/a/virtualizor/files/VncViewer.jar" CODE="com.tigervnc.vncviewer.VncViewer" WIDTH="1" HEIGHT="1">
						<PARAM NAME="HOST" VALUE="'.$response['info']['ip'].'">
						<PARAM NAME="PORT" VALUE="'.$response['info']['port'].'">
						<PARAM NAME="PASSWORD" VALUE="'.$response['info']['password'].'">
						<PARAM NAME="Open New Window" VALUE="yes">
					</APPLET>';	
				}
				//XCP		
				}else{
				
				if(!empty($response['info']['port']) && !empty($response['info']['ip'])){
					$applet = '<APPLET ARCHIVE="https://s2.softaculous.com/a/virtualizor/files/TightVncViewer.jar" CODE="com.tightvnc.vncviewer.VncViewer" WIDTH="1" HEIGHT="1">
						<PARAM NAME="SOCKETFACTORY" value="com.tightvnc.vncviewer.SshTunneledSocketFactory">
						<PARAM NAME="SSHHOST" value="'.$response['info']['ip'].'">
						<PARAM NAME="HOST" value="localhost">
						<PARAM NAME="PORT" value="'.$response['info']['port'].'">
						<PARAM NAME="Open New Window" VALUE="yes">
					</APPLET>';
				}
			}
		}
	
		echo $applet;
	
		die();
		
	}
	
	if(!empty($virtualizor_conf['client_ui']['direct_login'])){
		return "<center><a href=\"https://".$params["serverip"].":4083/\" target=\"_blank\">Login to Virtualizor</a></center>";
	}

	$code .= '<script data-cfasync="false" type="text/javascript">
		
function iResize(){
	try{
		document.getElementById("virtualizor_manager").style.height = 
		document.getElementById("virtualizor_manager").contentWindow.document.body.offsetHeight + "px";
	}catch(e){ };
}

setInterval("iResize()", 1000);

$(document).ready(function(){
	
	var divID = "tab1";
	if (!document.getElementById(divID)) {
        divID = "domain";
    }
	
	var myDiv = document.createElement("div");
	myDiv.id = "virtualizor_load_div";
	myDiv.innerHTML = \'<center style="padding:10px; background-color: #FAFBD9;">Loading Panel options ...</center><br /><br /><br />\';
	document.getElementById(divID).appendChild(myDiv);
	
	var iframe = document.createElement("iframe");
	iframe.id = "virtualizor_manager";
	iframe.width = "100%";
	iframe.style.display = "none";
	iframe.style.border = "none";
	iframe.scrolling = "no";
	iframe.src = "'.$url_prefix.'&id='.$params['serviceid'].'&give=index.html#act=vpsmanage";
	document.getElementById(divID).appendChild(iframe);
	
	$("#virtualizor_manager").load(function(){
		$("#virtualizor_load_div").hide();
		$(this).show();
		iResize();
	});
	
	$(".moduleoutput").each(function(){
		this.style.display = "none";
	});
	
});

</script>';

	return $code;
	
}

function virt_cloud_error($error, $table_width = '500', $center = true, $ret = true){
	
	$str = '';
	
	//on error call the form
	if(!empty($error)){
		
		$str = '<table width="'.$table_width.'" cellpadding="2" cellspacing="1" style="background-color: rgb(230, 230, 230);" '.(($center) ? 'align="center"' : '' ).'>
			<tr>
			<td>
			The following errors occured :
			<ul type="square">';
		
		foreach($error as $ek => $ev){
		
			$str .= '<li>'.$ev.'</li>';
		
		}
		
		
		$str .= '</ul>
			</td>
			</tr>
			</table>'.(($center) ? '</center>' : '' ).'
			<br />';
		
		if(empty($ret)){
			echo $str;
		}else{
			return $str;
		}
		
	}

}

function virt_cloud_done($done){
	return '<center><div style="background-color: #FAFBD9; font-size:13px; padding:8px; text-align:center; margin-bottom: 20px; width: 500px"><img src="'.$GLOBALS['virt_img_url'].'notice.gif" /> &nbsp; '.$done.'</div></center>';
}

function virt_cloud_controlpanel($params) {
	
	$theme = '<h2>Control Panel Installation</h2>';
	
	$ins = @array_keys($_POST['ins']);
	
	if(!empty($ins)){
			
		$fields = array(
						'ins' => $_POST['ins']
						);
	
		$virt_resp = VirtCloud_Curl::action($params, 'act=controlpanel&',$fields);
		
		if(isset($virt_resp['done'])){

			$theme .= virt_cloud_done('Control Panel Installation has been Started');
		} elseif(isset($virt_resp['onboot'])) {

			$theme .= virt_cloud_done('Please stop and start the VPS after which the control panel installtion will start');
		} else {
		
			$virt_errors[] = 'There was an error while reinstalling the Control Panel';
			$theme .= virt_cloud_error($virt_errors);
		}
		
	}
	
	$theme .= '
	<script language="javascript" type="text/javascript">
		function confirmpanel(){
			if(confirm("Are you sure you want to install this panel ? Data on the server will be altered significantly.")){
				return true;
			}else{
				return false;
			}
		}
	</script>
	
	<form method="post" action="">
		<table cellpadding="8" cellspacing="1" border="0" class="divroundshad">
		<tr>
			<td colspan="5"><div class="roundheader">Control Panel Installation</div></td>
		</tr>
		<tr>
			<td align="center" width="100px">
				<input type="image" name="ins[cpanel]" onclick="return confirmpanel()" src="'.$GLOBALS['virt_img_url'].'cpanel.gif" /><br />cPanel		
			</td>
			<td align="center" width="100px">
				<input type="image" name="ins[plesk]" onclick="return confirmpanel()" src="'.$GLOBALS['virt_img_url'].'plesk.gif" /><br />Plesk			
			</td>
			<td align="center" width="100px">
				<input type="image" name="ins[webuzo]" onclick="return confirmpanel()" src="'.$GLOBALS['virt_img_url'].'webuzo.gif" /><br />Webuzo		
			</td>
			<td align="center" width="100px">
				<input type="image" name="ins[interworx]" onclick="return confirmpanel()" src="'.$GLOBALS['virt_img_url'].'interworx.gif" /><br />Interworx
			</td>
			<td align="center" width="100px">
				<input type="image" name="ins[webmin]" onclick="return confirmpanel()" src="'.$GLOBALS['virt_img_url'].'webmin.gif" /><br />Webmin	
			</td>
		</tr>
		</table>
	</form><br />';
	
	return $theme;
	
}

function virtualizor_cloud_start($params) {
	
	global $virt_action_display, $virt_errors;
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=start&do=1');
	
	if(empty($virt_resp['done'])){
		$virt_action_display = 'The VPS failed to start';
		return $virt_action_display;
	}
	
	// Started it
	$virt_action_display = 'The VPS has been started';
	
	return true;

}

function virtualizor_cloud_stop($params) {
	
	global $virt_action_display, $virt_errors;
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=stop&do=1');
	
	if(empty($virt_resp)){
		$virt_action_display = 'Failed to stop the VPS';
		return $virt_action_display;
	}
	
	// Started it
	$virt_action_display = 'The Stop Signal has been sent to the VPS';
	
	return true;

}

function virtualizor_cloud_reboot($params) {
	
	global $virt_action_display, $virt_errors;
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=restart&do=1');
	
	if(empty($virt_resp)){
		$virt_action_display = 'Failed to reboot the VPS';
		return $virt_action_display;
	}
	
	// Started it
	$virt_action_display = 'The Restart Signal has been sent to the VPS';
	
	return true;

}


function virtualizor_cloud_poweroff($params) {
	
	global $virt_action_display, $virt_errors;
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=poweroff&do=1');
	
	if(empty($virt_resp)){
		$virt_action_display = 'Failed to poweroff the VPS';
		return $virt_action_display;
	}
	
	// Started it
	$virt_action_display = 'The VPS has been Powered off';
	
	return true;

}


function virtualizor_cloud_admin_start($params) {
	$ret = virtualizor_cloud_start($params);
	
	if($ret === true){
		return 'success';
	}else{
		return $ret;
	}
}

function virtualizor_cloud_admin_stop($params) {
	$ret = virtualizor_cloud_stop($params);
	
	if($ret === true){
		return 'success';
	}else{
		return $ret;
	}
}

function virtualizor_cloud_admin_reboot($params) {
	$ret = virtualizor_cloud_reboot($params);
	
	if($ret === true){
		return 'success';
	}else{
		return $ret;
	}
}

function virtualizor_cloud_admin_poweroff($params) {
	$ret = virtualizor_cloud_poweroff($params);
	
	if($ret === true){
		return 'success';
	}else{
		return $ret;
	}
}


function virtualizor_cloud_vnc($params){
	
	global $virt_action_display, $virt_errors;
	
	$response = VirtCloud_Curl::action($params, 'act=vnc&launch=1', '', true);
	
	if(empty($response)){
		return false;
	}

	$virttype = preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']);
	
	if($virttype != 'xcp'){
		if(!empty($response['info']['port']) && !empty($response['info']['ip']) && !empty($response['info']['password'])){
			
			$applet = '<APPLET ARCHIVE="http://'.$params['serverip'].':4082/themes/default/java/vnc/TightVncViewer.jar" CODE="com.tightvnc.vncviewer.VncViewer" WIDTH="1" HEIGHT="1">
				<PARAM NAME="HOST" VALUE="'.$response['info']['ip'].'">
				<PARAM NAME="PORT" VALUE="'.$response['info']['port'].'">
				<PARAM NAME="PASSWORD" VALUE="'.$response['info']['password'].'">
				<PARAM NAME="Open New Window" VALUE="yes">
			</APPLET>';	
		}
	}else{
		if(!empty($response['info']['port']) && !empty($response['info']['ip'])){
			$applet = '<APPLET ARCHIVE="http://'.$params['serverip'].':4082/themes/default/java/vnc/TightVncViewer.jar" CODE="com.tightvnc.vncviewer.VncViewer" WIDTH="1" HEIGHT="1">
				<PARAM NAME="SOCKETFACTORY" value="com.tightvnc.vncviewer.SshTunneledSocketFactory">
				<PARAM NAME="SSHHOST" value="'.$response['info']['ip'].'">
				<PARAM NAME="HOST" value="localhost">
				<PARAM NAME="PORT" value="'.$response['info']['port'].'">
				<PARAM NAME="Open New Window" VALUE="yes">
			</APPLET>';
		}
	}
	
	if(empty($applet)){
		$virt_errors[] = 'There were errors while launching the VNC Viewer. It could be disabled for this VPS';
		$virt_action_display = 'There were errors while launching the VNC Viewer. It could be disabled for this VPS';
		return $virt_action_display;
	}
	
	$virt_action_display = 'The VNC has been launched.'.$applet;
	
	return true;
}

function virt_cloud_cpu($params){	
	
	$theme = '<h2>CPU Information</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=cpu&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
	
		$theme .= '
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="3"><div class="roundheader">CPU Information</div></td>
		</tr>
		<tr>
			<td width="50%"><b>CPU : </b></td>
			<td>'.$virt_resp['cpu']['limit'].' units</td>
			<td rowspan="3"><div id="cpuholder" style="width:100px; height:100px;"></div></td>
		</tr>
		<tr>
			<td><b>Utilization : </b></td>
			<td>'.(preg_match('/xen|kvm/is', $params['configoption1']) ? '<i>No Info</i>' : $virt_resp['cpu']['percent'].' %').'</td>
		</tr>
		<tr>
			<td><b>Manufacturer : </b></td>
			<td>'.ucfirst($virt_resp['cpu']['manu']).'</td>
		</tr>
		</table>
		
		<script type="text/javascript" charset="utf-8">
		
			$(document).ready(function(){
			
				var cpu = [
					{ label: "Used",  data: '.$virt_resp['cpu']['percent'].'},
					{ label: "Free",  data: '.$virt_resp['cpu']['percent_free'].'}
				];

				$.plot($("#cpuholder"), cpu, 
				{
					series: {
						pie: { 
							innerRadius: 0.7,
							radius: 1,
							show: true,
							label: {
								show: true,
								radius: 0,
								formatter: function(label, series){
									if(label != "Used") return "";
									return \'<div style="font-size:18px;text-align:center;padding:2px;color:black;">\'+Math.round(series.percent)+\'%</div><div style="font-size:10px;">\'+label+\'</div>\';	
								}
							}
						}
					},
					legend: {
						show: false
					}
				});
			
			});
		</script>
		
		';
	}
	
	return $theme;
	
}

function virt_cloud_ram($params){
	
	$theme = '<h2>RAM Information</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=ram&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
	
		$theme .= '
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="3"><div class="roundheader">RAM Information</div></td>
		</tr>
		<tr>
			<td width="50%"><b>RAM : </td>
			<td>'.$virt_resp['ram']['limit'].' MB</td>
			<td rowspan="3"><div id="ramholder" style="width:100px; height:100px;"></div></td>
		</tr>
		<tr>
			<td><b>Utilization : </b></td>
			<td>'.(preg_match('/xen|kvm/is', $params['configoption1']) ? '<i>No Info</i>' : $virt_resp['ram']['used'].' MB').'</td>
		</tr>
		</table>
		
		<script type="text/javascript" charset="utf-8">
		
			$(document).ready(function(){
			
				var cpu = [
					{ label: "Used",  data: '.$virt_resp['ram']['used'].'},
					{ label: "Free",  data: '.$virt_resp['ram']['free'].'}
				];

				$.plot($("#ramholder"), cpu, 
				{
					series: {
						pie: { 
							innerRadius: 0.7,
							radius: 1,
							show: true,
							label: {
								show: true,
								radius: 0,
								formatter: function(label, series){
									if(label != "Used") return "";
									return \'<div style="font-size:18px;text-align:center;padding:2px;color:black;">\'+Math.round(series.percent)+\'%</div><div style="font-size:10px;">\'+label+\'</div>\';	
								}
							}
						}
					},
					legend: {
						show: false
					}
				});
			
			});
		</script>
		';
	}
	
	return $theme;
	
}

function virt_cloud_disk($params){
	
	$theme = '<h2>Disk Information</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=disk&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
	
		$theme .= '
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="3"><div class="roundheader">Disk Information</div></td>
		</tr>
		<tr>
			<td width="50%"><b>Disk Space : </b></td>
			<td>'.$virt_resp['disk']['limit_gb'].' GB</td>
			<td rowspan="3"><div id="diskholder" style="width:100px; height:100px;"></div></td>
		</tr>
		<tr>
			<td><b>Utilization : </b></td>
			<td>'.(preg_match('/xen|kvm/is', $params['configoption1']) ? '<i>No Info</i>' : $virt_resp['disk']['used_gb'].' GB').'</td>
		</tr>
		</table>
		
		<script type="text/javascript" charset="utf-8">
		
			$(document).ready(function(){
			
				var cpu = [
					{ label: "Used",  data: '.$virt_resp['disk']['used_gb'].'},
					{ label: "Free",  data: '.$virt_resp['disk']['limit_gb'].'}
				];

				$.plot($("#diskholder"), cpu, 
				{
					series: {
						pie: { 
							innerRadius: 0.7,
							radius: 1,
							show: true,
							label: {
								show: true,
								radius: 0,
								formatter: function(label, series){
									if(label != "Used") return "";
									return \'<div style="font-size:18px;text-align:center;padding:2px;color:black;">\'+Math.round(series.percent)+\'%</div><div style="font-size:10px;">\'+label+\'</div>\';	
								}
							}
						}
					},
					legend: {
						show: false
					}
				});
			
			});
		</script>
		
		';
	}
	
	return $theme;
	
}

function virt_cloud_bandwidth($params){	
	
	$theme = '<h2>Bandwidth Information</h2>';
	
	$band_resp = VirtCloud_Curl::action($params, 'act=bandwidth&');
	
	if(empty($band_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
	
		$theme .= '
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="3"><div class="roundheader">Bandwidth Information</div></td>
		</tr>
		<tr>
			<td colspan="3"><center><div style="width:85%; height:300px;" id="bwband_holder"></div></center></td>
		</tr>
		<tr>
			<td width="50%"><b>Allowed Limit : </b></td>
			<td>'.$band_resp['bandwidth']['limit_gb'].' GB</td>
			<td rowspan="3"><div style="height:100px;width:100px; " id="bwpiechart_holder"></div></td>
		</tr>
		<tr>
			<td><b>Utilization : </b></td>
			<td>'.$band_resp['bandwidth']['used_gb'].' GB'.'</td>
		</tr>
		<tr>
			<td><b>% usage : </b></td>
			<td>'.$band_resp['bandwidth']['percent'].' %'.'</td>
		</tr>
		</table>
		
		<script type="text/javascript" charset="utf-8">
		
			$(document).ready(function(){
			
				var res = [
					{ label: "Used",  data: '.$band_resp['bandwidth']['used_gb'].'},
					{ label: "Free",  data: '.$band_resp['bandwidth']['free_gb'].'}
				];
				
				resource_graph("bwpiechart_holder", res);
				
				function resource_graph(id, data){

					$.plot($("#"+id), data, 
					{
						series: {
							pie: { 
								innerRadius: 0.7,
								radius: 1,
								show: true,
								label: {
									show: true,
									radius: 0,
									formatter: function(label, series){
										if(label != "Used") return "";
										return \'<div style="font-size:18px;text-align:center;padding:2px;color:black;">\'+Math.round(series.percent)+\'%</div><div style="font-size:10px;">\'+label+\'</div>\';	
									}
								}
							}
						},
						legend: {
							show: false
						}
					});
				}

				function makedata(data){
				
					var fdata = [];
					i = 0;
					for (x in data){
						fdata.push([i, (data[x])]);
						i++;
					}
				
					return fdata;
					
				}
				
				var d1 = makedata([0, '.implode(', ', $band_resp['bandwidth']['usage']).']);';
				
				// Inbound and outbound data is currently not available in KVM and XEN
				if(!empty($band_resp['bandwidth']['in']) && !empty($band_resp['bandwidth']['out'])){
					
					$theme .= '
					var indata = makedata([0, '.implode(', ', $band_resp['bandwidth']['in']).']);
					var outdata = makedata([0, '.implode(', ', $band_resp['bandwidth']['out']).']);';
				}
				
				$theme .= '
				var bandwidth_graph = [
					{ label: "Usage",  data: d1},';
				
					if(!empty($band_resp['bandwidth']['in']) && !empty($band_resp['bandwidth']['out'])){
						
						$theme .= '
						{ label: "In",  data: indata},
						{ label: "Out",  data: outdata}';
					}
					
				$theme .= '
				];
				
				$.plot($("#bwband_holder"), bandwidth_graph, {
					series: {
						points: { show: true },
						lines: { show: true, fill: true, steps: false }
					},
					legend: {
						show: true
					},
					grid: { hoverable: true}
				});
				
				function showTooltip(x, y, contents) {
					$(\'<div id="tooltip">\' + contents + \'</div>\').css( {
						position: "absolute",
						display: "none",
						top: y ,
						left: x + 20,
						border: "1px solid #CCCCCC",
						padding: "2px",
						"background-color": "#EFEFEF",
						"z-index" : 10000,
						opacity: 0.80
					}).appendTo("body").fadeIn(200);
				}

				var previousPoint = null;
				$("#bwband_holder").bind("plothover", function (event, pos, item) {
					$("#x").text(pos.x.toFixed(2));
					$("#y").text(pos.y.toFixed(2));

					if (item) {
						
						if (previousPoint != item.dataIndex) {
							previousPoint = item.dataIndex;
							$("#tooltip").remove();
							var x = item.datapoint[0].toFixed(2),
								y = item.datapoint[1].toFixed(2);
								
							showTooltip(item.pageX, item.pageY,
										"Total : " + parseInt(y) + " MB <br>Day : " + parseInt(x));
						}
					} else {
						$("#tooltip").remove();
						previousPoint = null;
					}
				});
				
			});
		</script>';
		
		//r_print($band_resp);
		
	}
	
	return $theme;
	
}

function virt_cloud_performance($params){	
	
	$theme = '<h2>VPS Performance</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=performance&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
	
		$theme .= '
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="2"><div class="roundheader">VPS Performance</div></td>
		</tr>
		<tr>
			<td width="50%"><b>CPU Used : </b></td>
			<td>'.(preg_match('/xen|kvm/is', $params['configoption1']) ? '<i>No Info</i>' : $virt_resp['perfomance']['cpu'].' %').'</td>
		</tr>
		<tr>
			<td><b>RAM Used : </b></td>
			<td>'.(preg_match('/xen|kvm/is', $params['configoption1']) ? '<i>No Info</i>' : $virt_resp['perfomance']['ram'].' %').'</td>
		</tr>
		</table>';
	}
	
	return $theme;
	
}

function virt_cloud_processes($params){	
	
	$theme = '<h2>VPS Processes</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=processes&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
		
		if(preg_match('/xen|kvm/is', $params['configoption1'])){
		
			$theme .= virt_cloud_done('This feature is not available');
			
		}else{
		
			$processes = $virt_resp['processes'];
			//r_print($processes);
			
			$theme .= '<table class="summaryBlock" align="center" cellpadding="6" cellspacing="2" border="0" width="100%">
			<tr>';
			
			$keys = array_keys(current($processes));
			
			foreach($keys as $k => $v){
				$theme .= '<td align="center" class="summaryTitle">'.$v.'</td>';
			}
			$theme .= '</tr>';
			//r_print($processes);	
			foreach($processes as $k=>$v){
				$theme .= '<tr>';	
				foreach($v as $vv){
					$theme .= '<td align="center">'.$vv.'</td>';
				}
				$theme .= '</tr>';
			}
					
			$theme .= '</table>';
		
		}
		
	}
	
	return $theme;
	
}

function virt_cloud_services($params){
	
	$theme = '<h2>VPS Services</h2>';
	
	$virt_resp = VirtCloud_Curl::action($params, 'act=services&');
	
	if(empty($virt_resp)){
	
		$virt_errors[] = 'There was an error while fetching the Details';
		$theme .= virt_cloud_error($virt_errors);
		
	}else{
		
		if(preg_match('/xen|kvm/is', $params['configoption1'])){
		
			$theme .= virt_cloud_done('This feature is not available');
			
		}else{
		
			$services = $virt_resp['services'];
			$autostart = $virt_resp['autostart'];
			$running = $virt_resp['running'];
			
			$theme .= '<table align="center" cellpadding="5" cellspacing="2" border="0" width="100%" class="summaryBlock">
		<tr>
			<td class="summaryTitle" align="center">Services</td>
			<td align="center" class="summaryTitle">Status</td>
			<td align="center" class="summaryTitle">Auto Start</td>
		</tr>';
		
			foreach($services as $k=>$v){
				$theme .= '<tr>
					<td>'.$v.'</td>		
					<td align="center">'.(in_array($v, $running) ? '&nbsp;&nbsp;Running': '&nbsp;&nbsp;OFF').'</td>
					<td align="center">'.(in_array($v, $autostart) ? '&nbsp;&nbsp;ON' : '&nbsp;&nbsp;OF').'</td>
				</tr>';
			}
	
					
			$theme .= '</table>';
		
		}
		
	}
	
	return $theme;
	
}

// Show the Hostname Form
function virt_cloud_hostname($params){
	
	global $whmcsmysql;
	
	$theme = '<h2>Change Hostname</h2>';
	
	if(isset($_POST['virt_changehostname'])){
		$fields = array(
						'newhost' => $_POST['virt_newhostname'],
						'changehost' => 'Change Hostname'
						);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=hostname&', $fields);
		
		if(empty($virt_resp['done'])){
			$virt_errors[] = 'There was an error changing the Hostname';
			$theme .= virt_cloud_error($virt_errors);
		}else{
			$theme .= virt_cloud_done('The Hostname was changed successfully');
		
			// Change the Hostname
			Capsule::table('tblhosting')->where('id',$params['serviceid'])->update(
				array('domain'=>$_POST['virt_newhostname'])
			);
			
			
		}
	}else{
		$virt_resp = VirtCloud_Curl::action($params, 'act=hostname&');
	}
	
	$theme .= '
	<form method="post" action="">
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="2"><div class="roundheader">Change Hostname</div></td>
		</tr>
		<tr>
			<td width="50%"><b>Hostname : </b></td>
			<td>'.$virt_resp['current'].'</td>
		</tr>
		<tr>
			<td>New Hostname : </td>
			<td><input type="text" name="virt_newhostname" id="virt_newhostname" value="" /></td>
		</tr>
		<tr>
			<td colspan="2" align="center"><input type="submit" value="Submit" name="virt_changehostname" />
		</td>
	</table>
	</form><br />';
	
	return $theme;
		
}

function virt_cloud_changeRootPass($params) {	
	
	global $whmcsmysql;
	
	$theme = '<h2>Change Root Password</h2>';
	
	if(isset($_POST['virt_changepassword'])){
		$fields = array(
					'newpass' => $_POST['virt_newpassword'],
					'conf' => $_POST['virt_newpasswordconf'],
					'changepass' => 'Change Password'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=changepassword&', $fields);
		
		if(isset($virt_resp['onboot'])){
			$theme .= virt_cloud_done('The Password will be changed when the VPS is booted again');
		}elseif(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('The Password was changed successfully');
		}else{
			$virt_errors[] = 'There was an error changing the Password';
			$theme .= virt_cloud_error($virt_errors);
		}
		
		// Change the Password
		if(empty($virt_errors)){
			Capsule::table('tblhosting')->where('id',$params['serviceid'])->update(
				array('password'=>encrypt($_POST['virt_newpassword']))
			);
		}
	}
	
	$theme .= '
	<form method="post" action="">
		<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
		<tr>
			<td colspan="2"><div class="roundheader">Change Root Password</div></td>
		</tr>
		<tr>
			<td width="50%"><b>New Password : </b></td>
			<td><input type="password" name="virt_newpassword" value="" /></td>
		</tr>
		<tr>
			<td><b>Confirm Password : </b></td>
			<td><input type="password" name="virt_newpasswordconf" value="" /></td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<input type="submit" value="Submit" name="virt_changepassword" />
			</td>
		</tr>
		</table>
	</form><br />';
	
	return $theme;
	
}

function virt_cloud_rescue($params){
	
	if(preg_match('/openvz/is', $params['configoption1'])){	
		global $virt_errors;
		$virt_errors[] = 'Rescue Mode is not available for OpenVZ';
		return false;
	}
	
	$theme = '<h2>Rescue Mode</h2>';
	
	if(isset($_POST['enablerescue'])){
	
		$fields = array(
					'password' => $_POST['password'],
					'conf_password' => $_POST['conf_password'],
					'enablerescue' => 'Enable Rescue Mode'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=rescue&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('Rescue Mode has been Enabled');
		}else{
			$virt_errors[] = 'There was an error while enabling the Rescue Mode';
			$theme .= virt_cloud_error($virt_errors);
		}
		
	}elseif(isset($_POST['disablerescue'])){
	
		$fields = array(
					'disablerescue' => 'Enable Rescue Mode'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=rescue&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('Rescue Mode has been Disabled');
		}else{
			$virt_errors[] = 'There was an error while disabling the Rescue Mode';
			$theme .= virt_cloud_error($virt_errors);
		}
	}else{
		$virt_resp = VirtCloud_Curl::action($params, 'act=rescue&');
	}
	
	if(!empty($virt_resp['rescue_enabled'])){
		$theme .= '<center>'.virt_cloud_done('Rescue Enabled').'</center>';
		
		// Disable rescue form
		$theme .= '<form action="" method="post">
		<br />
		<br />
		<table cellpadding="8" cellspacing="1">
		<tr><td><center>'.virt_cloud_done('Rescue Enabled').'</center><br /></td></tr>
		<tr>
			<td align="center">
			<input type="submit" value="Disable Rescue Mode" name="disablerescue" />
			</td>
		</tr>
		</table>
		</form><br />';
		
	}else{
	
		$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">Rescue Mode</div></td>
				</tr>
				<tr>
					<td width="50%"><b>Root Password</b></td>
					<td><input type="password" name="password" value="" /></td>
				</tr>
				<tr>
					<td><b>Confirm Password : </b></td>
					<td><input type="password" name="conf_password" value="" /></td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" value="Enable Rescue Mode" name="enablerescue" />
					</td>
				</tr>
			</table>
		</form><br />';
	}
	
	return $theme;
	
}

function virt_cloud_changeVncPass($params) {
	
	if(!preg_match('/xen|kvm/is', $params['configoption1'])){	
		global $virt_errors;
		$virt_errors[] = 'There were errors while launching the VNC Viewer. It could be disabled for this VPS';
		return false;
	}
	
	$theme = '<h2>Change VNC Password</h2>';
	
	if(isset($_POST['virt_vncpass'])){
		$fields = array(
					'newpass' => $_POST['virt_newvncpass'],
					'conf' => $_POST['virt_vncpassconf'],
					'vncpass' => 'Change Password'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=vncpass&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('The Password was changed successfully. The changes will take effect when the VPS is booted again.');
		}else{
			$virt_errors[] = 'There was an error changing the Password';
			$theme .= virt_cloud_error($virt_errors);
		}
	}
	
	$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">Change VNC Password</div></td>
				</tr>
				<tr>
					<td width="50%"><b>New Password : </b></td>
					<td><input type="password" name="virt_newvncpass" value="" /></td>
				</tr>
				<tr>
					<td><b>Confirm Password : </b></td>
					<td><input type="password" name="virt_vncpassconf" value="" /></td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" value="Submit" name="virt_vncpass" />
					</td>
				</tr>
			</table>
		</form><br />';
	
	return $theme;
	
}

function virt_cloud_bootorder($params){

	if(preg_match('/openvz/is', $params['configoption1']) || preg_match('/pv/is', $params['configoption1'])){
		global $virt_errors;
		$virt_errors[] = 'VPS configuration is not available for OpenVZ, XEN-PV and XCP-PV VPS';
		return false;
	}
	
	$theme = '<h2>VPS Configuration</h2>';
	
	//$virt = preg_match('/xen/is', $params['configoption1']) ? 'xen' : (preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']));
	
	if(isset($_POST['hvmsettings'])){
		$fields = array(
					'acpi' => $_POST['acpi'],
					'apic' => $_POST['apic'],
					'vnc' => $_POST['vnc'],
					'boot' => $_POST['boot'],
					'isos' => $_POST['isos'],
					'hvmsettings' => 'VPS Configuration'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=hvmsettings&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('Settings has been saved');
		}else{
			$virt_errors[] = 'There was an error while saving';
			$theme .= virt_cloud_error($virt_errors);
		}
	}else{
		$virt_resp = VirtCloud_Curl::action($params, 'act=hvmsettings&');
	}
	
	//r_print($virt_resp);
	$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">VPS Configuration</div></td>
				</tr>
                <tr>
					<td width="50%"><b>VNC : </b></td><td><input type="checkbox" name="vnc" '.($virt_resp['vps']['vnc'] == 1 ? 'checked="checked"' : '').' /></td>
				</tr>
				<tr>
					<td width="50%"><b>ACPI : </b></td><td><input type="checkbox" name="acpi" '.($virt_resp['vps']['acpi'] == 1 ? 'checked="checked"' : '').' /></td>
				</tr>
				<tr>
					<td><b>APIC : </b></td><td><input type="checkbox" name="apic" '.($virt_resp['vps']['apic'] == 1 ? 'checked="checked"' : '').' /></td>
				</tr>
				<tr>
					<td><b>Change Boot Order : </b></td>
					<td>
						<input name="boot" type="radio" value="cd" '.(current($virt_resp['boot']) == "Hard Disk" ? 'checked="checked"' : '').'/> &nbsp; Hard Disk<br />
						<input name="boot" type="radio" value="dc" '.(current($virt_resp['boot']) == "CD Drive" ? 'checked="checked"' : '').'/> &nbsp; CD Drive<br />
					</td>
				</tr>
				<tr>
					<td><b>Select ISO : </b></td>
					<td>
				
							<select name="isos">
							<option value="0">None</option>';
					foreach($virt_resp['isos'] as $k => $v){		 
						$theme .= '<option value="'.$k.'" '.($virt_resp['vps']['iso'] == $k ? 'selected="selected"' : '').'>'.$v['name'].'</option>';
					}
					$theme .= '</select>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" value="Submit" name="hvmsettings" />
					</td>
				</tr>
			</table>
		</form><br />';
	
	return $theme;
	
}

function virt_cloud_osreinstall($params) {
	
	$theme = '<h2>Reinstall OS</h2>';
	
	$virt = preg_match('/xen/is', $params['configoption1']) ? 'xen' : (preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']));
	
	if(isset($_POST['virt_reinsos'])){
		$fields = array(
					'newos' => $_POST['virt_newos'],
					'newpass' => $_POST['virt_newpass'],
					'conf' => $_POST['virt_passconf'],
					'reinsos' => 'Reinstall'
					);
			
		$virt_resp = VirtCloud_Curl::action($params, 'act=ostemplate&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('The OS has been reinstalled');
		}else{
			$virt_errors[] = 'There was an error while reinstalling the OS';
			$theme .= virt_cloud_error($virt_errors);
		}
	}else{
		$virt_resp = VirtCloud_Curl::action($params, 'act=ostemplate&');
	}
	
	$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">Reinstall OS</div></td>
				</tr>
				<tr>
					<td width="50%"><b>Available Templates : </b></td>
					<td align="left">';
					
					foreach($virt_resp['oslist'][$virt] as $kk => $vv){
						foreach($vv as $k => $v){
							$theme .= '<input name="virt_newos" type="radio" value="'.$k.'" /> &nbsp; '.$v['name'].'<br />';
						}
					}
					
					$theme .= '</td>
				</tr>
				<tr>
					<td><b>New Password : </b></td>
					<td><input type="password" name="virt_newpass" value="" /></td>
				</tr>
				<tr>
					<td><b>Confirm Password : </b></td>
					<td><input type="password" name="virt_passconf" value="" /></td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" value="Submit" name="virt_reinsos" />
					</td>
				</tr>
			</table>
		</form><br />';
	
	return $theme;
}

function virt_cloud_backup($params) {
	
	$theme = '<h2>Backups</h2>';
	
	if($params['configoption1'] != 'OpenVZ'){
		return false;
	}
	
	$virt = preg_match('/xen/is', $params['configoption1']) ? 'xen' : (preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']));
	
	if(isset($_POST['cbackup'])){
	
		$virt_resp = VirtCloud_Curl::action($params, 'act=backup&cbackup=true');
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('The VPS backup process has been started. Please allow a few minutes for it to complete. You will recieve a notification email when its is completed');
		}else{
			$virt_errors[] = 'There was an error while Backup';
			$theme .= virt_cloud_error($virt_errors);
		}
	}elseif(isset($_POST['restore'])){
		$virt_resp = VirtCloud_Curl::action($params, 'act=backup&restore=true');
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('The VPS restore process has been started. Please allow a few minutes for it to complete. You will recieve a notification email when its is completed');
		}else{
			$virt_errors[] = 'There was an error while Restore';
			$theme .= virt_cloud_error($virt_errors);
		}
	}else{
		// Call to check backup list
		$virt_resp = VirtCloud_Curl::action($params, 'act=backup&');
	}
	
	$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">Backups</div></td>
				</tr>
				<tr>
					<td colspan="2" align="center">Here you can create backups of your VPS and also restore from old backups.</td>
				</tr>
				<tr>
					<td align="center">
						<input type="submit" value="Backup" name="cbackup" />
					</td>';
					
					if($virt_resp['backups_list']){					
						$theme .= '<td align="center">
							<input type="submit" value="Restore" name="restore" />
						</td>';
					}
					
				$theme .= '</tr>
			</table>
		</form><br />';
	
	return $theme;
	
}

function virt_cloud_ips($params){
	
	$theme = '<h2>IPs</h2>';
	
	$virt = preg_match('/xen/is', $params['configoption1']) ? 'xen' : (preg_match('/xcp/is', $params['configoption1']) ? 'xcp' : strtolower($params['configoption1']));
	
	if(isset($_POST['reorderips'])){
	
		$fields = array(
					'ips' => $_POST['ips'],
					'reorderips' => 'IPs'
					);
					
		$virt_resp = VirtCloud_Curl::action($params, 'act=ips&', $fields);
		
		if(isset($virt_resp['done'])){
			$theme .= virt_cloud_done('IP settings have been saved. Your IP settings will be changed when the VPS is booted again');
		}else{
			$virt_errors[] = 'There was an error while setting up the IPs';
			$theme .= virt_cloud_error($virt_errors);
		}
	}else{
		$virt_resp = VirtCloud_Curl::action($params, 'act=ips&');
	}
	
	foreach($virt_resp['ips'] as $k => $v){
		if(valid_ipv6($v)){
			$ipv6[] = $v;
		}else{
			$ips[] = $v;
		}
	}
	
	$theme .= '
		<form method="post" action="">
			<table cellpadding="8" cellspacing="1" border="0" width="100%" class="divroundshad">
				<tr>
					<td colspan="2"><div class="roundheader">IPs</div></td>
				</tr>
				<tr>
					<td align="right">Select Primary IP : </td>
					<td>
						<select name="ips">';
						foreach($ips as $k => $v){
							$theme .= '<option value="'.$v.'"'.(($v == $_POST['ips']) ? 'selected="selected"' : '').'>'.$v.'</option>';
						}
						$theme .= '</select>
					</td>
				</tr>
				<tr>
					<td align="center" colspan="2">
						<input type="submit" value="Set Primary IP" name="reorderips" />
					</td>
				</tr>
			</table>
		</form><br />';
	
	return $theme;
	
}

function virtualizor_cloud_TestConnection($params){

	$host = $params["serverip"];
	if(empty($params["serverip"]) && !empty($params['serverhostname'])){
		$host = $params['serverhostname'];
	}

	$data = VirtCloud_Curl::call($host, $params['serverusername'], $params['serverpassword'], 'index.php?act=listvs');
			
	if(empty($data) || $data['act'] == 'login'){
		return array('error' => 'FAILED: Could not connect to Virtualizor. Please make sure that all Ports from 4081 to 4085 are open on your WHMCS Server or please check the server details entered are as displayed on Cloud Panel >> API Credentials');
	}else{
		return array('success' => true);
	}    
}

?>