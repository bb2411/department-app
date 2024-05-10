<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $faculty_id=$_REQUEST['facid'];
    $subject=array();
    $batch=array();
    $result=$conn->query("SELECT s.subject_name FROM subject_allocated sa JOIN subject s ON sa.subject_code = s.subject_code WHERE sa.faculty_id = $faculty_id;");
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            array_push($subject,$row['subject_name']);
        }
    }
    $result=$conn->query("select * from batch");
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            array_push($batch,$row['sem_id']);
        }
    }
    $response = array('status' => 200, "batches" => $batch, "subjects" => $subject);
    echo json_encode($response);
    die;
?>