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
// Türkçe Tercüme VIRTUALIZOR için
// ----------------------------------------------------------
// Tercüme: Yüksel Yıldız
// Tarih  10.02.2019
// Web: https://www.hostmavi.com
// ===========================================================
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
$l['user_data_error_t'] = 'Kullanıcı Verisi Hatası';
$l['user_data_error'] = 'Panel Hesap Bilgilerinizi Yükleyemedi. Lütfen Bunu Sunucu Yöneticisine Bildirin!';

$l['no_license'] = 'LİSANS dosyası bulunamadı! Lütfen bunu sunucu yöneticisine bildirin.';

$l['today'] = '<b>Bugün</b> at ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Tema Hatası';//Title
$l['init_theme_error'] = 'Tema Dosyası Yüklenemiyor - &soft-1;.';

$l['init_theme_func_error_t'] = 'Tema İşlev Hatası';//Title
$l['init_theme_func_error'] = 'Tema İşlev(leri) Yüklenemiyor &soft-1;.';

$l['load_theme_settings_error'] = 'Tema Ayarları Dosyası Yüklenemiyor.';


//Error Handle Function
$l['following_errors_occured'] = 'Aşağıdaki Hatalar Bulundu';

//Success Message Function
$l['following_message'] = 'Aşağıdaki Mesaj Alındı';

//Major Error Function
$l['fatal_error'] = 'Kritik Hata.';
$l['following_fatal_error'] = 'Aşağıdaki Hata Oluştu';

//Message Function
$l['soft_message'] = 'Bildirim';
$l['following_soft_message'] = 'Aşağıdaki Mesaj İade Edildi';

$l['err_user_head'] = 'Hata';
$l['err_user'] = 'Kullanıcı Türü Belirlenemedi';

//Update Softaculous
$l['getting_info'] = 'Bilgi İsteniyor......';
$l['error_getting_latest'] = 'Bilgi alınamadı......Terkediyor';
$l['got_info'] = 'Bilgi Aldındı';
$l['manual_mode'] = 'Softaculous in Yeni sürümü kullanım kılavuzuna dikkatle okuyunuz......Terkediyor';
$l['no_updates'] = 'Mevcut Sürüm Son Sürüm......Devamediyor';
$l['fetch_upgrade'] = 'Güncelleme Alınıyor......';
$l['error_fetch_upgrade'] = 'Güncelleme Dosyası Alınamadı......Bitiriyor';
$l['error_save_upgrade'] = 'Güncelleme Dosyası Kaydedilemedi......Bitiriyor';
$l['got_upgrade'] = 'Yükseltme Dosyasını Kaydetti';
$l['unzip_upgrade'] = 'Dosyaları Açıyor......';
$l['error_unzip_upgrade'] = 'Dosya Açılırken Hata Oluştu......Bitiriyor';
$l['unzipped_upgrade'] = 'Başarıyla Açıldı';
$l['running_upgrade'] = 'Güncelleme Yapılıyor..';
$l['succ_upgrade'] = 'Tamamlandı';
$l['error_upgrade'] = 'Güncelleme Sırasında Aşağıdaki Hatalar Oluştu :';

//MySQL Errors
$l['err_selectmy'] = 'Veritabanı Seçilmedi.';
$l['err_myconn'] = 'Veri Tabanı Baglatısı Kurulamıyor.';
$l['err_makequery'] = 'Sorgu Numaralandırılamadı';
$l['err_mynum'] = 'Verıtabanı Hatası Nummer';
$l['err_myerr'] = 'Veritabanı Hatası';

//hf_theme.php
$l['welcome'] = 'Hoş Geldiniz';
$l['logout'] = 'Çikiş';
$l['page_time'] = 'Sayfa Oluşturuldu';
$l['times_are'] = 'Tüm Zamanlar GMT ';
$l['time_is'] = 'Şu Anki Saat';
$l['load_start'] = 'Başlıyor';
$l['load_stop'] = 'Durduruluyor';
$l['load_restart'] = 'Tekrar Başlıyor';
$l['load_poweroff'] = 'Kapatılıyor';

