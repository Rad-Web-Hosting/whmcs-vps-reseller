<?php

//////////////////////////////////////////////////////////////
//===========================================================
// inc.php
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

global $virtualizor_conf;

// Common Functions

if(!function_exists('v_fn')){

function v_fn($f){
	global $virtualizor_conf;
	
	if(empty($virtualizor_conf['fields'][$f])){
		$r = $f;
	}else{
		$r = $virtualizor_conf['fields'][$f];
	}
	
	return $r;	
}

}

// The following function is a variation of v_fn() to support virtualizor_cloud_account as is uses another config variable $virtcloud_acc
if(!function_exists('vc_fn')){

function vc_fn($f){
	global $virtcloud_acc;
	
	if(empty($virtcloud_acc['fields'][$f])){
		$r = $f;
	}else{
		$r = $virtcloud_acc['fields'][$f];
	}
	
	return $r;	
}

}


if(!function_exists('make_apikey')){

function make_apikey($key, $pass){
	return $key.md5($pass.$key);
}

}



if(!function_exists('_unserialize')){
	
function _unserialize($str){

	$var = @unserialize($str);
	
	if(empty($var)){
	
		$str = preg_replace('!s:(\d+):"(.*?)";!se', "'s:'.strlen('$2').':\"$2\";'", $str);
		
		$var = @unserialize($str);
	
	}
	
	//If it is still empty false
	if(empty($var)){
	
		return false;
	
	}else{
	
		return $var;
	
	}

}

}


if(!function_exists('generateRandStr')){
//generates random strings
function generateRandStr($length){	
	$randstr = "";	
	for($i = 0; $i < $length; $i++){	
		$randnum = mt_rand(0,61);		
		if($randnum < 10){		
			$randstr .= chr($randnum+48);			
		}elseif($randnum < 36){		
			$randstr .= chr($randnum+55);			
		}else{		
			$randstr .= chr($randnum+61);			
		}		
	}	
	return strtolower($randstr);	
}

}


if(!function_exists('valid_ipv6')){

function valid_ipv6($ip){

	$pattern = '/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/';
	
	if(!preg_match($pattern, $ip)){
		return false;	
	}
	
	return true;
	
}

}

if(!function_exists('cexplode')){

// Clean explode a string
function cexplode($chars, $str, $int = 0){
	
	$r = explode($chars, $str);
	
	foreach($r as $k => $v){
		if($int){
			$r[$k] = (int) trim($v);	
		}else{
			$r[$k] = trim($v);
		}
	}
	
	return $r;
	
}

}

if(!function_exists('vlang_vars_name')){
// Replaces the Soft Variables with the supplied ones
function vlang_vars_name($str, $array){
	
	foreach($array as $k => $v){
		
		$str = str_replace('{{'.$k.'}}', $v, $str);
	
	}
	
	return $str;

}
}


if(!function_exists('vparse_lang')){
// Parse Virtualizor Languages
function vparse_lang($str){
	
	global $vlang;
	
	foreach($vlang as $k => $v){
		
		$str = str_replace('{{'.$k.'}}', $v, $str);
	
	}
	
	return $str;

}
}

if(!function_exists('vload_lang')){
	// Load Virtualizor Languages
	function vload_lang($lang = 'english'){
		
		global $vlang;
	
		if(!@include_once(dirname(__FILE__).'/languages/'.$lang.'/index_lang.php')){
			include_once(dirname(__FILE__).'/languages/english/index_lang.php');
		}
	
		if(!@include_once(dirname(__FILE__).'/languages/'.$lang.'/enduser_lang.php')){
			include_once(dirname(__FILE__).'/languages/english/enduser_lang.php');
		}
		
		$vlang = $l;
	
	}
}

if(!function_exists('virt_val')){

function virt_val($val){
	return (empty($val) && strlen($val) < 1 ? 0 : $val);
}

}

