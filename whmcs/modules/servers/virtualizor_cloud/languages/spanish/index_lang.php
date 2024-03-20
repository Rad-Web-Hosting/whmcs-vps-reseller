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
$l['user_data_error_t'] = 'Error en los datos del usuario';
$l['user_data_error'] = 'El panel no es capaz de cargar la información de su cuenta. ¡Por favor repórtelo al administrador!';

$l['no_license'] = '¡El archivo de LICENCIA no puedo ser encontrado! Por favor repórtelo al administrador del servidor.';

$l['today'] = '<b>Hoy</b> at ';//La cadena de hoy muestra la hora de ingreso de hoy

$l['init_theme_error_t'] = 'Error en el tema';//Title
$l['init_theme_error'] = 'Imposible cargar el archivo del tema - &soft-1;.';

$l['init_theme_func_error_t'] = 'Error de función del tema';//Title
$l['init_theme_func_error'] = 'Imposible cargar la funciones de tema de &soft-1;.';

$l['load_theme_settings_error'] = 'Imposible cargar el archivo de ajustes del tema.';


//Error Handle Function
$l['following_errors_occured'] = 'Fueron encontrados los siguientes errores';

//Success Message Function
$l['following_message'] = 'Se ha devuelto el siguiente mensaje';

//Major Error Function
$l['fatal_error'] = 'Error fatal';
$l['following_fatal_error'] = 'El siguiente error ocurrió';

//Message Function
$l['soft_message'] = 'Mensaje';
$l['following_soft_message'] = 'Se ha devuelto en siguiente mensaje';

$l['err_user_head'] = 'Error';
$l['err_user'] = 'Imposible determinar el tipo de usuario';

//Update Softaculous
$l['getting_info'] = 'Solicitando información......';
$l['error_getting_latest'] = 'Imposible obtener la información......Abandonando';
$l['got_info'] = 'Información obtenida';
$l['manual_mode'] = 'La nueva versión de Softaculous requiere atención manual......Abandonando';
$l['no_updates'] = 'La versión actual es la última versión......Continuando';
$l['fetch_upgrade'] = 'Obteniendo actualización......';
$l['error_fetch_upgrade'] = 'Imposible obtener el archivo de actualización file......Abandonando';
$l['error_save_upgrade'] = 'Imposible GUARDAR el archivo de actualización......Abandonando';
$l['got_upgrade'] = 'El archivo de actualización se ha guardado';
$l['unzip_upgrade'] = 'Descomprimiendo archivos......';
$l['error_unzip_upgrade'] = 'Error de descompresión......Abandonando';
$l['unzipped_upgrade'] = 'Descompresión satisfactoria';
$l['running_upgrade'] = 'Ejecutando actualización......';
$l['succ_upgrade'] = 'Completado';
$l['error_upgrade'] = 'Ocurrieron los siguientes errores durante la actualización:';

//MySQL Errors
$l['err_selectmy'] = 'La base de datos de MySQL no puede ser seleccionada.';
$l['err_myconn'] = 'La conexión MySQL no puede ser establecida.';
$l['err_makequery'] = 'No se puede realizar la consulta numerada';
$l['err_mynum'] = 'Error en MySQL Nro.';
$l['err_myerr'] = 'Error en MySQL';

//hf_theme.php
$l['welcome'] = 'Bienvenido';
$l['logout'] = 'Desconectar';
$l['page_time'] = 'Pagina creada en';
$l['times_are'] = 'La hora siempre es GMT';
$l['time_is'] = 'Es la hora actual es';
$l['load_start'] = 'Iniciando';
$l['load_stop'] = 'Parando';
$l['load_restart'] = 'Reiniciando';
$l['load_poweroff'] = 'Apagando';