//The Category Language Variables
$l['dock_restart'] = VM_SHORT.' Tekrar Başlat';
$l['dock_stop'] = VM_SHORT.' Durdur';
$l['dock_start'] = VM_SHORT.' Başlat';
$l['dock_poweroff'] = VM_SHORT.' Kapat';
$l['dock_home'] = 'Ana Sayfa';
$l['dock_settings'] = 'Ayarları Düzenle';
$l['dock_help'] = 'Yardım ve Destek';
$l['dock_sync'] = 'Diğer Otomatik Yükleyicilerle Senkronize Et';
$l['go_home'] = 'Ana Sayfa';
$l['dock_user'] = 'Kullanıcı Profili';
$l['dock_password'] = 'Şifre Değiştir';
$l['dock_vps'] = 'Sanal Sunucuları Listele';

// Left Menu
$l['lm_file_mgr'] = 'Dosya Yöneticisi';
$l['lm_res'] = 'Kaynaklar';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'İşlem';
$l['lm_service'] = 'Servisler';
$l['lm_firewall'] = 'Güvenlik Duvarı';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC Şifresi';
$l['lm_statusc'] = 'Durum Günlükleri';
$l['lm_res_a'] = 'Sistem Uyarıları';
$l['lm_logs'] = 'Görev Kayıtları';
$l['lm_bandwidth'] = 'Bant Genişliği';
$l['lm_accountpass'] = 'Hesap Şifresi';
$l['lm_changepass'] = 'Hesap Şifresi';
$l['lm_controlpanel'] = 'Yönetim Paneli';
$l['lm_recipes'] = 'Uygulamalar';
$l['lm_disk'] = 'Sürücü';
$l['lm_ostemp'] ='İşletim Sistemi Tekrar Kur';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Sunucu Adı';
$l['lm_logs'] = 'Kayıtlar';
$l['lm_ips'] = 'IP Adresleri';
$l['lm_hvmsettings'] = VM_SHORT.' Yapılandırması';
$l['lm_apikey'] = 'API Bilgileri';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'Ters DNS';
$l['lm_support'] = 'Destek';
$l['lm_self_shutdown'] = 'Zaman Ayarlı Kapatma';
$l['lm_tasks'] = 'Görevler';
$l['lm_twofactauth'] = 'Güvenlik Ayarları';
$l['lm_backup2'] = 'Yedekler';
$l['lm_backupservers'] = 'Yedekleme Sunucuları';
$l['lm_sshkeys'] = 'SSH Anahtarı';
$l['lm_installapps'] = 'Uygulamalar';
$l['lm_billing'] = 'Faturlandırma';

// Users left menu
$l['lm_vs'] = VM_SHORT.' Listesi';
$l['lm_addvs'] = 'Uygula';
$l['lm_resources'] = 'Cloud Kaynakları';
$l['lm_users'] = 'Kullanıcılar';
$l['lm_usr_settings'] = 'Ayarlar';
$l['lm_profile'] = 'Profilim';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'Admin Olarak Giriş Yaptınız';
$l['lmapps'] = 'Uygulamalar';

