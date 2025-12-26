<?php

$l['privacy_policy'] = 'Datenschutzrichtlinie';
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
$l['user_data_error_t'] = 'Benutzerdatenfehler';
$l['user_data_error'] = 'Das Panel war nicht in der Lage, Ihre Kontoinformationen zu laden. Bitte melden Sie dies dem Server Administrator!';

$l['no_license'] = 'Die Lizenzdatei konnte nicht gefunden werden! Bitte melden Sie dies an den Server-Administrator.';

$l['today'] = '<b>Heute</b> at ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Theme Fehler';//Title
$l['init_theme_error'] = 'Konnte die Theme-Datei nicht laden - &soft-1;.';

$l['init_theme_func_error_t'] = 'Theme Funktions Fehler';//Title
$l['init_theme_func_error'] = 'Konnte die Theme Funktionen von &soft-1; nicht laden.';

$l['load_theme_settings_error'] = 'Konnte die Theme-Datei nicht laden.';


//Error Handle Function
$l['following_errors_occured'] = 'Folgende Fehler wurden gefunden';

//Success Message Function
$l['following_message'] = 'Die folgende Nachricht wurde zur&uuml;ckgegeben';

//Major Error Function
$l['fatal_error'] = 'Schwerwiegender Fehler';
$l['following_fatal_error'] = 'Der folgende Fehler ist aufgetreten';

//Message Function
$l['soft_message'] = 'Nachricht';
$l['following_soft_message'] = 'Die folgende Nachricht wurde zur&uuml;ckgegeben';

$l['err_user_head'] = 'Fehler';
$l['err_user'] = 'Der Benutzertyp konnte nicht ermittelt werden';

//Update Softaculous
$l['getting_info'] = 'Anfordern von Informationen......';
$l['error_getting_latest'] = 'Kann keine Informationen erhalten......breche ab';
$l['got_info'] = 'Informationen erhalten';
$l['manual_mode'] = 'Die neue Version von Softaculous erfordert Manuelles einschreiten......breche ab';
$l['no_updates'] = 'Die aktuelle Version ist die neueste Version......fortsetzen';
$l['fetch_upgrade'] = 'Hole Aktualisierung......';
$l['error_fetch_upgrade'] = 'Aktualisierungsdatei konnte nicht geholt werden......breche ab';
$l['error_save_upgrade'] = 'Konnte Aktualisierungsdatei nicht speichern......breche ab';
$l['got_upgrade'] = 'Aktualisierungsdatei gespeichert';
$l['unzip_upgrade'] = 'Entpacke die Dateien......';
$l['error_unzip_upgrade'] = 'Fehler beim Entpacken......breche ab';
$l['unzipped_upgrade'] = 'Entpacken Erfolgreich';
$l['running_upgrade'] = 'Führe Aktualisierung durch......';
$l['succ_upgrade'] = 'Fertiggestellt';
$l['error_upgrade'] = 'Die folgenden Fehler sind während der Aktualisierung aufgetreten :';

//MySQL Errors
$l['err_selectmy'] = 'Die MySQL-Datenbank konnte nicht ausgew&auml;hlt werden.';
$l['err_myconn'] = 'Die MySQL-Verbindung konnte nicht hergestellt werden.';
$l['err_makequery'] = 'Die Abfrage konnte nicht gez&auml;hlt werden.';
$l['err_mynum'] = 'MySQL Fehler No';
$l['err_myerr'] = 'MySQL Fehler';

//hf_theme.php
$l['welcome'] = 'Willkommen';
$l['logout'] = 'Logout';
$l['page_time'] = 'Seite erstellt in';
$l['times_are'] = 'Alle Zeiten sind GMT';
$l['time_is'] = 'Es ist jetzt';
$l['load_start'] = 'Wird gestartet';
$l['load_stop'] = 'Wird angehalten';
$l['load_restart'] = 'Wird neu gestartet';
$l['load_poweroff'] = 'Wird ausgeschaltet';

