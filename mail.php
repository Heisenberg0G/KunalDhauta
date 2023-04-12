<?php

	$Name = $_POST['name'];
    $Email = $_POST['email'];
	$Phone = $_POST['number'];
    $Subject = $_POST['subject'];
	$Message = $_POST['message'];
	$toEmail = "dhautakunal.oo7@gmail.com"
  
	$mailHeaders = "Name: " .$Name.
	"\r\n Email: ". $Email  . 
	"\r\n Phone: ". $Phone  . 
    "\r\n Phone: ". $Subject  . 
	"\r\n Message: " . $Message . "\r\n";

    if($Email!=NULL){
        mail($toEmail, $Name, $mailHeaders)
    or die("Error");

    echo "Message Sent"

    }

	
	    
	

?>



