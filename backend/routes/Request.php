<?php

namespace routes;

use enum\EnumHttp;

/**
 * Request
 * @package backend
 * @subpackage routes
 * @author Victor Ramos <victor.marcelino@ipm.com.br>
 * @since 13/10/2025
 */
class Request {

    private $method;
    private $uri;
    private $parameters;

    /**
     * Get the value of method
     * @return string
     */ 
    public function getMethod(){
        return $this->method;
    }

    /**
     * Get the value of uri
     * @return string
     */ 
    public function getUri(){
        return $this->uri;
    }

    /**
     * Get the value of parameters
     * @return array
     */ 
    public function getParameters(){
        return $this->parameters;
    }

    /** @inheritDoc */
    public function __construct() {
        $this->loadRequest();
    }

    /**
     * Load the instance of the request
     */
    private function loadRequest() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->uri = $_SERVER['REQUEST_URI'];

        switch ($this->method) {
            case EnumHttp::METHOD_GET:
                $this->parameters = $_GET;
                break;
            case EnumHttp::METHOD_POST:
                $this->parameters = $_POST;
                break;
            case EnumHttp::METHOD_PUT:
            case EnumHttp::METHOD_DELETE:
                $parameters = file_get_contents('php://input');
                parse_str($parameters, $this->parameters);
                break;
        }
    }
}