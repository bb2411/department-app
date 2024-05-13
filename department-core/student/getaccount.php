<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $studentid=$_REQUEST['studentid'];
    $sql="SELECT * FROM student where id=$studentid";
    $result=$conn->query($sql);
    $data=array();
    if($result->num_rows){
        while($row=$result->fetch_assoc()){
            $data=[
                "name"=>$row['name'],
                "id"=>$row['id'],
                "course"=>$row['course'],
                "email"=>$row['email'],
                "sem_id"=>$row['sem_id'],
                "division"=>$row['division'],
                "father_number"=>$row['contact_father'],
                "mother_number"=>$row['contact_mother'],
                "personal_number"=>$row['contact_student']
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