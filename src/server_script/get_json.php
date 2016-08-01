<?php
	$ext 	= ".json";
	$myData = json_decode( $_POST['filedata'], true );
	$fn 	= $myData['filename'].$ext;

	$json 	= file_get_contents("../stored_files/".$fn);
	
	// echo json_decode($json);
	$ojbectsarray = '{"objects":'. ($json) ? $json : null .'}';
	echo $ojbectsarray;
?>