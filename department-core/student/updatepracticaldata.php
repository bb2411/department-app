<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type:application/json");
    include "./db.php";
    include "./vendor/autoload.php";
    if(isset($_REQUEST['studentid'], $_REQUEST['practicalid'], $_FILES['file'])) {
        $studentid = $_REQUEST['studentid'];
        $practicalid = $_REQUEST['practicalid'];
        $file_location = $_FILES['file']['tmp_name'];
        $file_content = file_get_contents($file_location);
        $sql="delete from student_lab_data where student_id='$studentid' and practical_id='$practicalid'";
        $result = $conn->query($sql);        
        if($result) {
            $stmt = $conn->prepare("INSERT INTO student_lab_data (student_id, practical_id, code_file, submit_time,reply,valid) VALUES (?, ?, ?, NOW(),'','')");
            $stmt->bind_param("iis", $studentid, $practicalid, $file_content);
            $res = $stmt->execute();        
            if($res){
                $data = ['message' => "Practical Updated", "status" => 200];
                echo json_encode($data);
                die;
            }else{
                $data = ['message' => "Practical Not Submitted", "status" => 404];
                echo json_encode($data);
                die;
            }
        } else {
            $data = ['message' => "Practical Not Submitted", "status" => 404];
            echo json_encode($data);
            die;
        }
    } else {
        $data = ['message' => "Missing parameters", "status" => 400];
        echo json_encode($data);
        die;
    }
?>