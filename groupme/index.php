<!DOCTYPE html>
<html>
    <head>
        <title>GroupMe | Computer Science Club at Indiana University</title>
        <link rel="icon" type="image/png" href="../assets/images/icons/fav.png" />
        <link href="https://fonts.googleapis.com/css?family=Muli:200,400,700,800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet"> 
        <link href="groupme.css" rel="stylesheet" />
    </head>
    <body>

        <?php
            if (isset($_POST['captcheck_session_code'])) {
                $url = 'https://captcheck.netsyms.com/api.php';
                $data = [
                    'session_id' => $_POST['captcheck_session_code'],
                    'answer_id' => $_POST['captcheck_selected_answer'],
                    'action' => "verify"
                ];
                $options = [
                    'http' => [
                        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                        'method' => 'POST',
                        'content' => http_build_query($data)
                    ]
                ];
                $context = stream_context_create($options);
                $result = file_get_contents($url, false, $context);
                $resp = json_decode($result, TRUE);
                if (!$resp['result']) {
                    header('HTTP/1.0 403 Forbidden');
                    exit(file_get_contents('../403.html', TRUE));
                } else {
                    header("Location: https://groupme.com/join_group/57104430/unfb3fOi");
                }
            }
        ?>

        <script src="https://captcheck.netsyms.com/captcheck.min.js"></script>
        <div class="centered">
            <h2>Join the CS Club GroupMe</h2>
            Solve the captcha below to join.
            <form action="index.php" method="post">
                <div class="captcheck_container"></div>
                <input type="submit" value="Submit" class="red-button"/>
            </form>
        </div>
	<div class="bottom-text"><a href="../">Computer Science Club at Indiana University</a></div>
    </body>
</html>
