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
        'cyberpanel-centos7-x86_64|CyberPanel (64 bit)',
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
    \WHMCS\Config\Setting::setValue('virtualizor_cloud_installed', '1');
    return '';
}