// Page Jump Related :
$l['page_jump_title'] = 'Gitmek İstediğiniz Sayfayı Girin';
$l['page_page'] = 'Sayfa';
$l['page_of'] = 'Sayfası';
$l['page_go'] = 'Git';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = VM_SHORT.' Veritabanında Bulunamadı';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'İşletim Sistemi Şablonu Bulunamadı';
$l['build_no_ip'] = VM_SHORT.' için Ana IP Belirtilmemiş';
$l['build_no_os_iso'] = 'İşletim Sistemi Şablonu veya ISO Dosyası Bulunmadı ';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Sunucu Yanlış Kernelle Çalışmakda  - ';
$l['correct_kernel'] = 'Dogru Kernel ile Sunucuyu Başlatın.';
$l['kvm_module'] = 'Linux-KVM Modulü Yüklenmedi.';
$l['kvm_network'] = ''.$globals['bridge'].' Başlamadı. Lütfen sshde <b>service virtnetwork start</b> Komutu Çalıştırın';
$l['temp_exists'] = 'Şablon Dosyası Zaten Var';
$l['temp_snap_err'] = 'Anlık Görüntü (Snapshot) oluşturulamadı ve bu nedenle şablon oluşturma başarısız oldu. Anlık görüntü (Snapshot) oluşturma genellikle daha az alan nedeniyle başarısız oluyor';
$l['wrong_xm'] = 'XEN Modulü Doğru Şekilde Yüklenmedi';
$l['lxc_module'] = 'LXC Kurulmadı.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = VM_SHORT.'’nin LVM’sini Oluştururken Bir Hata Oluştu';
$l['xen_err_swap'] = VM_SHORT.'’nin SWAP’ını Oluştururken Bir Hata Oluştu';
$l['xen_err_tmp'] = 'Mount Noktası Oluştururken Bir Hata Oluştu';
$l['xen_err_mount'] = VM_SHORT.' LVM Bağlanırken (mount)  Edilirken Bir Hata Oluştu';
$l['xen_err_unmount'] = VM_SHORT.' LVM Bağlantı Kesilirken  (unmount)  Edilirken Bir Hata Oluştu';
$l['xen_err_dd'] = 'Disk Kopyalama İşlemi Sırasında Bir Hata Oluştu';
$l['xen_err_mkfs'] = VM_SHORT.' Formatlarken Bir Hata Oluştu';
$l['xen_err_mkswap'] = VM_SHORT.'nin SWAP Formatlanırken Bir Hata Oluştu';
$l['xen_err_untar'] = 'İşletim Sistemi Şablonu Açılırken Bir Hata Oluştu';
$l['xen_err_part'] = 'Disk Bölümleri Oluşturulurken Bir Hata Oluştu';
$l['xen_err_kpart'] = 'Bölümleri Eşlerken Bir Hata Oluştu';
$l['xen_err_resizefs'] = 'Dosya Sistemini Yeniden Boyutlandırırken Bir Hata Oluştu';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = VM_SHORT.'in VDIsi Oluşturulurken Bir Hata Oluştu';
$l['xcp_err_iso'] = 'ISO Yüklenirken Bir Hata Oluştu';
$l['xcp_err_vif'] = VM_SHORT.' İçin VIF Oluşturulurken Bir Hata Oluştu';
$l['xcp_xentools_missing'] = 'Xentools ISO Bulunamadı';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = VM_SHORT.'’nin LVM’sini Oluştururken Bir Hata Oluştu';
$l['kvm_err_mount'] = VM_SHORT.' LVM Bağlanırken (moount) Bir Hata Oluştu';
$l['kvm_err_unmount'] = VM_SHORT.' LVM nin Bağlatısı Kesilirken  (unmount) Bir Hata Oluştu';
$l['kvm_err_dd'] = 'Disk Kopyalama İşlemi Sırasında Bir Hata Oluştu';
$l['kvm_err_resizefs'] = 'Dosya Sistemini Yeniden Boyutlandırırken Bir Hata Oluştu'	;
$l['kvm_err_part'] = 'Disk Bölümleri Oluşturulurken Bir Hata Oluştu';
$l['kvm_err_kpart'] = 'Bölümleri Eşlerken Bir Hata Oluştu';
$l['kvm_err_mkswap'] = VM_SHORT.'’nin SWAP’ını Biçimlendirirken Bir Hata Oluştu';
$l['kvm_err_ceph_block'] = 'CEPH Blok Cihazı Oluşturulurken Bir Hata Oluştu';
$l['kvm_err_ceph_block_map'] = 'CEPH Blok Cihazını Eşlerken Bir Hata Oluştu';
$l['kvm_err_ceph_block_rmmap'] = 'CEPH Blok Cihazının Haritasının Silinmesinde Bir Hata Oluştu';
$l['kvm_err_ceph_block_rm'] = 'CEPH Blok Cihazının Silinmesinde Bir Hata Oluştu';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'İşletim Sistemi Şablonu Açılırken Bir Hata Oluştu ';
$l['lxc_err_unmount'] = VM_SHORT.' LVM nin Bağlatısı Kesilirken  (unmount) Bir Hata Oluştu';
$l['lxc_err_resizefs'] = 'Dosya Sistemini Yeniden Boyutlandırırken Bir Hata Oluştu';
$l['lxc_network'] = ''.$globals['bridge'].' Başlamadı. Lütfen sshde <b>service virtnetwork start</b> Komutu Çalıştırın';
$l['lxc_err_mount'] = VM_SHORT.' LVM Bağlanırken Bir Hata Oluştu';