//The Category Language Variables
$l['dock_restart'] = 'Container neu starten';
$l['dock_stop'] = 'Container anhalten';
$l['dock_start'] = 'Container starten';
$l['dock_poweroff'] = 'Container ausschalten';
$l['dock_home'] = 'Home';
$l['dock_settings'] = 'Einstellungen bearbeiten';
$l['dock_help'] = 'Hilfe und Support';
$l['dock_sync'] = 'Synchronisieren mit anderem Auto Installer';
$l['go_home'] = 'Home';
$l['dock_user'] = 'Benutzerprofil';
$l['dock_password'] = 'Passwort ändern';
$l['dock_vps'] = VM_LONG.'. anzeigen';

// Left Menu
$l['lm_file_mgr'] = 'Datei-Manager';
$l['lm_res'] = 'Ressourcen';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'Prozesse';
$l['lm_service'] = 'Service';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC Passwort';
$l['lm_statusc'] = 'Status Logs';
$l['lm_res_a'] = 'System-Warnungen';
$l['lm_logs'] = 'Aufgaben Logs';
$l['lm_bandwidth'] = 'Datenverkehr';
$l['lm_accountpass'] = 'Account Passwort';
$l['lm_changepass'] = 'Account Passwort';
$l['lm_controlpanel'] = 'Control Panel';
$l['lm_recipes'] = 'Rezepte';
$l['lm_passthrough'] = 'Passthrough';
$l['lm_disk'] = 'Speicherplatz';
$l['lm_ostemp'] ='OS neu installieren';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Logs';
$l['lm_ips'] = 'IP-Adressen';
$l['lm_hvmsettings'] = VM_SHORT.' Konfiguration';
$l['lm_apikey'] = 'API Referenzen';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'Reverse DNS';
$l['lm_support'] = 'Support';
$l['lm_self_shutdown'] = 'Automatische Aufgabe planen';
$l['lm_tasks'] = 'Aufgaben';
$l['lm_twofactauth'] = 'Sicherheit';
$l['lm_backup2'] = 'Backups';
$l['lm_backupservers'] = 'Backup Server';
$l['lm_sshkeys'] = 'SSH-Schlüssel';
$l['lm_installapps'] = 'Anwendungen';
$l['lm_billing'] = 'Abrechnung';
$l['lm_volume'] = 'Volumes';
$l['lm_server_aio'] = 'Resources Monitor';


// Users left menu
$l['lm_vs'] = VM_SHORT.' anzeigen';
$l['lm_addvs'] = VM_SHORT.' starten';
$l['lm_resources'] = 'Cloud Ressourcen';
$l['lm_users'] = 'Benutzer';
$l['lm_usr_settings'] = 'Einstellungen';
$l['lm_profile'] = 'Mein Profil';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'Sie sind ein Admin';
$l['lmapps'] = 'Anwendungen';

