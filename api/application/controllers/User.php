<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller
{
    public function __construct() {
        parent::__construct();
    }

    public function list()
    {
        if( $this->validateSession() )
        {
            if($this->requestMethod === 'POST')
            {
                $requestData = $this->request;
                $where = '';
                if( $requestData->user_name )
                    $where .= " AND user_name LIKE '$requestData->user_name%'";
                if( $requestData->user_phone )
                    $where .= " AND user_phone LIKE '$requestData->user_phone%'";
                if( $requestData->user_email )
                    $where .= " AND user_email LIKE '$requestData->user_email%'";

                $sql = "SELECT * FROM user WHERE user_id != 1 $where";
                $response = $this->db->query($sql)->result();
                if( $response )
                    $this->successMessage('Listing Succ1essfully', $response);
                else
                    $this->errorMessage('No user found');
            }
            else
                $this->errorMessage('Invalid request method, Required POST found '.$this->requestMethod);
        }
    }
    
    public function get()
    {
        if( $this->validateSession() )
        {
            if($this->requestMethod === 'POST')
            {
                $user_id = $this->request->user_id;
                $user = $this->db->get_where('user', ['user_id' => $user_id])->row();
                if($user)
                    $this->successMessage('User found successfully', $user);
                else
                    $this->errorMessage ('Unable to get user');
            }
            else
                $this->errorMessage ('Invalid request method. Required POST fount' . $this->requestMethod);
        }
    }

    public function add()
    {
        if($this->validateSession())
        {
            if($this->requestMethod === 'POST')
            {
                $requestData = $this->request;
                if( $this->db->insert('user', $requestData) )
                    $this->successMessage('User added succesfully');
                else
                    $this->successMessage('Unable to add user');
            }
            else
                echo $this->errorMessage($response, "Invalid request method required POST found $reqMethod");
        }
    }

    public function update()
    {
        if($this->validateSession())
        {
            if( $this->requestMethod === 'POST' )
            {
                $requestData = $this->request;
                $this->db->where('user_id', $requestData->user_id);
                $response = $this->db->update('user', [
                    'user_name' => $requestData->user_name,
                    'user_phone' => $requestData->user_phone,
                    'user_email' => $requestData->user_email
                ]);
                if($response)
                    $this->successMessage('User updated successfully');
                else
                    $this->errorMessage ('Unable to update user');
            }
            else
                $this->errorMessage("Invalid request method required POST found $reqMethod");
        }
    }

    public function delete()
    {
        if($this->validateSession())
        {
            if( $this->requestMethod === 'POST' )
            {
                $uid = $this->request->user_id;
                $sql = "DELETE FROM user WHERE user_id = $uid";
                if( $this->db->query($sql) )
                    $this->successMessage('User deleted successfully');
                else
                    $this->errorMessage('Unable to delete the user');
            }
            else
                $this->errorMessage($response, "Invalid request method required POST found $reqMethod");
        }
    }
}
