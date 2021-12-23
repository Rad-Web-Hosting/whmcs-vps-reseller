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

$l['user_data_error_t'] = 'Ошибка пользовательских данных';
$l['user_data_error'] = 'Не удалось загрузить информацию об учетной записи. Сообщите об этом администратору сервера!';

$l['no_license'] = 'Файл LICENSE не найден! Сообщите об этом администратору сервера.';

$l['today'] = '<b>Today</b> at ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Ошибка темы';//Title
$l['init_theme_error'] = 'Не удалось загрузить файл темы - & soft-1 ;.';

$l['init_theme_func_error_t'] = 'Ошибка функции темы';//Title
$l['init_theme_func_error'] = 'Невозможно загрузить функции (-ы) темы & soft-1 ;.';

$l['load_theme_settings_error'] = 'Не удалось загрузить файл настроек тем.';


//Error Handle Function
$l['following_errors_occured'] = 'Были найдены следующие ошибки:';

//Success Message Function
$l['following_message'] = 'Было отправлено следующее сообщение:';

//Major Error Function
$l['fatal_error'] = 'Фатальная ошибка';
$l['following_fatal_error'] = 'Произошла следующая ошибка:';

//Message Function
$l['soft_message'] = 'Сообщение';
$l['following_soft_message'] = 'Было отправлено следующее сообщение:';

$l['err_user_head'] = 'Ошибка';
$l['err_user'] = 'Не удалось определить тип пользователя';

//Update Softaculous
$l['getting_info'] = 'Запрос информации ......';
$l['error_getting_latest'] = 'Не удалось получить информацию ... Отказ доступа';
$l['got_info'] = 'Got information';
$l['manual_mode'] = 'Новая версия Softaculous требует ручного вмешателства ...... Отказ от ответственности';
$l['no_updates'] = 'Текущая версия - последняя версия ...... Продолжения';
$l['fetch_upgrade'] = 'Fetching Upgrade......';
$l['error_fetch_upgrade'] = 'Не удалось получить файл обновления ...';
$l['error_save_upgrade'] = 'е удалось сохранить файл обновления ... Отказаться';
$l['got_upgrade'] = 'Файл обновления сохранен';
$l['unzip_upgrade'] = 'Распаковка файлов......';
$l['error_unzip_upgrade'] = 'Ошибка распаковки ... Отказ';
$l['unzipped_upgrade'] = 'Успешно распакован';
$l['running_upgrade'] = 'Запуск обновления ......';
$l['succ_upgrade'] = 'Завершено';
$l['error_upgrade'] = 'При обновлении произошли следующие ошибки:';

//MySQL Errors
$l['err_selectmy'] = 'База данных MySQL не может быть выбрана.';
$l['err_myconn'] = 'Не удалось установить соединение MySQL.';
$l['err_makequery'] = 'Не удалось выполнить запрос с номером';
$l['err_mynum'] = 'Ошибок MySQL Нет';
$l['err_myerr'] = 'Ошибка MySQL';

//hf_theme.php
$l['welcome'] = 'Добро пожаловать';
$l['logout'] = 'Выйти';
$l['page_time'] = 'Страница, созданная в';
$l['times_are'] = 'Часовой пояс: GMT';
$l['time_is'] = 'The time now is';
$l['load_start'] = 'Запуск';
$l['load_stop'] = 'Остановка';
$l['load_restart'] = 'Перезапуск';
$l['load_poweroff'] = 'Выключение';

//The Category Language Variables
$l['dock_restart'] = 'Перезапустить контейнер';
$l['dock_stop'] = 'Остановить контейнер';
$l['dock_start'] = 'Запустить контейнер';
$l['dock_poweroff'] = 'Выключить контейнер';
$l['dock_home'] = 'Домой';
$l['dock_settings'] = 'Изменить настройки';
$l['dock_help'] = 'Помощь и поддержка';
$l['dock_sync'] = 'Синхронизация с другими автоустановками';
$l['go_home'] = 'Домой';
$l['dock_user'] = 'Профиль пользователя';
$l['dock_password'] = 'Изменить пароль';
$l['dock_vps'] = 'Список VPS';

