<?php

$l['privacy_policy'] = 'Gizlilik Politikası';
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
$l['lm_passthrough'] = 'Passthrough';
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
$l['lm_volume'] = 'Volumes';
$l['lm_server_aio'] = 'Resources Monitor';

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
$l['kvm_err_lightbit'] = 'There was an error creating the lightbit disk of the '.VM_SHORT;
$l['kvm_err_lightbit_acl'] = 'There was error while getting acl for lightbit';
$l['kvm_err_lightbit_proj'] = 'The lightbit project does not exists on node';
$l['kvm_err_lightbit_storage'] = 'The storage does not exists';

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
$l['openvz_err_uefi'] =  'There was an error setting UEFI Boot';
$l['openvz_err_bios'] =  'There was an error setting BIOS Boot';

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