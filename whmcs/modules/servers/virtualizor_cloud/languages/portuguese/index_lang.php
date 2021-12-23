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

$l['user_data_error_t'] = 'Erro de dados de usuário';
$l['user_data_error'] = 'O painel foi incapaz de carregar informações de sua conta. Por favor, informe isso ao administrador do servidor!';

$l['no_license'] = 'O arquivo de licença não foi encontrado! Por favor, informe isso ao administrador do servidor.';

$l['today'] = '<b>Hoje</b> em ';//The today string for showing todays post time

$l['init_theme_error_t'] = 'Erro no tema';//Title
$l['init_theme_error'] = 'Não foi possível carregar o arquivo do tema - &soft-1;. ';

$l['init_theme_func_error_t'] = 'Erro na função tema';//Title
$l['init_theme_func_error'] = 'Não é possível carregar a função(ões) do tema de &soft-1;. ';

$l['load_theme_settings_error'] = 'Não foi possível carregar o arquivo de configurações de temas.';


//Error Handle Function
$l['following_errors_occured'] = 'Os seguintes erros foram encontrados';

//Success Message Function
$l['following_message'] = 'A seguinte mensagem foi retornada';

//Major Error Function
$l['fatal_error'] = 'Erro fatal';
$l['following_fatal_error'] = 'Ocorreu o seguinte erro';

//Message Function
$l['soft_message'] = 'Mensagem';
$l['following_soft_message'] = 'A seguinte mensagem foi retornada';

$l['err_user_head'] = 'Erro';
$l['err_user'] = 'Não foi possível determinar o tipo de usuário';

//Update Softaculous
$l['getting_info'] = 'Solicitando informação......';
$l['error_getting_latest'] = 'Não foi possível obter informações......Abandonando';
$l['got_info'] = 'Tem informação';
$l['manual_mode'] = 'A nova versão do Softaculous requer atenção manual......Abandonando';
$l['no_updates'] = 'Versão atual é a mais recente versão......Continuando';
$l['fetch_upgrade'] = 'Buscando atualização......';
$l['error_fetch_upgrade'] = 'Não foi possível obter o arquivo de atualização......Abandonando';
$l['error_save_upgrade'] = 'Não foi possível salvar o arquivo de atualização......Abandonando';
$l['got_upgrade'] = 'Arquivo de atualização salvo';
$l['unzip_upgrade'] = 'Descompactando os arquivos......';
$l['error_unzip_upgrade'] = 'Erro ao descompactar......Abandonando';
$l['unzipped_upgrade'] = 'Descompactado com sucesso';
$l['running_upgrade'] = 'Executando atualização......';
$l['succ_upgrade'] = 'Concluído';
$l['error_upgrade'] = 'Ocorreram os seguintes erros durante a atualização :';

//MySQL Errors
$l['err_selectmy'] = 'O banco de dados MySQL não pode ser selecionado.';
$l['err_myconn'] = 'A Conexão MySQL não pôde ser estabelecida.';
$l['err_makequery'] = 'Não foi possível fazer a consulta numerada';
$l['err_mynum'] = 'Erro MySQL número';
$l['err_myerr'] = 'Erro MySQL';

//hf_theme.php
$l['welcome'] = 'Bem vindo(a)';
$l['logout'] = 'Sair';
$l['page_time'] = 'Página gerada em ';
$l['times_are'] = 'Todos os horários são GMT';
$l['time_is'] = 'A hora agora é';
$l['load_start'] = 'Iniciando';
$l['load_stop'] = 'Parando';
$l['load_restart'] = 'Reiniciando';
$l['load_poweroff'] = 'Desligando';

//The Category Language Variables
$l['dock_restart'] = 'Reiniciar Container';
$l['dock_stop'] = 'Parar Container';
$l['dock_start'] = 'Iniciar Container';
$l['dock_poweroff'] = 'Desligar Container';
$l['dock_home'] = 'Início';
$l['dock_settings'] = 'Editar configurações';
$l['dock_help'] = 'Ajuda e Suporte';
$l['dock_sync'] = 'Sincronizar com outros Auto Instaladores';
$l['go_home'] = 'Início';
$l['dock_user'] = 'Perfil do usuário';
$l['dock_password'] = 'Mudar senha';
$l['dock_vps'] = 'Lista de VPS';

