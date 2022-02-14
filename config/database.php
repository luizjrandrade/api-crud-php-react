<?php 
    class Database{
        private $host = "127.0.0.1";
        private $db_name = "phpapidb";
        private $user = "root";
        private $password = "";
        public $conn;
        public function getConnection(){
            $this->conn = null;
            try {
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->user, $this->password);
                $this->conn->exec("set names utf8");
            } catch (PDOException $exception) {
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }
    }

?>