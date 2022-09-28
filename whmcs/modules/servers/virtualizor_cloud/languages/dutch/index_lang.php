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
$l['user_data_error_t'] = 'Gebruikersgegevens Fout';
$l['user_data_error'] = 'Het systeem kon uw gegevens niet inladen of vinde, gelieve contact op te nemen met de Administrator!';
$l['no_license'] = 'Het LICENTIE bestand kon niet worden gevonden, gelieve contact op te nemen met de Administrator.';
$l['today'] = '<b>Vandaag</b> op ';
$l['init_theme_error_t'] = 'Thema Fout';
$l['init_theme_error'] = 'Thema &soft-1; kan niet worden geladen.';
$l['init_theme_func_error_t'] = 'Thema Functie Fout';
$l['init_theme_func_error'] = 'De Functies van Thema &soft-1; konden niet worden geladen.';
$l['load_theme_settings_error'] = 'Theme instellingen bestand kon niet worden geladen.';
$l['following_errors_occured'] = 'De volgende fouten zijn ontdekt';
$l['following_message'] = 'Het volgend bericht werd teruggestuurd';
$l['fatal_error'] = 'Fatale Fout';
$l['following_fatal_error'] = 'De volgende fout is opgetreden';
$l['soft_message'] = 'Bericht';
$l['following_soft_message'] = 'Het volgend bericht werd teruggestuurd';
$l['err_user_head'] = 'Fout';
$l['err_user'] = 'Het was niet mogenlijk de type van de gebruiker te vinden';
$l['getting_info'] = 'Informatie Opvragen......';
$l['error_getting_latest'] = 'Geen informatie ontvangen......Afsluiten';
$l['got_info'] = 'Informatie ontvangen';
$l['manual_mode'] = 'De nieuwe versie van Softaculous vraagt manuele aandacht......Afsluiten';
$l['no_updates'] = 'Momentele versie is de laatste versie......Doorgaan';
$l['fetch_upgrade'] = 'Upgrade opvragen......';
$l['error_fetch_upgrade'] = 'Upgrade bestand werd niet gevonden......Afsluiten';
$l['error_save_upgrade'] = 'Upgrade bestand kon niet worden opgeslagen......Afsluiten';
$l['got_upgrade'] = 'Upgrade bestand opgeslagen';
$l['unzip_upgrade'] = 'De bestanden uitpakken......';
$l['error_unzip_upgrade'] = 'Fout tijdens uitpakken......Afsluiten';
$l['unzipped_upgrade'] = 'Succesvol uitgepakt';
$l['running_upgrade'] = 'Upgrade uitvoeren......';
$l['succ_upgrade'] = 'Klaar';
$l['error_upgrade'] = 'De volgende fouten zijn opgetreden tijdens de upgrade :';
$l['err_selectmy'] = 'De MySQL Database kon niet worden geselecteerd.';
$l['err_myconn'] = 'De MySQL Connectie kon niet worden gevestigd.';
$l['err_makequery'] = 'Kon de vragen niet nummeren';
$l['err_mynum'] = 'MySQL Fout Nummer';
$l['err_myerr'] = 'MySQL Fout';

//hf_theme.php
$l['welcome'] = 'Welkom';
$l['logout'] = 'Uitloggen';
$l['page_time'] = 'Pagina Aangemaakt In';
$l['times_are'] = 'Alle tijden zijn GMT';
$l['time_is'] = 'De tijd is nu';
$l['load_start'] = 'Starten';
$l['load_stop'] = 'Stoppen';
$l['load_restart'] = 'Herstarten';
$l['load_poweroff'] = 'Uitgeschakeld';

//The Category Language Variables
$l['dock_restart'] = 'Herstart Container';
$l['dock_stop'] = 'Stop Container';
$l['dock_start'] = 'Start Container';
$l['dock_poweroff'] = 'Container Uitschakelen';
$l['dock_home'] = 'Home';
$l['dock_settings'] = 'Verander Instellingen';
$l['dock_help'] = 'Hulp en Ondersteuning ';
$l['dock_sync'] = 'Syncroniseren met andere Auto-Installers';
$l['go_home'] = 'Home';
$l['dock_user'] = 'Gebruikers Profiel';
$l['dock_password'] = 'Verander Wachtwoord';
$l['dock_vps'] = 'Virtuele Servers Weergeven';