// Left Menu
$l['lm_file_mgr'] = 'Gerenciador de arquivos';
$l['lm_res'] = 'Recursos';
$l['lm_performance'] = 'Performance';
$l['lm_process'] = 'Processos';
$l['lm_service'] = 'Serviços';
$l['lm_firewall'] = 'Firewall';
$l['lm_ssh'] = 'SSH';
$l['lm_vnc'] = 'VNC';
$l['lm_vncpass'] = 'Senha VNC';
$l['lm_statusc'] = 'Status dos Logs';
$l['lm_res_a'] = 'Alertas do sistema';
$l['lm_logs'] = 'Logs de tarefas';
$l['lm_bandwidth'] = 'Tráfego';
$l['lm_accountpass'] = 'Account Password';
$l['lm_changepass'] = 'Senha da conta';
$l['lm_controlpanel'] = 'Painel de controle';
$l['lm_recipes'] = 'Recipes';
$l['lm_disk'] = 'Disco';
$l['lm_ostemp'] ='Reinstalar SO';
$l['lm_cpu'] = 'CPU';
$l['lm_ram'] = 'RAM';
$l['lm_host'] = 'Hostname';
$l['lm_logs'] = 'Logs';
$l['lm_ips'] = 'IPs';
$l['lm_backup'] = 'OpenVZ Backups';
$l['lm_hvmsettings'] = 'Configuração do VPS';
$l['lm_apikey'] = 'Credenciais de API';
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

// Users left menu
$l['lm_vs'] = 'Lista de VPS';
$l['lm_addvs'] = 'Launch Instance';
$l['lm_resources'] = 'Cloud Resources';
$l['lm_users'] = 'Users';
$l['lm_usr_settings'] = 'Configurações';
$l['lm_profile'] = 'Meu perfil';
$l['lm_euiso'] = 'ISO';
$l['you_are_admin'] = 'You are an Admin';
$l['lmapps'] = 'Applications';

// Page Jump Related :
$l['page_jump_title'] = 'Digite a página para pular';
$l['page_page'] = 'Página';
$l['page_of'] = 'de';
$l['page_go'] = 'Ir';

// Create VPS related for Kernel
$l['build_no_vs'] = 'O VPS não foi encontrado na base de dados';
$l['build_no_os'] = 'O template do SO não foi encontrado';
$l['build_no_ip'] = 'O IP primário está faltando no VPS';
$l['build_no_os_iso'] = 'Nenhum template de SO ou arquivo ISO foi encontrado';

// Wrong and Right Kernel
$l['wrong_kernel'] = 'Você iniciou no kernel errado - ';
$l['correct_kernel'] = 'Por favor, reinicie com o kernel correto.';
$l['kvm_module'] = 'O módulo de Linux-KVM não foi carregado.';
$l['kvm_network'] = 'O '.$globals['bridge'].' não foi iniciado. Por favor execute <b>service virtnetwork start</b>';
$l['temp_exists'] = 'O arquivo de template já existe';
$l['temp_snap_err'] = 'O Snapshot não pode ser criada e, portanto, a criação do template falhou';
$l['wrong_xm'] = 'The XEN module is not loaded correctly';
$l['lxc_module'] = 'LXC is not installed.';

// Xen VPS Creation errors
$l['xen_err_lvm'] = 'Houve um erro ao criar o LVM do VPS';
$l['xen_err_swap'] = 'Houve um erro na criação do SWAP do VPS';
$l['xen_err_tmp'] = 'O foi um erro na criação do Ponto de Montagem';
$l['xen_err_mount'] = 'Houve um erro na montagem da LVM VPS';
$l['xen_err_unmount'] = 'Houve um erro na desmontagem do LVM VPS';
$l['xen_err_dd'] = 'Houve um erro ao instalar o VPS';
$l['xen_err_mkfs'] = 'Ocorreu um erro durante a formatação do VPS';
$l['xen_err_mkswap'] = 'Ocorreu um erro durante a formatação do SWAP do VPS';
$l['xen_err_untar'] = 'Houve um erro ao extrair o template do SO';
$l['xen_err_part'] = 'Houve um erro ao criar a partição de disco(s)';
$l['xen_err_kpart'] = 'Houve um erro ao mapear a partição(ões)';
$l['xen_err_resizefs'] = 'Houve um erro durante o redimensionamento do sistema de arquivos';

