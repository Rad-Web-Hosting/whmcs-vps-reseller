# WHMCS VPS Reseller
WHMCS server module for provisioning and management of VPS servers from reseller's remote WHMCS installation. Enables reseller to deploy live cloud VMs from custom VPS package configurations. Features robust end-user management interface for reseller's client to manage server from within client area of WHMCS.

<p align="center"><a href="https://radwebhosting.com" target="_blank"><img width="350" src="https://avatars0.githubusercontent.com/u/16030710?s=460&v=4" alt="Rad Web Hosting"></a></p>

## About
* This is a Server Provisioning module for WHMCS to integrate API functionality for VPS resellers, allowing them to remotely manage Rad Web Hosting VPS Servers in remote WHMCS installation.
* Simplifies the automation of provisioning, selling, and managing VPS Servers, and provides for complete remote control of all VPS functions. 

## Prerequisites
Please read the following system requirements for WHMCS VPS Reseller module:
* Working WHMCS installation (v5.3+)
* Rad Web Hosting VPS API key

Users can gain access to API key by signing up for a VPS Reseller account

## Installation
1. Download the module
2. Upload to WHMCS Server Modules directory (i.e. /home/user/whmcs/modules/servers ) and extract the files
3. In WHMCS Admin area, navigate to Setup -> Products/Services -> Servers and create the `rad_cloud` server
4. Enter your API username and API secret. These can be obtained via your VPS Reseller Welcome Email.

Getting Started with VPS Reseller with WHMCS
--------------------------------------------

Please follow the below guidelines to configure your VPS Reseller with WHMCS integration.

### Prerequisites