// Virtuozzo '.VM_SHORT.' Creation errors
$l['virtuzo_create_error'] = VM_SHORT.' Oluşturulurken Bir Hata Oluştu';
$l['err_vncpass'] = 'VNC Şifresi Ayarlanırken Bir Hata Oluştu';
$l['err_set_iso'] = 'ISO’yu '.VM_SHORT.'’ye Takmada Bir Tane Vardı';
$l['err_disk_create'] = VM_SHORT.' Diski Oluşturulurken Bir Hata Oluştu';
$l['err_set_boot_order'] = 'Önyükleme Sırasını Ayarlarken Bir Hata Oluştu';
$l['err_set_ram'] = 'RAM Ayarlanırken Bir Hata Oluştu';
$l['err_set_pinning'] = 'CPU İlişkisi Ayarlanırken Bir Hata Oluştu';
$l['err_install_tools'] = 'Konuk Araçları Yüklenirken Bir Hata Oluştu';

//Backup errors
$l['backup_err_mount'] = 'LVMnin Geçici Depolama İçin Bağlanırken (mount)  Edilirken Bir Hata Oluştu';
$l['backup_err_lvm'] = 'Geçici Depolama İçin LVM Oluşturulurken Bir Hata Oluştu.';
$l['backup_err_mkfs'] = 'Geçici Depolama Formatlanırken Bir Hata Oluştu';
$l['backup_err_mkdir'] = 'Geçici Depolama Bağlama (mount) Noktası dizini Oluşturulurken Bir Hata Oluştu';
$l['kvm_err_tar'] = 'Arşiv Sıkıştırılırken Bir Hata Oluştu';
$l['xen_err_tar'] = 'Arşiv Sıkıştırılırken Bir Hata Oluştu';
$l['kvm_err_untar'] = 'Arşivi Açarken Bir Hata Oluştu';
$l['backup_err_untar'] = 'Arşivi Açarken Bir Hata Oluştu';
$l['err_vzdump'] = 'Yedekleme Aracında Bir Hata Oluştu';
$l['err_create_backup_folder'] = 'Yedekleme Dizini Oluşturulurken Bir Hata Oluştu';
$l['err_create_backup_date_folder'] = 'Yedekleme Tarihi Dizini Oluşturulurken Bir Hata Oluştu';
$l['err_backup_command_fail'] = 'Yedek İmaj Oluşturulamadı, Dönüş Kodu : ';
$l['backup_err_snap_switch'] = 'Snapshota Dönülürken Burada Bir Hata Oluştu ';
$l['backup_err_snap_del'] = 'Snapshot (İmaj) Silinirken Bir Hata Oluştu';
$l['vps_uuid_empty'] = VM_SHORT.' UUID Boş!';
$l['vg_space_arr'] = 'There is not enough space in ';

// OpenVZ '.VM_SHORT.' Creation errors
$l['openvz_err_ubc'] = 'UBC Ayarları Kaydedilirken Bir Hata Oluştu';
$l['openvz_err_ostemplate'] = 'İşletim Sistemi Şablonu Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_space'] = 'Disk Alanı Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_inodes'] = 'Disk Alanı Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_hostname'] = 'Sunuc Adı Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_ip'] = 'IP Adresini Ayarlarken Bir Hata Oluştu';
$l['openvz_err_dns'] = 'DNS Ayarlarında Bir Hata Oluştu';
$l['openvz_err_cpu'] = 'CPU Birimlerini Ayarlarken Bir Hata Oluştu';
$l['openvz_err_cpulim'] =  'CPU Sınırını Ayarlarken Bir Hata Oluştu';
$l['openvz_err_cores'] = 'CPU Çekirdeği Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_ioprio'] = 'I/O Önceliği Ayarlanırken Bir Hata Oluştu';
$l['openvz_err_create'] = VM_SHORT.' Oluşturulurken Bir Hata Oluştu';
$l['vswap_error'] = 'VSwap Ayarları Yapılırken Bir Hata Oluştu';

