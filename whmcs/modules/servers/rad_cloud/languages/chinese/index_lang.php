<?php

$l['privacy_policy'] = '隐私政策';
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

$l['err_locked_vps'] = VM_SHORT.' is locked, hence no actions are allowed to perform';
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
$l['following_errors_occured'] = '发生了以下错误';

//Success Message Function
$l['following_message'] = '返回了以下信息';

//Major Error Function
$l['fatal_error'] = 'Fatal Error';
$l['following_fatal_error'] = '发生了以下致命错误';

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
$l['logout'] = '退出';
$l['page_time'] = 'Page Created In';
$l['times_are'] = '显示时间均为 GMT 格式';
$l['time_is'] = '现在时间是';
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
$l['dock_vps'] = 'List '.VM_LONG;

// Left Menu
$l['lm_file_mgr'] = 'File Manager';
$l['lm_res'] = 'Resources';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = '进程';
$l['lm_service'] = '服务';
$l['lm_firewall'] = '防火墙';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC Password';
$l['lm_statusc'] = '状态日志';
$l['lm_res_a'] = '系统警告';
$l['lm_logs'] = '操作日志';
$l['lm_bandwidth'] = 'Bandwidth';
$l['lm_accountpass'] = '账号密码';
$l['lm_changepass'] = '账号密码';
$l['lm_controlpanel'] = 'Control Panel';
$l['lm_recipes'] = 'Recipes';
$l['lm_disk'] = '磁盘';
$l['lm_ostemp'] ='OS Re-install';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = '内存';
$l['lm_host'] = '主机名';
$l['lm_logs'] = '日志';
$l['lm_ips'] = 'IP地址';
$l['lm_hvmsettings'] = VM_SHORT.' 配置';
$l['lm_apikey'] = 'API 凭据';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = '反向 DNS';
$l['lm_support'] = '支持';
$l['lm_self_shutdown'] = '自动任务';
$l['lm_tasks'] = '任务';
$l['lm_twofactauth'] = 'Security Settings';
$l['lm_backup2'] = '备份';
$l['lm_backupservers'] = 'Backup Servers';
$l['lm_sshkeys'] = 'SSH 密匙';
$l['lm_installapps'] = '应用';
$l['lm_billing'] = 'Billing';
$l['lm_volume'] = 'Volumes';
$l['lm_server_aio'] = 'Resources Monitor';

// Users left menu
$l['lm_vs'] = ''.VM_SHORT.' 列表';
$l['lm_addvs'] = 'Launch '.VM_SHORT;
$l['lm_resources'] = '云资源';
$l['lm_users'] = '用户';
$l['lm_usr_settings'] = '设置';
$l['lm_profile'] = '我的资料';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = '你是管理员';
$l['lmapps'] = '应用程序';

