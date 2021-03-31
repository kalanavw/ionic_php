<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$con = mysqli_connect("localhost", "root", "admin", "ionic01");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

if ($result = mysqli_query($con, "SELECT * FROM user")) {
    $status_arr=array();
    $vehicle_arr["data"]=array();
    $vehicle_arr["status"]=array();
    $vehicle_arr["message"]=array();
    while ($row = mysqli_fetch_array($result)) {
        $status_item = array(
            "firstName"=> $row[0],
            "lastName"=> $row[1],
            "statusId"=> $row[2],
            "lastOnlineTimeStamp"=> $row[3],
            "lastSyncTimestamp"=> $row[4],
            "deviceId"=> $row[5],
            "vehicleId"=> $row[6],
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