// Rescue Disk Errors
$l['err_downloading'] = 'Kurtarma Şablonunu İndirirken Bir Hata Oluştu';
$l['err_delete_disk'] = 'Kurtarma Diskini Silerken Bir Hata Oluştu';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Açık';
$l['lm_status_offline'] = 'Kapalı';
$l['lm_status_suspended'] = 'Askıda';
$l['vps_is_suspended'] = 'Bu '.VM_SHORT.' Askıya Alındı. '.VM_SHORT.' İçin Hiçbir İşlem Yapamazsınız. !';
$l['suspend_reason_bw'] = 'Bu '.VM_SHORT.', Bant Genişliği Kullanım Nedeniyle Askıya Alındı. '.VM_SHORT.' İçin Hiçbir İşlem Yapamazsınız. !';

$l['unknown'] = 'Bilinmiyor';
$l['change_onboot'] = VM_SHORT.' Yeniden Boot Edildiginde Değişiklik Gerçekleşecek.';
$l['completed'] = 'Tamamlandı';
$l['vpsdisk_resize_err'] = 'Diskleri Yeniden Boyutlandırırken Bir Hata Oluştu';
$l['mount_undetermined'] = VM_SHORT.'de Hiçbir Linux Bölümü Bulunamadı';
$l['disk_destroy_err'] = 'Diskleri Silerken Bir Hata Oluştu';
$l['started'] = 'Başladı';
$l['ended'] = 'Bitti';
$l['updated'] = 'Güncenlendi';
$l['edit_xcperror'] = VM_SHORT.'i Düzenlemeye Çalışırken Bir Hata Oluştu';
$l['bandwidth_threshold_mail_sub'] = 'Bant Genişliği  Aşıldı';
$l['bandwidth_threshold_mail_message'] = 'Merhaba,

 '.VM_SHORT.'iniz {{hostname}} Aylık trafik Limiitini {{vps_bandwidth_threshold}} % Geçmiştir.

'.VM_SHORT.'iniz  Bant Genişliği  limitinızin {{limit_gb}} GB tından   {{used_gb}} GB  Trafik Kullanmıştır . 

Saygılarla,
{{sn}}';

$l['bandwidth_mail_sub'] = ' '.VM_SHORT.'  Bant Genişliği Aşırı Kullanımı nedeniyle Askıya Alıdı '.VM_SHORT;
$l['bandwidth_mail_message'] = 'Merhaba,

 '.VM_SHORT.'iniz `{{hostname}}` Askıya Alındı, çünkü Aylı kBant Genişliği sınırınızı aştınız.

'.VM_SHORT.'iniz  {{used_gb}} GB Trafik kullandı. Fakat Aylık Bant Genişliği limitiniz {{limit_gb}} GB. 

Saygılarla,
{{sn}}';

$l['temp_vps_net_speed_capped'] = VM_SHORT.' Network Speed Capped';
$l['temp_vps_net_speed_capped_restore'] = VM_SHORT.' Network Speed Restored';

$l['speed_capped_mail_sub'] = VM_SHORT.' Ağ Hızı, Bant Genişliği aşırı kullanımı nedeniyle sınırlandı';
$l['speed_capped_mail_message'] = 'Merhaba,

'.VM_SHORT.'iniz  {{hostname}} AĞ Hızı Bant Genişliği aşırı kullanımı nedeniyle sınırlandı

'.VM_SHORT.'iniz  {{used_gb}} GB trafik kullandı. Fakat Aylık Bant Genişliği limitiniz {{limit_gb}} GB. 

Saygılarla,
{{sn}}';

$l['removed_speed_capped_mail_sub'] = VM_SHORT.' AĞ Hızı geri yüklendi';
$l['removed_speed_capped_mail_message'] = 'Merhaba,

'.VM_SHORT.' {{hostname}} Ağ Hızı sınır limitiniz kaldırıldı.  Ağ Hızınız Eski değerler yüklendi