// Page Jump Related :
$l['page_jump_title'] = 'Type the page to jump to';
$l['page_page'] = 'Page';
$l['page_of'] = 'of';
$l['page_go'] = 'GO';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = 'The '.VM_SHORT.' was not found in the Database';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'The OS Template was not found';
$l['build_no_ip'] = 'The Primary IP is missing for the '.VM_SHORT;
$l['build_no_os_iso'] = 'No OS Template or ISO file was found';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'You have booted into the wrong kernel - ';
$l['correct_kernel'] = 'Please reboot into the correct kernel.';
$l['kvm_module'] = 'The Linux-KVM module is not loaded.';
$l['kvm_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['temp_exists'] = 'The Template file already exists';
$l['temp_snap_err'] = 'The Snapshot could not be created and hence the template creation failed. The snapshot creation generally fails because of less space';
$l['wrong_xm'] = 'The XEN module is not loaded correctly';
$l['lxc_module'] = 'LXC is not installed.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'There was an error creating the LVM of the '.VM_SHORT;
$l['xen_err_swap'] = 'There was an error in creating the SWAP of the '.VM_SHORT;
$l['xen_err_tmp'] = 'The was an error in creating the Mount Point';
$l['xen_err_mount'] = 'There was an error in mounting the '.VM_SHORT.' storage';
$l['xen_err_unmount'] = 'There was an error in unmounting the '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'There was an error during the disk copy operation';
$l['xen_err_mkfs'] = 'There was an error while formatting the '.VM_SHORT;
$l['xen_err_mkswap'] = 'There was an error while formatting the SWAP of the '.VM_SHORT;
$l['xen_err_untar'] = 'There was an error while extracting the OS template';
$l['xen_err_part'] = 'There was an error while creating the disk partition(s)';
$l['xen_err_kpart'] = 'There was an error while mapping the partition(s)';
$l['xen_err_resizefs'] = 'There was an error while resizing the filesystem';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = 'There was an error while creating the VDI of the '.VM_SHORT;
$l['xcp_err_iso'] = 'There was an error while loading the ISO';
$l['xcp_err_vif'] = 'There was an error while creating VIF for the '.VM_SHORT;
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = 'There was an error creating the LVM of the '.VM_SHORT;
$l['kvm_err_mount'] = 'There was an error in mounting the '.VM_SHORT.' storage';
$l['kvm_err_unmount'] = 'There was an error in unmounting the '.VM_SHORT.' LVM';
$l['kvm_err_dd'] = 'There was an error during the disk copy operation';
$l['kvm_err_resizefs'] = 'There was an error while resizing the filesystem'	;
$l['kvm_err_part'] = 'There was an error while creating the disk partition(s)';
$l['kvm_err_kpart'] = 'There was an error while mapping the partition(s)';
$l['kvm_err_mkswap'] = 'There was an error while formatting the SWAP of the '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';
$l['kvm_err_lightbit'] = 'There was an error creating the lightbit disk of the '.VM_SHORT;
$l['kvm_err_lightbit_acl'] = 'There was error while getting acl for lightbit';
$l['kvm_err_lightbit_proj'] = 'The lightbit project does not exists on node';
$l['kvm_err_lightbit_storage'] = 'The storage does not exists';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'There was an error while extracting the OS template';
$l['lxc_err_unmount'] = 'There was an error in unmounting the '.VM_SHORT.' LVM';
$l['lxc_err_resizefs'] = 'There was an error while resizing the filesystem';
$l['lxc_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['lxc_err_mount'] = 'There was an error in mounting the '.VM_SHORT.' storage';

// Virtuozzo '.VM_SHORT.' Creation errors
$l['virtuzo_create_error'] = 'There was an error while creating the '.VM_SHORT;
$l['err_vncpass'] = 'There was an error in setting the VNC Password';
$l['err_set_iso'] = 'There was an in attaching the ISO to the '.VM_SHORT;
$l['err_disk_create'] = 'There was an error while creating the '.VM_SHORT.' disk';
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
$l['vps_uuid_empty'] = VM_SHORT.' UUID is empty!';

// OpenVZ '.VM_SHORT.' Creation errors
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
$l['openvz_err_uefi'] =  'There was an error setting UEFI Boot';
$l['openvz_err_bios'] =  'There was an error setting BIOS Boot';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = '被暂停';
$l['vps_is_suspended'] = 'This '.VM_SHORT.' is suspended. You cannot perform any operations for the '.VM_SHORT.' !';
$l['suspend_reason_bw'] = 'This '.VM_SHORT.' is suspended due to Bandwidth Over Usage. You cannot perform any operations for the '.VM_SHORT.' !';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Change will occur when the '.VM_SHORT.' is booted again.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'There was an error while resizing the Disks';
$l['mount_undetermined'] = 'No Linux Partition was found in the '.VM_SHORT;
$l['disk_destroy_err'] = 'There was an error while destroying the Disks';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'There was an error while trying to edit the '.VM_SHORT;
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your '.VM_SHORT.' {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';
$l['bandwidth_mail_sub'] = VM_SHORT.' Suspended due to Bandwidth Overuse';
$l['bandwidth_mail_message'] = 'Hi,

Your '.VM_SHORT.' `{{hostname}}` has been suspended because it has overused its assigned bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth but it was allowed only {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['temp_vps_net_speed_capped'] = VM_SHORT.' Network Speed Capped';
$l['temp_vps_net_speed_capped_restore'] = VM_SHORT.' Network Speed Restored';
$l['speed_capped_mail_sub'] = VM_SHORT.' network speed capped due to bandwidth overuse';
$l['speed_capped_mail_message'] = 'Hi,

The network speed of your '.VM_SHORT.' {{hostname}} has been capped because it has reached its assigned bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.

Regards,
{{sn}}';

$l['removed_speed_capped_mail_sub'] = VM_SHORT.' network speed has been restored';
$l['removed_speed_capped_mail_message'] = 'Hi,

The network speed of your '.VM_SHORT.' {{hostname}} has been restored.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.

Regards,
{{sn}}';

// Power cron Notification
$l['self_shutdown_sub'] = VM_SHORT.' {{action}}';
$l['self_shutdown_body'] = 'Hi

Your '.VM_SHORT.' {{vpsid}} has been {{action}} as per the time you had set ({{time}})
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
$l['exp_speed_cap_down'] = 'Download speed after the bandwidth is overused for a '.VM_SHORT.', 0 or emtpy value indicates no capping';
$l['speed_cap_up']= 'Capped Upload Speed ';
$l['exp_speed_cap_up'] = 'Upload speed after the bandwidth is overused for a '.VM_SHORT.'.<br /> If '.VM_SHORT.' upload speed -1 then  Capped upload speed will be same as <b>Capped Download Speed</b><br />0 or emtpy value indicates no capping';

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

$l['inv_winpass_chars'] = 'Allowed special characters for windows '.VM_SHORT.' root password are :';
$l['invalid_transaction'] = 'Transaction Failed/Invalid. Please try again';
$l['success'] = 'success';
$l['failed'] = 'failed';

// For universal search
$l['unisear_hdr_res'] = 'Search Results';
$l['unisear_no_res'] = 'No search results!';
$l['unisear_placeholder'] = 'Search '.VM_SHORT.', User, IPs';
$l['unisear_show_all'] = 'Show all';
$l['unisear_res'] = 'results >>';
$l['unisear_matched'] = 'Matched';
$l['unisear_in'] = 'in';
$l['unisear_for'] = 'for';
$l['unisear_list'] = '列表';
$l['unisear_vps'] = VM_SHORT;
$l['unisear_user'] = 'User';
$l['unisear_ips'] = 'IP';
$l['unisear_vps_name'] = VM_SHORT.' name';
$l['unisear_vpsid'] = VM_SHORT.' ID';
$l['unisear_hostname'] = '主机名';
$l['unisear_server'] = 'Server';
$l['unisear_virt'] = 'Virt type';
$l['unisear_os_name'] = 'OS name';
$l['unisear_iso'] = 'ISO';
$l['unisear_free_ips'] = 'IP (free)';
$l['unisear_storage'] = 'Storage';
$l['unisear_st_uuid'] = 'UUID';
$l['unisear_st_name'] = 'Name';

//Tun Tap Handle
$l['tuntap_handle'] = 'Tun/Tap Handle';
$l['enable_tuntap'] = 'Enabling Tun/Tap';
$l['disable_tuntap'] = 'Disabling Tun/Tap';

$l['add_ssh_key'] = 'Add SSH key';
$l['add_ssh_key_exp'] = 'Add public key in '.VM_SHORT.'.<br>NOTE : This key will not be saved.';
$l['sshkey_setting'] = 'SSH Key Settings';
$l['disable_password'] = 'Disable password authentication';
$l['disable_password_exp'] = 'If enabled then password authentication will be restricted for SSH.';
$l['recreate_keys'] = 'Recreate SSH Keys';
$l['recreate_keys_exp'] = 'If enabled then password authentication will be restricted for SSH and will generate a pair of SSH keys or if <b>Disable password authentication</b> is already enabled in '.VM_SHORT.' then old keys will be replaced with the new one';
$l['sel_ssh_key'] = '选择SSH密匙';
$l['err_inv_ssh_key'] = 'The public key you specified is invalid';
$l['generate_keys'] = 'Generate SSH Keys';
$l['add_ssh_keys'] = 'Add SSH Keys';
$l['use_ssh_keys'] = 'Use Existing Keys';
$l['no_ssh_keys'] = 'No SSH keys found!';
$l['no_ssh_option'] = 'Please Select one SSH option';
$l['no_key_provided'] = 'Please provide SSH key';

//disable panel
$l['panel_message'] = 'Panel access is disabled by administrator';
$l['panel_subject'] = 'Panel is disabled';
//notification languages
$l['bandwidth_threshold_notify'] = VM_SHORT.' {{hostname}} ({{vpsid}}) has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB.<br>';
$l['bandwidth_mail_message_notify'] = 'Your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been suspended because it has overused its assigned bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth but it was allowed only {{limit_gb}} GB.<br>';
$l['speed_capped_mail_message_notify'] = 'The network speed of your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been capped because it has reached its assigned bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.<br>';
$l['removed_speed_capped_mail_notify'] = 'The network speed of your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been restored.';

$l['server_ram_threshold'] = 'RAM threshold level reached';
$l['server_disk_threshold'] = 'Disk threshold level reached';
$l['server_locked_warn'] = 'Server locked due to overusage';
$l['vm_locked_backup'] = VM_SHORT.' backup is running';
$l['vm_locked_restore'] = VM_SHORT.' restore is running';

$l['reinstall_callback'] = 'Callback for Reinstall';
$l['no_notification'] = 'No Notifications Yet!';
$l['clear_all_notification'] = 'Clear All';
$l['dbbackup_error'] = 'Could not take backup of database!';
$l['notifications'] = 'Notifications';
$l['no_timezone'] = 'None';
$l['invalid_new_disk'] = 'Invalid Disk Found';
$l['hotplug_vol_no'] = 'Hotplug is not supported';

//API languages commit
// show api logs
$l['no_info'] = '未找到 API 日志！';
$l['api_key'] = 'API 密钥';
$l['api_val'] = 'API 密码';
$l['api_id'] = 'API ID';
$l['api_actions'] = '动作';
$l['taskid'] = '任务ID';
$l['uid'] = '用户邮箱';
$l['from_ip'] = '来源IP';
$l['time'] = '时间';
$l['data'] = '额外信息';
$l['search_id'] = 'VPS ID';
$l['action_create'] = '创建 API';
$l['action_delete'] = '删除 API';
$l['action_edit'] = '编辑 API';
$l['state_true'] = '成功';
$l['state_false'] = '失败';
$l['action'] = '动作';
$l['status'] = '状态';
$l['submit'] = '提交';
$l['src_ip'] = '来源IP';
$l['act_new_api'] = '创建新的 API 对';
$l['act_edit_api'] = '执行编辑 API';
$l['act_delete_api'] = '已删除 API 对';
$l['act_cat_vs'] = VM_LONG;
$l['act_cat_ippools'] = 'IP Pools';
$l['act_cat_servers'] = 'Servers and Server Groups';
$l['act_cat_storage'] = 'Storages';
$l['act_cat_backups'] = 'Server and ' . VM_SHORT . ' Backups';
$l['act_cat_plans'] = 'Plans';
$l['act_cat_users'] = 'Users';
$l['act_cat_media'] = 'Media and Media Groups';
$l['act_cat_config'] = 'Configuration';
$l['act_cat_pdns'] = 'PowerDNS';
$l['act_cat_procs'] = 'Process and Services';
$l['act_cat_logs'] = 'Logs';
$l['act_cat_haproxy'] = 'Domain Forwarding';
$l['act_cluster_statistics'] = 'View Cluster Statistics';
$l['act_server_statistics'] = 'View Server Statistics';
$l['act_vs'] = 'List ' . VM_LONG;
$l['act_vsresources'] = 'View ' . VM_SHORT . ' Resources';
$l['act_addvs'] = 'Add ' . VM_LONG;
$l['act_rebuildvs'] = 'Rebuild ' . VM_LONG;
$l['act_editvs'] = 'Edit ' . VM_LONG;
$l['act_deletevs'] = 'Delete ' . VM_LONG;
$l['act_startvs'] = 'Start ' . VM_LONG;
$l['act_stopvs'] = 'Stop ' . VM_LONG;
$l['act_restartvs'] = 'Restart ' . VM_LONG;
$l['act_poweroffvs'] = 'Poweroff ' . VM_LONG;
$l['act_suspendvs'] = 'Suspend ' . VM_LONG;
$l['act_unsuspendvs'] = 'Unsuspend ' . VM_LONG;
$l['act_vnc'] = VM_LONG . '. VNC';
$l['act_migrate'] = 'Migrate ' . VM_LONG;
$l['act_ippool'] = 'View IP Pools';
$l['act_addippool'] = 'Add IP Pool';
$l['act_editippool'] = 'Edit IP Pool';
$l['act_deleteippool'] = 'Delete IP Pool';
$l['act_ips'] = 'View IPs';
$l['act_addips'] = 'Add IPs';
$l['act_editips'] = 'Edit IPs';
$l['act_deleteips'] = 'Delete IPs';
$l['act_servers'] = 'View Servers';
$l['act_addserver'] = 'Add Server';
$l['act_editserver'] = 'Edit Server';
$l['act_deleteserver'] = 'Delete Server';
$l['act_sg'] = 'View Server Groups';
$l['act_addsg'] = 'Add Server Group';
$l['act_editsg'] = 'Edit Server Group';
$l['act_deletesg'] = 'Delete Server Group';
$l['act_rebootserver'] = 'Reboot Server';
$l['act_manageserver'] = 'Manage Server';
$l['act_terminal'] = 'Terminal';
$l['act_storage'] = 'View Storages';
$l['act_addstorage'] = 'Add Storage';
$l['act_editstorage'] = 'Edit Storage';
$l['act_deletestorage'] = 'Delete Storage';
$l['act_databackup'] = 'View DB Backups';
$l['act_performdatabackup'] = 'Perform DB Backups';
$l['act_dldatabackup'] = 'Download DB Backups';
$l['act_deletedatabackup'] = 'Delete DB Backups';
$l['act_vpsbackupsettings'] = 'Edit ' . VM_SHORT . ' Backup Settings';
$l['act_vpsbackups'] = 'View ' . VM_SHORT . ' Backups';
$l['act_restorevpsbackup'] = 'Restore ' . VM_SHORT . ' Backups';
$l['act_deletevpsbackup'] = 'Delete ' . VM_SHORT . ' Backups';
$l['act_backupservers'] = 'View Backup Servers';
$l['act_addbackupserver'] = 'Add Backup Server';
$l['act_editbackupservsers'] = 'Edit Backup Server';
$l['act_deletebackupserver'] = 'Delete Backup Server';
$l['act_plans'] = 'View Plans';
$l['act_addplan'] = 'Add Plan';
$l['act_editplan'] = 'Edit Plan';
$l['act_deleteplan'] = 'Delete Plan';
$l['act_dnsplans'] = 'View DNS Plans';
$l['act_adddnsplan'] = 'Add DNS Plan';
$l['act_editdnsplan'] = 'Edit DNS Plan';
$l['act_deletednsplan'] = 'Delete DNS Plan';
$l['act_add_dnsrecord'] = 'Add DNS Record';
$l['act_users'] = 'View Users';
$l['act_adduser'] = 'Add User';
$l['act_edituser'] = 'Edit User';
$l['act_deleteuser'] = 'Delete User';
$l['act_suspend_user'] = 'Suspend User';
$l['act_unsuspend_user'] = 'Unsuspend User';
$l['act_list_api'] = 'List API Credential';
$l['act_create_api'] = 'Create API Credential';
$l['act_api_credential_edit'] = 'Edit API Credential';
$l['act_show_api_log'] = 'API Logs';
$l['act_ostemplates'] = 'View Templates';
$l['act_os'] = 'View Template Browser';
$l['act_addtemplate'] = 'Add Templates';
$l['act_edittemplate'] = 'Edit templates';
$l['act_deletetemplate'] = 'Delete Templates';
$l['act_createtemplate'] = 'Create Templates';
$l['act_iso'] = 'View ISO List';
$l['act_addiso'] = 'Add ISOs';
$l['act_editiso'] = 'Edit ISOs';
$l['act_deleteiso'] = 'Delete ISOs';
$l['act_mg'] = 'View Media Groups';
$l['act_mediagroups'] = 'View Media Groups';
$l['act_admin_acl'] = 'View Administrator ACL';
$l['act_addmg'] = 'Add Media Groups';
$l['act_editmg'] = 'Edit Media Groups';
$l['act_deletemg'] = 'Delete Media Groups';
$l['act_list_distros'] = 'View Distro List';
$l['act_add_distro'] = 'Add Distros';
$l['act_synciso'] = 'Sync ISO';
$l['act_config'] = 'Edit General Settings';
$l['act_emailsettings'] = 'Edit Email Settings';
$l['act_adminacl'] = 'View Admin ACLs';
$l['act_add_admin_acl'] = 'Add Admin ACL';
$l['act_edit_admin_acl'] = 'Edit Admin ACL';
$l['act_delete_admin_acl'] = 'Delete Admin ACL';
$l['act_serverinfo'] = 'View Server Info';
$l['act_licenseinfo'] = 'View License Info';
$l['act_hostname'] = 'View Hostname';
$l['act_changehostname'] = 'Edit Hostname';
$l['act_maintenance'] = 'Maintenance Mode';
$l['act_kernconfig'] = 'Edit Kernel Config';
$l['act_defaultvsconf'] = 'Default ' . VM_SHORT . ' Config';
$l['act_twofactauth'] = 'Two Factor Authentication';
$l['act_updates'] = 'Perform Updates';
$l['act_emailtemps'] = 'View email templates';
$l['act_editemailtemps'] = 'Edit email templates';
$l['act_ssl'] = 'View SSL files';
$l['act_editssl'] = 'Edit SSL fIles';
$l['act_createssl'] = 'Create SSL Certificate';
$l['act_firewall'] = 'Manage firewall';
$l['act_importvs'] = 'Import VS';
$l['act_phpmyadmin'] = ' Access PhpMyAdmin';
$l['act_ssh'] = 'Access SSH';
$l['act_pdns'] = 'View DNS Servers';
$l['act_managepdns'] = 'Manage DNS Servers';
$l['act_addpdns'] = 'Add DNS Servers';
$l['act_editpdns'] = 'Edit DNS Server';
$l['act_deletepdns'] = 'Delete DNS Servers';
$l['act_rdns'] = 'Add Reverse DNS Zones';
$l['act_procs'] = 'Manage processes';
$l['act_services'] = 'Manage services';
$l['act_webserver'] = 'Restart webserver';
$l['act_network'] = 'Restart network service';
$l['act_sendmail'] = 'Restart mail server';
$l['act_mysqld'] = 'Restart MySQL';
$l['act_iptables'] = 'Restart IPTables';
$l['act_logs'] = 'View Logs';
$l['act_deletelogs'] = 'Delete logs';
$l['act_userlogs'] = 'View User logs';
$l['act_deleteuserlogs'] = 'Delete User logs';
$l['act_loginlogs'] = 'View Login logs';
$l['act_deleteloginlogs'] = 'Delete login logs';
$l['act_iplogs'] = 'View IP Logs';
$l['act_deliplogs'] = 'Delete IP Logs';
$l['act_checkall'] = 'Check all';
$l['act_save'] = 'Save';
$l['act_recipes'] = 'View Recipes';
$l['act_addrecipe'] = 'Add Recipe';
$l['act_editrecipe'] = 'Edit Recipe';
$l['act_backup_plans'] = 'List Backup Plans';
$l['act_addbackup_plan'] = 'Add Backup Plan';
$l['act_editbackup_plan'] = 'Edit Backup Plan';
$l['act_deletebackup_plan'] = 'Delete Backup Plans';
$l['act_haproxy'] = 'Domain Forwarding';
$l['act_euiso'] = 'Enduser ISO';
$l['act_orphaneddisk'] = 'List Orphaned Disks';
$l['act_deleteorphaneddisk'] = 'Delete Orphaned Disks';
$l['act_ha'] = 'High Availability';
$l['act_load_balancer'] = 'Load Balancer';
$l['act_manage_load_balancer'] = 'Manage Load Balancer';
$l['act_multivirt'] = 'Multi Virtualization';
$l['act_webuzo'] = 'Webuzo Settings';
$l['act_billing'] = 'Billing Settings';
$l['act_resource_pricing'] = 'Resource Billing';
$l['act_invoices'] = 'Invoices';
$l['act_transactions'] = 'Transactions';
$l['act_addinvoice'] = 'Add Invoice';
$l['act_addtransaction'] = 'Add Transaction';
$l['act_performance'] = 'Server Monitoring';

//enduser calls
$l['act_vpsmanage'] = 'Dashboard';
$l['act_editapi'] = 'Edit API';
$l['act_sso'] = 'Single Sign On';
$l['act_apps'] = 'Applcations';
$l['act_webuzo'] = 'webuzo';
$l['act_editsshkey'] = 'Edit SSH keys';
$l['act_addsshkey'] = 'Add SSH keys';
$l['act_sshkeys'] = 'SSH keys';
$l['act_editbackupserver'] = 'Edit backup server';
$l['act_addbackupserver'] = 'Add Backup server';
$l['act_backupservers'] = 'Backup Server';
$l['act_addiso'] = 'Add ISO';
$l['act_euiso'] = 'Enduser ISO';
$l['act_managevdf'] = 'Manage VDF';
$l['act_twofactauth'] = 'Two factor Authentication';
$l['act_tasks'] = 'List tasks';
$l['act_ctasks'] = 'List tasks';
$l['act_self_shutdown'] = 'Self Shutdown';
$l['act_managesubnets'] = 'Manage IPv6 Subnets';
$l['act_managezone'] = 'Manage DNS zone';
$l['act_payment'] = 'Make payment';
$l['act_invoices'] = 'List invoices';
$l['act_billing'] = 'Billing';
$l['act_pdns'] = 'PDNS';
$l['act_listrecipes'] = 'List recipes';
$l['act_crecipes'] = 'Configure recipes';
$l['act_cloudres'] = 'Cloud resources';
$l['act_create'] = 'Create ' . VM_SHORT;
$l['act_hvmsettings'] = 'HVM settings for ' . VM_SHORT;
$l['act_apikey'] = 'List API keys';
$l['act_ips'] = 'List IPs';
$l['act_vncpass'] = 'Vnc password';
$l['act_vnc'] = 'Vnc access';
$l['act_listvs'] = 'List ' . VM_SHORT;
$l['act_usersettings'] = 'User settings';
$l['act_rdns'] = 'RDNS';
$l['act_addrdns'] = 'Add RDNS';
$l['act_userpassword'] = 'User password';
$l['act_edituser'] = 'Edit users';
$l['act_adduser'] = 'Add user';
$l['act_profile'] = '资料';
$l['act_userpanel'] = 'User\'s dashboard';
$l['act_users'] = 'List users';
$l['act_hostname'] = 'Change Hostname';
$l['act_controlpanel'] = 'Control panel';
$l['act_changepassword'] = 'Change password';
$l['act_bandwidth'] = 'Bandwidth';
$l['act_logs'] = 'Logs';
$l['act_system_alerts'] = 'System alerts';
$l['act_statuslogs'] = 'Status Logs';
$l['act_console'] = 'Console Access';
$l['act_ssh'] = 'SSH List';
$l['act_add_ssh'] = 'Configure SSH';
$l['act_performance'] = 'Peformance';
$l['act_services'] = 'Services';
$l['act_ram'] = 'RAM';
$l['act_cpu'] = 'CPU';
$l['act_monitor'] = 'Monitor';
$l['act_ostemplate'] = 'Os templates';
$l['act_rescue'] = 'Rescue mode';
$l['act_poweroff'] = 'Power OFF';
$l['act_start'] = 'Start';
$l['act_restart'] = 'Restart';
$l['act_stop'] = 'Stop';
$l['act_suspend_net'] = 'Suspend Network';
$l['act_unsuspend_net'] = 'Unsuspend Network';
$l['act_unsuspend'] = 'Unsuspend ' . VM_SHORT;
$l['act_suspend'] = 'Suspend ' . VM_SHORT;
$l['act_delvs'] = 'Delete '.VM_SHORT;
$l['act_stop'] = 'Stop';
$l['act_register'] = 'Register';
$l['act_login'] = 'Login';
$l['act_editvm'] = 'Edit ' . VM_SHORT;
$l['act_backup2'] = 'Backup/Restore';
$l['act_dashboard'] = 'Dashboard';
$l['act_return_session'] = 'Return Session';

$l['act_domains'] = 'DNS Zones';
$l['act_dnsrecords'] = 'DNS Records';
$l['act_edit_dnsrecord'] = 'Edit DNS Record';
$l['act_managevps'] = 'Manage '.VM_LONG;
$l['act_ipranges'] = 'IPv6 Subnets';
$l['act_addiprange'] = 'Add IPv6 Subnet';
$l['act_editiprange'] = 'Edit IP';
$l['act_servergroups'] = 'Server Groups / Regions';
$l['act_user_plans'] = 'User Plans';
$l['act_adduser_plans'] = 'Add User Plan';
$l['act_edituser_plans'] = 'Edit User Plans';
$l['act_editinvoice'] = 'Edit Invoice';
$l['act_edittransaction'] = 'Edit Transaction';
$l['act_firewall_plans'] = 'List Firewall Plans';
$l['act_addfirewall_plan'] = 'Add Firewall Plan';
$l['act_editfirewall_plan'] = 'Edit Firewall Plan';
$l['act_load_balancer'] = 'Load Balancer';
$l['act_manage_load_balancer'] = 'Manage Load Balancer';
$l['lm_load_balancer'] = 'Load Balancer';
$l['at_performed'] = 'Action performed';
$l['product_id'] = 'Product ID';
$l['call_init'] = 'Call Initiated from';
$l['os_template'] = 'OS template';
$l['primary_ip'] = 'Primary IP changed';
$l['conf_ssh'] = 'Configuring SSH key(s), ID(s) : ';
$l['ctrl_pnl'] = 'Control panel chosen for installation';
$l['rdns_ip'] = 'RDNS IP';
$l['rdns_domain'] = 'RDNS Domain';
$l['api_hostname'] = 'Hostname';
$l['virt_type'] = 'Virtualization type';
$l['api_osid'] = 'Osid';
$l['add_rec'] = 'Added following Recipe ID(s) for execution';
$l['inv_ip'] = 'Invalid IP access';
$l['backup_delete'] = 'Backup delete call';
$l['backup_init'] = 'Create Backup';
$l['backup_started'] = 'Create backup task initiated';
$l['restore_init'] = 'Restore backup call';
$l['server_dump'] = VM_LONG;
$l['call_init'] = 'Call Initiated from';
$l['get_module_name'] = 'Module Name';

// editapi lang string - prefix : edu_
$l['edu_idapi_not_found'] = 'API ID not found';
$l['edapi_done'] = 'Changes has been saved';

$l['bkid'] = 'Bkid';
$l['files'] = 'Files';
$l['type'] = 'Type';
$l['size'] = 'Size';
$l['backup_time'] = 'Backup Time';

//Functions.php
$l['ath_fail'] = 'Authentication failed, api call stopped';
$l['ip_fail'] = 'Unauthorized IP detected, api call stopped';
$l['api_key'] = 'API Key';
$l['data_post'] = 'Post data';
$l['data_get'] = 'Get data';
$l['show_notify_logs'] = 'Show Logs';

//Firewall
$l['decision'] = 'Decision' ;
$l['decision_exp'] = 'Action to perform for the traffic';
$l['direction'] = 'Direction' ;
$l['Add_firewalls_rules'] = 'Add firewalls rules' ;
$l['manage_firewall_rules'] = 'Manage firewall rules' ;
$l['IN'] = 'IN' ;
$l['OUT'] = 'OUT' ;
$l['ACCEPT'] = 'ACCEPT' ;
$l['DROP'] = 'DROP' ;
$l['port'] = 'Port' ;
$l['sport'] = 'S Port' ;
$l['sport_exp'] = 'Source Port that you want to apply the rule';
$l['dport'] = 'D Port' ;
$l['dport_exp'] = 'Destination Port that you want to apply the rule';
$l['CUSTOM'] = 'Custom' ;
$l['ANYWHERE'] = 'Anywhere' ;
$l['Ipv4'] = 'IPv4' ;
$l['IPv6'] = 'IPv6' ;
$l['firewall'] = 'Firewall' ;
$l['iptype'] = 'IP Type' ;
$l['protocol'] = 'Protocol' ;
$l['protocol_exp'] = 'Type of protocol';
$l['source'] = 'Source' ;
$l['source_exp'] = 'You can specify individual ip(2.2.2.2) OR 0.0.0.0/0 (for all the ips)';
$l['srno'] = '#' ;
$l['Empty protocol field'] = 'Empty protocol field' ;
$l['Need Direction Flow'] = 'Need Direction Flow' ;
$l['Empty port'] = 'Empty port' ;
$l['Empty source address'] = 'Empty source address' ;
$l['reset'] = 'Reset' ;
$l['update'] = 'Update' ;

$l['add_rule_error'] = 'Please add rules then save them';
$l['rules_exceed_limit'] = 'Firewall Plan cannot have more than <b>&soft-1;</b> rules';
$l['invalid_source_port'] = 'Invalid Source Port <b>&soft-1;</b> specified in rule: </br>&soft-2;';
$l['correct_port_info'] = 'Port values can range between 0 - 65535 or NONE';
$l['invalid_destination_port'] = 'Invalid Destination Port <b>&soft-1;</b> specified in rule: </br>&soft-2;';
$l['invalid_protocol'] = 'Invalid Protocol specified ';
$l['invalid_decision'] = 'Invalid Decision specified ';
$l['invalid_iptype'] = 'Invalid IP Type specified ';
$l['invalid_direction'] = 'Invalid Direction specified ';
$l['correct_ipv4_info'] = ' Please Specify valid IPv4 addresss or 0.0.0.0/0 for ALL ips';
$l['no_port_specified'] = 'Source port and Destination port can have range between 0 - 65535 rule:';
$l['port_number_is_specified'] = 'Source Port and Destination Port should be NONE for GRE, ESP, ICMP protocols';

$l['err_umount_volume'] = 'There was some error in unmounting volume in '.VM_SHORT;
$l['enduser_vps_firewall_disabled'] = VM_SHORT.' Firewall is disabled';
$l['bulk_enduser_vps_firewall_remove'] = 'Enduser firewall rules removed for multiple '.VM_SHORT;