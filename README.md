# whmcs-vps-reseller
WHMCS server module for provisioning and management of VPS servers from reseller's remote WHMCS installation. Enables reseller to deploy live cloud VMs from custom VPS package configurations. Features robust end-user management interface for reseller's client to manage server from within client area of WHMCS.

<p align="center"><a href="https://radwebhosting.com" target="_blank"><img width="350" src="https://avatars0.githubusercontent.com/u/16030710?s=460&v=4" alt="Rad Web Hosting"></a></p>

## About
* This is a Server Provisioning module for WHMCS to integrate API functionality for VPS resellers, allowing them to remotely manage Rad Web Hosting VPS Servers in remote WHMCS installation. This module also installs Client Area domain management functions for use by end-clients.
* Simplifies the automation of provisioning, selling, and managing VPS Servers, and provides for complete remote control of all VPS functions. 

## Prerequisites
Please read the following system requirements for WHMCS VPS Reseller module:
* Working WHMCS installation (v5.3+)
* Rad Web Hosting VPS API key

Users can gain access to API key by signing up for a VPS Reseller account

## Installation
1. Download the module
2. Upload to WHMCS Server Modules directory (i.e. /home/user/whmcs/modules/servers ) and extract the files
3. In WHMCS Admin area, navigate to Setup -> Products/Services -> Servers and create the `RadWebHosting_VPS` server
4. Enter your API username and API secret. These can be obtained via your VPS Reseller Welcome Email.

Read our guide, [How to Integrate VPS Reseller with WHMCS](https://blog.radwebhosting.com/how-to-integrate-vps-reseller-with-whmcs/)

For full documentation, please visit the Rad Web Hosting VPS API documentation on the website.

## Help
If you have any questions or problems please submit a [Support Ticket](https://radwebhosting.com/client_area/submitticket.php).

## Bugs
If you discover any bugs or issues with this module, please notify our staff via the [24/7 Helpdesk](https://radwebhosting.com/client_area/submitticket.php).

## License
This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
