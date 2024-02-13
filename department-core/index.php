<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    $requesturi=strtok($_SERVER['REQUEST_URI'],'?');
    $routes=[
        "/department_app/department-core/auth/login"=>"./auth/login.php"
    ];
    if(isset($routes[$requesturi])){
        include $routes[$requesturi];
    }else{
        echo "404 not found";
    }
?>