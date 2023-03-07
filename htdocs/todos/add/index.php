<?php 

$keys = ['category', 'isColored', 'priority', 'title', 'text', 'user_id'];

$colomns = implode(', ', $keys);

foreach($keys as $key) {
    $$key = $_POST[$key];
}

$values = "'$category', '$isColored', '$priority', '$title', '$text', $user_id";


$sql = "INSERT INTO `tasks`($colomns) VALUES ($values)";
$res = mysqli_query( $conn, $sql);

print(json_encode($res));

