<?php

namespace app\model;

/**
 * Model User
 * @package app
 * @subpackage model
 * @author Victor Ramos <httpsvictorramos@gmail.com>
 * @since 13/10/2025
 */
class ModelUser extends Model{
    private $id;

    /**
     * Get the value of id
     */ 
    public function getId(){
        return $this->id;
    }

    /**
     * Set the value of id
     * @param int $id
     */ 
    public function setId(int $id){
        $this->id = $id;
    }
}