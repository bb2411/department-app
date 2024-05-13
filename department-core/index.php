<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    $requesturi=strtok($_SERVER['REQUEST_URI'],'?');
    $routes=[
        "/department_app/department-core/faculty/getaccount"=>"./faculty/getaccount.php",
        "/department_app/department-core/student/getaccount"=>"./student/getaccount.php",
        "/department_app/department-core/student/updatepracticaldata"=>"./student/updatepracticaldata.php",
        "/department_app/department-core/practical/checkedpractical"=>"./faculty/practicalcheckeddata.php",
        "/department_app/department-core/faculty/getpracticaldata"=>"./faculty/getpracticalrecord.php",
        "/department_app/department-core/student/addpracticaldata"=>"./student/addpracticaldata.php",
        "/department_app/department-core/student/getpractical"=>"./student/getpractical.php",
        "/department_app/department-core/student/getattandancedata"=>"./student/getdata.php",
        "/department_app/department-core/faculty/addpractical"=>"./faculty/addpractical.php",
        "/department_app/department-core/faculty/getdata"=>"./faculty/getdata.php",
        "/department_app/department-core/faculty/showattandance"=>"./faculty/showattandance.php",
        "/department_app/department-core/faculty/put_attandance_data"=>"./faculty/record_attandance.php",
        "/department_app/department-core/auth/login"=>"./auth/login.php",
        "/department_app/department-core/faculty/get_attandance_data"=>"./faculty/getattandancedata.php"
    ];
    if(isset($routes[$requesturi])){
        include $routes[$requesturi];
    }else{
        echo "404 not found";
    }
?>0