// Left Menu
$l['lm_file_mgr'] = 'Bestandenbeheer';
$l['lm_res'] = 'Bronnen';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'Processen';
$l['lm_service'] = 'Diensten';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC Wachtwoord';
$l['lm_statusc'] = 'Status Logs';
$l['lm_res_a'] = 'Systeem Waarschuwingen';
$l['lm_logs'] = 'Logs';
$l['lm_bandwidth'] = 'Dataverkeer';
$l['lm_accountpass'] = 'Account Password';
$l['lm_changepass'] = 'Account Wachtwoord';
$l['lm_controlpanel'] = 'Controle Paneel';
$l['lm_recipes'] = 'Recipes';
$l['lm_disk'] = 'Schijf';
$l['lm_ostemp'] = 'Besturingssysteem herïnstallatie';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostnaam';
$l['lm_ips'] = 'IPs';
$l['lm_hvmsettings'] = VM_SHORT.' Configuratie';
$l['lm_apikey'] = 'API Gegevens';
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
$l['lm_vs'] = VM_SHORT.' Lijst';
$l['lm_addvs'] = 'Launch '.VM_SHORT;
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Instellingen';
$l['lm_profile'] = 'Mijn Profiel';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'You are an Admin';
$l['lmapps'] = 'Applications';
$l['page_jump_title'] = 'Pagina ingeven om er naar te gaan';
$l['page_page'] = 'Pagina';
$l['page_of'] = 'of';
$l['page_go'] = 'Ga';
$l['build_no_vs'] = 'De '.VM_SHORT.' Werd niet gevonden in de Database';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'Het besturingssysteem thema werd niet gevonden';
$l['build_no_ip'] = 'De primaire IP ontbreekt voor de '.VM_SHORT;
$l['build_no_os_iso'] = 'Geen Besturingssysteem themas of ISO bestanden werden gevonden';
$l['wrong_kernel'] = 'U bent in de verkeerde kernel gestart - ';
$l['correct_kernel'] = 'Gelieve in de juiste kernel te starten.';
$l['kvm_module'] = 'De Linux-KVM module is niet geladen.';
$l['kvm_network'] = 'De '.$globals['bridge'].' is niet gestart. Gelieve volgende uittevoeren <b>service virtnetwork start</b>';
$l['temp_exists'] = 'Het thema bestand bestaat al';
$l['temp_snap_err'] = 'De snapshot kon niet worden gemaakt dus ook de Thema aanmaak is mislukt';
$l['wrong_xm'] = 'The XEN module is not loaded correctly';
$l['lxc_module'] = 'LXC is not installed.';
$l['xen_err_lvm'] = 'Er was een fout bij het maken van de LVM van de '.VM_SHORT;
$l['xen_err_swap'] = 'Er is een fout opgetreden in het creëren van de SWAP van de '.VM_SHORT;
$l['xen_err_tmp'] = 'Er is een fout opgetreden in het creëren van de Mount Point';
$l['xen_err_mount'] = 'r is een fout opgetreden bij het mounten van de '.VM_SHORT.' LVM';
$l['xen_err_unmount'] = 'Er is een fout opgetreden in het unmounten van de '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'Er is een fout opgetreden tijdens het installeren van de '.VM_SHORT;
$l['xen_err_mkfs'] = 'Er is een fout opgetreden tijdens het formatteren van de '.VM_SHORT;
$l['xen_err_mkswap'] = 'Er is een fout opgetreden tijdens het formatteren van de SWAP van de '.VM_SHORT;
$l['xen_err_untar'] = 'Er is een fout opgetreden bij het uitpakken van het Besuringssysteem Thema';
$l['xen_err_part'] = 'Er is een fout opgetreden tijdens het maken van de partitie (s)';
$l['xen_err_kpart'] = 'Er is een fout opgetreden tijdens het in kaart brengen van de partitie (s)';
$l['xen_err_resizefs'] = 'Er is een fout opgetreden tijdens het wijzigen van de grootte van het bestandssysteem';
$l['xcp_err_vdi'] = 'There was an error while creating the VDI of the '.VM_SHORT;
$l['xcp_err_iso'] = 'There was an error while loading the ISO';
$l['xcp_err_vif'] = 'There was an error while creating VIF for the '.VM_SHORT;
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';
$l['kvm_err_lvm'] = 'Er was een fout bij het maken van de LVM van de '.VM_SHORT;
$l['kvm_err_mount'] = 'Er is een fout opgetreden bij het monteren van de '.VM_SHORT.' LVM';
$l['kvm_err_unmount'] = 'Er is een fout opgetreden in het unmounten van de '.VM_SHORT.' LVM';
$l['kvm_err_dd'] = 'Er is een fout opgetreden tijdens het installeren van de '.VM_SHORT;
$l['kvm_err_resizefs'] = 'Er is een fout opgetreden tijdens het wijzigen van de grootte van het bestandssysteem';
$l['kvm_err_part'] = 'Er is een fout opgetreden tijdens het maken van de partitie (s)';
$l['kvm_err_kpart'] = 'Er is een fout opgetreden tijdens het in kaart brengen van de partitie (s)';
$l['kvm_err_mkswap'] = 'Er is een fout opgetreden tijdens het formatteren van de SWAP van de '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';
$l['lxc_err_untar'] = 'There was an error while extracting the OS template';
$l['lxc_err_unmount'] = 'There was an error in unmounting the '.VM_SHORT.' LVM';
$l['lxc_err_resizefs'] = 'There was an error while resizing the filesystem';
$l['lxc_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['lxc_err_mount'] = 'There was an error in mounting the '.VM_SHORT.' storage';
$l['virtuzo_create_error'] = 'There was an error while creating the '.VM_SHORT;
$l['err_vncpass'] = 'There was an error in setting the VNC Password';
$l['err_set_iso'] = 'There was an in attaching the ISO to the '.VM_SHORT;
$l['err_disk_create'] = 'There was an error while creating the '.VM_SHORT.' disk';
$l['err_set_boot_order'] = 'There was an error while setting the boot order';
$l['err_set_ram'] = 'There was an error while setting the RAM';
$l['err_set_pinning'] = 'There was an error while setting the CPU Affinity';
$l['err_install_tools'] = 'There was an error while installing the guest tools';
$l['backup_err_mount'] = 'There was an error in mounting the LVM for temporary storage';
$l['backup_err_lvm'] = 'There was an error creating the LVM of the for temporary storage.';
$l['backup_err_mkfs'] = 'There was an error while formatting the temporary storage';
$l['backup_err_mkdir'] = 'There was an error while creating the temporary storage mount point directory';
$l['kvm_err_tar'] = 'Er is een fout opgetreden tijdens het comprimeren van het archief';
$l['xen_err_tar'] = 'Er is een fout opgetreden tijdens het comprimeren van het archief';
$l['kvm_err_untar'] = 'Er is een fout opgetreden decomprimeren het archief';
$l['backup_err_untar'] = 'There was an error while uncompressing the archive';
$l['err_vzdump'] = 'Er is een fout opgetreden met de back-up tool';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Failed to create the backup image, Return code: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = VM_SHORT.' UUID is empty!';
$l['vg_space_arr'] = 'There is not enough space in ';
$l['openvz_err_ubc'] = 'Er is een fout opgetreden bij het opslaan van de UBC instellingen';
$l['openvz_err_ostemplate'] = 'Er is een fout opgetreden bij het instellen van de Besturingssyteem thema';
$l['openvz_err_space'] = 'Er is een fout opgetreden bij het instellen van de schijfruimte';
$l['openvz_err_inodes'] = 'Er is een fout opgetreden bij het instellen van de schijfruimte';
$l['openvz_err_hostname'] = 'Er is een fout opgetreden tijden het instellen van de hostnaam';
$l['openvz_err_ip'] = 'Er is een fout opgetreden tijdens het instellen van het IP-adres';
$l['openvz_err_dns'] = 'Er is een fout opgetreden tijdens het instellen van de DNS';
$l['openvz_err_cpu'] = 'Er is een fout opgetreden tijdens het instellen van de CPU eenheden';
$l['openvz_err_cpulim'] = 'Er is een fout opgetreden tijdens het instellen van de CPU limiet';
$l['openvz_err_cores'] = 'Er is een fout opgetreden tijdens het instellen van de CPU cores';
$l['openvz_err_ioprio'] = 'Er is een fout opgetreden tijdens het instellen van de IO Prioriteit';
$l['openvz_err_create'] = 'Er is een fout opgetreden tijdens het aanmaken van de Container';
$l['vswap_error'] = 'Er is een fout opgetreden tijdens het instellen van de VSwap instellingen';
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';
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
$l['failed_connect_proxmox'] = 'Failed to make proxmox api call. Please enter proxmox details at Configuration --> Slave Settings';
$l['speed_cap_down'] = 'Capped Download Speed ';
$l['exp_speed_cap_down'] = 'Download speed after the bandwidth is overused for a '.VM_SHORT.', 0 or emtpy value indicates no capping';
$l['speed_cap_up'] = 'Capped Upload Speed ';
$l['exp_speed_cap_up'] = 'Upload speed after the bandwidth is overused for a '.VM_SHORT.', 0 or emtpy value indicates no capping';
$l['admin_iso'] = 'Admin ISOs';
$l['eu_iso'] = 'Enduser ISOs';
$l['enable_billing'] = 'The Billing setting is disabled. Please enable that first from the <a href=\"act=billing		\">Billing Settings</a>.';
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

$l['reinstall_callback'] = 'Callback for Reinstall';
$l['server_ram_threshold'] = 'RAM threshold level reached';
$l['server_disk_threshold'] = 'Disk threshold level reached';
$l['vm_locked_backup'] = VM_SHORT.' backup is running';
$l['vm_locked_restore'] = VM_SHORT.' restore is running';
$l['no_timezone'] = 'None';