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
// ----------------------------------------------------------
// Deutsche Übersetzung für VIRTUALIZOR
// ----------------------------------------------------------
// Von: Danny Lotz
// Datum: 22.09.2014
// Web: https://www.1fire.de
// ===========================================================
///////////////////////////////////////////////////////////////

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
$l['dock_vps'] = 'Virtual Server anzeigen';

// Left Menu
$l['lm_file_mgr'] = 'Datei-Manager';
$l['lm_res'] = 'Ressourcen';
$l['lm_performance'] = 'Performance';
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
$l['lm_disk'] = 'Speicherplatz';
$l['lm_ostemp'] ='OS neu installieren';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Logs';
$l['lm_ips'] = 'IP-Adressen';
$l['lm_backup'] = 'OpenVZ Backups';
$l['lm_hvmsettings'] = 'VPS Konfiguration';
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

// Users left menu
$l['lm_vs'] = 'VPS anzeigen';
$l['lm_addvs'] = 'VPS starten';
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

// Create VPS related for Kernel
$l['build_no_vs'] = 'Der VPS wurde nicht in der Datenbank gefunden';
$l['build_no_os'] = 'Das OS-Template wurde nicht gefunden';
$l['build_no_ip'] = 'Die prim&auml;re IP fehlt f&uuml;r den VPS';
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

// Xen VPS Creation errors
$l['xen_err_lvm'] = 'Es gab einen Fehler bei der Erstellung des LVM f&uuml;r den VPS';
$l['xen_err_swap'] = 'Es gab einen Fehler bei der Erstellung des SWAP f&uuml;r den VPS';
$l['xen_err_tmp'] = 'Es gab einen Fehler bei der Erstellung des Mount Point';
$l['xen_err_mount'] = 'Es gab einen Fehler beim mounten des VPS LVM';
$l['xen_err_unmount'] = 'Es gab einen Fehler beim unmounten des VPS LVM';
$l['xen_err_dd'] = 'Es ist ein Fehler während der Laufwerk Kopie aufgetreten';
$l['xen_err_mkfs'] = 'Es gab einen Fehler beim Formatieren des VPS';
$l['xen_err_mkswap'] = 'Es gab einen Fehler beim Formatieren des SWAP f&uuml;r diesen VPS';
$l['xen_err_untar'] = 'Es gab einen Fehler beim Entpacken der OS-Vorlage';
$l['xen_err_part'] = 'Es gab einen Fehler beim Erstellen der Festplattenpartition(en)';
$l['xen_err_kpart'] = 'Es gab einen Fehler beim Abbilden der Partition(en)';
$l['xen_err_resizefs'] = 'Es gab einen Fehler beim &Auml;ndern der Gr&ouml;&szlig;e des Dateisystems';

// XCP VPS Creation errors
$l['xcp_err_vdi'] = 'Es gab einen Fehler bei der Erstellung des VDI der VM';
$l['xcp_err_iso'] = 'Es gab einen Fehler beim Laden des ISO';
$l['xcp_err_vif'] = 'Es gab einen Fehler beim Erstellen von VIF f&uuml;r den VPS';
$l['xcp_xentools_missing'] = 'Konnte das Xen Tools ISO nicht finden';

// KVM VPS Creation errors
$l['kvm_err_lvm'] = 'Es gab einen Fehler bei der Erstellung des LVM f&uuml;r den VPS';
$l['kvm_err_mount'] = 'Es gab einen Fehler beim mounten des VPS LVM';
$l['kvm_err_unmount'] = 'Es gab einen Fehler beim unmounten des VPS LVM';
$l['kvm_err_dd'] = 'Es gab einen Fehler beim Erstellen der Festplattenpartition(en)';
$l['kvm_err_resizefs'] = 'Es gab einen Fehler beim &Auml;ndern der Gr&ouml;&szlig;e des Dateisystems'	;
$l['kvm_err_part'] = 'Es gab einen Fehler beim Erstellen der Partition(en)';
$l['kvm_err_kpart'] = 'Es gab einen Fehler beim Abbilden der Partition(en)';
$l['kvm_err_mkswap'] = 'Es gab einen Fehler beim Formatieren des SWAP f&uuml;r diesen VPS';
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC VPS Creation errors
$l['lxc_err_untar'] = 'Beim Extrahieren der OS-Vorlage ist ein Fehler aufgetreten';
$l['lxc_err_unmount'] = 'Beim Aushängen des VPS LVM ist ein Fehler aufgetreten';
$l['lxc_err_resizefs'] = 'Beim Ändern der Größe des Dateisystems ist ein Fehler aufgetreten';
$l['lxc_network'] = 'Die '.$globals['bridge'].' ist nicht gestartet. Bitte führen Sie <b>service virtnetwork start</b> aus.';
$l['lxc_err_mount'] = 'Beim Einhängen des VPS LVM ist ein Fehler aufgetreten';

