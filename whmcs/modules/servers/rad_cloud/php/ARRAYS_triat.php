<?php
if(!trait_exists('ARRAYS')){
    trait ARRAYS{

        //Array functions with single array argument 
        private static $singleArrayFunctions = ['count', 'array_keys', 'array_values', 'array_count_values', 'array_key_last', 'array_flip', 'array_is_list', 'array_key_first', 'array_key_last', 'array_product', 'array_sum', 'current', 'key'];
    
        //Array functions with two or more arguments where all are arrays
        private static $doubleArrayFcuntions = ['array_combine', 'array_diff_assoc', 'array_diff_key', 'array_diff', 'array_intersect_assoc', 'array_intersect_key', 'array_intersect', 'array_merge_recursive', 'array_merge', 'array_replace_recursive', 'array_replace'];
    
        //Array functions with three arguments where first two are arrays and third is a callback
        private static $callbackArrayFcuntions = ['array_intersect_uassoc', 'array_intersect_ukey', 'array_diff_uassoc', 'array_diff_ukey', 'array_udiff_assoc', 'array_udiff_uassoc', 'array_udiff', 'array_uintersect_assoc', 'array_uintersect_uassoc', 'array_uintersect'];
        
        public static function fixOnlyArrayFucntion($function, $args){
            
            foreach($args as $k => $v){
                if(!is_array($v)){
                    $args[$k] = [];
                }
            }
            
            return call_user_func_array($function, $args);
        } 
    
        public static function fixCallbackArray($function, $args){
            $returnMap = [];
            
            foreach($args as $v){
                if(!is_array($v) && !is_callable($v)){
                    return (isset($returnMap[$function]) ? $returnMap[$function] : []);
                }
            }
            
            return call_user_func_array($function, $args);
        }
    
        public static function implode($seperator, mixed $array){
            if(!is_array($array)){
                $array = [];
            }
            return implode($seperator, $array); 
        }
    
        public static function array_key_exists($key, mixed $array){
            if(!is_array($array)){
                $array = [];
            }
            return array_key_exists($key, $array); 
        }
    
        public static function array_change_key_case(mixed $input_array, $case = CASE_LOWER){
            if(!is_array($input_array)){
                $input_array = [];
            }
            return array_change_key_case($input_array, $case); 
        }
    
        public static function array_chunk(mixed $array, $length, $preserve_keys = false){
            if(!is_array($array)){
                $array = [];
            }
            return array_chunk($array, (int) $length, $preserve_keys); 
        }
    
        public static function array_column(mixed $array, $column_key, $index_key = null){
            if(!is_array($array)){
                $array = [];
            }
            if(!in_array(strtolower(gettype($column_key)), ['string', 'integer', 'null'])){
                return null;
            }
            if(!in_array(strtolower(gettype($index_key)), ['string', 'integer', 'null'])){
                return null;
            }
            return array_column($array, $column_key, $index_key); 
        }
    
        public static function array_fill_keys(mixed $keys, mixed $value){
            if(!is_array($keys)){
                $keys = [];
            }
    
            return array_fill_keys($keys, $value); 
        }
        
        public static function array_fill($start_index, $count, $value){
            if(strtolower(gettype($start_index)) != 'int'){
                return [];
            }
            if(strtolower(gettype($count)) != 'int'){
                return [];
            }
            return array_fill($start_index, $count, $value); 
        }
    
        public static function array_filter(mixed $array, $callback = null, $mode = 0){
            if(!is_array($array)){
                $array = [];
            }
    
            return array_filter($array, $callback, $mode); 
        }
    
        public static function array_map(){
            $args = func_get_args();
            if(VPHP::count($args) <= 1){
                return null;
            }
    
            if(!is_callable($args[0])){
                $args[0] = null;
            }
    
            for($i = 1; $i < VPHP::count($args); $i++){
                if(!is_array($args[$i])){
                    $args[$i] = [];
                }
            }
            return call_user_func_array('array_map', $args);
        }
    
        public static function array_pad(mixed $array, mixed $length, mixed $value){
            if(!is_array($array)){
                $array = [];
            }
            if(strtolower(gettype($length)) != 'int'){
                $length = 0;
            }
            return array_pad($array, $length, $value);
        }
    
        public static function array_pop(mixed &$array){
            if(!is_array($array)){
                $array = [];
            }
            return array_pop($array);
        }
    
        public static function array_push(&$array){
            if(!is_array($array)){
                $array = [];
            }
    
            $arg = func_get_args();
            $arg[0] = &$array;
    
            return call_user_func_array('array_push', $arg);
        }
    
        public static function array_rand(mixed $array, $num = 1){
            if(is_array($array)){
                $array = [];
            }
            return array_rand($array, $num);
        }
    
        public static function array_reduce(mixed $array, mixed $callback, mixed $initial = null){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return array_reduce($array, $callback, $initial);
        }
    
        public static function array_reverse(mixed $array, $preserve_keys = false){
            if(!is_array($array)){
                $array = [];
            }
            return array_reverse($array, $preserve_keys);
        }
    
        public static function array_search(mixed $needle, mixed $haystack, $strict = false){
            if(!is_array($haystack)){
                $haystack = [];
            }
            return array_search($needle, $haystack, $strict);
        }
    
        public static function array_shift(array &$array){
            if(!is_array($array)){
                $array = [];
            }
            return array_shift($array);
        }
    
        public static function array_slice(mixed $array, mixed $offset, $length = null, $preserve_keys = false){
            if(!is_array($array)){
                $array = [];
            }
            return array_slice($array, $offset, $length, $preserve_keys);
        }
    
        public static function array_splice(mixed &$array, mixed $offset, $length = null, $preserve_keys = false){
            if(!is_array($array)){
                $array = [];
            }
            return array_splice($array, $offset, $length, $preserve_keys);
        }
    
        public static function array_unique(mixed $array, $flags = SORT_STRING){
            if(!is_array($array)){
                $array = [];
            }
            return array_unique($array, $flags);
        }
    
        public static function array_unshift(&$array){
            if(!is_array($array)){
                $array = [];
            }
    
            $arg = func_get_args();
            $arg[0] = &$array;
    
            return call_user_func_array('array_unshift', $arg);
        }
    
        public static function array_walk_recursive(&$array, $callback, $arg = null){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return array_walk_recursive($array, $callback, $arg);
        }
    
        public static function array_walk(&$array, $callback, $arg = null){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return array_walk($array, $callback, $arg);
        }
    
        public static function arsort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return arsort($array, $flags);
        }
    
        public static function asort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return asort($array, $flags);
        }
    
        public static function ksort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return ksort($array, $flags);
        }
    
        public static function krsort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return krsort($array, $flags);
        }
        
        public static function rsort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return rsort($array, $flags);
        }
    
        public static function sort(&$array, $flags = SORT_REGULAR){
            if(!is_array($array)){
                $array = [];
            }
            return sort($array, $flags);
        }
    
        public function extract(&$array, $flags = EXTR_OVERWRITE, $prefix = ""){
            if(!is_array($array)){
                $array = [];
            }
            return extract($array, $flags, $prefix);
        }
    
        public static function in_array($needle, $haystack, $strict = false){
            if(!is_array($haystack)){
                $haystack = [];
            }
            return in_array($needle, $haystack, $strict);
        }
    
        public static function end(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return end($array);
        }
    
        public function natcasesort(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return natcasesort($array);
        }
    
        public function natsort(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return natsort($array);
        }
    
        public function next(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return next($array);
        }
    
        public function prev(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return prev($array);
        }
    
        public function reset(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return reset($array);
        }
    
        public function shuffle(&$array){
            if(!is_array($array)){
                $array = [];
            }
            return shuffle($array);
        }
    
        public static function usort(&$array, $callback){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return usort($array, $callback);
        }
    
        public static function uksort(&$array, $callback){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return uksort($array, $callback);
        }
    
        public static function uasort(&$array, $callback){
            if(!is_array($array)){
                $array = [];
            }
            if(!is_callable($callback)){
                $callback = function(){};
            }
            return uasort($array, $callback);
        }
    
    }
}
 

?>