<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $topic=$_REQUEST['topic'];
    $facultyid=$_REQUEST['faculty_id'];
    $students=$_REQUEST['student'];
    $subject=$_REQUEST['subject'];
    $batch=$_REQUEST['batch'];
    $time=$_REQUEST['time'];
    $division=$_REQUEST['division'];
    $subjectid=0;
    $result=$conn->query("select subject_code from subject where subject_name='$subject'");
    if($result->num_rows >0 ){
        while($row=$result->fetch_assoc()){
            $subjectid=$row['subject_code'];
        }
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500,"data"=>$lectureid));
        die;
    }
    $sql = "INSERT INTO lecture (lecture_date, faculty_id, subject_code, sem_code, Topic, division) VALUES ('$time', $facultyid, $subjectid, $batch, '$topic', '$division')";
    $result=$conn->query($sql);
    $lectureid=0;
    if($result){
        $lectureid=$conn->insert_id;
    }else{
        echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500,"data"=>$lectureid));
        die;
    }
    $studentarray=json_decode($students,true);
    foreach($studentarray as $i){
        $id=$i['id'];
        $sql="insert into attandance values($id,'p',$lectureid)";
        $result=$conn->query($sql);
        if($result){
            continue;
        }else{
            echo json_encode(array("message"=>"Unwanted Error Happens!!!","status"=>500,"data"=>$lectureid));
            die;
        }
    }
    echo json_encode(array("message"=>"Attandance Recorded Successfully","status"=>200,"data"=>$lectureid));
    die;
?>