//The Category Language Variables
$l['dock_restart'] = 'Reiniciar contenedor';
$l['dock_stop'] = 'Detener contenedor';
$l['dock_start'] = 'Iniciar contenedor';
$l['dock_poweroff'] = 'Apagar contenedor';
$l['dock_home'] = 'Inicio';
$l['dock_settings'] = 'Editar ajustes';
$l['dock_help'] = 'Ayuda y apoyo';
$l['dock_sync'] = 'Sincronizar con otros instaladores automaticos';
$l['go_home'] = 'Inicio';
$l['dock_user'] = 'Perfil de usuario';
$l['dock_password'] = 'Cambiar contraseña';
$l['dock_vps'] = 'Listar servidores virtuales';

// Left Menu
$l['lm_file_mgr'] = 'Administrador de archivos';
$l['lm_res'] = 'Recursos';
$l['lm_performance'] = 'Server Monitoring';
$l['lm_disk_health'] ='Raid Health';
$l['lm_process'] = 'Procesos';
$l['lm_service'] = 'Servicios';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'Contraseña VNC';
$l['lm_statusc'] = 'Estado de registros';
$l['lm_res_a'] = 'Alertas del sistema';
$l['lm_logs'] = 'Registro de tareas';
$l['lm_bandwidth'] = 'Ancho de banda';
$l['lm_accountpass'] = 'Contraseña de la cuenta';
$l['lm_changepass'] = 'Contraseña de la cuenta';
$l['lm_controlpanel'] = 'Panel de control';
$l['lm_recipes'] = 'Recibos';
$l['lm_disk'] = 'Disco';
$l['lm_ostemp'] ='Re-instalación del sistema operativo';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Nombre del host';
$l['lm_logs'] = 'Registros';
$l['lm_ips'] = 'IPs';
$l['lm_hvmsettings'] = 'Configuración de '.VM_SHORT;
$l['lm_apikey'] = 'Credenciales API';
$l['lm_pdns'] = 'DNS';
$l['lm_rdns'] = 'DNS contrario';
$l['lm_support'] = 'Apoyo';
$l['lm_self_shutdown'] = 'Auto apagado';
$l['lm_tasks'] = 'Tareas';
$l['lm_twofactauth'] = 'Security Settings';
$l['lm_backup2'] = 'Backups';
$l['lm_backupservers'] = 'Backup Servers';
$l['lm_sshkeys'] = 'SSH Keys';
$l['lm_installapps'] = 'Aplicaciones';
$l['lm_billing'] = 'Billing';


// Users left menu
$l['lm_vs'] = 'Listados de '.VM_SHORT;
$l['lm_addvs'] = 'Instacia de lanzamiento';
$l['lm_resources'] = 'Recursos de la nube';
$l['lm_users'] = 'Usuarios';
$l['lm_usr_settings'] = 'Ajustes';
$l['lm_profile'] = 'Mi Perfil';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'Usted es un administrador';
$l['lmapps'] = 'Aplicaciones';

// Page Jump Related :
$l['page_jump_title'] = 'Escriba la página a donde desea ir';
$l['page_page'] = 'Pagina';
$l['page_of'] = 'de';
$l['page_go'] = 'ir';

// Create '.VM_SHORT.' related for Kernel
$l['build_no_vs'] = 'El '.VM_SHORT.' no se encuentra en la base de datos';
$l['rescue_not_synced'] = 'It seems that rescue was called but as per DB rescue is not enabled. This might happen if the Master DB is not synced with slave server.';
$l['build_no_os'] = 'No se encontró la plantilla del SO';
$l['build_no_ip'] = 'La IP primaria no es encuentra en el '.VM_SHORT;
$l['build_no_os_iso'] = 'No se encontraron archivos de plantilla de SO o ISO';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Usted arrancó en el núcleo equivocado- ';
$l['correct_kernel'] = 'Por favor comience en el núcleo correcto';
$l['kvm_module'] = 'El modulo Linux-KVM no está cargado.';
$l['kvm_network'] = 'El '.$globals['bridge'].' No ha iniciado. Por favor inicie el<b>servicio virnetwork </b>';
$l['temp_exists'] = 'El archivo de plantilla ya existe';
$l['temp_snap_err'] = 'La creación de la fotografía instantánea fallo y la instalación de la plantilla fallo. La creación de la fotografía instantánea a menudo falla debido a la falta de espacio';
$l['wrong_xm'] = 'El módulo XEN no ha cargado correctamente';
$l['lxc_module'] = 'LXC no está instalado.';

