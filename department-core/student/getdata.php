<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $studentid=$_REQUEST['studentid'];
    $result=$conn->query("select * from student where id=".$studentid);
    if($result->num_rows <= 0){
        $data=["status"=>404,"message"=>"Invalid Id or not a registered Student"];
        echo json_encode($data);
        die;
    }
    $attandance=array();
    $sql = "
        SELECT lecture.id ,attandance.status, lecture.lecture_date, subject.subject_name, lecture.Topic, faculty.name AS faculty_name
        FROM attandance
        JOIN lecture ON attandance.lecture_id = lecture.id
        JOIN subject ON lecture.subject_code = subject.subject_code
        JOIN faculty ON lecture.faculty_id = faculty.id
        WHERE attandance.student_id = '$studentid';
    ";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $dat=[
                "id"=>$row['id'],
                "status"=>$row['status'],
                "date"=>$row['lecture_date'],
                "subject_name"=>$row['subject_name'],
                "topic"=>$row['Topic'],
                "faculty_name"=>$row['faculty_name']
            ];
            array_push($attandance,$dat);
        }
    }else{
        $data=["status"=>500,"message"=>"attandance not found"];
        echo json_encode($data);
        die;
    }
    $lecture=array();
    $sql = "
        SELECT lecture.id, lecture.lecture_date, lecture.Topic, subject.subject_name, faculty.name AS faculty_name
        FROM lecture
        JOIN subject ON lecture.subject_code = subject.subject_code
        JOIN faculty ON lecture.faculty_id = faculty.id
        WHERE lecture.sem_code = (
            SELECT sem_id FROM student WHERE id = 100001
        )
        AND lecture.division = (
            SELECT division FROM student WHERE id = 100001
        );
    ";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $data=[
                "id"=>$row['id'],
                "date"=>$row['lecture_date'],
                "topic"=>$row['Topic'],
                "subject_name"=>$row['subject_name'],
                "faculty_name"=>$row['faculty_name']
            ];
            array_push($lecture,$data);
        }
    }else{
        $data=["status"=>500,"message"=>"lectures not found"];
        echo json_encode($data);
        die;
    }
    $data=["status"=>200,"attandance"=>$attandance,"lectures"=>$lecture,"message"=>""];
    echo json_encode($data);
    die;
?>