<?php

//////////////////////////////////////////////////////////////
//===========================================================
// index_lang.php
//===========================================================
// SOFTACULOUS VIRTUALIZOR
// Version : 1.0
// Inspired by the DESIRE to be the BEST OF ALL
// ----------------------------------------------------------
// Started by: Alons
// Date:       8th Mar 2010
// Time:       23:00 hrs
// Site:       https://www.virtualizor.com/ (SOFTACULOUS VIRTUALIZOR)
// ----------------------------------------------------------
// Please Read the Terms of use at https://www.virtualizor.com
// ----------------------------------------------------------
//===========================================================
// (c)Softaculous Ltd.
//===========================================================
//////////////////////////////////////////////////////////////

$l['virt_openvz'] = 'OpenVZ';
$l['virt_xen'] = 'Xen';
$l['virt_xenhvm'] = 'Xen HVM';
$l['virt_kvm'] = 'KVM';
$l['virt_xcp'] = 'XCP';
$l['virt_xcphvm'] = 'XCP HVM';
$l['virt_lxc'] = 'LXC';
$l['virt_proxo'] = 'Proxmox OpenVz';
$l['virt_proxk'] = 'Proxmox QEMU';
$l['virt_proxl'] = 'Proxmox LXC';
$l['virt_vzk'] = 'Virtuozzo KVM';
$l['virt_vzo'] = 'Virtuozzo OpenVZ';

$l['user_data_error_t'] = 'User Data Error';
$l['user_data_error'] = 'The Panel was unable to load your account information. Please report this to the server administrator!';

$l['no_license'] = 'The LICENSE file could not be found! Please report this to the server administrator.';

$l['today'] = '<b>Today</b> at ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Theme Error';//Title
$l['init_theme_error'] = 'Unable to load the theme file - &soft-1;.';

$l['init_theme_func_error_t'] = 'Theme Function Error';//Title
$l['init_theme_func_error'] = 'Unable to load the theme function(s) of &soft-1;.';

$l['load_theme_settings_error'] = 'Unable to load the themes settings file.';


//Error Handle Function
$l['following_errors_occured'] = 'The following errors were found';

//Success Message Function
$l['following_message'] = 'The following message was returned';

//Major Error Function
$l['fatal_error'] = 'Fatal Error';
$l['following_fatal_error'] = 'The following error occured';

//Message Function
$l['soft_message'] = 'Message';
$l['following_soft_message'] = 'The following message was returned';

$l['err_user_head'] = 'Error';
$l['err_user'] = 'Could not determine the type of user';

//Update Softaculous
$l['getting_info'] = 'Requesting Information......';
$l['error_getting_latest'] = 'Could not get information......Abandoning';
$l['got_info'] = 'Got information';
$l['manual_mode'] = 'The new version of Softaculous requires manual attention......Abandoning';
$l['no_updates'] = 'Current Version is Latest Version......Continuing';
$l['fetch_upgrade'] = 'Fetching Upgrade......';
$l['error_fetch_upgrade'] = 'Could not fetch upgrade file......Abandoning';
$l['error_save_upgrade'] = 'Could not SAVE upgrade file......Abandoning';
$l['got_upgrade'] = 'Saved the Upgrade File';
$l['unzip_upgrade'] = 'Unzipping the files......';
$l['error_unzip_upgrade'] = 'Error unzipping......Abandoning';
$l['unzipped_upgrade'] = 'Unzipped Successfully';
$l['running_upgrade'] = 'Running Upgrade......';
$l['succ_upgrade'] = 'Completed';
$l['error_upgrade'] = 'The following errors occured while upgrading :';

//MySQL Errors
$l['err_selectmy'] = 'The MySQL Database could not be selected.';
$l['err_myconn'] = 'The MySQL Connection could not be established.';
$l['err_makequery'] = 'Could not make the query numbered';
$l['err_mynum'] = 'MySQL Error No';
$l['err_myerr'] = 'MySQL Error';

//hf_theme.php
$l['welcome'] = 'Welcome';
$l['logout'] = 'Logout';
$l['page_time'] = 'Page Created In';
$l['times_are'] = 'All times are GMT';
$l['time_is'] = 'The time now is';
$l['load_start'] = 'Starting';
$l['load_stop'] = 'Stopping';
$l['load_restart'] = 'Restarting';
$l['load_poweroff'] = 'Powering Off';

