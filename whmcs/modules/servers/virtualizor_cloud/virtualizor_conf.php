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

global $virtualizor_conf;


// If You want to give custom names to the Custom Fields
// Uncomment the fields and change the values as per the discription on the wiki : http://virtualizor.com/wiki/WHMCS_Module


// Configurable Options
$virtualizor_conf['fields']['ips'] = 'Number of IPs';
$virtualizor_conf['fields']['ips6'] = 'Number of IPv6 Address';
$virtualizor_conf['fields']['ips6_subnet'] = 'Number of IPv6 Subnet';
$virtualizor_conf['fields']['ips_int'] = 'Number of Internal IP Address';
$virtualizor_conf['fields']['space'] = 'Space';
$virtualizor_conf['fields']['ram'] = 'RAM';
$virtualizor_conf['fields']['bandwidth'] = 'Bandwidth';
$virtualizor_conf['fields']['cores'] = 'CPU Cores';
$virtualizor_conf['fields']['network_speed'] = 'Network Speed';
$virtualizor_conf['fields']['OS'] = 'Operating System';
$virtualizor_conf['fields']['ctrlpanel'] = 'Control Panel';
$virtualizor_conf['fields']['slave_server'] = 'Server';
$virtualizor_conf['fields']['server_group'] = 'Region';
$virtualizor_conf['fields']['cpu_percent'] = 'CPU Percent';
$virtualizor_conf['fields']['total_iops_sec'] = 'Total I/Os per sec';
$virtualizor_conf['fields']['read_bytes_sec'] = 'Read Mega Bytes/s';
$virtualizor_conf['fields']['write_bytes_sec'] = 'Write Mega Bytes/s';

// Control Panel API Keys - Deprecated
// $virtualizor_conf['cp']['buy_cpanel_login'] = '';
// $virtualizor_conf['cp']['buy_cpanel_apikey'] = '';

// Node Selection Algo
$virtualizor_conf['node_ram_select'] = 0;

// Enable/Disable Display Enduser Operations.
// Disable = 0
// Enable = 1
$virtualizor_conf['client_ui']['control_panel_install'] = 1;
$virtualizor_conf['client_ui']['os_reinstall'] = 1;
$virtualizor_conf['client_ui']['backups'] = 1;
$virtualizor_conf['client_ui']['hostname'] = 1;
$virtualizor_conf['client_ui']['novnc'] = 1;
$virtualizor_conf['client_ui']['openvz_ram_graph_hide'] = 0;

// VM Termination
// Disable = 1
// Enable = 0
$virtualizor_conf['admin_ui']['disable_terminate'] = 0;

//Preserve Information about the VS
// No = 0 (Default)
// Yes = 1
$virtualizor_conf['admin_ui']['preserve_info'] = 0;

// Log Level
$virtualizor_conf['loglevel'] = 0;

$virtualizor_conf['client_ui']['direct_login'] = 0;

$virtualizor_conf['client_ui']['disable_sso'] = 0;

// Custom VPS Hostname Control
// If enabled, VPS Hostname will be generated as the text you define here e.g. 
// If you set the value vps{ID}-{RAND3} then the VPS Hostname will be vps31-xsg
$virtualizor_conf['vps_control']['custom_hname'] = '';

// Load as per old module
$virtualizor_conf['no_virt_plans'] = 0;

?>