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

$l['err_locked_vps'] = VM_SHORT.' is locked, hence no actions are allowed to perform';
$l['user_data_error_t'] = 'Błąd danych użytkownika';
$l['user_data_error'] = 'Panel nie może załadować Twoich informacji. Prosimy o kontakt z administratorem!';

$l['no_license'] = 'Wystąpił problem licencji. Prosimy o kontakt z administratorem!';

$l['today'] = '<b>Dzisiaj</b> o ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Błąd skórki';//Title
$l['init_theme_error'] = 'Nie można załadować szablonu - &soft-1;.';

$l['init_theme_func_error_t'] = 'Błąd szablonu';//Title
$l['init_theme_func_error'] = 'Nie można załadować szablonu &soft-1;.';

$l['load_theme_settings_error'] = 'Nie można załadować ustawień szablonu.';


//Error Handle Function
$l['following_errors_occured'] = 'Nastąpiły błędy';

//Success Message Function
$l['following_message'] = 'Następująca informacja została zwrócona';

//Major Error Function
$l['fatal_error'] = 'Błąd krytyczny';
$l['following_fatal_error'] = 'Pojawił się błąd';

//Message Function
$l['soft_message'] = 'Wiadomość';
$l['following_soft_message'] = 'Pojawiła się wiadomość';

$l['err_user_head'] = 'Błąd';
$l['err_user'] = 'Nie można zweryfikować typu użytkownika';

//Update Softaculous
$l['getting_info'] = 'Przetwarzanie informacji...…';
$l['error_getting_latest'] = 'Nie można odczytać informacji……Przerywam';
$l['got_info'] = 'Informacje otrzymane';
$l['manual_mode'] = 'Nowa wersja wymaga pracy ręcznej……Przerywam';
$l['no_updates'] = 'Obecna wersja jest ostatnią wersją……Kontynuacja';
$l['fetch_upgrade'] = 'Przetwearzam aktualizacje...…';
$l['error_fetch_upgrade'] = 'Nie można pobrać pliku wersji……Przerywam';
$l['error_save_upgrade'] = 'Nie można zapisać pliku wersji......Przerywam';
$l['got_upgrade'] = 'Zapisany plik wersji';
$l['unzip_upgrade'] = 'Rozpakowywanie plików...…';
$l['error_unzip_upgrade'] = 'Błąd rozpakowywania plików……Przerywam';
$l['unzipped_upgrade'] = 'Rozpakowanie prawidłowe';
$l['running_upgrade'] = 'Uruchamiam aktualizacje...…';
$l['succ_upgrade'] = 'Zakończono';
$l['error_upgrade'] = 'Pojawiły się następujące błędy podczas aktualizacji :';

//MySQL Errors
$l['err_selectmy'] = 'Nie można wybrać bazy danych MySQL.';
$l['err_myconn'] = 'Nie ustawiono połączenia z bazą danych.';
$l['err_makequery'] = 'Nie można wykonać zapytania';
$l['err_mynum'] = 'MySQL Error No';
$l['err_myerr'] = 'MySQL Error';

//hf_theme.php
$l['welcome'] = 'Witamy';
$l['logout'] = 'Wyloguj';
$l['page_time'] = 'Wygenerowane stronę w';
$l['times_are'] = 'Wszystkie czasy są podane w GMT';
$l['time_is'] = 'Obecny czas';
$l['load_start'] = 'Uruchamiiony';
$l['load_stop'] = 'Zatrzymany';
$l['load_restart'] = 'Restartowany';
$l['load_poweroff'] = 'Wyłączany';

//The Category Language Variables
$l['dock_restart'] = 'Restart Kontenera';
$l['dock_stop'] = 'Stop';
$l['dock_start'] = 'Start';
$l['dock_poweroff'] = 'Wyłacz';
$l['dock_home'] = 'Główna';
$l['dock_settings'] = 'Edytuj ustawienia';
$l['dock_help'] = 'Pomoc i wsparcie';
$l['dock_sync'] = 'Synchronizuj z innymi instalatorami';
$l['go_home'] = 'Główna';
$l['dock_user'] = 'Profil użytkownika';
$l['dock_password'] = 'Zmień hasło';
$l['dock_vps'] = 'Lista serwerów '.VM_SHORT;