//The Category Language Variables
$l['dock_restart'] = 'Restart Container';
$l['dock_stop'] = 'Stop Container';
$l['dock_start'] = 'Start Container';
$l['dock_poweroff'] = 'Poweroff Container';
$l['dock_home'] = 'Home';
$l['dock_settings'] = 'Edit Settings';
$l['dock_help'] = 'Help and Support';
$l['dock_sync'] = 'Synchronize with other Auto Installers';
$l['go_home'] = 'Home';
$l['dock_user'] = 'User Profile';
$l['dock_password'] = 'Change Password';
$l['dock_vps'] = 'List Virtual Servers';

// Left Menu
$l['lm_file_mgr'] = 'File Manager';
$l['lm_res'] = 'Resources';
$l['lm_performance'] = 'Performance';
$l['lm_process'] = 'Processes';
$l['lm_service'] = 'Services';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC Password';
$l['lm_statusc'] = 'Status Logs';
$l['lm_res_a'] = 'System Alerts';
$l['lm_logs'] = 'Task Logs';
$l['lm_bandwidth'] = 'Bandwidth';
$l['lm_accountpass'] = 'Account Password';
$l['lm_changepass'] = 'Account Password';
$l['lm_controlpanel'] = 'Control Panel';
$l['lm_recipes'] = 'Recipes';
$l['lm_disk'] = 'Disk';
$l['lm_ostemp'] ='OS Re-install';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Logs';
$l['lm_ips'] = 'IPs';
$l['lm_backup'] = 'OpenVZ Backups'; 
$l['lm_hvmsettings'] = 'VPS Configuration';
$l['lm_apikey'] = 'API Credentials';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'Reverse DNS';
$l['lm_support'] = 'Support';
$l['lm_self_shutdown'] = 'Self Shut Down';
$l['lm_tasks'] = 'Tasks';
$l['lm_twofactauth'] = 'Security Settings';
$l['lm_backup2'] = 'Backups';
$l['lm_backupservers'] = 'Backup Servers';
$l['lm_sshkeys'] = 'SSH Keys';
$l['lm_installapps'] = 'Applications';
$l['lm_billing'] = 'Billing';

// Users left menu
$l['lm_vs'] = 'List VPS';
$l['lm_addvs'] = 'Launch Instance';
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Settings';
$l['lm_profile'] = 'My Profile';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'You are an Admin';
$l['lmapps'] = 'Applications';

// Page Jump Related :
$l['page_jump_title'] = 'Type the page to jump to';
$l['page_page'] = 'Page';
$l['page_of'] = 'of';
$l['page_go'] = 'Go';

