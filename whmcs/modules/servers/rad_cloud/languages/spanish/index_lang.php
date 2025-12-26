<?php

$l['privacy_policy'] = 'política de privacidad';
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
$l['lm_passthrough'] = 'Passthrough';
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
$l['lm_volume'] = 'Volumes';
$l['lm_server_aio'] = 'Resources Monitor';

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
$l['kvm_err_lightbit'] = 'There was an error creating the lightbit disk of the '.VM_SHORT;
$l['kvm_err_lightbit_acl'] = 'There was error while getting acl for lightbit';
$l['kvm_err_lightbit_proj'] = 'The lightbit project does not exists on node';
$l['kvm_err_lightbit_storage'] = 'The storage does not exists';

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
$l['openvz_err_uefi'] =  'There was an error setting UEFI Boot';
$l['openvz_err_bios'] =  'There was an error setting BIOS Boot';

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

Su '.VM_SHORT.' {{vpsid}} ha sido {{action}} según el tiempo que se había establecido ({{time}})
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

$l['inv_winpass_chars'] = 'Los caracteres especiales permitidos para la contraseña de root de Windows '.VM_SHORT.' son:';
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