<?php
  if (isset($_POST['email']))  {
  
    //Email information
    $admin_email = "tjenkins@luminousoft.com";
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    
    //send email
    mail($admin_email, "New Form Submission", $name . ' - ' . $phone, "From:" . $email);
    
    header('Location: http://luminousoft.com/success.html');
  }