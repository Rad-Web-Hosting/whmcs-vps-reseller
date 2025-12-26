<?php

$l['privacy_policy'] = 'политика конфиденциальности';
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
$l['dock_vps'] = 'Список '.VM_SHORT;

// Left Menu
$l['lm_file_mgr'] = 'Файловый менеджер';
$l['lm_res'] = 'Ресурсы';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
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
$l['lm_passthrough'] = 'Passthrough';
$l['lm_disk'] = 'Disk';
$l['lm_ostemp'] ='Переустановка ОС';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Логи';
$l['lm_ips'] = 'IP-адрес';
$l['lm_hvmsettings'] = VM_SHORT.' настройки';
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
$l['lm_volume'] = 'Volumes';
$l['lm_server_aio'] = 'Resources Monitor';


// Users left menu
$l['lm_vs'] = 'Список '.VM_SHORT;
$l['lm_addvs'] = 'Launch '.VM_SHORT;
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

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = VM_SHORT.' не найден в базе данных';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'Шаблон ОС не найден';
$l['build_no_ip'] = 'Первичный IP отсутствует для '.VM_SHORT;
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

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'Произошла ошибка в создании LVM '.VM_SHORT;
$l['xen_err_swap'] = 'Произошла ошибка в создании SWAP '.VM_SHORT;
$l['xen_err_tmp'] = 'Ошибка при создании точки монтирования';
$l['xen_err_mount'] = 'Произошла ошибка при установке '.VM_SHORT.' LVM';
$l['xen_err_unmount'] = 'Произошла ошибка в размонтировании '.VM_SHORT.' LVM';
$l['xen_err_dd'] = 'Во время операции копирования диска произошла ошибка';
$l['xen_err_mkfs'] = 'При форматировании '.VM_SHORT.' произошла ошибка';
$l['xen_err_mkswap'] = 'При форматировании SWAP '.VM_SHORT.' произошла ошибка';
$l['xen_err_untar'] = 'При извлечении образа ОС произошла ошибка';
$l['xen_err_part'] = 'При создании разделов диска произошла ошибка';
$l['xen_err_kpart'] = 'При отображении раздела (ов) произошла ошибка';
$l['xen_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = 'При создании VDI виртуальной машины произошла ошибка';
$l['xcp_err_iso'] = 'При загрузке ISO произошла ошибка';
$l['xcp_err_vif'] = 'При создании VIF для '.VM_SHORT.' произошла ошибка';
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = 'Произошла ошибка в создании LVM '.VM_SHORT;
$l['kvm_err_mount'] = 'Произошла ошибка при установке '.VM_SHORT.' LVM';
$l['kvm_err_unmount'] = 'Произошла ошибка в размонтировании '.VM_SHORT.' LVM';
$l['kvm_err_dd'] = 'Во время операции копирования диска произошла ошибка';
$l['kvm_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка'	;
$l['kvm_err_part'] = 'При создании раздела диска произошла ошибка';
$l['kvm_err_kpart'] = 'При отображении раздела (ов) произошла ошибка';
$l['kvm_err_mkswap'] = 'При форматировании SWAP '.VM_SHORT.' произошла ошибка';
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';
$l['kvm_err_lightbit'] = 'There was an error creating the lightbit disk of the '.VM_SHORT;
$l['kvm_err_lightbit_acl'] = 'There was error while getting acl for lightbit';
$l['kvm_err_lightbit_proj'] = 'The lightbit project does not exists on node';
$l['kvm_err_lightbit_storage'] = 'The storage does not exists';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'При извлечении шаблона ОС произошла ошибка';
$l['lxc_err_unmount'] = 'Произошла ошибка в размонтировании '.VM_SHORT.' LVM';
$l['lxc_err_resizefs'] = 'При изменении размера файловой системы произошла ошибка';
$l['lxc_network'] = 'The '.$globals['bridge'].' Не запускается. Запустите <b> запуск службы virtnetwork </b>';
$l['lxc_err_mount'] = 'Произошла ошибка при установке '.VM_SHORT.' LVM';

// Virtuozzo '.VM_SHORT.' Creation errors
$l['virtuzo_create_error'] = 'При создании '.VM_SHORT.' произошла ошибка';
$l['err_vncpass'] = 'При настройке пароля VNC произошла ошибка';
$l['err_set_iso'] = 'Был присоединен ISO к '.VM_SHORT;
$l['err_disk_create'] = 'При создании диска '.VM_SHORT.' произошла ошибка';
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
$l['vps_uuid_empty'] = VM_SHORT.' UUID is empty!';
$l['vg_space_arr'] = 'There is not enough space in ';

// OpenVZ '.VM_SHORT.' Creation errors
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
$l['openvz_err_uefi'] =  'There was an error setting UEFI Boot';
$l['openvz_err_bios'] =  'There was an error setting BIOS Boot';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'Работает';
$l['lm_status_offline'] = 'Выключен';
$l['lm_status_suspended'] = 'Приостановлен';
$l['vps_is_suspended'] = 'Этот '.VM_SHORT.' заблокирован. Вы не можете выполнять какие-либо операции с '.VM_SHORT.'!';
$l['suspend_reason_bw'] = 'Этот '.VM_SHORT.' приостановлен из-за превышения лимито канала. Вы не можете выполнять какие-либо операции для '.VM_SHORT.'!';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Изменение применяться, когда '.VM_SHORT.' снова загрузится.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'При изменении размера Дисков произошла ошибка';
$l['mount_undetermined'] = 'В '.VM_SHORT.' не было обнаружено раздела Linux';
$l['disk_destroy_err'] = 'При удалении дисков произошла ошибка';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'При попытке редактировать '.VM_SHORT.' произошла ошибка';
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your '.VM_SHORT.' {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['bandwidth_mail_sub'] = VM_SHORT.' приостанавливается из-за чрезмерного использования трафика';
$l['bandwidth_mail_message'] = 'Здравствуйте,

Your '.VM_SHORT.' `{{hostname}}` Был приостановлен, поскольку он превысил свой назначенный предел пропускной способности.

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
$l['self_shutdown_body'] = 'Здравствуйте

Ваш '.VM_SHORT.' {{vpsid}} был {{действие}} в соответствии с установленным временем ({{время}})
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