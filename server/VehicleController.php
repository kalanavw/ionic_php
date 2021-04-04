<?php
// required headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$con = mysqli_connect("localhost", "root", "admin", "ionic01");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

if ($result = mysqli_query($con, "SELECT * FROM vehicle")) {
    $vehicle_arr=array();
    $vehicle_arr["data"]=array();
    $vehicle_arr["status"]=array();
    $vehicle_arr["message"]=array();
    while ($row = mysqli_fetch_array($result)) {
        $vehicle_item = array(
            "id"=> $row[0],
            "name"=> $row[1]
        );
        array_push($vehicle_arr["data"], $vehicle_item);
    }
    array_push($vehicle_arr["status"], 1);
    array_push($vehicle_arr["message"], 'Success');
    http_response_code(200);

    // show products data in json format
    echo json_encode($vehicle_arr);

}

mysqli_close($con);