'.VM_SHORT.'iniz  {{used_gb}} GB Bant Genişliği kullandı. Aylık Bant Genişliği limitiniz {{limit_gb}} GB.

Saygılarla,
{{sn}}';

// Power cron Notification
$l['self_shutdown_sub'] = VM_SHORT.' {{action}}';
$l['self_shutdown_body'] = 'Merhaba

'.VM_SHORT.'iniz {{vpsid}} Yaman Ayarınız ({{time}}) da işlem {{action}} başladı. 
';

$l['self_shutdown_start'] = 'Başlat';
$l['self_shutdown_stop'] = 'Durdur';
$l['self_shutdown_restart'] = 'Tekrar başlat';
$l['self_shutdown_poweroff'] = 'Kapat';

$l['self_shutdown_start_failed'] = 'Başlatılamadı';
$l['self_shutdown_stop_failed'] = 'Durdurulamadı';
$l['self_shutdown_restart_failed'] = 'Yeniden Başlatılamadı';
$l['self_shutdown_poweroff_failed'] = 'Kapatılamadı';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'proxmox api çağrısı yapılamadı. Lütfen yapılandırmada proxmox detaylarını girin Yapılandırma -> Slave Ayarları';

// Speed cap messages and label:
$l['speed_cap_down']= 'Limitlendirillmiş  Download Hızı ';
$l['exp_speed_cap_down'] = 'Bant genişliği '.VM_SHORT.' için aşırı kullanıldıktan sonra indirme hızı, 0 veya boş değer sınırlama olmadığını gösterir';
$l['speed_cap_up']= 'Limitlenrilmiş Upload Hızı ';
$l['exp_speed_cap_up'] = 'Bant Genişliği '.VM_SHORT.' için aşırı kullanıldıktan sonra yükleme hızı, 0 veya boş değer sınırlama olmadığını gösterir';

// ISO Related
$l['admin_iso'] = 'Admin ISO(ları)';
$l['eu_iso'] = 'Kullanıcı ISO(ları)';

$l['enable_billing'] = 'Fatura Ayarı devre dışı bırakıldı. Lütfen önce şunu etkinleştirin: <a href="'.$globals['index'].'act=billing">Ödeme Ayarları</a>.';

// Webuzo Script Categories
$l['cat_php_forums'] = 'Forumlar';
$l['cat_php_blogs'] = 'Bloglar';
$l['cat_php_cms'] = 'Portallar/CMS';
$l['cat_php_galleries'] = 'Resim Galerisi';
$l['cat_php_wikis'] = 'Wiki';
$l['cat_php_admanager'] = 'Reklam yönetimi';
$l['cat_php_calendars'] = 'Takvimler';
$l['cat_php_games'] = 'Oyun';
$l['cat_php_mail'] = 'E-Posta';
$l['cat_php_polls'] = 'Anketler';
$l['cat_php_projectman'] = 'Proje Yönetimi';
$l['cat_php_ecommerce'] = 'E-Ticaret';
$l['cat_php_guestbooks'] = 'ziyaretçi defteri';
$l['cat_php_customersupport'] = 'Müşteri desteği';
$l['cat_php_others'] = 'Diger';
$l['cat_php_music'] = 'Müzik';
$l['cat_php_video'] = 'Video';
$l['cat_php_rss'] = 'RSS';
$l['cat_php_socialnetworking'] = 'Sosyal Ağlar';
$l['cat_php_microblogs'] = 'Micro Bloglar';
$l['cat_php_frameworks'] = 'Frameworks';
$l['cat_php_educational'] = 'Eğitici';
$l['cat_php_erp'] = 'ERP';
$l['cat_php_dbtools'] = 'Veri Tabanı Araçları';
$l['cat_php_files'] = 'Dosya Yöneticisi';

$l['inv_winpass_chars'] = 'Windows '.VM_SHORT.' ROOT Şifresi İçin İzin Verilen Özel Karakterler :';
$l['invalid_transaction'] = 'İşlem Başarısız / Geçersiz. Lütfen Tekrar Deneyin';
$l['success'] = 'Başarılı';
$l['failed'] = 'Hatalı';

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