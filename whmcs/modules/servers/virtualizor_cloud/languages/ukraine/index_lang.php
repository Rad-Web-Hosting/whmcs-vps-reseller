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
$l['user_data_error_t'] = 'Помилка даних користувача';
$l['user_data_error'] = 'Не вдалося завантажити інформацію про обліковий запис. Повідомте про це адміністратора сервера!';

$l['no_license'] = 'Файл LICENSE не знайдено! Повідомте про це адміністратора сервера!.';

$l['today'] = '<b>Today</b> at ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Помилка теми';//Title
$l['init_theme_error'] = 'Не вдалося завантажити файл теми - & soft-1 ;.';

$l['init_theme_func_error_t'] = 'Помилка функції теми';//Title
$l['init_theme_func_error'] = 'Неможливо завантажити функції теми & soft-1 ;.';

$l['load_theme_settings_error'] = 'Не вдалося завантажити файл налаштувань тем.';


//Error Handle Function
$l['following_errors_occured'] = 'Виявлено наступні помилки:';

//Success Message Function
$l['following_message'] = 'Надіслано наступне повідодмлення:';

//Major Error Function
$l['fatal_error'] = 'Критична помилка';
$l['following_fatal_error'] = 'Виникла наступна критична помилка:';

//Message Function
$l['soft_message'] = 'Повідомлення';
$l['following_soft_message'] = 'Було надіслано наступне повідомлення:';

$l['err_user_head'] = 'Помилка';
$l['err_user'] = 'Не вдалося визначити тип користувача';

//Update Softaculous
$l['getting_info'] = 'Запит інформації ......';
$l['error_getting_latest'] = 'Не вдалося отримати інформацію ... В доступі відмовлено';
$l['got_info'] = 'Got information';
$l['manual_mode'] = 'Нова версія Softaculous вимагає ручного втручання ...... Відмова від відповідальності';
$l['no_updates'] = 'Поточна версія - остання версія ...... Продовження';
$l['fetch_upgrade'] = 'Fetching Upgrade......';
$l['error_fetch_upgrade'] = 'Не вдалося отримати файл оновлення ...';
$l['error_save_upgrade'] = 'Не вдалося зберегти файл оновлення ... Відмовитись';
$l['got_upgrade'] = 'Файл оновлення збережено';
$l['unzip_upgrade'] = 'Розпакування файлів......';
$l['error_unzip_upgrade'] = 'Помилка розпакування ... Відмова';
$l['unzipped_upgrade'] = 'Розпаковано успішно';
$l['running_upgrade'] = 'Запуск оновлення ......';
$l['succ_upgrade'] = 'Завершено';
$l['error_upgrade'] = 'В процесі оновлення виникли наступні помилки:';

//MySQL Errors
$l['err_selectmy'] = 'База даних MySQL не може бути обрана.';
$l['err_myconn'] = 'Не вдалося встановити з’єднання MySQL.';
$l['err_makequery'] = 'Не вдалося виконати запит з номером';
$l['err_mynum'] = 'Помилки MySQL відсутні';
$l['err_myerr'] = 'Помилка MySQL';

//hf_theme.php
$l['welcome'] = 'Ласкаво просимо';
$l['logout'] = 'Вийти';
$l['page_time'] = 'Сторінка, створена в';
$l['times_are'] = 'Часовий пояс: GMT';
$l['time_is'] = 'The time now is';
$l['load_start'] = 'Старт';
$l['load_stop'] = 'Зупинка';
$l['load_restart'] = 'Рестарт';
$l['load_poweroff'] = 'Вимкнення';

//The Category Language Variables
$l['dock_restart'] = 'Перезапустити контейнер';
$l['dock_stop'] = 'Зупинити контейнер';
$l['dock_start'] = 'Запустити контейнер';
$l['dock_poweroff'] = 'Вимкнути контейнер';
$l['dock_home'] = 'Додому';
$l['dock_settings'] = 'Змінити налаштування';
$l['dock_help'] = 'Допомога та підтримка';
$l['dock_sync'] = 'Синхронізація з іншими автоналаштуваннями';
$l['go_home'] = 'Додому';
$l['dock_user'] = 'Профіль користувача';
$l['dock_password'] = 'Змінити пароль';
$l['dock_vps'] = 'Перелік '.VM_SHORT;

