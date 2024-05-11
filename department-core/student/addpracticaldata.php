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
        $stmt = $conn->prepare("INSERT INTO student_lab_data (student_id, practical_id, code_file, submit_time) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("iis", $studentid, $practicalid, $file_content);
        $result = $stmt->execute();        
        if($result) {
            $data = ['message' => "Practical Submitted", "status" => 200];
            echo json_encode($data);
            die;
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