// Left Menu
$l['lm_file_mgr'] = 'Файловый менеджер';
$l['lm_res'] = 'Ресурсы';
$l['lm_performance'] = 'Производительность';
$l['lm_process'] = 'Процессы';
$l['lm_service'] = 'Сервисы';
$l['lm_firewall'] = 'Брандмауэр';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'VNC пароль';
$l['lm_statusc'] = 'Журнал событий';
$l['lm_res_a'] = 'Системные оповещения';
$l['lm_logs'] = 'Журналы задач';
$l['lm_bandwidth'] = 'Пропускная способность';
$l['lm_accountpass'] = 'Пароль от аккаунта';
$l['lm_changepass'] = 'Сменить пароль';
$l['lm_controlpanel'] = 'Панель управления';
$l['lm_recipes'] = 'Задачи';
$l['lm_disk'] = 'Disk';
$l['lm_backup'] = 'Backup';
$l['lm_ostemp'] ='Переустановка ОС';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Логи';
$l['lm_ips'] = 'IP-адрес';
$l['lm_backup'] = 'Backups';
$l['lm_hvmsettings'] = 'VPS настройки';
$l['lm_apikey'] = 'Учетные данные API';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'Reverse DNS';
$l['lm_support'] = 'Поддержка';
$l['lm_self_shutdown'] = 'Автозапуск';
$l['lm_tasks'] = 'Список действий';
$l['lm_twofactauth'] = 'Настройки безопасности';
$l['lm_backup2'] = 'Backups';
$l['lm_backupservers'] = 'Backup Servers';
$l['lm_sshkeys'] = 'SSH Keys';
$l['lm_installapps'] = 'Applications';
$l['lm_billing'] = 'Billing';


// Users left menu
$l['lm_vs'] = 'Список VPS';
$l['lm_addvs'] = 'Launch Instance';
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Настройки';
$l['lm_profile'] = 'Профиль';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'Вы вошли из админцентра';
$l['lmapps'] = 'Applications';

// Page Jump Related :
$l['page_jump_title'] = 'Введите страницу, чтобы перейти к';
$l['page_page'] = 'страница';
$l['page_of'] = 'из';
$l['page_go'] = 'дальше';

// Create VPS related for Kernel
$l['build_no_vs'] = 'VPS не найден в базе данных';
$l['build_no_os'] = 'Шаблон ОС не найден';
$l['build_no_ip'] = 'Первичный IP отсутствует для VPS';
$l['build_no_os_iso'] = 'Нет шаблона ОС или файла ISO не найдено';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Вы загрузились в неверного ядра - ';
$l['correct_kernel'] = 'Перезагрузитесь в правильное ядро.';
$l['kvm_module'] = 'Модуль Linux-KVM не загружен.';
$l['kvm_network'] = 'The '.$globals['bridge'].'Не запускается. Запустите <b> запуск службы virtnetwork </b>';
$l['temp_exists'] = 'Файл шаблона уже существует';
$l['temp_snap_err'] = 'The Snapshot could not be created and hence the template creation failed. The snapshot creation generally fails because of less space';
$l['wrong_xm'] = 'Модуль XEN загружен неправильно';
$l['lxc_module'] = 'LXC не установлен.';

