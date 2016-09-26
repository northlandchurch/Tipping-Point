<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
    <?php

    	require_once 'swiftmailer/swiftmailer-5.x/lib/swift_required.php';

		// Create the Transport
		$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 587, 'TLS')
		  ->setUsername('noreply@mindboxstudios.com')
		  ->setPassword('OwIuQJRpjI0R')
		  ;

		// Grab the data
		$name = filter_var($_POST['name'],FILTER_SANITIZE_STRING);
		$address = filter_var($_POST['address'],FILTER_SANITIZE_STRING);
		$phone = filter_var($_POST['phone'],FILTER_SANITIZE_STRING);
		$email = filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
		$steps = filter_var($_POST['steps'],FILTER_SANITIZE_STRING);
		$normal = filter_var($_POST['normal'],FILTER_SANITIZE_STRING);
		$additional = filter_var($_POST['additional'],FILTER_SANITIZE_STRING);
		$resource = filter_var($_POST['resource'],FILTER_SANITIZE_STRING);
		$total = filter_var($_POST['total'],FILTER_SANITIZE_STRING);

		// Create the email body text
		$data =
			"<strong>Step 1</strong><br><br>
			<strong>Name: </strong>" . $name . "<br>
			<strong>Address: </strong>" . $address . "<br>
			<strong>Phone: </strong>" . $phone . "<br>
			<strong>Email: </strong>" . $email . "<br>
			<strong>What step are you taking in your giving journey? </strong>" . $steps . "<br><br>

			<strong>Step 2</strong><br><br>
			<strong>What I normally give in a year. </strong>" . $normal . "<br>
			<strong>My Additional Annual Generous Commitment to Tipping Point. </strong>" . $additional . "<br>
			<strong>My Resource Gift (stock, savings, property, etc). </strong>" . $resource . "<br>
			<strong>Two Year Commitment Total </strong>" . $total . "</strong><br>";

		// Create the Mailer using your created Transport
		$mailer = Swift_Mailer::newInstance($transport);

		// Create a message
		$message = Swift_Message::newInstance('Wonderful Subject')
		  ->setFrom(array('noreply@northlandchurch.net' => 'Tipping Point'))
		  ->setTo(array('chris@mindboxstudios.com' => 'A name'))
		  ->setSubject('Commitment Card Submission')
		  ->setBody($data, 'text/html');

		// Send the message
		$result = $mailer->send($message);
		console.log('success');
    ?>
    </body>
</html>