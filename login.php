<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$servername = "localhost";
$username = "root";
$password_db = ""; 
$dbname = "usuarios"; 


$conn = new mysqli($servername, $username, $password_db, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    echo json_encode(['success' => true]);
} else {
    
    echo json_encode(['success' => false, 'error' => 'Correo o contraseña incorrectos']);
}

$conn->close();
?>
