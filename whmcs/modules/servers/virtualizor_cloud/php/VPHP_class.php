<?php

include_once('index_class.php');

if(!class_exists('VPHP')){
	class VPHP{

		//load other methods
		use ARRAYS;
	
		//we will call other functions as well
		public function __call($function, $args){
			return self::processCalls($function, $args);
		}
	
		public static function __callStatic($function, $args){
			return self::processCalls($function, $args);
		}
	
		protected static function processCalls($function, $args){
			
			if(in_array($function, self::$singleArrayFunctions)){
				return self::fixOnlyArrayFucntion($function, $args);
			}
	
			if(in_array($function, self::$doubleArrayFcuntions)){
				return self::fixOnlyArrayFucntion($function, $args);
			}
	
			if(in_array($function, self::$callbackArrayFcuntions)){
				return self::fixCallbackArray($function, $args);
			}
			
			return call_user_func_array($function, $args);
	
		}
		
	
	}
		
}
