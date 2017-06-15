<?php
/*  
Parameter Example
	$data = array('post_id'=>'12345','post_title'=>'A Blog post');
	$target = 'single tocken id or topic name';
	or
	$target = array('token1','token2','...'); // up to 1000 in one request
*/
// public function sendMessage($data,$target){
//FCM api URL
	$data = array('post_id'=>'12345','post_title'=>'A Blog post');
	$target = 'fYiavXuH15E:APA91bHEjAt-_MsPED77wBg_8YOuLhYc_QpO7O-vxJjRmlbGRR-mbD_zCzrNVoh1YIIew_zk1uUAxMTJ8Sg04zE6ooFAEVvLoB0QAQeINKshoqWU9wF64HBF7JGLlxj04zEY8VztYOXF';
$url = 'https://fcm.googleapis.com/fcm/send';
//api_key available in Firebase Console -> Project Settings -> CLOUD MESSAGING -> Server key
$server_key = 'AAAAfhpeLQY:APA91bHZyVmn-Cp48-pT9wFtlJw_uNPWawLrsEMmNtNeprWStt4DNj9TJue836ygg3nJBtjsOmNcgA1f3J_YehsyAwceCN1OOfw4du4fqM9HCQfxto2B4t6B-qnqTsl5NMUKzQh5XCIf';
			
$fields = array();
$fields['data'] = $data;
if(is_array($target)){
	$fields['registration_ids'] = $target;
}else{
	$fields['to'] = $target;
}
//header with content_type api key
$headers = array(
	'Content-Type:application/json',
  'Authorization:key='.$server_key
);
// $jsonstring = json_encode($fields);
// echo $jsonstring;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
$result = curl_exec($ch);
if ($result === FALSE) {
	die('FCM Send Error: ' . curl_error($ch));
}
curl_close($ch);
echo $result;

