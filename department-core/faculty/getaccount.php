<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $facultyid=$_REQUEST['facultyid'];
    $sql="SELECT * FROM faculty where id=$facultyid";
    $result=$conn->query($sql);
    $data=array();
    if($result->num_rows){
        while($row=$result->fetch_assoc()){
            $data=[
                "name"=>$row['name'],
                "id"=>$row['id'],
                "education"=>$row['education'],
                "email"=>$row['email'],
                "post"=>$row['post'],
                "department"=>$row['department'],
                "personal_number"=>$row['contact_no']
            ];
        }
        echo json_encode($data);
        die;
    }else{
        $data=['message'=>"unable to fetch data","status"=>400];
        echo json_encode($data);
        die;
    }
?>