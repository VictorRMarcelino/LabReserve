<?php

namespace database;

use Dotenv\Dotenv;
use PDO;

/**
 * Connection
 * @package database
 * @author Victor Ramos <httpsvictorramos@gmail.com>
 * @since 13/10/2025
 */
class Connection {

    /**
     * Retorna uma conexão estática com o banco de dados
     * @return PDO
     */
    public static function getInstance() {
        static $conn = null;

        if (!isset($conn)) {
            $conn = new PDO('', '', '');
        }

        return $conn;
    }

    /** Begin a new transaction */
    public function begin() {
        $connection = self::getInstance();

        if (!$connection->inTransaction()) {
            $connection->beginTransaction();
        }
    }

    /** Commit the current transaction */
    public function commit() {
        $connection = self::getInstance();

        if ($connection->inTransaction()) {
            $connection->commit();
        }
    }

    /** Rollback the current transaction */
    public function rollback() {
        $connection = self::getInstance();

        if ($connection->inTransaction()) {
            $connection->rollBack();
        }
    }
}