// Left Menu
$l['lm_file_mgr'] = 'Файловий менеджер';
$l['lm_res'] = 'Ресурси';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'Процеси';
$l['lm_service'] = 'Сервіси';
$l['lm_firewall'] = 'Брандмауер';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC пароль';
$l['lm_statusc'] = 'Журнал подій';
$l['lm_res_a'] = 'Системні оповіщення';
$l['lm_logs'] = 'Журнали завдань';
$l['lm_bandwidth'] = 'Пропускна здатність';
$l['lm_accountpass'] = 'Пароль від аккаунта';
$l['lm_changepass'] = 'Змінити пароль';
$l['lm_controlpanel'] = 'Панель керування';
$l['lm_recipes'] = 'Завдання';
$l['lm_disk'] = 'Disk';
$l['lm_ostemp'] ='Перевстановлення ОС';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Логи';
$l['lm_ips'] = 'IP-адреса';
$l['lm_hvmsettings'] = VM_SHORT.' налаштування';
$l['lm_apikey'] = 'Облікові дані API';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'Зворотний DNS';
$l['lm_support'] = 'Підтримка';
$l['lm_self_shutdown'] = 'Автозапуск';
$l['lm_tasks'] = 'Перелік дій';
$l['lm_twofactauth'] = 'Налаштування безпеки';
$l['lm_backup2'] = 'Backups';
$l['lm_backupservers'] = 'Backup Servers';
$l['lm_sshkeys'] = 'SSH Keys';
$l['lm_installapps'] = 'Applications';
$l['lm_billing'] = 'Billing';


// Users left menu
$l['lm_vs'] = 'Перелік '.VM_SHORT;
$l['lm_addvs'] = 'Launch '.VM_SHORT;
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Налаштування';
$l['lm_profile'] = 'Профіль';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'Ви увійшли як адміністратор';
$l['lmapps'] = 'Applications';

// Page Jump Related :
$l['page_jump_title'] = 'Введіть стрінку, щоб перейти до';
$l['page_page'] = 'сторінка';
$l['page_of'] = 'з';
$l['page_go'] = 'далі';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = VM_SHORT.' не знайдений в базі даних';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'Шаблон ОС не знайдено';
$l['build_no_ip'] = 'Первинна IP відсутня для '.VM_SHORT;
$l['build_no_os_iso'] = 'Шаблон ОС або файла ISO не знайдено';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Завантаження у неправильне ядро - ';
$l['correct_kernel'] = 'Виконайте перезавантаження у правильне ядро.';
$l['kvm_module'] = 'Модуль Linux-KVM не завантажено.';
$l['kvm_network'] = 'The '.$globals['bridge'].'Не запускається. Запустіть <b> запуск служби virtnetwork </b>';
$l['temp_exists'] = 'Файл шаблона вже існує';
$l['temp_snap_err'] = 'The Snapshot could not be created and hence the template creation failed. The snapshot creation generally fails because of less space';
$l['wrong_xm'] = 'Модуль XEN завантажено неправильно';
$l['lxc_module'] = 'LXC не встановлено.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'Виникла помилка створення LVM '.VM_SHORT;
$l['xen_err_swap'] = 'Виникла помилка створення SWAP '.VM_SHORT;
$l['xen_err_tmp'] = 'Помилка під час створення точки монтування';
$l['xen_err_mount'] = 'Виникла помилка створення '.VM_SHORT.' LVM';
$l['xen_err_unmount'] = 'Виникла помилка розмонтування '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'Під час операції копіювання диску виникла помилка';
$l['xen_err_mkfs'] = 'Під час форматування '.VM_SHORT.' виникла помилка';
$l['xen_err_mkswap'] = 'Під час форматування SWAP '.VM_SHORT.' виникла помилка';
$l['xen_err_untar'] = 'Під час вилученння образу ОС виникла помилка';
$l['xen_err_part'] = 'Під час сторення розділів диску виникла помилка';
$l['xen_err_kpart'] = 'В процесі відображення розділа (-ів) виникла помилка';
$l['xen_err_resizefs'] = 'Під час зміни розміру файлової системи виникла помилка';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = 'Під час створення VDI віртуальної машини винилка помилка';
$l['xcp_err_iso'] = 'В процесі завантаження ISO виникла помилка';
$l['xcp_err_vif'] = 'Під час створення VIF для '.VM_SHORT.' винилка помилка';
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = 'Виникла помилка створення LVM '.VM_SHORT;
$l['kvm_err_mount'] = 'Виникла помилка встановлення '.VM_SHORT.' LVM';
$l['kvm_err_unmount'] = 'Виникла помилка розмонтування '.VM_SHORT.' LVM';
$l['kvm_err_dd'] = 'Під час операції копіювання диску виникла помилка';
$l['kvm_err_resizefs'] = 'В процесі зміни розміру файлової системи виникла помилка'	;
$l['kvm_err_part'] = 'Виникла помилка створення розділу диску';
$l['kvm_err_kpart'] = 'Виникла помилка відображення розділа (-ів)';
$l['kvm_err_mkswap'] = 'Виникла помилка форматування SWAP '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'Виникла помилка вилучення шаблона ОС';
$l['lxc_err_unmount'] = 'Виникла помилка розмонтування '.VM_SHORT.' LVM';
$l['lxc_err_resizefs'] = 'Виникла помилка зміни розміру файлової системи';
$l['lxc_network'] = 'The '.$globals['bridge'].' Не запускається. Запустіть <b> запуск служби virtnetwork </b>';
$l['lxc_err_mount'] = 'Виникла помилка встановлення '.VM_SHORT.' LVM';