// XCP VPS Creation errors
$l['xcp_err_vdi'] = 'There was an error while creating the VDI of the VM';
$l['xcp_err_iso'] = 'There was an error while loading the ISO';
$l['xcp_err_vif'] = 'There was an error while creating VIF for the VPS';
$l['xcp_xentools_missing'] = 'Could not find the Xentools ISO';

// KVM VPS Creation errors
$l['kvm_err_lvm'] = 'Houve um erro ao criar o LVM do VPS';
$l['kvm_err_mount'] = 'Houve um erro na montagem da LVM VPS';
$l['kvm_err_unmount'] = 'Houve um erro na desmontagem do LVM VPS';
$l['kvm_err_dd'] = 'Houve um erro ao instalar o VPS';
$l['kvm_err_resizefs'] = 'Houve um erro durante o redimensionamento do sistema de arquivos';
$l['kvm_err_part'] = 'Houve um erro ao criar a partição de disco(s)';
$l['kvm_err_kpart'] = 'Houve um erro ao mapear a partição(ões)';
$l['kvm_err_mkswap'] = 'Ocorreu um erro durante a formatação do SWAP do VPS';
$l['kvm_err_ceph_block'] = 'There was an error creating the CEPH block device';
$l['kvm_err_ceph_block_map'] = 'There was an error mapping the CEPH block device';
$l['kvm_err_ceph_block_rmmap'] = 'There was an error in deleting the map of the CEPH block device';
$l['kvm_err_ceph_block_rm'] = 'There was an error in delete of the CEPH block device';

// LXC VPS Creation errors
$l['lxc_err_untar'] = 'There was an error while extracting the OS template';
$l['lxc_err_unmount'] = 'There was an error in unmounting the VPS LVM';
$l['lxc_err_resizefs'] = 'There was an error while resizing the filesystem';
$l['lxc_network'] = 'The '.$globals['bridge'].' is not started. Please run <b>service virtnetwork start</b>';
$l['lxc_err_mount'] = 'There was an error in mounting the VPS LVM';

// Virtuozzo VPS Creation errors
$l['virtuzo_create_error'] = 'There was an error while creating the VPS';
$l['err_vncpass'] = 'There was an error in setting the VNC Password';
$l['err_set_iso'] = 'There was an in attaching the ISO to the VPS';
$l['err_disk_create'] = 'There was an error while creating the VPS disk';
$l['err_set_boot_order'] = 'There was an error while setting the boot order';
$l['err_set_ram'] = 'There was an error while setting the RAM';
$l['err_set_pinning'] = 'There was an error while setting the CPU Affinity';
$l['err_install_tools'] = 'There was an error while installing the guest tools';

//Backup errors

$l['backup_err_mount'] = 'There was an error in mounting the LVM for temporary storage';
$l['backup_err_lvm'] = 'There was an error creating the LVM of the for temporary storage.';
$l['backup_err_mkfs'] = 'There was an error while formatting the temporary storage';
$l['backup_err_mkdir'] = 'There was an error while creating the temporary storage mount point directory';

$l['kvm_err_tar'] = 'Houve um erro ao comprimir o arquivo';
$l['xen_err_tar'] = 'Houve um erro ao comprimir o arquivo';
$l['kvm_err_untar'] = 'Houve um erro ao descompactar o arquivo';
$l['backup_err_untar'] = 'There was an error while uncompressing the archive';
$l['err_vzdump'] = 'Houve um erro com a ferramenta de backup';
$l['err_create_backup_folder'] = 'There was an error while creating the backup directory';
$l['err_create_backup_date_folder'] = 'There was an error while creating the backup date directory';
$l['err_backup_command_fail'] = 'Failed to create the backup image, Return code: ';
$l['backup_err_snap_switch'] = 'There was an error while reverting to the snapshot';
$l['backup_err_snap_del'] = 'There was an error while deleting the snapshot';
$l['vps_uuid_empty'] = 'VPS UUID is empty!';

