<?php
include 'encrption.php';
include 'common/secret.php';
include 'vendor/autoload.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type:aplication/json");
use Firebase\JWT\JWT;
if(isset($_REQUEST['token'])){
    $token=JWT::decode($_REQUEST['token'],$secretkey);
    if($token['keypass']==decryptData("bhargavdev123456789")){
        echo json_encode(['status'=>200,"msg"=>"user_is_valid"]);
        die;
    }else{
        echo json_encode(['status'=>500,"msg"=>"token is invalid"]);
    }
}else{
    echo json_encode(["status"=>404,"msg"=>"user_is_no_logged_in"]);
    die;
}


?>