// Virtuozzo '.VM_SHORT.' Creation errors
$l['virtuzo_create_error'] = 'Виникла помилка створення '.VM_SHORT;
$l['err_vncpass'] = 'Виникла помилка налаштування пароля VNC';
$l['err_set_iso'] = 'ISO до '.VM_SHORT.' було приєднано';
$l['err_disk_create'] = 'Виникла помилка створення диску '.VM_SHORT;
$l['err_set_boot_order'] = 'Виникла помилка встановлення порядку завантаження';
$l['err_set_ram'] = 'Виникла помилка встановлення ОЗУ';
$l['err_set_pinning'] = 'Виникла помилка встанволення CPU Affinity';
$l['err_install_tools'] = 'Виникла помилка встановлення гостьових інструментів';

//Backup errors
$l['backup_err_mount'] = 'Виникла помилка встановлення LVM для тимчасового сховища';
$l['backup_err_lvm'] = 'Виникла помилка створення LVM тимчасового сховища.';
$l['backup_err_mkfs'] = 'Виникла помилка форматування тимчасового сховища';
$l['backup_err_mkdir'] = 'Виникла помилка створення каталога точок монтування тимчасового сховища';
$l['kvm_err_tar'] = 'Виникла помилка стиснення архіву';
$l['xen_err_tar'] = 'Виникла помилка стиснення архіву';
$l['kvm_err_untar'] = 'Виникла помилка розпакування архіву';
$l['backup_err_untar'] = 'Виникла помилка в процесі розпакування архіву';
$l['err_vzdump'] = 'Виникла помилка інструменту резервного копіювання';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Не вдалося створити резервний образ. Код повернення: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = VM_SHORT.' UUID is empty!';
$l['vg_space_arr'] = 'There is not enough space in ';

// OpenVZ '.VM_SHORT.' Creation errors
$l['openvz_err_ubc'] = 'Помилка збереження налаштувань UBC';
$l['openvz_err_ostemplate'] = 'Помилка встановлення шаблона ОС';
$l['openvz_err_space'] = 'Помилка встановлення дискового простору';
$l['openvz_err_inodes'] = 'Помилка встановлення дискового простору';
$l['openvz_err_hostname'] = 'Помилка встановлення імені хоста';
$l['openvz_err_ip'] = 'Помилка IP-адреси';
$l['openvz_err_dns'] = 'Помилка DNS.';
$l['openvz_err_cpu'] = 'Помилка встановлення модулів CPU';
$l['openvz_err_cpulim'] =  'Помилка встановлення ліміту CPU';
$l['openvz_err_cores'] = 'Помилка в налаштуваннях ядра CPU';
$l['openvz_err_ioprio'] = 'Помилка встановлення пріоритету IO';
$l['openvz_err_create'] = 'Помилка створення контейнера';
$l['vswap_error'] = 'Виникла помилка налаштування параметрів VSwap';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Працює';
$l['lm_status_offline'] = 'Вимкнений';
$l['lm_status_suspended'] = 'Призупинений';
$l['vps_is_suspended'] = 'Цей '.VM_SHORT.' заблоковано. Ви не можете виконувати жодних операцій з '.VM_SHORT.'!';
$l['suspend_reason_bw'] = 'Цей '.VM_SHORT.' призупинено через перевищення лімітів каналу. Вы не можете виконувати жодних операцій для '.VM_SHORT.'!';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Зміни вступлять в дію після повторного завантаження '.VM_SHORT.'.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'Виникла помилка створення зміни розміру дисків';
$l['mount_undetermined'] = 'Розділ Linux не виявлено у '.VM_SHORT;
$l['disk_destroy_err'] = 'Виникла помилка видалення дисків';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'Виникла помилка при спробі редагування '.VM_SHORT;
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your '.VM_SHORT.' {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['bandwidth_mail_sub'] = VM_SHORT.' призупиняється через використання трафіка понад ліміт';
$l['bandwidth_mail_message'] = 'Доброго дня,

Your '.VM_SHORT.' `{{hostname}}` було призупинено через перевищення визначеної граничної межі пропускної здатності.

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
$l['self_shutdown_body'] = 'Доброго дня

Ваш VM_SHORT {{vpsid}} був {{дія}} у відповідності з встановленим часом ({{час}})
';

$l['self_shutdown_start'] = 'Запустити';
$l['self_shutdown_stop'] = 'Призупинити';
$l['self_shutdown_restart'] = 'Перезапустити';
$l['self_shutdown_poweroff'] = 'Вимкнути';

$l['self_shutdown_start_failed'] = 'Помилка старту';
$l['self_shutdown_stop_failed'] = 'Помилка зупинки';
$l['self_shutdown_restart_failed'] = 'Помилка перезапуску';
$l['self_shutdown_poweroff_failed'] = 'Помилка вимкнення';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'Не вдалося виконати запит proxmox api. Будь-лакса, введіть дінв проксі-мода в Конфігурація -> Налаштування додаткового пристрою';

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