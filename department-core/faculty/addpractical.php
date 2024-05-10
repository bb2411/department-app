<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $facid=$_REQUEST['fac_id'];
    $subject=$_REQUEST['subject'];
    $batch=$_REQUEST['batch'];
    $division=$_REQUEST['division'];
    $description=$_REQUEST['batch'];
    $currentDate = date("Y-m-d");
    $subjectid=0;
    $result=$conn->query("select subject_code from subject where subject_name='$subject'");
    if($result->num_rows >0 ){
        while($row=$result->fetch_assoc()){
            $subjectid=$row['subject_code'];
        }
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500));
        die;
    }
    $labid=0;
    $result=$conn->query("insert into lab (faculty_id,subject_code,sem_code,division) values('$facid','$subjectid','$batch','$division')");
    if($result==true){
        $labid=$conn->insert_id;
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500));
        die;
    }
    $practicalid=0;
    $result=$conn->query("insert into practical_lab (lab_id,description,practical_date) values('$labid','$description','$currentDate')");
    if($result){
        $practicalid=$conn->insert_id;
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500));
        die;
    }
    echo json_encode(['message'=>'Practical added successfully','status'=>200,'data'=>$practicalid]);
    die;
?>