// Xen '.VM_SHORT.' Creation errors
$l['xen_err_lvm'] = 'Ocurrió un error en la creación del LVM del '.VM_SHORT;
$l['xen_err_swap'] = ' Ocurrió un error en la creación del LVM del '.VM_SHORT.' ';
$l['xen_err_tmp'] = 'Ocurrió un error en la creación del punto de montaje';
$l['xen_err_mount'] = 'Ocurrió un error en el montaje del LVM del '.VM_SHORT;
$l['xen_err_unmount'] = ' Ocurrió un error desmontando el LVM del '.VM_SHORT;
$l['xen_err_dd'] = 'Ocurrió un error en la operación de copia del disco';
$l['xen_err_mkfs'] = 'Ocurrió un error formateando el '.VM_SHORT;
$l['xen_err_mkswap'] = 'Ocurrió un error formateando el SWAP de el '.VM_SHORT;
$l['xen_err_untar'] = 'Ocurrió un error extrayendo la plantilla del SO';
$l['xen_err_part'] = 'Ocurrió un error en la creación de la partición del disco';
$l['xen_err_kpart'] = 'Ocurrió un error mapeando las particiones';
$l['xen_err_resizefs'] = 'Ocurrió un error redimensionando el archivo del sistema';

// XCP '.VM_SHORT.' Creation errors
$l['xcp_err_vdi'] = 'Ocurrió un error creando el VDI del '.VM_SHORT;
$l['xcp_err_iso'] = 'Ocurrió un error cargando el ISO';
$l['xcp_err_vif'] = 'Ocurrió un error creando VIF para el '.VM_SHORT;
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM '.VM_SHORT.' Creation errors
$l['kvm_err_lvm'] = 'Ocurrió un error creando el LVM del '.VM_SHORT;
$l['kvm_err_mount'] = 'Ocurrió un error en el montaje del LVM del '.VM_SHORT;
$l['kvm_err_unmount'] = 'Ocurrió un error desmontando el LVM del '.VM_SHORT;
$l['kvm_err_dd'] = 'Ocurrió un error en la operación de copia del disco';
$l['kvm_err_resizefs'] = 'Ocurrió un error redimensionando el archivo del sistema';
$l['kvm_err_part'] = 'Ocurrió un error creando las particiones del disco';
$l['kvm_err_kpart'] = 'Ocurrió un error en el mapeo de las particiones';
$l['kvm_err_mkswap'] = ' Ocurrió un error formateando el SWAP de el '.VM_SHORT;
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC '.VM_SHORT.' Creation errors
$l['lxc_err_untar'] = 'Ocurrió un error extrayendo la plantilla del SO';
$l['lxc_err_unmount'] = 'Ocurrió un error desmontando el LVM del '.VM_SHORT;
$l['lxc_err_resizefs'] = 'Ocurrió un error redimensionando el archivo del sistema';
$l['lxc_network'] = 'El'.$globals['bridge'].'no ha iniciado. Por favor inicie el<b>servicio virtnetwork </b>';
$l['lxc_err_mount'] = 'Ocurrió un error en el montaje del LVM del '.VM_SHORT;

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
$l['backup_err_mount'] = 'Ocurrió un error en el montaje del LVM para los archivos temporales';
$l['backup_err_lvm'] = 'Ocurrió un error en la creación del LVM para los archivos temporales.';
$l['backup_err_mkfs'] = 'Ocurrió un error formateando los archivos temporales';
$l['backup_err_mkdir'] = 'Ocurrió un error creando el directorio del punto de montaje de los archivos temporales';
$l['kvm_err_tar'] = 'Ocurrió un error comprimiendo el archivo';
$l['xen_err_tar'] = 'Ocurrió un error comprimiendo el archivo';
$l['kvm_err_untar'] = 'Ocurrió un error descomprimiendo el archivo';
$l['backup_err_untar'] = 'Ocurrió un error descomprimiendo el archivo';
$l['err_vzdump'] = 'Ocurrió un error con la herramienta de respaldo';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Failed to create the backup image, Return code: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = VM_SHORT.' UUID is empty!';
$l['vg_space_arr'] = 'There is not enough space in ';