// Virtuozzo VPS Creation errors
$l['virtuzo_create_error'] = 'Beim Erstellen des VPS ist ein Fehler aufgetreten';
$l['err_vncpass'] = 'Beim Festlegen des VNC-Kennworts ist ein Fehler aufgetreten';
$l['err_set_iso'] = 'Es gab einen Fehler beim hinzufügen der ISO-Datei zum VPS';
$l['err_disk_create'] = 'Beim Erstellen der VPS-Festplatte ist ein Fehler aufgetreten';
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
$l['vps_uuid_empty'] = 'VPS UUID ist leer!';

// OpenVZ VPS Creation errors
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

// Rescue Disk Errors
$l['err_downloading'] = 'Es gab einen Fehler beim Download des Rettungssystem-Template';
$l['err_delete_disk'] = 'Es gab einen Fehler beim L&ouml;schen des Rettungssystems';

// Enduser VPS status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = 'Gesperrt';
$l['vps_is_suspended'] = 'Dieser VPS ist Gesperrt. Sie können keine Aktionen für diesen VPS durchführen!';
$l['suspend_reason_bw'] = 'Der VPS ist aufgrund der Überschreitung seines Datenverkehrs gesperrt. Sie können keine weiteren Aktionen für diesen VPS durchführen!';

$l['unknown'] = 'Unbekannt';
$l['change_onboot'] = 'Wird geändert, wenn der VPS wieder gestartet wird.';
$l['completed'] = 'Fertiggestellt';
$l['vpsdisk_resize_err'] = 'Es gab einen Fehler beim Ändern der Größe der Festplatte';
$l['mount_undetermined'] = 'Es wurde kein Linux-Partition auf dem VPS gefunden';
$l['disk_destroy_err'] = 'Es gab einen Fehler, beim Löschen der Festplatte';
$l['started'] = 'Gestartet';
$l['ended'] = 'Beendet';
$l['updated'] = 'Aktualisiert';
$l['edit_xcperror'] = 'Es gab einen Fehler beim Versuch, den VPS zu bearbeiten';
$l['bandwidth_threshold_mail_sub'] = 'Traffic-Limit erreicht';
$l['bandwidth_threshold_mail_message'] = 'Hallo,

Ihr VPS {{hostname}} hat {{vps_bandwidth_threshold}} % des Traffic-Limit erreicht

Der VPS hat {{used_gb}} GB des Traffic von {{limit_gb}} GB genutzt.

Viele Grüße,
{{sn}}';
$l['bandwidth_mail_sub'] = 'VPS gesperrt durch Traffic Überbeanspruchung';
$l['bandwidth_mail_message'] = 'Hallo,

Ihr VPS `{{hostname}}` wurde gesperrt, da Sie den im Tarif enthaltenen Traffic überschritten haben.

Ihr VPS hat {{used_gb}} GB Traffic verbraucht, aber es sind nur {{limit_gb}} GB im Tarif enthalten.

Viele Grüße,
{{sn}}';

$l['speed_capped_mail_sub'] = 'VPS-Netzwerkgeschwindigkeit begrenzt durch Trafficüberschreitung';
$l['speed_capped_mail_message'] = 'Hallo,

die Netzwerkgeschwindigkeit Ihres VPS {{hostname}} wurde reduziert, da Sie das angegebene Traff-Limit überschritten haben.

Der VPS hat {{used_gb}} GB des zugeteilten Limits von {{limit_gb}} GB verbraucht.

Viele Grüße,
{{sn}}';

$l['removed_speed_capped_mail_sub'] = 'Die VPS-Netzwerkgeschwindigkeit wurde wiederhergestellt';
$l['removed_speed_capped_mail_message'] = 'Hallo,

die Netzwerkgeschwindigkeit Ihres VPS {{hostname}} wurde wiederhergestellt.

Der VPS hat {{used_gb}} GB des zugeteilten Limits von {{limit_gb}} GB verbraucht.

Viele Grüße,
{{sn}}';

// Power cron Notification
$l['self_shutdown_sub'] = 'VPS {{action}}';
$l['self_shutdown_body'] = 'Hallo,

Ihr VPS {{vpsid}} wurde {{action}} nach der Zeit, die Sie eingestellt haben ({{time}})
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
$l['exp_speed_cap_down'] = 'Die Download-Geschwindigkeit, nachdem der Traffic für einen VPS überschritten wurde. 0 oder leerer Wert bedeutet keine Reduzierung der Geschwindigkeit.';
$l['speed_cap_up']= 'Reduzierte Upload-Geschwindigkeit ';
$l['exp_speed_cap_up'] = 'Die Upload-Geschwindigkeit, nachdem der Traffic für einen VPS überschritten wurde. 0 oder leerer Wert bedeutet keine Reduzierung der Geschwindigkeit.';

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

$l['inv_winpass_chars'] = 'Allowed special characters for windows vps root password are :';
$l['invalid_transaction'] = 'Transaction Failed/Invalid. Please try again';
$l['success'] = 'success';
$l['failed'] = 'failed';
