<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $batch=$_REQUEST['batch'];
    $subject=$_REQUEST['subject'];
    $faculty=$_REQUEST['faculty_id'];
    $division=$_REQUEST['division'];
    $sql="
        SELECT 
            sl.student_id AS id,
            pl.id AS practical_id,
            pl.description AS topic,
            st.name AS student_name,
            sl.code_file AS file,
            sl.submit_time AS submit_date,
            sl.valid AS status,
            sl.reply AS reply
        FROM 
            student_lab_data sl
        JOIN 
            practical_lab pl ON sl.practical_id = pl.id
        JOIN 
            lab l ON pl.lab_id = l.id
        JOIN 
            subject s ON l.subject_code = s.subject_code
        JOIN 
            student st ON sl.student_id = st.id
        WHERE 
            s.subject_code = (SELECT subject_code FROM subject WHERE subject_name = '$subject')
            AND l.faculty_id =  $faculty
            AND l.sem_code = $batch 
            AND l.division = '$division';
    ";
    $records=array();
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $data=[
                "student_id"=>$row['id'],
                "practical_id"=>$row['practical_id'],
                "topic"=>$row['topic'],
                "file"=>base64_encode($row['file']),
                "student_name"=>$row['student_name'],
                "submit_date"=>$row['submit_date'],
                "status"=>$row['status'],
                "reply"=>$row['reply']
            ];
            array_push($records,$data);
        }
    }else{
        $response=['status'=>404,"message"=>"no records found"];
        echo json_encode($response);
        die;
    }
    $response=["message"=>"data sented","status"=>200,"practicalrecord"=>$records];
    echo json_encode($response);
    die;
?>