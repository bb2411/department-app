<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:aplication/json");
    include "./db.php";
    include "./vendor/autoload.php";
    $studentid=$_REQUEST['studentid'];
    $sql="
        SELECT
            s.id AS student_id,
            pl.description AS practical_description,
            pl.practical_date,
            pl.id AS practical_id,
            f.name AS faculty_name,
            sub.subject_name AS subject_name
        FROM
            student s
        JOIN
            lab ON s.sem_id = lab.sem_code AND s.division = lab.division
        LEFT JOIN
            practical_lab pl ON lab.id = pl.lab_id
        LEFT JOIN
            faculty f ON lab.faculty_id = f.id
        LEFT JOIN
            subject sub ON lab.subject_code = sub.subject_code
        WHERE
            s.id = '$studentid';
        ";
    $practicals=array();
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $data=[
                "description"=>$row['practical_description'],
                "id"=>$row['practical_id'],
                "date"=>$row['practical_date'],
                "faculty"=>$row['faculty_name'],
                "subject"=>$row['subject_name']
            ];
            array_push($practicals,$data);
        }
    }else{
        $data=["status"=>500,"message"=>"attandance not found"];
        echo json_encode($data);
        die;
    }
    $practicaldata=array();
    $sql="select * from student_lab_data where student_id='$studentid'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $data=[
                "practical_id"=>$row['practical_id'],
                "code_file"=>base64_encode($row['code_file']),
                "submit_date"=>$row['submit_time']
            ];
            array_push($practicaldata,$data);
        }
    }
    echo json_encode(['status'=>200,"practicallist"=>$practicals,"practicalsubmitted"=>$practicaldata]);
    die;
?>