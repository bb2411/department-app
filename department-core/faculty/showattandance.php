<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $facultyid=$_REQUEST['faculty_id'];
    $subject=$_REQUEST['subject'];
    $batch=$_REQUEST['batch'];   
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
    $sql = "SELECT 
            s.name AS student_name,
            s.contact_father AS fathernumber,
            a.student_id AS student_id,
            l.lecture_date AS lecturedate,
            a.lecture_id AS lecture_id,
            l.Topic AS topic
        FROM 
            attandance a
        JOIN 
            student s ON a.student_id = s.id
        JOIN 
            lecture l ON a.lecture_id = l.id
        WHERE 
            l.faculty_id = $facultyid 
            AND l.subject_code = $subjectid 
            AND l.sem_code = $batch";
    $lecturedata=array();
    $result=$conn->query($sql);
    if($result->num_rows > 0){
        while($row=$result->fetch_assoc()){
            array_push($lecturedata,["name"=>$row['student_name'],"student_id"=>$row['student_id'],"lecture_id"=>$row['lecture_id'],"topic"=>$row['topic'],"fathernumber"=>$row['fathernumber'],"lecture_date"=>$row["lecturedate"]]);
        }
        echo json_encode(["message"=>"Data has sented successfully","data"=>$lecturedata,"status"=>200]);
        die;
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500));
        die;
    }
    
?>