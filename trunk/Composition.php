<?php

ob_start();


require_once ('config.php');

require_once ('Tools/autoload.php');
require_once ('Tools/debug.php');
require_once ('Tools/exceptions.php');

R::setup(DB_DSN_PDO, DB_USER, DB_PASSWORD);
R::freeze(DB_FREEZE);

session_start();


if (isset($_GET['cname']) and isset($_GET['creleves'])) {
    $name = $_GET['cname'];
    $releves = explode(",", $_GET['creleves']);

    $compostion = new CompositionReleve($name, $_SESSION['user']);

    foreach ($releves as $releve) {
        $compostion -> addReleve($releve);
    }

}
?>