// OpenVZ VPS Creation errors
$l['openvz_err_ubc'] = 'Houve um erro ao salvar as configurações UBC';
$l['openvz_err_ostemplate'] = 'Houve um erro ao definir o template do SO';
$l['openvz_err_space'] = 'Houve um erro ao definir o espaço em disco';
$l['openvz_err_inodes'] = 'Houve um erro ao definir o espaço em disco (Inodes)';
$l['openvz_err_hostname'] = 'Houve um erro ao definir o hostname';
$l['openvz_err_ip'] = 'Houve um erro ao definir o endereço IP';
$l['openvz_err_dns'] = 'Houve um erro definir o DNS';
$l['openvz_err_cpu'] = 'Houve um erro ao definir as CPU units';
$l['openvz_err_cpulim'] =  'Houve um erro ao estabelecer o limite da CPU';
$l['openvz_err_cores'] = 'Houve um erro definir os núcleos de CPU';
$l['openvz_err_ioprio'] = 'Houve um erro ao definir a prioridade IO';
$l['openvz_err_create'] = 'Houve um erro ao criar o container';
$l['vswap_error'] = 'Houve um erro ao configurar as definições VSwap';

// Rescue Disk Errors
$l['err_downloading'] = 'There was an error downloading the rescue template';
$l['err_delete_disk'] = 'There was an error while deleting the rescue disk';

// Enduser VPS status column
$l['lm_status_online'] = 'Online';
$l['lm_status_offline'] = 'Offline';
$l['lm_status_suspended'] = 'Suspended';
$l['vps_is_suspended'] = 'This VPS is suspended. You cannot perform any operations for the VPS !';
$l['suspend_reason_bw'] = 'This VPS is suspended due to Bandwidth Over Usage. You cannot perform any operations for the VPS !';

$l['unknown'] = 'Unknown';
$l['change_onboot'] = 'Change will occur when the VPS is booted again.';
$l['completed'] = 'Completed';
$l['vpsdisk_resize_err'] = 'There was an error while resizing the Disks';
$l['mount_undetermined'] = 'No Linux Partition was found in the VPS';
$l['disk_destroy_err'] = 'There was an error while destroying the Disks';
$l['started'] = 'Started';
$l['ended'] = 'Ended';
$l['updated'] = 'Updated';
$l['edit_xcperror'] = 'There was an error while trying to edit the VPS';
$l['bandwidth_threshold_mail_sub'] = 'Bandwidth threshold exceeded';
$l['bandwidth_threshold_mail_message'] = 'Hi,

Your VPS {{hostname}} has exceeded {{vps_bandwidth_threshold}} % of the bandwidth limit.

The VPS has used {{used_gb}} GB of bandwidth out of {{limit_gb}} GB. 

Regards,
{{sn}}';
$l['bandwidth_mail_sub'] = 'VPS Suspended due to Bandwidth Overuse';
$l['bandwidth_mail_message'] = 'Hi,

Your VPS `{{hostname}}` has been suspended because it has overused its assigned bandwidth limit.

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
$l['self_shutdown_body'] = 'Hi

Your Vps {{vpsid}} has been {{action}} as per the time you had set ({{time}})
';

$l['self_shutdown_start'] = 'Started';
$l['self_shutdown_stop'] = 'Shutdown';
$l['self_shutdown_restart'] = 'restarted';
$l['self_shutdown_poweroff'] = 'Powered Off';

$l['self_shutdown_start_failed'] = 'Failed to Start';
$l['self_shutdown_stop_failed'] = 'Failed to Shutdown';
$l['self_shutdown_restart_failed'] = 'Failed to Restart';
$l['self_shutdown_poweroff_failed'] = 'Failed to Power Off';

//Proxmox kernel errors
$l['failed_connect_proxmox'] = 'Failed to make proxmox api call. Please enter proxmox details at Configuration --> Slave Settings';

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

