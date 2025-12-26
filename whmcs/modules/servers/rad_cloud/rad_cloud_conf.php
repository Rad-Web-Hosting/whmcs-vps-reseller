<?php

global $rad_cloud_conf;

// Configurable Options
$rad_cloud_conf['fields']['ips'] = 'Number of IPs';
$rad_cloud_conf['fields']['ips6'] = 'Number of IPv6 Address';
$rad_cloud_conf['fields']['ips6_subnet'] = 'Number of IPv6 Subnet';
$rad_cloud_conf['fields']['ips_int'] = 'Number of Internal IP Address';
$rad_cloud_conf['fields']['space'] = 'Space';
$rad_cloud_conf['fields']['ram'] = 'RAM';
$rad_cloud_conf['fields']['bandwidth'] = 'Bandwidth';
$rad_cloud_conf['fields']['cores'] = 'CPU Cores';
$rad_cloud_conf['fields']['network_speed'] = 'Network Speed';
$rad_cloud_conf['fields']['OS'] = 'Operating System';
$rad_cloud_conf['fields']['ctrlpanel'] = 'Control Panel';
$rad_cloud_conf['fields']['slave_server'] = 'Server';
$rad_cloud_conf['fields']['server_group'] = 'Region';
$rad_cloud_conf['fields']['cpu_percent'] = 'CPU Percent';
$rad_cloud_conf['fields']['total_iops_sec'] = 'Total I/Os per sec';
$rad_cloud_conf['fields']['read_bytes_sec'] = 'Read Mega Bytes/s';
$rad_cloud_conf['fields']['write_bytes_sec'] = 'Write Mega Bytes/s';
$rad_cloud_conf['fields']['upload_speed'] = 'Upload Speed (KB)';

// Control Panel API Keys
$rad_cloud_conf['cp']['buy_cpanel_login'] = '';
$rad_cloud_conf['cp']['buy_cpanel_apikey'] = '';

// Node Selection Algo
$rad_cloud_conf['node_ram_select'] = 0;

// Enable/Disable Display Enduser Operations.
// Disable = 0
// Enable = 1
$rad_cloud_conf['client_ui']['control_panel_install'] = 1;
$rad_cloud_conf['client_ui']['os_reinstall'] = 1;
$rad_cloud_conf['client_ui']['backups'] = 1;
$rad_cloud_conf['client_ui']['hostname'] = 1;
$rad_cloud_conf['client_ui']['novnc'] = 1;
$rad_cloud_conf['client_ui']['openvz_ram_graph_hide'] = 0;

// VM Termination
// Disable = 1
// Enable = 0
$rad_cloud_conf['admin_ui']['disable_terminate'] = 0;

//Preserve Information about the VS
// No = 0 (Default)
// Yes = 1
$rad_cloud_conf['admin_ui']['preserve_info'] = 0;

// Log Level
$rad_cloud_conf['loglevel'] = 0;

$rad_cloud_conf['client_ui']['direct_login'] = 0;

$rad_cloud_conf['client_ui']['disable_sso'] = 0;

// Custom VPS Hostname Control
// If enabled, VPS Hostname will be generated as the text you define here e.g. 
// If you set the value vps{ID}-{RAND3} then the VPS Hostname will be vps31-xsg
$rad_cloud_conf['vps_control']['custom_hname'] = '';

// Load as per old module
$rad_cloud_conf['no_virt_plans'] = 0;

// Custom language set by the clients
// Value must be the matched by the individual language folder in the module
$rad_cloud_conf['default_language'] = '';

// Set the alias for VPS 
$rad_cloud_conf['vm_short'] = '';

// Set the alias for VPS server
$rad_cloud_conf['vm_long'] = '';

?>