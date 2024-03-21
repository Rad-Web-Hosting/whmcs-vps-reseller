<?php

//////////////////////////////////////////////////////////////
//===========================================================
// softaculous_extra.php
//===========================================================
// SOFTACULOUS 
// Version : 1.1
// Inspired by the DESIRE to be the BEST OF ALL
// ----------------------------------------------------------
// Started by: Alons
// Date:       10th Jan 2009
// Time:       21:00 hrs
// Site:       http://www.softaculous.com/ (SOFTACULOUS)
// ----------------------------------------------------------
// Please Read the Terms of use at http://www.softaculous.com
// ----------------------------------------------------------
//===========================================================
// (c)Softaculous Inc.
//===========================================================
//////////////////////////////////////////////////////////////

global $rad_conf;


// If You want to give custom names to the Custom Fields
// Uncomment the fields and change the values as per the discription on the wiki : http://virtualizor.com/wiki/WHMCS_Module


// Configurable Options
$rad_conf['fields']['ips'] = 'Number of IPs';
$rad_conf['fields']['ips6'] = 'Number of IPv6 Address';
$rad_conf['fields']['ips6_subnet'] = 'Number of IPv6 Subnet';
$rad_conf['fields']['ips_int'] = 'Number of Internal IP Address';
$rad_conf['fields']['space'] = 'Space';
$rad_conf['fields']['ram'] = 'RAM';
$rad_conf['fields']['bandwidth'] = 'Bandwidth';
$rad_conf['fields']['cores'] = 'CPU Cores';
$rad_conf['fields']['network_speed'] = 'Network Speed (KB)';
$rad_conf['fields']['OS'] = 'Operating System';
$rad_conf['fields']['ctrlpanel'] = 'Control Panel';
$rad_conf['fields']['slave_server'] = 'Server';
$rad_conf['fields']['server_group'] = 'Region';
$rad_conf['fields']['cpu_percent'] = 'CPU Percent';
$rad_conf['fields']['total_iops_sec'] = 'Total I/Os per sec';
$rad_conf['fields']['read_bytes_sec'] = 'Read Mega Bytes/s';
$rad_conf['fields']['write_bytes_sec'] = 'Write Mega Bytes/s';
$rad_conf['fields']['upload_speed'] = 'Upload Speed (KB)';

// Control Panel API Keys
$rad_conf['cp']['buy_cpanel_login'] = '';
$rad_conf['cp']['buy_cpanel_apikey'] = '';

// Node Selection Algo
$rad_conf['node_ram_select'] = 0;

// Enable/Disable Display Enduser Operations.
// Disable = 0
// Enable = 1
$rad_conf['client_ui']['control_panel_install'] = 1;
$rad_conf['client_ui']['os_reinstall'] = 1;
$rad_conf['client_ui']['backups'] = 1;
$rad_conf['client_ui']['hostname'] = 1;
$rad_conf['client_ui']['novnc'] = 1;
$rad_conf['client_ui']['openvz_ram_graph_hide'] = 0;

// VM Termination
// Disable = 1
// Enable = 0
$rad_conf['admin_ui']['disable_terminate'] = 0;

//Preserve Information about the VS
// No = 0 (Default)
// Yes = 1
$rad_conf['admin_ui']['preserve_info'] = 0;

// Log Level
$rad_conf['loglevel'] = 0;

$rad_conf['client_ui']['direct_login'] = 0;

$rad_conf['client_ui']['disable_sso'] = 0;

// Custom VPS Hostname Control
// If enabled, VPS Hostname will be generated as the text you define here e.g. 
// If you set the value vps{ID}-{RAND3} then the VPS Hostname will be vps31-xsg
$rad_conf['vps_control']['custom_hname'] = '';

// Load as per old module
$rad_conf['no_virt_plans'] = 0;

// Custom language set by the clients
// Value must be the matched by the individual language folder in the module
$rad_conf['default_language'] = '';

// Set the alias for VPS 
$rad_conf['vm_short'] = '';

// Set the alias for VPS server
$rad_conf['vm_long'] = '';

?>