// OpenVZ '.VM_SHORT.' Creation errors
$l['openvz_err_ubc'] = 'Ocurrió un error guardando los ajustes del UBC';
$l['openvz_err_ostemplate'] = 'Ocurrió un error en los ajustes de la plantilla del SO';
$l['openvz_err_space'] = 'Ocurrió un error en los ajustes del espacio en disco';
$l['openvz_err_inodes'] = 'Ocurrió un error en los ajustes del espacio en disco';
$l['openvz_err_hostname'] = 'Ocurrió un error en los ajustes del nombre del host';
$l['openvz_err_ip'] = 'Ocurrió un error en los ajustes de la dirección IP';
$l['openvz_err_dns'] = 'Ocurrió un error en los ajustes del DNS';
$l['openvz_err_cpu'] = 'Ocurrió un error en los ajustes de las unidades de CPU';
$l['openvz_err_cpulim'] =  'Ocurrió un error en los ajustes del límite del CPU';
$l['openvz_err_cores'] = 'Ocurrió un error en los ajustes de los núcleos del CPU';
$l['openvz_err_ioprio'] = 'Ocurrió un error en los ajustes de las prioridades I/O';
$l['openvz_err_create'] = 'Ocurrió un error en la creación del contenedor';
$l['vswap_error'] = 'Ocurrió un error en los ajustes de la configuración VSwap';

// Rescue Disk Errors
$l['err_downloading'] = 'Ocurrió un error descargar la plantilla de rescate';
$l['err_delete_disk'] = 'Ocurrió un error eliminando el disco de rescate';

// Enduser '.VM_SHORT.' status column
$l['lm_status_online'] = 'En línea';
$l['lm_status_offline'] = 'Fuera de línea';
$l['lm_status_suspended'] = 'Suspendido';
$l['vps_is_suspended'] = 'Este '.VM_SHORT.' está suspendido. Usted no puede realizar ninguna operación para el '.VM_SHORT.' !';
$l['suspend_reason_bw'] = 'Este '.VM_SHORT.' está suspendido debido al exceso de uso del ancho de banda. Usted no puede realizar ninguna operación para el '.VM_SHORT.' !';

$l['unknown'] = 'Desconocido';
$l['change_onboot'] = 'Pueden ocurrir cambios cuando el '.VM_SHORT.' sea arrancado de nuevo.';
$l['completed'] = 'Completado';
$l['vpsdisk_resize_err'] = 'Ocurrió un error redimensionando los discos';
$l['mount_undetermined'] = 'No se encontró ninguna partición Linux en el '.VM_SHORT;
$l['disk_destroy_err'] = 'Ocurrió un error destruyendo el disco';
$l['started'] = 'Iniciado';
$l['ended'] = 'Finalizado';
$l['updated'] = 'Actualizado';
$l['edit_xcperror'] = 'Ocurrió un error intentando editar el '.VM_SHORT;