// Page Jump Related :
$l['page_jump_title'] = 'Geben Sie die Seite an, zu der Sie springen m&ouml;chten';
$l['page_page'] = 'Seite';
$l['page_of'] = 'von';
$l['page_go'] = 'Los';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = 'Der '.VM_SHORT.' wurde nicht in der Datenbank gefunden';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'Das OS-Template wurde nicht gefunden';
$l['build_no_ip'] = 'Die prim&auml;re IP fehlt f&uuml;r den '.VM_SHORT;
$l['build_no_os_iso'] = 'Kein OS Template oder ISO-Datei gefunden';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Sie haben in den falschen Kernel gebootet - ';
$l['correct_kernel'] = 'Bitte in den richtigen Kernel neu starten.';
$l['kvm_module'] = 'Das Linux-KVM-Modul ist nicht geladen.';
$l['kvm_network'] = 'Die '.$globals['bridge'].' ist nicht gestartet. Bitte führen Sie <b>service virtnetwork start</b> aus';
$l['temp_exists'] = 'Die Template-Datei ist bereits vorhanden';
$l['temp_snap_err'] = 'Das Snapshot konnte nicht erstellt werden und deswegen ist die Template-Erstellung fehlgeschlagen';
$l['wrong_xm'] = 'Das Xen-Modul ist nicht richtig geladen.';
$l['lxc_module'] = 'LXC ist nicht installiert.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'Es gab einen Fehler bei der Erstellung des LVM f&uuml;r den '.VM_SHORT;
$l['xen_err_swap'] = 'Es gab einen Fehler bei der Erstellung des SWAP f&uuml;r den '.VM_SHORT;
$l['xen_err_tmp'] = 'Es gab einen Fehler bei der Erstellung des Mount Point';
$l['xen_err_mount'] = 'Es gab einen Fehler beim mounten des '.VM_SHORT.' LVM';
$l['xen_err_unmount'] = 'Es gab einen Fehler beim unmounten des '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'Es ist ein Fehler während der Laufwerk Kopie aufgetreten';
$l['xen_err_mkfs'] = 'Es gab einen Fehler beim Formatieren des '.VM_SHORT;
$l['xen_err_mkswap'] = 'Es gab einen Fehler beim Formatieren des SWAP f&uuml;r diesen '.VM_SHORT;
$l['xen_err_untar'] = 'Es gab einen Fehler beim Entpacken der OS-Vorlage';
$l['xen_err_part'] = 'Es gab einen Fehler beim Erstellen der Festplattenpartition(en)';
$l['xen_err_kpart'] = 'Es gab einen Fehler beim Abbilden der Partition(en)';
$l['xen_err_resizefs'] = 'Es gab einen Fehler beim &Auml;ndern der Gr&ouml;&szlig;e des Dateisystems';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = 'Es gab einen Fehler bei der Erstellung des VDI der '.VM_SHORT;
$l['xcp_err_iso'] = 'Es gab einen Fehler beim Laden des ISO';
$l['xcp_err_vif'] = 'Es gab einen Fehler beim Erstellen von VIF f&uuml;r den '.VM_SHORT;
$l['xcp_xentools_missing'] = 'Konnte das Xen Tools ISO nicht finden';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = 'Es gab einen Fehler bei der Erstellung des LVM f&uuml;r den '.VM_SHORT;
$l['kvm_err_mount'] = 'Es gab einen Fehler beim mounten des '.VM_SHORT.' LVM';
$l['kvm_err_unmount'] = 'Es gab einen Fehler beim unmounten des '.VM_SHORT.' LVM';
$l['kvm_err_dd'] = 'Es gab einen Fehler beim Erstellen der Festplattenpartition(en)';
$l['kvm_err_resizefs'] = 'Es gab einen Fehler beim &Auml;ndern der Gr&ouml;&szlig;e des Dateisystems'	;
$l['kvm_err_part'] = 'Es gab einen Fehler beim Erstellen der Partition(en)';
$l['kvm_err_kpart'] = 'Es gab einen Fehler beim Abbilden der Partition(en)';
$l['kvm_err_mkswap'] = 'Es gab einen Fehler beim Formatieren des SWAP f&uuml;r diesen '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';
$l['kvm_err_lightbit'] = 'There was an error creating the lightbit disk of the '.VM_SHORT;
$l['kvm_err_lightbit_acl'] = 'There was error while getting acl for lightbit';
$l['kvm_err_lightbit_proj'] = 'The lightbit project does not exists on node';
$l['kvm_err_lightbit_storage'] = 'The storage does not exists';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'Beim Extrahieren der OS-Vorlage ist ein Fehler aufgetreten';
$l['lxc_err_unmount'] = 'Beim Aushängen des '.VM_SHORT.' LVM ist ein Fehler aufgetreten';
$l['lxc_err_resizefs'] = 'Beim Ändern der Größe des Dateisystems ist ein Fehler aufgetreten';
$l['lxc_network'] = 'Die '.$globals['bridge'].' ist nicht gestartet. Bitte führen Sie <b>service virtnetwork start</b> aus.';
$l['lxc_err_mount'] = 'Beim Einhängen des '.VM_SHORT.' LVM ist ein Fehler aufgetreten';

