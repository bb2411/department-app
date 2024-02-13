<?php
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
                "userid"=>$userid,
                "keypass"=>encryptData("bhargavdev123456789")
            ];
            $tok=JWT::encode($payload,$secretkey,'HS512');
            header("HTTP_TOKEN:$tok");
            echo json_encode(array("status"=>"200","msg"=>"user founded","authstatus"=>true,"usertype"=>$row['user_type'],"token"=>$tok));
        }else{
            echo json_encode(array("status"=>"400","msg"=>"user founded but password doesn't match","authstatus"=>false));
        }
    }
}else{
    echo json_encode(array("status"=>"401","msg"=>"user not found","authstatus"=>false));
}

?>