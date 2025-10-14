<?php

namespace routes;

use enum\EnumHttp;
use Exception;

/**
 * Router
 * @package backend
 * @subpackage routes
 * @author Victor Ramos <victor.marcelino@ipm.com.br>
 * @since 13/10/2025
 */
class Router {

    private $routes = [];

    /**
     * Return a static instance of Router
     * @return Router
     */
    public static function getInstance() {
        static $router = null;

        if (!isset($router)) {
            $router = new Router();
        }

        return $router;
    }

    /**
     * Add a new GET route
     * @param mixed $path
     * @param mixed $controller
     */
    public static function get(string $path, string $controller) {
        $router = self::getInstance();
        $router->addRoute(EnumHttp::METHOD_GET, $path, $controller);
    }

    /**
     * Add a new GET route
     * @param mixed $path
     * @param mixed $controller
     */
    public static function post(string $path, string $controller) {
        $router = self::getInstance();
        $router->addRoute(EnumHttp::METHOD_POST, $path, $controller);
    }

    /**
     * Add a new GET route
     * @param mixed $path
     * @param mixed $controller
     */
    public static function put(string $path, string $controller) {
        $router = self::getInstance();
        $router->addRoute(EnumHttp::METHOD_PUT, $path, $controller);
    }

    /**
     * Add a new GET route
     * @param mixed $path
     * @param mixed $controller
     */
    public static function delete(string $path, string $controller) {
        $router = self::getInstance();
        $router->addRoute(EnumHttp::METHOD_DELETE, $path, $controller);
    }

    /**
     * Add a new route to the Router instance
     * @param string $type
     * @param string $path
     * @param string $controller
     */
    private function addRoute(string $type, string $path, string $controller) {
        $router = self::getInstance();
        $router->routes[$type][$path] = $controller;
    }

    /**
     * Call a specific route
     */
    public static function callRoute() {
        $router = self::getInstance();
        $request = new Request();
        $method = $request->getMethod();
        $uri = $request->getUri();

        if (!isset($router->routes[$method][$uri])) {
            throw new Exception("The method {$method} doesn´t have the {$uri} path");
        }

        list($controller, $method) = explode('@', $router->routes[$method][$uri]);
        $controllerPath = '\\app\\controller\\' . $controller;
        $controller = new $controllerPath();
        call_user_func_array([$controller, $method], [$request]);
    }
}