// Virtuozzo '.VM_SHORT.' Creation errors
$l['virtuzo_create_error'] = 'Beim Erstellen des '.VM_SHORT.' ist ein Fehler aufgetreten';
$l['err_vncpass'] = 'Beim Festlegen des VNC-Kennworts ist ein Fehler aufgetreten';
$l['err_set_iso'] = 'Es gab einen Fehler beim hinzufügen der ISO-Datei zum '.VM_SHORT;
$l['err_disk_create'] = 'Beim Erstellen der '.VM_SHORT.'-Festplatte ist ein Fehler aufgetreten';
$l['err_set_boot_order'] = 'Beim Einstellen der Boot-Reihenfolge ist ein Fehler aufgetreten';
$l['err_set_ram'] = 'Beim Einstellen des RAM ist ein Fehler aufgetreten';
$l['err_set_pinning'] = 'Beim Einstellen der CPU-Affinität ist ein Fehler aufgetreten';
$l['err_install_tools'] = 'Beim Installieren der Gast-Tools ist ein Fehler aufgetreten';

//Backup errors
$l['backup_err_mount'] = 'Es gab einen Fehler beim mounten des LVM für die tempor&auml;re Speicherung';
$l['backup_err_lvm'] = 'Es gab einen Fehler beim Erstellen des LVM für die tempor&auml;re Speicherung';
$l['backup_err_mkfs'] = 'Es gab einen Fehler beim Formatieren des tempor&auml;ren Speichers';
$l['backup_err_mkdir'] = 'Es gab einen Fehler beim Erstellen des tempor&auml;ren mount point Verzeichnis';
$l['kvm_err_tar'] = 'Es gab einen Fehler bei der Komprimierung des Archivs';
$l['xen_err_tar'] = 'Es gab einen Fehler bei der Komprimierung des Archivs';
$l['kvm_err_untar'] = 'Es gab einen Fehler beim Entpacken des Archivs';
$l['backup_err_untar'] = 'Es gab einen Fehler beim Entpacken des Archivs';
$l['err_vzdump'] = 'Es gab einen Fehler mit dem Backup-Tool';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Fehler beim Erstellen des Backup-Image, Rückgabecode: ';
$l['backup_err_snap_switch'] = 'Beim Zurückkehren zum Snapshot ist ein Fehler aufgetreten';
$l['backup_err_snap_del'] = 'Beim Löschen des Snapshots ist ein Fehler aufgetreten';
$l['vps_uuid_empty'] = VM_SHORT.' UUID ist leer!';
$l['vg_space_arr'] = 'There is not enough space in ';

// OpenVZ '.VM_SHORT.' Creation errors
$l['openvz_err_ubc'] = 'Es gab einen Fehler beim Speichern der UBC Einstellungen';
$l['openvz_err_ostemplate'] = 'Es gab einen Fehler beim Setzen des OS-Templates';
$l['openvz_err_space'] = 'Es gab einen Fehler beim Einstellen des Festplattenspeichers';
$l['openvz_err_inodes'] = 'Es gab einen Fehler beim Einstellen des Festplattenspeichers';
$l['openvz_err_hostname'] = 'Es gab einen Fehler beim Setzen des Hostnamens';
$l['openvz_err_ip'] = 'Es gab einen Fehler beim Einstellen der IP-Adresse';
$l['openvz_err_dns'] = 'Es gab einen Fehler beim Setzen der DNS';
$l['openvz_err_cpu'] = 'Es gab einen Fehler beim Einstellen der CPU-Einheiten';
$l['openvz_err_cpulim'] =  'Es gab einen Fehler beim Einstellen des CPU-Limit';
$l['openvz_err_cores'] = 'Es gab einen Fehler beim Einstellen der CPU-Kerne';
$l['openvz_err_ioprio'] = 'Es gab einen Fehler beim Einstellen der IO-Priorit&auml;t';
$l['openvz_err_create'] = 'Es gab einen Fehler beim Erstellen des Containers';
$l['vswap_error'] = 'Es gab einen Fehler beim Einstellen der VSwap Einstellungen';
$l['openvz_err_uefi'] =  'There was an error setting UEFI Boot';
$l['openvz_err_bios'] =  'There was an error setting BIOS Boot';

