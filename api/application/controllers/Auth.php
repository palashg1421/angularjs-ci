<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends MY_Controller
{
    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        $this->login();
    }
    
    public function login()
    {
        if($this->requestMethod === 'POST')
        {
            $email  = $this->request->email;
            $pass   = md5(base64_decode(explode('.', $this->request->password)[0]));

            $sql = "SELECT * FROM user WHERE user_email = '$email' AND user_pass = '$pass'";
            $response = $this->db->query($sql)->row();
            
            if($response)
            {
                $jwt_token = $this->jwt->encode($response, $this->secret);
                $this->successMessage('Login successfully', $jwt_token);
            }
            else
                $this->errorMessage('Invalid username or password say server');
        }
        else
            $this->errorMessage('Invalid request method, Required POST found '.$this->requestMethod);
    }
}
