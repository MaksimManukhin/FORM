<?php 

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/PHPMailer.php";
    require "PHPMailer/src/Exception.php";

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $body= $name . ` ` . $email . ` ` . $phone . ` ` .$message;

    $theme = "[Заявка формы]";

    $mail->addAddress("MANUXIN95@BK.RU");

    $mail->Subject = $theme; //темы сообщения

    $mail->Body = $body; 

    if(!$mail->send()){
        $message = "Собщение не отправлено";
    }else{
        $message = "Данные отправлены";
    }

    $response = ["message"=>$message];
    header(`Content-type: application/json`);

    echo json_encode ($response);