// Rescue Disk Errors
$l['err_downloading'] = 'Es gab einen Fehler beim Download des Rettungssystem-Template';
$l['err_delete_disk'] = 'Es gab einen Fehler beim L&ouml;schen des Rettungssystems';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = 'Gesperrt';
$l['vps_is_suspended'] = 'Dieser '.VM_SHORT.' ist Gesperrt. Sie können keine Aktionen für diesen '.VM_SHORT.' durchführen!';
$l['suspend_reason_bw'] = 'Der '.VM_SHORT.' ist aufgrund der Überschreitung seines Datenverkehrs gesperrt. Sie können keine weiteren Aktionen für diesen '.VM_SHORT.' durchführen!';

$l['unknown'] = 'Unbekannt';
$l['change_onboot'] = 'Wird geändert, wenn der '.VM_SHORT.' wieder gestartet wird.';
$l['completed'] = 'Fertiggestellt';
$l['vpsdisk_resize_err'] = 'Es gab einen Fehler beim Ändern der Größe der Festplatte';
$l['mount_undetermined'] = 'Es wurde kein Linux-Partition auf dem '.VM_SHORT.' gefunden';
$l['disk_destroy_err'] = 'Es gab einen Fehler, beim Löschen der Festplatte';
$l['started'] = 'Gestartet';
$l['ended'] = 'Beendet';
$l['updated'] = 'Aktualisiert';
$l['edit_xcperror'] = 'Es gab einen Fehler beim Versuch, den '.VM_SHORT.' zu bearbeiten';
$l['bandwidth_threshold_mail_sub'] = 'Traffic-Limit erreicht';
$l['bandwidth_threshold_mail_message'] = 'Hallo,

Ihr '.VM_SHORT.' {{hostname}} hat {{vps_bandwidth_threshold}} % des Traffic-Limit erreicht

Der '.VM_SHORT.' hat {{used_gb}} GB des Traffic von {{limit_gb}} GB genutzt.

Viele Grüße,
{{sn}}';
$l['bandwidth_mail_sub'] = VM_SHORT.' gesperrt durch Traffic Überbeanspruchung';
$l['bandwidth_mail_message'] = 'Hallo,

Ihr '.VM_SHORT.' `{{hostname}}` wurde gesperrt, da Sie den im Tarif enthaltenen Traffic überschritten haben.

Ihr '.VM_SHORT.' hat {{used_gb}} GB Traffic verbraucht, aber es sind nur {{limit_gb}} GB im Tarif enthalten.

Viele Grüße,
{{sn}}';

$l['temp_vps_net_speed_capped'] = VM_SHORT.' Network Speed Capped';
$l['temp_vps_net_speed_capped_restore'] = VM_SHORT.' Network Speed Restored';

$l['speed_capped_mail_sub'] = VM_SHORT.'-Netzwerkgeschwindigkeit begrenzt durch Trafficüberschreitung';
$l['speed_capped_mail_message'] = 'Hallo,

die Netzwerkgeschwindigkeit Ihres '.VM_SHORT.' {{hostname}} wurde reduziert, da Sie das angegebene Traff-Limit überschritten haben.

Der '.VM_SHORT.' hat {{used_gb}} GB des zugeteilten Limits von {{limit_gb}} GB verbraucht.

Viele Grüße,
{{sn}}';

$l['removed_speed_capped_mail_sub'] = 'Die '.VM_SHORT.'-Netzwerkgeschwindigkeit wurde wiederhergestellt';
$l['removed_speed_capped_mail_message'] = 'Hallo,

die Netzwerkgeschwindigkeit Ihres '.VM_SHORT.' {{hostname}} wurde wiederhergestellt.

