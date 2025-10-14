<?php

use routes\Router;

require_once 'vendor/autoload.php';
require_once 'routes/web.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

Router::callRoute();