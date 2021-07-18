<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
    public $request;
    public $secret;
    public $requestMethod;
    
    public function __construct()
    {
        parent::__construct();

        $this->secret          = '!@#$%^&*()_+';
        $this->request          = json_decode(file_get_contents('php://input'));
        $this->requestMethod    = $_SERVER['REQUEST_METHOD'];
    }

    public function validateSession()
    {
        $request_header = apache_request_headers();
        
        if( isset($request_header['Auth']) && !empty($request_header['Auth']) )
        {
            $token = $request_header['Auth'];
            try
            {
                $this->jwt->decode($token, $this->secret);
                return true;
            }
            catch(UnexpectedValueException $e)
            {
                echo $e->getMessage();
                $this->errorMessage('Unauthorize access');
                exit();
            }
        }
        else
        {
            $this->errorMessage('Authentication token not found');
            exit();
        }
    }
    
    public function successMessage($message, $data='')
    {
        echo json_encode([
            'status'    => 1,
            'message'   => $message,
            'data'      => $data
        ]);
    }
    
    public function errorMessage($message, $data='')
    {
        echo json_encode([
            'status'    => 0,
            'message'   => $message,
            'data'      => $data
        ]);
    }
}