Der '.VM_SHORT.' hat {{used_gb}} GB des zugeteilten Limits von {{limit_gb}} GB verbraucht.

Viele Grüße,
{{sn}}';

// Power cron Notification
$l['self_shutdown_sub'] = VM_SHORT.' {{action}}';
$l['self_shutdown_body'] = 'Hallo,

Ihr '.VM_SHORT.' {{vpsid}} wurde {{action}} nach der Zeit, die Sie eingestellt haben ({{time}})
';

$l['self_shutdown_start'] = 'Gestartet';
$l['self_shutdown_stop'] = 'Heruntergefahren';
$l['self_shutdown_restart'] = 'Neu gestartet';
$l['self_shutdown_poweroff'] = 'Ausgeschaltet';

$l['self_shutdown_start_failed'] = 'Konnte nicht gestartet werden';
$l['self_shutdown_stop_failed'] = 'Konnte nicht heruntergefahren werden';
$l['self_shutdown_restart_failed'] = 'Konnte nicht neu gestartet werden';
$l['self_shutdown_poweroff_failed'] = 'Konnte nicht ausgeschaltet werden';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'Es war nicht möglich, die Proxmox api anzurufen. Bitte geben Sie die Proxmox-Daten unter Konfiguration -> Slave-Einstellungen ein.';

// Speed cap messages and label:
$l['speed_cap_down']= 'Reduzierte Download-Geschwindigkeit';
$l['exp_speed_cap_down'] = 'Die Download-Geschwindigkeit, nachdem der Traffic für einen '.VM_SHORT.' überschritten wurde. 0 oder leerer Wert bedeutet keine Reduzierung der Geschwindigkeit.';
$l['speed_cap_up']= 'Reduzierte Upload-Geschwindigkeit ';
$l['exp_speed_cap_up'] = 'Die Upload-Geschwindigkeit, nachdem der Traffic für einen '.VM_SHORT.' überschritten wurde. 0 oder leerer Wert bedeutet keine Reduzierung der Geschwindigkeit.';

// ISO Related
$l['admin_iso'] = 'Admin ISO';
$l['eu_iso'] = 'Endbenutzer ISO';

$l['enable_billing'] = 'Die Rechnungseinstellung ist deaktiviert. Bitte aktivieren Sie das zuerst unter den <a href="'.$globals['index'].'act=billing">Abrechnungseinstellungen</a>.';

// Webuzo Script Categories
$l['cat_php_forums'] = 'Forums';
$l['cat_php_blogs'] = 'Blogs';
$l['cat_php_cms'] = 'Portale/CMS';
$l['cat_php_galleries'] = 'Bildergalerien';
$l['cat_php_wikis'] = 'Wikis';
$l['cat_php_admanager'] = 'Ad Management';
$l['cat_php_calendars'] = 'Kalender';
$l['cat_php_games'] = 'Gaming';
$l['cat_php_mail'] = 'Mails';
$l['cat_php_polls'] = 'Umfragen';
$l['cat_php_projectman'] = 'Projektmanagement';
$l['cat_php_ecommerce'] = 'E-Commerce';
$l['cat_php_guestbooks'] = 'Gästebücher';
$l['cat_php_customersupport'] = 'Kundendienst';
$l['cat_php_others'] = 'Andere';
$l['cat_php_music'] = 'Musik';
$l['cat_php_video'] = 'Video';
$l['cat_php_rss'] = 'RSS';
$l['cat_php_socialnetworking'] = 'Social Networking';
$l['cat_php_microblogs'] = 'Micro Blogs';
$l['cat_php_frameworks'] = 'Frameworks';
$l['cat_php_educational'] = 'Lehrreich';
$l['cat_php_erp'] = 'ERP';
$l['cat_php_dbtools'] = 'DB Tools';
$l['cat_php_files'] = 'Dokumentenverwaltung';

$l['inv_winpass_chars'] = 'Zulässige Sonderzeichen für das Windows Admin-Passwort sind :';
$l['invalid_transaction'] = 'Transaktion fehlgeschlagen / ungültig. Bitte versuche es erneut';
$l['success'] = 'Erfolgreich';
$l['failed'] = 'Fehlgeschlagen';

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

