<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
include "./db.php";
include "./vendor/autoload.php";
include "./common/secret.php";
include "encrption.php";
use Firebase\JWT\JWT;
$username=$_REQUEST['userid'];
$password=md5($_REQUEST['password']);
$sql="select * from users_table where user_id=$username";
$result=$conn->query($sql);
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        if($row['password']==$password){
            $issued=time();
            $exp=$issued+(60*60);
            $payload=[
                "iat"=>$issued,
                "exp"=>$exp,
                "userid"=>$username,
                "keypass"=>encryptData("bhargavdev123456789")
            ];
            $tok=JWT::encode($payload,$secretkey,'HS512');
            $res=json_encode(["status"=>"200","msg"=>"user_founded","authstatus"=>true,"usertype"=>"faculty","token"=>$tok,"userid"=>$username]);
            echo $res;
            die;
        }else{
            echo json_encode(array("status"=>"400","msg"=>"password_doesn't_match","authstatus"=>false,"usertype"=>"","token"=>"","userid"=>""));
            die;
        }
    }
}else{
    echo json_encode(array("status"=>"401","msg"=>"user_not_found","authstatus"=>false,"usertype"=>"","token"=>"","userid"=>""));
    die;
}
?>