// Xen VPS Creation errors
$l['xen_err_lvm'] = 'Произошла ошибка в создании LVM VPS';
$l['xen_err_swap'] = 'Произошла ошибка в создании SWAP VPS';
$l['xen_err_tmp'] = 'Ошибка при создании точки монтирования';
$l['xen_err_mount'] = 'Произошла ошибка при установке VPS LVM';
$l['xen_err_unmount'] = 'Произошла ошибка в размонтировании VPS LVM';
$l['xen_err_dd'] = 'Во время операции копирования диска произошла ошибка';
$l['xen_err_mkfs'] = 'При форматировании VPS произошла ошибка';
$l['xen_err_mkswap'] = 'При форматировании SWAP VPS произошла ошибка';
$l['xen_err_untar'] = 'При извлечении образа ОС произошла ошибка';
$l['xen_err_part'] = 'При создании разделов диска произошла ошибка';
$l['xen_err_kpart'] = 'При отображении раздела (ов) произошла ошибка';
$l['xen_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка';

// XCP VPS Creation errors
$l['xcp_err_vdi'] = 'При создании VDI виртуальной машины произошла ошибка';
$l['xcp_err_iso'] = 'При загрузке ISO произошла ошибка';
$l['xcp_err_vif'] = 'При создании VIF для VPS произошла ошибка';
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM VPS Creation errors
$l['kvm_err_lvm'] = 'Произошла ошибка в создании LVM VPS';
$l['kvm_err_mount'] = 'Произошла ошибка при установке VPS LVM';
$l['kvm_err_unmount'] = 'Произошла ошибка в размонтировании VPS LVM';
$l['kvm_err_dd'] = 'Во время операции копирования диска произошла ошибка';
$l['kvm_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка'	;
$l['kvm_err_part'] = 'При создании раздела диска произошла ошибка';
$l['kvm_err_kpart'] = 'При отображении раздела (ов) произошла ошибка';
$l['kvm_err_mkswap'] = 'При форматировании SWAP VPS произошла ошибка';
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC VPS Creation errors
$l['lxc_err_untar'] = 'При извлечении шаблона ОС произошла ошибка';
$l['lxc_err_unmount'] = 'Произошла ошибка в размонтировании VPS LVM';
$l['lxc_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка';
$l['lxc_network'] = 'The '.$globals['bridge'].' Не запускается. Запустите <b> запуск службы virtnetwork </b>';
$l['lxc_err_mount'] = 'Произошла ошибка при установке VPS LVM';

// Virtuozzo VPS Creation errors
$l['virtuzo_create_error'] = 'При создании VPS произошла ошибка';
$l['err_vncpass'] = 'При настройке пароля VNC произошла ошибка';
$l['err_set_iso'] = 'Был присоединен ISO к VPS';
$l['err_disk_create'] = 'При создании диска VPS произошла ошибка';
$l['err_set_boot_order'] = 'При установке порядка загрузки произошла ошибка';
$l['err_set_ram'] = 'При установке ОЗУ произошла ошибка';
$l['err_set_pinning'] = 'При установке CPU Affinity произошла ошибка';
$l['err_install_tools'] = 'При установке гостевых инструментов возникла ошибка';

//Backup errors
$l['backup_err_mount'] = 'Произошла ошибка в установке LVM для временного хранения';
$l['backup_err_lvm'] = 'Произошла ошибка создания LVM временного хранилища.';
$l['backup_err_mkfs'] = 'При форматировании временного хранилища произошла ошибка';
$l['backup_err_mkdir'] = 'При создании каталога точек монтирования временного хранилища произошла ошибка';
$l['kvm_err_tar'] = 'При сжатии архива произошла ошибка';
$l['xen_err_tar'] = 'При сжатии архива произошла ошибка';
$l['kvm_err_untar'] = 'Произошла ошибка при распаковке архива';
$l['backup_err_untar'] = 'Произошла ошибка при распаковке архива';
$l['err_vzdump'] = 'Произошла ошибка с инструментом резервного копирования';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Не удалось создать резервный образ, Код возврата: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = 'VPS UUID is empty!';

// OpenVZ VPS Creation errors
$l['openvz_err_ubc'] = 'Ошибка сохранения настроек UBC';
$l['openvz_err_ostemplate'] = 'Ошибка установки шаблона ОС';
$l['openvz_err_space'] = 'Ошибка установки дискового пространства';
$l['openvz_err_inodes'] = 'Ошибка установки дискового пространства';
$l['openvz_err_hostname'] = 'Ошибка установки имени хоста';
$l['openvz_err_ip'] = 'Ошибка IP-адреса';
$l['openvz_err_dns'] = 'Ошибка DNS.';
$l['openvz_err_cpu'] = 'Ошибка установки модулей CPU';
$l['openvz_err_cpulim'] =  'Ошибка установки лимита CPU';
$l['openvz_err_cores'] = 'Ошибка в настройках ядра CPU';
$l['openvz_err_ioprio'] = 'Ошибка установки приоритета IO';
$l['openvz_err_create'] = 'Ошибка создания контейнера';
$l['vswap_error'] = 'При настройке параметров VSwap произошла ошибка';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser VPS status column
$l['lm_status_online'] = 'Работает';
$l['lm_status_offline'] = 'Выключен';
$l['lm_status_suspended'] = 'Приостановлен';
$l['vps_is_suspended'] = 'Этот VPS заблокирован. Вы не можете выполнять какие-либо операции с VPS!';
$l['suspend_reason_bw'] = 'Этот VPS приостановлен из-за превышения лимито канала. Вы не можете выполнять какие-либо операции для VPS!';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Изменение применяться, когда VPS снова загрузится.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'При изменении размера Дисков произошла ошибка';
$l['mount_undetermined'] = 'В VPS не было обнаружено раздела Linux';
$l['disk_destroy_err'] = 'При удалении дисков произошла ошибка';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'При попытке редактировать VPS произошла ошибка';
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your VPS {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The VPS has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['bandwidth_mail_sub'] = 'VPS приостанавливается из-за чрезмерного использования трафика';
$l['bandwidth_mail_message'] = 'Здравствуйте,

Your VPS `{{hostname}}` Был приостановлен, поскольку он превысил свой назначенный предел пропускной способности.

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
$l['self_shutdown_body'] = 'Здравствуйте

Ваш Vps {{vpsid}} был {{действие}} в соответствии с установленным временем ({{время}})
';

$l['self_shutdown_start'] = 'Запустить';
$l['self_shutdown_stop'] = 'Приостановить';
$l['self_shutdown_restart'] = 'Перезапустить';
$l['self_shutdown_poweroff'] = 'Выключить';

$l['self_shutdown_start_failed'] = 'Не смог запустить';
$l['self_shutdown_stop_failed'] = 'Не смог приостановить';
$l['self_shutdown_restart_failed'] = 'Не смог перезапустить';
$l['self_shutdown_poweroff_failed'] = 'Не смог выключить';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'Не удалось выполнить запрос proxmox api. Пожалуйста, введите данные прокси-мода в Конфигурация -> Настройки ведомого устройства';

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