// Create VPS related for Kernel
$l['build_no_vs'] = 'The VPS was not found in the Database';
$l['build_no_os'] = 'The OS Template was not found';
$l['build_no_ip'] = 'The Primary IP is missing for the VPS';
$l['build_no_os_iso'] = 'No OS Template or ISO file was found';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'You have booted into the wrong kernel - ';
$l['correct_kernel'] = 'Please reboot into the correct kernel.';
$l['kvm_module'] = 'The Linux-KVM module is not loaded.';
$l['kvm_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['temp_exists'] = 'The Template file already exists';
$l['temp_snap_err'] = 'The Snapshot could not be created and hence the template creation failed';
$l['wrong_xm'] = 'The XEN module is not loaded correctly';
$l['lxc_module'] = 'LXC is not installed.';

// Xen VPS Creation errors
$l['xen_err_lvm'] = 'There was an error creating the LVM of the VPS';
$l['xen_err_swap'] = 'There was an error in creating the SWAP of the VPS';
$l['xen_err_tmp'] = 'The was an error in creating the Mount Point';
$l['xen_err_mount'] = 'There was an error in mounting the VPS LVM';
$l['xen_err_unmount'] = 'There was an error in unmounting the VPS LVM';
$l['xen_err_dd'] = 'There was an error while installing the VPS';
$l['xen_err_mkfs'] = 'There was an error while formatting the VPS';
$l['xen_err_mkswap'] = 'There was an error while formatting the SWAP of the VPS';
$l['xen_err_untar'] = 'There was an error while extracting the OS template';
$l['xen_err_part'] = 'There was an error while creating the disk partition(s)';
$l['xen_err_kpart'] = 'There was an error while mapping the partition(s)';
$l['xen_err_resizefs'] = 'There was an error while resizing the filesystem';

// XCP VPS Creation errors
$l['xcp_err_vdi'] = 'There was an error while creating the VDI of the VM';
$l['xcp_err_iso'] = 'There was an error while loading the ISO';
$l['xcp_err_vif'] = 'There was an error while creating VIF for the VPS';
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM VPS Creation errors
$l['kvm_err_lvm'] = 'There was an error creating the LVM of the VPS';
$l['kvm_err_mount'] = 'There was an error in mounting the VPS LVM';
$l['kvm_err_unmount'] = 'There was an error in unmounting the VPS LVM';
$l['kvm_err_dd'] = 'There was an error while installing the VPS';
$l['kvm_err_resizefs'] = 'There was an error while resizing the filesystem'	;
$l['kvm_err_part'] = 'There was an error while creating the disk partition(s)';
$l['kvm_err_kpart'] = 'There was an error while mapping the partition(s)';
$l['kvm_err_mkswap'] = 'There was an error while formatting the SWAP of the VPS';
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC VPS Creation errors
$l['lxc_err_untar'] = 'There was an error while extracting the OS template';
$l['lxc_err_unmount'] = 'There was an error in unmounting the VPS LVM';
$l['lxc_err_resizefs'] = 'There was an error while resizing the filesystem';
$l['lxc_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['lxc_err_mount'] = 'There was an error in mounting the VPS LVM';

// Virtuozzo VPS Creation errors
$l['virtuzo_create_error'] = 'There was an error while creating the VPS';
$l['err_vncpass'] = 'There was an error in setting the VNC Password';
$l['err_set_iso'] = 'There was an in attaching the ISO to the VPS';
$l['err_disk_create'] = 'There was an error while creating the VPS disk';
$l['err_set_boot_order'] = 'There was an error while setting the boot order';
$l['err_set_ram'] = 'There was an error while setting the RAM';
$l['err_set_pinning'] = 'There was an error while setting the CPU Affinity';
$l['err_install_tools'] = 'There was an error while installing the guest tools';

//Backup errors
$l['backup_err_mount'] = 'There was an error in mounting the LVM for temporary storage';
$l['backup_err_lvm'] = 'There was an error creating the LVM of the for temporary storage.';
$l['backup_err_mkfs'] = 'There was an error while formatting the temporary storage';
$l['backup_err_mkdir'] = 'There was an error while creating the temporary storage mount point directory';
$l['kvm_err_tar'] = 'There was an error while compressing the archive';
$l['xen_err_tar'] = 'There was an error while compressing the archive';
$l['kvm_err_untar'] = 'There was an error while uncompressing the archive';
$l['backup_err_untar'] = 'There was an error while uncompressing the archive';
$l['err_vzdump'] = 'There was an error with the backup tool';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Failed to create the backup image, Return code: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = 'VPS UUID is empty!';

// OpenVZ VPS Creation errors
$l['openvz_err_ubc'] = 'There was an error saving the UBC settings';
$l['openvz_err_ostemplate'] = 'There was an error setting the OS Template';
$l['openvz_err_space'] = 'There was an error setting the disk space';
$l['openvz_err_inodes'] = 'There was an error setting the disk space';
$l['openvz_err_hostname'] = 'There was an error setting the hostname';
$l['openvz_err_ip'] = 'There was an error setting the IP Address';
$l['openvz_err_dns'] = 'There was an error setting the DNS';
$l['openvz_err_cpu'] = 'There was an error setting the CPU units';
$l['openvz_err_cpulim'] =  'There was an error setting the CPU limit';
$l['openvz_err_cores'] = 'There was an error setting the CPU cores';
$l['openvz_err_ioprio'] = 'There was an error setting the IO Priority';
$l['openvz_err_create'] = 'There was an error creating the container';
$l['vswap_error'] = 'There was an error while setting the VSwap settings';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser VPS status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = 'Suspended';
$l['vps_is_suspended'] = 'This VPS is suspended. You cannot perform any operations for the VPS !';
$l['suspend_reason_bw'] = 'This VPS is suspended due to Bandwidth Over Usage. You cannot perform any operations for the VPS !';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Change will occur when the VPS is booted again.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'There was an error while resizing the Disks';
$l['mount_undetermined'] = 'No Linux Partition was found in the VPS';
$l['disk_destroy_err'] = 'There was an error while destroying the Disks';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'There was an error while trying to edit the VPS';
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your VPS {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The VPS has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';
$l['bandwidth_mail_sub'] = 'VPS Suspended due to Bandwidth Overuse';
$l['bandwidth_mail_message'] = 'Hi,

Your VPS `{{hostname}}` has been suspended because it has overused its assigned bandwidth limit.

The VPS has used {{used_gb}} GB of bandwidth but it was allowed only {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['speed_capped_mail_sub'] = 'VPS network speed capped due to bandwidth overuse';
$l['speed_capped_mail_message'] = 'Hi,

The network speed of your VPS {{hostname}} has been capped because it has reached its assigned bandwidth limit.

The VPS has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.

Regards,
{{sn}}';

$l['removed_speed_capped_mail_sub'] = 'VPS network speed has been restored';
$l['removed_speed_capped_mail_message'] = 'Hi,

The network speed of your VPS {{hostname}} has been restored.

The VPS has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.

Regards,
{{sn}}';

// Power cron Notification
$l['self_shutdown_sub'] = 'VPS {{action}}';
$l['self_shutdown_body'] = 'Hi

Your Vps {{vpsid}} has been {{action}} as per the time you had set ({{time}})
';

$l['self_shutdown_start'] = 'Started';
$l['self_shutdown_stop'] = 'Shutdown';
$l['self_shutdown_restart'] = 'restarted';
$l['self_shutdown_poweroff'] = 'Powered Off';

$l['self_shutdown_start_failed'] = 'Failed to Start';
$l['self_shutdown_stop_failed'] = 'Failed to Shutdown';
$l['self_shutdown_restart_failed'] = 'Failed to Restart';
$l['self_shutdown_poweroff_failed'] = 'Failed to Power Off';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'Failed to make proxmox api call. Please enter proxmox details at Configuration --> Slave Settings';

// Speed cap messages and label:
$l['speed_cap_down']= 'Capped Download Speed ';
$l['exp_speed_cap_down'] = 'Download speed after the bandwidth is overused for a VPS, 0 or emtpy value indicates no capping';
$l['speed_cap_up']= 'Capped Upload Speed ';
$l['exp_speed_cap_up'] = 'Upload speed after the bandwidth is overused for a VPS, 0 or emtpy value indicates no capping';

// ISO Related
$l['admin_iso'] = 'Admin ISOs';
$l['eu_iso'] = 'Enduser ISOs';

$l['enable_billing'] = 'The Billing setting is disabled. Please enable that first from the <a href="'.$globals['index'].'act=billing">Billing Settings</a>.';

// Webuzo Script Categories
$l['cat_php_forums'] = 'Forums';
$l['cat_php_blogs'] = 'Blogs';
$l['cat_php_cms'] = 'Portals/CMS';
$l['cat_php_galleries'] = 'Image Galleries';
$l['cat_php_wikis'] = 'Wikis';
$l['cat_php_admanager'] = 'Ad Management';
$l['cat_php_calendars'] = 'Calendars';
$l['cat_php_games'] = 'Gaming';
$l['cat_php_mail'] = 'Mails';
$l['cat_php_polls'] = 'Polls and Surveys';
$l['cat_php_projectman'] = 'Project Management';
$l['cat_php_ecommerce'] = 'E-Commerce';
$l['cat_php_guestbooks'] = 'Guest Books';
$l['cat_php_customersupport'] = 'Customer Support';
$l['cat_php_others'] = 'Others';
$l['cat_php_music'] = 'Music';
$l['cat_php_video'] = 'Video';
$l['cat_php_rss'] = 'RSS';
$l['cat_php_socialnetworking'] = 'Social Networking';
$l['cat_php_microblogs'] = 'Micro Blogs';
$l['cat_php_frameworks'] = 'Frameworks';
$l['cat_php_educational'] = 'Educational';
$l['cat_php_erp'] = 'ERP';
$l['cat_php_dbtools'] = 'DB Tools';
$l['cat_php_files'] = 'File Management';

$l['inv_winpass_chars'] = 'Allowed special characters for windows vps root password are :';
$l['invalid_transaction'] = 'Transaction Failed/Invalid. Please try again';
$l['success'] = 'success';
$l['failed'] = 'failed';