*   WHMCS installation
*   [VPS Reseller](https://radwebhosting.com/vps-reseller) account
*   WHMCS server has ports 4081-4085 open

### Install WHMCS VPS Module

1.  Download and extract the WHMCS integration \[[HERE](https://marketplace.whmcs.com/product/6108-vps-reseller "Download WHMCS Module")\].
2.  Copy the entire directory via FTP, SFTP, SCP, etc. to /<WHMCS\_PATH>/modules/servers/rad\_cloud/

### Get API Credentials

1.  First, [login to the VPS panel](https://radwebhosting.com/client_area/knowledgebase/250/Video-How-to-Login-to-Virtualizor-Control-Panel.html) with your reseller account details.
2.  Access the side menu and navigate to "API Credentials".
3.  Create a API Key Pair by clicking the button. ![create api key pair](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-create-api-key-pair.png "create api key pair")
4.  API Key Pair success message will display upon successful creation.![API Key Pair created](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-api-key-pair-created.png "API Key Pair created")
5.  Copy the API key pair credentials (these will be needed to configure WHMCS server connection).![Copy API key pair](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-panel-api-credentials.png)

### Create Server in WHMCS Admin

![Configure Server in WHMCS](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-add-server-in-whmcs-600px.png)

1.  From WHMCS Admin > Setup > Products/Services > Servers
2.  Click "Add New Server". Follow directions:
    1.  Name: Can Be Anything
    2.  Hostname: The Hostname of VPS Reseller
    3.  IP Address: This will be provided by the data center.
    4.  Nameservers are not required for this module
3.  **Server Details**
    1.  Module: "Rad\_cloud" .
    2.  Username: API Key (created in previous step)
    3.  Password: API Password (created in previous step)
    4.  Access Hash: Leave empty

### Create Product

![Configure WHMCS product](https://new.radwebhosting.com/client_area/images/knowledgebase/configure-whmcs-product-vps-reseller.gif "Configure WHMCS product")

1.  Navigate to Setup > Products/Services > Products/Services.
2.  Select "**Create a new Product**"
    1.  Product Type: **Server/VPS**
    2.  Product Group: Any
    3.  Product Name: Any
3.  Go to "Module Settings" tab and enter the following details:
    1.  Module: **Rad\_cloud**
    2.  The remaining fields as described on that page ![Configure Product Module Settings](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-whmcs-configure-module-settings.png)
4.  Go to "Custom Fields" and create new Custom Field with the following details:
    1.  Field Name: "vpsid" (without quotes)
    2.  Field Type: **Text Box**
    3.  Description: **The ID of the server from VPS Panel.** 
    4.  Validation: Leave blank
    5.  Check **Admin Only** tick box.
5.  Create "Custom Fields" entry to satisfy **VPS operating system** requirements:
    1.  Field Name: **OS** or **OS|Operating System**
    2.  Field Type: **Dropdown**
    3.  Description: **Choose OS to install on server** 
    4.  Validation: Leave blank
    5.  Select Options field: enter OS template file names (without .img extensions) like **debian-12-x86_64**. Retrieve possible values from: [VPS Guides -> List of Available OS Templates](https://radwebhosting.com/client_area/knowledgebase/246/List-of-Available-OS-Templates.html).

![Product Custom Fields](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-configure-product-custom-fields.png)

### Optional WHMCS Integration Customization

*   Create new VPS welcome email template. We have provided a custom email template to use for sending VPS server credentials to enduser when VPS is provisioned (created). This template will utilize merge fields and organize important server details better than the default "VPS/Dedicated Server Welcome Email" template  that is provided with WHMCS.
    *   You can add the template from your WHMCS Admin area by navigating to "Setup->Email Templates"
    *   Choose to "Create New Email Template"
    *   Choose "Product/Service" from the "Email Type" drop-down menu and give the template a unique name ![create custom VPS welcome email template](https://new.radwebhosting.com//client_area/images/knowledgebase/create-vps-welcome-email-template.gif "create custom VPS welcome email template")
    *   Configure the email sending settings
    *   Add a subject for your email (i.e. "New VPS Server Details")
    *   To import  our pre-made template, click "Enable/Disable Rich-Text Editor" button
    *   Copy and paste the email template from below:
```
Dear {$client_name},

We are glad to inform you that the virtual machine you ordered has been set up.

Manager Details
=============================
URL: https://<custom_cloud_panel_domain>:4083
Username: {$service_username}
Password: {$service_password}

Server Details
=============================
Hostname: {$service_domain}
Main IP: {$service_dedicated_ip} 
Root Password: {$service_password}
{if $service_assigned_ips}
IP Address Allotted:
{$service_assigned_ips}
{/if}

You can access your server over SSH. 
If you are a Windows user, you can use a free SSH client called Putty which can be downloaded from :
http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html

{$signature}
```
        
### Configuration Tips to Simplify Administration

* Instead of creating each VPS product with Custom Field: "OS|Operating System" and drop-down list of all available templates, we recommend creating a "Configurable Options" group with the **Operating System** configurable option.
* Please also refer to [this article](https://docs.whmcs.com/Addons_and_Configurable_Options#Configurable_Options) to find more information about using configurable options in WHMCS.
    * Configurable Options group can be assigned to all VPS products (of the same Virtualization)-this will be much more desirable from an administrative perspective, should the available OS templates options ever change.
    * In the event of new OS template available for VPS, you can simply modify this single Configurable Option (assuming the group is assigned to multiple VPS products for same Virtualization), as opposed to editing the custom fields drop-down values for every related VPS product individually.
* Where to get the values for available OS templates (for KVM virtualization VPS)?
* Rad Web Hosting keeps a public list of available KVM OS templates in the Knowledgebase, at: [VPS Guides -> List of Available OS Templates](https://radwebhosting.com/client_area/knowledgebase/246/List-of-Available-OS-Templates.html)
* Use the highlighted values (from the "Name" column) in the below image to for the Configurable Options "Operating System" drop-down values (this must be exactly the same for the automated provisioning to work): ![list of available OS templates](https://new.radwebhosting.com/client_area/images/knowledgebase/current-list-of-available-vps-os-templates-highlighted.png "list of available OS templates")

### Client Area Features

![VPS Reseller end-user Client Area product details](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-whmcs-client-panel.png "VPS Reseller end-user Client Area product details")

### WHMCS Admin Product Management

![WHMCS Admin Product Management](https://new.radwebhosting.com/client_area/images/knowledgebase/vps-reseller-whmcs-admin-768x1495.jpg "WHMCS Admin Product Management")

Read our guide, [How to Integrate VPS Reseller with WHMCS](https://blog.radwebhosting.com/how-to-integrate-vps-reseller-with-whmcs/)

For full documentation, please visit the Rad Web Hosting VPS API documentation on the website.

## Help
If you have any questions or problems please submit a [Support Ticket](https://radwebhosting.com/client_area/knowledgebase/112/Open-Support-Ticket.html).

## Bugs
If you discover any bugs or issues with this module, please notify our staff via the [24/7 Helpdesk](https://radwebhosting.com/support).

## License
This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
