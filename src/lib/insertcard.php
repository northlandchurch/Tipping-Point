<?php

// if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//   exit("E-mail is not valid");
// }


if ( empty($_GET['name']) || empty($_GET['email']) || empty($_GET['steps']) || empty($_GET['city']) || empty($_GET['state']) || empty($_GET['zipcode']) || empty($_GET['country']) || empty($_GET['worshiplocation']) || (!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) ) {
  echo "<em>Oops! Required information is missing.</em>";
  exit();
}


// ****************************************************************
// Insert card into database NEEDS ERROR TRAP
// ****************************************************************
  // Call datbase
  require_once './lib/db-config.php';

  // A tool to remove dollar sign and commas from user input
  function cleanup($junk) {
    return preg_replace('#[^0-9\.]+#','',$junk);
  }

  // cleanup user input data
  $normal = cleanup($_GET['normal']);
  $additional = cleanup($_GET['additional']);
  $resource = cleanup($_GET['resource']);
  // The html form can give us wrong data for the total
  // $total = cleanup($_GET['total']);
  // Doing the math ourselves
  $total = abs($normal) + abs($additional) + abs($resource);


  // Insert data into table. (need to error trap)
//  DB::Query("insert into commitmentcards (name, address, phone, email, steps, normal, additional, resource, total, worshiplocation, physicalcard, city, state, zipcode, country) values (%s0, %s1, %s2, %s3, %s4, %d5, %d6, %d7, %d8, %s9, %i10, %s11, %s12, %s13, %s14);", $_GET['name'], $_GET['address'], $_GET['phone'], $_GET['email'], $_GET['steps'], $normal, $additional, $resource, $total, $_GET['worshiplocation'], 0, $_GET['city'], $_GET['state'], $_GET['zipcode'], $_GET['country']);
  DB::Query("insert into commitmentcards_1year (name, address, phone, email, steps, normal_1year, additional_1year, resource_1year, total_1year, worshiplocation, physicalcard, city, state, zipcode, country) values (%s0, %s1, %s2, %s3, %s4, %d5, %d6, %d7, %d8, %s9, %i10, %s11, %s12, %s13, %s14);", $_GET['name'], $_GET['address'], $_GET['phone'], $_GET['email'], $_GET['steps'], $normal, $additional, $resource, $total, $_GET['worshiplocation'], 0, $_GET['city'], $_GET['state'], $_GET['zipcode'], $_GET['country']);

// ****************************************************************
// Send email. (need to catch if they gave a junkie email address.)
// ****************************************************************
  require_once './lib/swiftmailer/swiftmailer-5.x/lib/swift_required.php';

  // Create the Transport
  $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 587, 'tls')
    ->setUsername('tippingpoint@northlandchurch.net')
    ->setPassword('C0mmunic8')
    ;

  // Message variables:
  $emailname = ucwords($_GET['name']);

  setlocale(LC_MONETARY, 'en_US.UTF-8');
  $emailnormal = money_format('%.2n', $normal);
  $emailadditional = money_format('%.2n', $additional);
  $emailresource = money_format('%.2n', $resource);
  $emailtotal = money_format('%.2n', $total);

  //HTML email body
  $HTMLbody = <<<BODY
  We are so thankful for your Tipping Point commitment! We know that the best is yet to come, and we're thrilled to be on this journey with you.

  Wondering when to begin? You can begin right away! All future contributions will be applied toward your one-year commitment.

  Current annual giving: $emailnormal
  Additional annual giving: $emailadditional
  Resource giving: $emailresource
  TOTAL 1 YEAR COMMITMENT: $emailtotal

  Questions? Visit http://tippingpoint.northlandchurch.net and click "Questions?"

BODY;


  // Create the message
  $message = Swift_Message::newInstance()
    ->setSubject('Confirmation of Tipping Point Commitment')
    // Set the From address with an associative array
    ->setFrom(array('no-reply@northlandchurch.net' => 'Tipping Point'))
    // Set the To addresses with an associative array
    ->setTo(array($_GET['email'] => $emailname))
    ->setBody($HTMLbody)
    // And optionally an alternative body
    ->addPart($HTMLbody)
    ;

    // Create the Mailer using your created Transport
    $mailer = Swift_Mailer::newInstance($transport);

    // send email!
    $result = $mailer->send($message);

// ****************************************************************
// Confirmation Message
// ****************************************************************
echo "<strong>Thank you!<br>A confirmation email has been sent.</strong>"
?>
