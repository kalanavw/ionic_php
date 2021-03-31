<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$con = mysqli_connect("localhost", "root", "admin", "ionic01");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

$userId = $_GET['user_id'];
if (!isset($_GET['user_id']) || $userId == null || empty($userId)) {
    $status_arr = array();
    $status_arr["status"] = array();
    array_push($status_arr["status"], 400);
    array_push($status_arr["status"], "Bad Request");
    http_response_code(400);
    echo json_encode($status_arr);
} else {

    if ($result = mysqli_query($con, "SELECT * FROM job WHERE UserID = $userId")) {
        $status_arr = array();
        $vehicle_arr["data"]=array();
        $vehicle_arr["status"]=array();
        $vehicle_arr["message"]=array();
        while ($row = mysqli_fetch_array($result)) {
            $status_item = array(
                "id" => $row[0],
                "addressId" => $row[1],
                "PlanedDateTimeStart" => $row[2],
                "PlanedDurationMinutes" => $row[3],
                "PerformedDateTimeStart" => $row[4],
                "PerformedDateTimeEnd" => $row[5],
                "Status" => $row[6],
                "Details" => $row[7],
                "Note" => $row[8],
                "NoteIntern" => $row[9],
                "Price" => $row[10],
                "Currency" => $row[11],
                "Signature" => $row[12],
                "PhotoCount" => $row[13]
            );
            array_push($status_arr["data"], $status_item);
        }
        array_push($status_arr["status"], 1);
        array_push($status_arr["message"], 'Success');
        http_response_code(200);

        // show products data in json format
        echo json_encode($status_arr);

    }

    mysqli_close($con);
}