$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your '.VM_SHORT.' {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The '.VM_SHORT.' has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';

$l['bandwidth_mail_sub'] = VM_SHORT.' Suspendido debido al uso excesivo del ancho de banda';
$l['bandwidth_mail_message'] = 'Hola,

Su '.VM_SHORT.' `{{hostname}}` ha sido suspendido porque ha excedido el ancho de banda asignado.

El '.VM_SHORT.' ha utilizado {{used_gb}} GB de ancho de banda y su ancho de banda permitido era de {{limit_gb}} GB.

Saludo,
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
$l['self_shutdown_body'] = 'Hola

Su VM_SHORT {{vpsid}} ha sido {{action}} según el tiempo que se había establecido ({{time}})
';

$l['self_shutdown_start'] = 'Iniciado';
$l['self_shutdown_stop'] = 'Apagar';
$l['self_shutdown_restart'] = 'reiniciado';
$l['self_shutdown_poweroff'] = 'Desactivado';

$l['self_shutdown_start_failed'] = 'Fallo en el inicio';
$l['self_shutdown_stop_failed'] = 'Fallo en el apagado';
$l['self_shutdown_restart_failed'] = 'Fallo en el reinicio';
$l['self_shutdown_poweroff_failed'] = 'Fallo en el desactivado';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'No se pudo realizar la llamada a la API de proxmox. Ingrese los detalles de proxmox en Configuración -> Configuración del esclavo ';
// Speed cap messages and label:
$l['speed_cap_down'] = 'Velocidad de descarga limitada';
$l['exp_speed_cap_down'] = 'Velocidad de descarga después de que se sobreutiliza el ancho de banda para un '.VM_SHORT.', 0 o valor vacío indica que no hay límite';
$l['speed_cap_up'] = 'Velocidad de carga limitada';
$l['exp_speed_cap_up'] = 'Velocidad de carga después de que se sobreutiliza el ancho de banda para un '.VM_SHORT.', 0 o valor vacío indica que no hay límite';
// ISO Related
$l['admin_iso'] = 'Admin ISOs';
$l['eu_iso'] = 'Enduser ISOs';
$l['enable_billing'] = 'The Billing setting is disabled. Please enable that first from the <a href="'.$globals['index'].'act=billing		">Billing Settings</a>.';

// Webuzo Script Categories
$l['cat_php_forums'] = 'Foros';
$l['cat_php_blogs'] = 'Blogs';
$l['cat_php_cms'] = 'Portales / CMS';
$l['cat_php_galleries'] = 'Galerías de imágenes';
$l['cat_php_wikis'] = 'Wikis';
$l['cat_php_admanager'] = 'Gestión de anuncios';
$l['cat_php_calendars'] = 'Calendarios';
$l['cat_php_games'] = 'Juegos';
$l['cat_php_mail'] = 'Correos';
$l['cat_php_polls'] = 'Encuestas y encuestas';
$l['cat_php_projectman'] = 'Gestión de proyectos';
$l['cat_php_ecommerce'] = 'Comercio electrónico';
$l['cat_php_guestbooks'] = 'Libros de visitas';
$l['cat_php_customersupport'] = 'Atención al cliente';
$l['cat_php_others'] = 'Otros';
$l['cat_php_music'] = 'Música';
$l['cat_php_video'] = 'Video';
$l['cat_php_rss'] = 'RSS';
$l['cat_php_socialnetworking'] = 'Redes sociales';
$l['cat_php_microblogs'] = 'Microblogs';
$l['cat_php_frameworks'] = 'Marcos';
$l['cat_php_educational'] = 'Educativo';
$l['cat_php_erp'] = 'ERP';
$l['cat_php_dbtools'] = 'Herramientas de base de datos';
$l['cat_php_files'] = 'Administración de archivos';

$l['inv_winpass_chars'] = 'Los caracteres especiales permitidos para la contraseña de root de Windows VM_SHORT son:';
$l['invalid_transaction'] = 'Transacción fallida/no válida. Inténtalo de nuevo';
$l['éxito'] = 'éxito';
$l['fallido'] = 'fallido';

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