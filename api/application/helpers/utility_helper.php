<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');

if( !function_exists('printer') )
{
    function printer($data)
    {
        echo '<pre>';
        if($data)
            print_r($data);
        else
            var_dump ($data);
        echo '</pre>';
    }
}
