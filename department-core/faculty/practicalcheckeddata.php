<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $facultyid=$_REQUEST['faculty_id'];
    $studentid=$_REQUEST['student_id'];
    $practicalid=$_REQUEST['practical_id'];
    $replymessage=$_REQUEST['reply'];
    $status=$_REQUEST['status'];
    $sql="update student_lab_data set reply='$replymessage',valid='$status' where practical_id=$practicalid and student_id=$studentid";
    $result=$conn->query($sql);
    if($result){
        $data=[
            "status"=>200,
            "message"=>"practical checked successfully"
        ];
        echo json_encode($data);
        die;
    }else{
        $data=[
            "status"=>500,
            "message"=>"Something Went Wrong"
        ];
        echo json_encode($data);
        die;
    }
?>