if(!class_exists('hash_encryption')){

	// WHMCS Decrypter
	class hash_encryption {
		/**
		 * Hashed value of the user provided encryption key
		 * @var	string
		 **/
		var $hash_key;
		/**
		 * String length of hashed values using the current algorithm
		 * @var	int
		 **/	
		var $hash_lenth;
		/**
		 * Switch base64 enconding on / off
		 * @var	bool	true = use base64, false = binary output / input
		 **/	
		var $base64;
		/**
		 * Secret value added to randomize output and protect the user provided key
		 * @var	string	Change this value to add more randomness to your encryption
		 **/	
		var $salt = 'Change this to any secret value you like. "6rtd4schjfwf5whsm427crne" might be a good example.';
		
	
		/**
		 * Constructor method
		 *
		 * Used to set key for encryption and decryption.
		 * @param	string	$key	Your secret key used for encryption and decryption
		 * @param	boold	$base64	Enable base64 en- / decoding
		 * @return mixed
		 */
		function hash_encryption($key, $base64 = true) {
			
			global $cc_encryption_hash;
			
			// Toggle base64 usage on / off
			$this->base64 = $base64;
			
			// Instead of using the key directly we compress it using a hash function
			$this->hash_key = $this->_hash($key);
			
			// Remember length of hashvalues for later use
			$this->hash_length = strlen($this->hash_key);
		}
			
		/**
		 * Method used for encryption
		 * @param	string	$string	Message to be encrypted
		 * @return string	Encrypted message
		 */
		function encrypt($string) {
			$iv = $this->_generate_iv();
			
			// Clear output
			$out = '';
			
			// First block of output is ($this->hash_hey XOR IV)
			for($c=0;$c < $this->hash_length;$c++) {
				$out .= chr(ord($iv[$c]) ^ ord($this->hash_key[$c]));
			}
	
			// Use IV as first key
			$key = $iv;
			$c = 0;
	
			// Go through input string
			while($c < strlen($string)) {
				// If we have used all characters of the current key we switch to a new one
				if(($c != 0) and ($c % $this->hash_length == 0)) {
					// New key is the hash of current key and last block of plaintext
					$key = $this->_hash($key . substr($string,$c - $this->hash_length,$this->hash_length));
				}
				// Generate output by xor-ing input and key character for character
				$out .= chr(ord($key[$c % $this->hash_length]) ^ ord($string[$c]));
				$c++;
			}
			// Apply base64 encoding if necessary
			if($this->base64) $out = base64_encode($out);
			return $out;
		}
		
		/**
		 * Method used for decryption
		 * @param	string	$string	Message to be decrypted
		 * @return string	Decrypted message
		 */
		function decrypt($string) {
			// Apply base64 decoding if necessary
			if($this->base64) $string = base64_decode($string);
			
			// Extract encrypted IV from input
			$tmp_iv = substr($string,0,$this->hash_length);
			
			// Extract encrypted message from input
			$string = substr($string,$this->hash_length,strlen($string) - $this->hash_length);
			$iv = $out = '';
			
			// Regenerate IV by xor-ing encrypted IV from block 1 and $this->hashed_key
			// Mathematics: (IV XOR KeY) XOR Key = IV
			for($c=0;$c < $this->hash_length;$c++) 
			{
				$iv .= chr(ord($tmp_iv[$c]) ^ ord($this->hash_key[$c]));
			}
			// Use IV as key for decrypting the first block cyphertext
			$key = $iv;
			$c = 0;
			
			// Loop through the whole input string
			while($c < strlen($string)) {
				// If we have used all characters of the current key we switch to a new one
				if(($c != 0) and ($c % $this->hash_length == 0)) {
					// New key is the hash of current key and last block of plaintext
					$key = $this->_hash($key . substr($out,$c - $this->hash_length,$this->hash_length));
				}
				// Generate output by xor-ing input and key character for character
				$out .= chr(ord($key[$c % $this->hash_length]) ^ ord($string[$c]));
				$c++;
			}
			return $out;
		}
	
		/**
		 * Hashfunction used for encryption
		 *
		 * This class hashes any given string using the best available hash algorithm.
		 * Currently support for md5 and sha1 is provided. In theory even crc32 could be used
		 * but I don't recommend this.
		 *
		 * @access	private
		 * @param	string	$string	Message to hashed
		 * @return string	Hash value of input message
		 */
		function _hash($string) {
			// Use sha1() if possible, php versions >= 4.3.0 and 5
			if(function_exists('sha1')) {
				$hash = sha1($string);
			} else {
				// Fall back to md5(), php versions 3, 4, 5
				$hash = md5($string);
			}
			$out ='';
			// Convert hexadecimal hash value to binary string
			for($c=0;$c<strlen($hash);$c+=2) {
				$out .= $this->_hex2chr($hash[$c] . $hash[$c+1]);
			}
			return $out;
		}
		
		/**
		 * Generate a random string to initialize encryption
		 *
		 * This method will return a random binary string IV ( = initialization vector).
		 * The randomness of this string is one of the crucial points of this algorithm as it
		 * is the basis of encryption. The encrypted IV will be added to the encrypted message
		 * to make decryption possible. The transmitted IV will be encoded using the user provided key.
		 *
		 * @todo	Add more random sources.
		 * @access	private
		 * @see function	hash_encryption
		 * @return string	Binary pseudo random string
		 **/
		function _generate_iv() {
			// Initialize pseudo random generator
			srand ((double)microtime()*1000000);
			
			// Collect random data.
			// Add as many "pseudo" random sources as you can find.
			// Possible sources: Memory usage, diskusage, file and directory content...
			$iv  = $this->salt;
			$iv .= rand(0,getrandmax());
			// Changed to serialize as the second parameter to print_r is not available in php prior to version 4.4
			$iv .= serialize($GLOBALS);
			return $this->_hash($iv);
		}
		
		/**
		 * Convert hexadecimal value to a binary string
		 *
		 * This method converts any given hexadecimal number between 00 and ff to the corresponding ASCII char
		 *
		 * @access	private
		 * @param	string	Hexadecimal number between 00 and ff
		 * @return	string	Character representation of input value
		 **/
		function _hex2chr($num) {
			return chr(hexdec($num));
		}
	}
}

if(!function_exists('get_server_pass_from_whmcs')){
	function get_server_pass_from_whmcs($enc_pass){
		
		global $cc_encryption_hash;
		// Include WHMCS database configuration file
		include_once(dirname(dirname(dirname(dirname(__FILE__)))).'/configuration.php');
		$key1 = md5 (md5 ($cc_encryption_hash));
		$key2 = md5 ($cc_encryption_hash);
		$key = $key1.$key2;
		$hasher = new hash_encryption($key);
		return $hasher->decrypt($enc_pass);
	}
}

?>