$l['add_ssh_key'] = 'Add SSH key';
$l['add_ssh_key_exp'] = 'Add public key in '.VM_SHORT.'.<br>NOTE : This key will not be saved.';
$l['sshkey_setting'] = 'SSH Key Settings';
$l['disable_password'] = 'Disable password authentication';
$l['disable_password_exp'] = 'If enabled then password authentication will be restricted for SSH.';
$l['recreate_keys'] = 'Recreate SSH Keys';
$l['recreate_keys_exp'] = 'If enabled then password authentication will be restricted for SSH and will generate a pair of SSH keys or if <b>Disable password authentication</b> is already enabled in '.VM_SHORT.' then old keys will be replaced with the new one';
$l['sel_ssh_key'] = 'Select SSH keys';
$l['err_inv_ssh_key'] = 'The public key you specified is invalid';
$l['generate_keys'] = 'Generate SSH Keys';
$l['add_ssh_keys'] = 'Add SSH Keys';
$l['use_ssh_keys'] = 'Use Existing Keys';
$l['no_ssh_keys'] = 'No SSH keys found!';
$l['no_ssh_option'] = 'Please Select one SSH option';
$l['no_key_provided'] = 'Please provide SSH key';


//Tun Tap Handle
$l['tuntap_handle'] = 'Tun/Tap Handle';
$l['enable_tuntap'] = 'Enabling Tun/Tap';
$l['disable_tuntap'] = 'Disabling Tun/Tap';

//disable panel
$l['panel_message'] = 'Panel access is disabled by administrator';
$l['panel_subject'] = 'Panel is disabled';
$l['server_ram_threshold'] = 'RAM threshold level reached';
$l['server_disk_threshold'] = 'Disk threshold level reached';
$l['server_locked_warn'] = 'Server locked due to overusage';
$l['vm_locked_backup'] = VM_SHORT.' backup is running';
$l['vm_locked_restore'] = VM_SHORT.' restore is running';

//notification languages
$l['bandwidth_threshold_notify'] = VM_SHORT.' {{hostname}} ({{vpsid}}) has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB.<br>';
$l['bandwidth_mail_message_notify'] = 'Your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been suspended because it has overused its assigned bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth but it was allowed only {{limit_gb}} GB.<br>';
$l['speed_capped_mail_message_notify'] = 'The network speed of your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been capped because it has reached its assigned bandwidth limit.<br>
The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of allowed {{limit_gb}} GB.<br>';
$l['removed_speed_capped_mail_notify'] = 'The network speed of your '.VM_SHORT.' {{hostname}} ({{vpsid}}) has been restored.';

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
$l['no_info'] = 'No API logs found!';
$l['api_key'] = 'API key';
$l['api_val'] = 'API Password';
$l['api_id'] = 'API ID';
$l['api_actions'] = 'Actions';
$l['taskid'] = 'Task ID';
$l['uid'] = 'User Email';
$l['from_ip'] = 'Source IP';
$l['time'] = 'Time';
$l['data'] = 'Extra Info';
$l['search_id'] = 'VPS ID';
$l['action_create'] = 'Create API';
$l['action_delete'] = 'Delete API';
$l['action_edit'] = 'Edit API';
$l['state_true'] = 'Successful';
$l['state_false'] = 'Failed';
$l['action'] = 'Action';
$l['status'] = 'Status';
$l['submit'] = 'Submit';
$l['src_ip'] = 'Source IP';
$l['act_new_api'] = 'Create new API pair';
$l['act_edit_api'] = 'Edit API performed';
$l['act_delete_api'] = 'Deleted API pair';
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
$l['act_profile'] = 'Profile';
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

$l['enduser_vps_firewall_disabled'] = VM_SHORT.' Firewall is disabled';
$l['bulk_enduser_vps_firewall_remove'] = 'Enduser firewall rules removed for multiple '.VM_SHORT;