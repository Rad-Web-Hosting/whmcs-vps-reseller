<?php

use WHMCS\Database\Capsule;

if (!defined("WHMCS")) {
    die("This file cannot be accessed directly");
}

function virtualizor_cloud_installpredefined()
{
    if (\WHMCS\Config\Setting::getValue('virtualizor_cloud_installed')) {
        return '';
    }
    global $CONFIG;
    $configgid = Capsule::table('tblproductconfiggroups')->insertGetId([
        'name' => 'Cloud VPS',
        'description' => 'Cloud VPS',
    ]);
    $configid = Capsule::table('tblproductconfigoptions')->insertGetId([
        'gid' => $configgid,
        'optionname' => 'Operating System',
        'optiontype' => 1,
        'qtyminimum' => 0,
        'qtymaximum' => 0,
        'order' => 0,
        'hidden' => 0,
    ]);
    $list = [
        'almalinux-8.4-x86_64|AlmaLinux 8 (64 bit)',
        'almalinux-9.2-x86_64|AlmaLinux 9 (64 bit)',
        'oracle-8.6-x86_64|Oracle Linux 8 (64 bit)',
        'oracle-9.2-x86_64|Oracle Linux 8 (64 bit)',
        'rocky-8.4-x86_64|Rocky Linux 8 (64 bit)',
        'rocky-9.1-x86_64|Rocky Linux 9 (64 bit)',
        'centos-7.8-x86_64|CentOS 7 (64 bit)',
        'centos-8.2-x86_64|CentOS 8 (64 bit)',
        'debian-9.4-x86_64|Debian 9 (64 bit)',
        'debian-10-x86_64|Debian 10 (64 bit)',
        'debian-11-x86_64|Debian 11 (64 bit)',
        'debian-12-x86_64|Debian 11 (64 bit)',
        'fedora-34-x86_64|Fedora 34 (64 bit)',
        'scientific-7.4-x86_64|Scientific Linux 7.4 (64 bit)',
        'suse-13.1-x86_64|openSUSE 13.1 (64 bit)',
        'suse-15.1-x86_64|openSUSE 15.1 (64 bit)',
        'ubuntu-18.04-x86_64|Ubuntu 18.04 (64 bit)',
        'ubuntu-20.04-x86_64|Ubuntu 20.04 (64 bit)',
        'ubuntu-22.04-x86_64|Ubuntu 22.04 (64 bit)',
        'cyberpanel-centos7-x86_64|CyberPanel (64 bit) (10GB+ Disk)',
	      'azuracast-20.04-lts-x86_64|AzuraCast on Focal (64 bit) (10GB+ Disk)',
    		'windows-2008r2|Windows Server 2008 R2 EVAL (15GB+ Disk)',
	    	'windows-2012r2|Windows Server 2012 R2 EVAL (15GB+ Disk)',
    		'windows-2016|Windows Server 2016 EVAL (20GB+ Disk)',
    		'windows-2019|Windows Server 2019 EVAL (20GB+ Disk)',
	    	'windows-2022|Windows Server 2022 EVAL (20GB+ Disk)',
    ];
    $currenciesarray = Capsule::table('tblcurrencies')->pluck('code', 'id');
    if (!is_array($currenciesarray)) {
        $currenciesarray = $currenciesarray->toArray();
    }
    foreach ($list as $k => $conf) {
        $opid = Capsule::table('tblproductconfigoptionssub')->insertGetId([
            'configid' => $configid,
            'optionname' => $conf,
            'sortorder' => $k,
            'hidden' => 0,
        ]);
        foreach ($currenciesarray as $key => $value) {
            Capsule::table('tblpricing')->insert([
                "msetupfee" => 0,
                "qsetupfee" => 0,
                "ssetupfee" => 0,
                "asetupfee" => 0,
                "bsetupfee" => 0,
                "tsetupfee" => 0,
                "monthly" => 0,
                "quarterly" => 0,
                "semiannually" => 0,
                "annually" => 0,
                "biennially" => 0,
                "triennially" => 0,
                "type" => 'configoptions',
                "currency" => $key,
                "relid" => $opid,
            ]);
        }
    }
    $group = new WHMCS\Product\Group();
    $group->displayOrder = WHMCS\Database\Capsule::table("tblproductgroups")->max("order") + 1;
    $group->name = 'VPS Servers';
    $group->orderFormTemplate = $CONFIG['OrderFormTemplate'];
    $group->disabledPaymentGateways = [];
    $group->isHidden = 0;
    $group->headline = 'VPS Servers';
    $group->tagline = 'VPS Servers';
    $group->save();
    Capsule::table('tblproductgroups')->where('id', $group->id)->update([
        'slug' => 'vps-servers'
    ]);
    $groupId = $group->id;
    $newProduct = new WHMCS\Product\Product();
    $newProduct->type = 'server';
    $newProduct->productGroupId = $groupId;
    $newProduct->name = 'KVM-SSD-1GB';
    $newProduct->paymentType = "free";
    $newProduct->showDomainOptions = 0;
    $newProduct->module = 'virtualizor_cloud';
    $newProduct->isHidden = 0;
    $newProduct->autoSetup = 'payment';
    $displayOrder = WHMCS\Database\Capsule::table("tblproducts")->where("gid", "=", $groupId)->max("order");
    $newProduct->displayOrder = is_null($displayOrder) ? 1 : ++$displayOrder;
    $newProduct->save();
    Capsule::table('tblproductconfiglinks')->insert([
        'pid' => $newProduct->id,
        'gid' => $configgid,
    ]);
    Capsule::table('tblproducts_slugs')->insert([
        'product_id' => $newProduct->id,
        'group_id' => $groupId,
        'group_slug' => 'cloud-vps',
        'slug' => 'kvm-ssd-1gb',
        'active' => 1,
        'clicks' => 1,
    ]);
    Capsule::table('tblcustomfields')->insert([
        "type" => "product",
        "relid" => $newProduct->id,
        "fieldname" => 'vpsid',
        "fieldtype" => 'text',
        "description" => '',
        "fieldoptions" => '',
        "regexpr" => '',
        "adminonly" => 'on',
        "required" => 0,
        "showorder" => 0,
        "showinvoice" => 0,
        "sortorder" => 0
    ]);
	Capsule::table('tblcustomfields')->insert([
        "type" => "product",
        "relid" => $newProduct->id,
        "fieldname" => 'iso|ISO Disk',
        "fieldtype" => 'dropdown',
        "description" => 'Attach ISO disk image',
        "fieldoptions" => 'none,3cx-debian-amd64-netinst.iso,AlmaLinux-9.2-x86_64-minimal.iso,alpine-standard-3.16.0-x86_64.iso,antiX-22-net_x64-net.iso,archlinux-2022.07.01-x86_64.iso,artixlinux-base-suite66-20220713-x86_64.iso,astlinux-1.4.7-genx86_64-vm.iso,astralinux-alce-2.12.46.6-17.04.2023_15.09.iso,CentOS-7-x86_64-Minimal-2009.iso,CentOS-7-x86_64-NetInstall-2009.iso,CentOS-Stream-8-x86_64-20221005-boot.iso,CentOS-Stream-9-20230704.1-x86_64-boot.iso,chimera-linux-x86_64-LIVE-20221012-base.iso,ClearOS-DVD-x86_64-7.9.1.342252.iso,clonezilla-live-3.0.1-8-amd64.iso,CloudLinux-DVD-x86_64-7.9.iso,CloudLinux-netinst-x86_64-7.9.iso,coreos-36.20221001.3.0-live.x86_64.iso,debian-10.3.0-amd64-DVD-1.iso,debian-9.4.0-amd64-netinst.iso,debian-amd64-netinst-elastix.iso,debian-live-11.5.0-amd64-standard.iso,debian-live-11.6.0-amd64-xfce.iso,elementary-os-7.0-stable.20230129rc.iso,Fedora-Server-netinst-x86_64-36-1.5.iso,Fedora-Server-netinst-x86_64-38-1.6.iso,FreeBSD-12.3-RELEASE-amd64-dvd1.iso,FreeBSD-13.0-RELEASE-amd64-dvd1.iso,FreeNAS-11.0-RELEASE.iso,FREEPBX-16-64bit-2208-2-unattended.iso,gentoo-install-amd64-minimal-20220626T170536Z.iso,GoboLinux-017-x86_64.iso,gparted-live-1.0.0-5-amd64.iso,HBCD_PE_x64.iso,ipxe.iso,linuxmint-20.2-cinnamon-64bit.iso,Mageia-8-x86_64.iso,manjaro-kde-21.3.7-minimal-220816-linux515.iso,mikrotik-6.48.6.iso,mikrotik-7.5.iso,mikrotik-7.6rc3.iso,mxlinux-21.2.1_x64.iso,netboot.xyz.iso,netbsd-9-x86_64-boot.iso,nethserver-7.9.2009-x86_64.iso,nixos-minimal-x86_64-linux.iso,openbsd-amd64-install71.iso,openfileresa-2.99.1-x86_64-disc1.iso,OpenMandrivaLx.4.3-plasma.x86_64.iso,OPNsense-23.7-dvd-amd64.iso,Parrot-security-5.3_amd64.iso,pfSense-CE-2.6.0-RELEASE-amd64.iso,pfSense-CE-2.7.0-RELEASE-amd64.iso,pop-os_22.04_amd64_intel_32.iso,puppylinux-fossapup64-9.5.iso,slackware64-15.0-install-dvd.iso,smeserver-10.1-x86_64-netinstall.iso,SNG7-PBX-64bit-2203-2.iso,sparkylinux-7.0-x86_64-minimalcli.iso,systemrescue-9.04-amd64.iso,TrueNAS-13.0-U2.iso,turnkey-mongodb-16.1-buster-amd64.iso,turnkey-nodejs-16.1-buster-amd64.iso,turnkey-redis-16.3-buster-amd64.iso,ubcd539.iso,ubuntu-16.04.4-server-amd64.iso,venomlinux-4.0-x86_64-20220912.iso,ViciBox_v10.x86_64-10.0.2.iso,virtio-win.iso,voidlinux-live-x86_64-20221001-base.iso,vyos-rolling-latest.iso,Windows_10_20H2_English_x32.iso,Windows_10_21H1_X86-64.iso,Windows_2012-R2_SERVER_EVAL_EN-US.ISO,Windows_2019_SERVER_EVAL_x64.iso,Windows_2022_SERVER_EVAL_x64.iso,zentyal-7.0-development-amd64.iso,Zorin-OS-16.2-Core-64-bit-r1.iso',
        "regexpr" => '',
        "adminonly" => '',
        "required" => 0,
        "showorder" => 1,
        "showinvoice" => 1,
        "sortorder" => 0
    ]);
    \WHMCS\Config\Setting::setValue('virtualizor_cloud_installed', '1');
    return '';
}
