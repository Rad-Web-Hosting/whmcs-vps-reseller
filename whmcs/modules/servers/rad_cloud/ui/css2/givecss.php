<?php

/**
 * Combine all JavaScript Files and give.
 * 
 * @package  ampps
 */

//////////////////////////////////////////////////////////////
//===========================================================
// editremote.php
//===========================================================
// SOFTACULOUS 
// Version : 1.1
// Inspired by the DESIRE to be the BEST OF ALL
// ----------------------------------------------------------
// Started by: Alons
// Date:       10th Jan 2009
// Time:       21:00 hrs
// Site:       http://www.softaculous.com/ (SOFTACULOUS)
// ----------------------------------------------------------
// Please Read the Terms of use at http://www.softaculous.com
// ----------------------------------------------------------
//===========================================================
// (c)Softaculous Inc.
//===========================================================
//////////////////////////////////////////////////////////////

$files = array(	'./fonts/inter/inter.css',
				'flowbite.min.css',
				'tailwind.css',
				'apexcharts.css',
				'all.min.css',
				'jquery.scrollbar.css',
				'select2.css',
			);

foreach($files as $k => $v){
	//echo $k.'<br>';
	$data .= file_get_contents($v)."\n\n";
}

// We are zipping if possible
if(function_exists('ob_gzhandler')){
	ob_start('ob_gzhandler');
}

// Type javascript
header("Content-type: text/css; charset: UTF-8");

// Set a zero Mtime
$filetime = filemtime('tailwind.css');

// Cache Control
header("Cache-Control: must-revalidate");

// Getting headers sent by the client.
$headers = (function_exists('apache_request_headers') ? apache_request_headers() : array());

// Checking if the client is validating his cache and if it is current.
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && (strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $filetime)) {
	
	// Client's cache IS current, so we just respond '304 Not Modified'.
	header('Last-Modified: '.gmdate('D, d M Y H:i:s', $filetime).' GMT', true, 304);
	
	return;
	
}else{
	
	// Image not cached or cache outdated, we respond '200 OK' and output the image.
	header('Last-Modified: '.gmdate('D, d M Y H:i:s', $filetime).' GMT', true, 200);
	
}

echo $data;

?>