// Left Menu
$l['lm_file_mgr'] = 'Menager plików';
$l['lm_res'] = 'Zasony';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'Procesy';
$l['lm_service'] = 'Usługi';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'Hasło VN';
$l['lm_statusc'] = 'Logi serwera';
$l['lm_res_a'] = 'Ostrzeżenia systemowe';
$l['lm_logs'] = 'Logi zadań';
$l['lm_bandwidth'] = 'Transfer serwera';
$l['lm_accountpass'] = 'Account Password';
$l['lm_changepass'] = 'Hasło';
$l['lm_controlpanel'] = 'Panel administracyjny';
$l['lm_recipes'] = 'Recipes';
$l['lm_disk'] = 'Dysk twardy';
$l['lm_ostemp'] ='Reinstalacja systemu';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Logi';
$l['lm_ips'] = 'Adresy IP';
$l['lm_hvmsettings'] = 'Konfiguracja serwera '.VM_SHORT;
$l['lm_apikey'] = 'Dostęp API';
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
$l['lm_vs'] = 'Lista serwerów '.VM_SHORT;
$l['lm_addvs'] = 'Launch '.VM_SHORT;
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Ustawienia';
$l['lm_profile'] = 'Mój profil';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'You are an Admin';
$l['lmapps'] = 'Applications';

// Page Jump Related :
$l['page_jump_title'] = 'Przejdź do strony';
$l['page_page'] = 'Strona';
$l['page_of'] = 'z';
$l['page_go'] = 'Idź';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = 'Serwer '.VM_SHORT.' nie został znaleziony w bazie';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'System operacyjny nie został znaleziony';
$l['build_no_ip'] = 'Brak głównego adresu IP dla serwera';
$l['build_no_os_iso'] = 'Nie znaleziono systemu operacyjnego';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Uruchomiono serwer ze złym jądrem - ';
$l['correct_kernel'] = 'Zrestartuj serwer z prawidłowym jądrem.';
$l['kvm_module'] = 'Modul Linux-KVM nie został załadowany.';
$l['kvm_network'] = $globals['bridge'].' nie jest włączony. Please run <b>service virtnetwork start</b>';
$l['temp_exists'] = 'Szablon już istnieje';
$l['temp_snap_err'] = 'Nie można wykonać snapshot';
$l['wrong_xm'] = 'The XEN module is not loaded correctly';
$l['lxc_module'] = 'LXC is not installed.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'Wystąpił problem z utworzeniem na serwerze '.VM_SHORT.' LVM';
$l['xen_err_swap'] = 'TWystąpił problem z utworzeniem na serwerze '.VM_SHORT.' SWAP';
$l['xen_err_tmp'] = 'TWystąpił problem z utworzeniem na serwerze '.VM_SHORT.' Mount Point';
$l['xen_err_mount'] = 'TWystąpił problem z utworzeniem na serwerze '.VM_SHORT.' LVM';
$l['xen_err_unmount'] = 'Wystąpił problem z utworzeniem na serwerze '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'Wystąpił problem z instalacją '.VM_SHORT;
$l['xen_err_mkfs'] = 'Wystąpił problem z formatowaniem '.VM_SHORT;
$l['xen_err_mkswap'] = 'Wystąpił problem z formatowaniem SWAM '.VM_SHORT.' ';
$l['xen_err_untar'] = 'Problem z rozpakowaniem systemu operacyjnego';
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
$l['kvm_err_dd'] = 'There was an error while installing the '.VM_SHORT;
$l['kvm_err_resizefs'] = 'There was an error while resizing the filesystem'	;
$l['kvm_err_part'] = 'There was an error while creating the disk partition(s)';
$l['kvm_err_kpart'] = 'There was an error while mapping the partition(s)';
$l['kvm_err_mkswap'] = 'There was an error while formatting the SWAP of the '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

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
$l['vg_space_arr'] = 'There is not enough space in ';

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

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = 'Suspended';
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

Your VM_SHORT {{vpsid}} has been {{action}} as per the time you had set ({{time}})
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
$l['exp_speed_cap_up'] = 'Upload speed after the bandwidth is overused for a '.VM_SHORT.', 0 or emtpy value indicates no capping';

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

$l['inv_winpass_chars'] = 'Allowed special characters for windows VM_SHORT root password are :';
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
$l['unisear_list'] = 'list';
$l['unisear_vps'] = VM_SHORT;
$l['unisear_user'] = 'User';
$l['unisear_ips'] = 'IP';
$l['unisear_vps_name'] = VM_SHORT.' name';
$l['unisear_vpsid'] = VM_SHORT.' ID';
$l['unisear_hostname'] = 'Hostname';
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
$l['server_ram_threshold'] = 'RAM threshold level reached';
$l['server_disk_threshold'] = 'Disk threshold level reached';
$l['vm_locked_backup'] = VM_SHORT.' backup is running';
$l['vm_locked_restore'] = VM_SHORT.' restore is running';

$l['reinstall_callback'] = 'Callback for Reinstall';
$l['no_timezone'] = 'None';