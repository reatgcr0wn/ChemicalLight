<?php
if($_POST['color'] == '') $errorMsg[] = '判定してください';
 

if (!isset($errorMsg)) {
    $new_comment = array('num' => $_POST['num'],'band' => $_POST['band'],'color' => $_POST['color']);

    
    //JSONファイル読み込み/書き込みモードで開く
    $filename = '../data.json';
    $handle = fopen($filename, 'r');
 
    //JSONフォーマットから配列に変換して読み込み
    $kisskoe = @json_decode(fread($handle, filesize($filename)));
    fclose($handle);
 
    //stdClass objectを連想配列にキャスト
    foreach( (array)$kisskoe as $value){
        $comments[] = (array)$value;
    }
 
    //メンバー上書きorメンバー追加
    // $output = match_array($comments,$new_comment);
    $output =  $new_comment;
    //JSONフォーマットへ変換して書き込み
    $handle = fopen($filename, 'w');
    fwrite($handle,json_encode($output));
    fclose($handle);
 
    echo '<div class="panel panel-warning"><div class="panel-heading">色を'.$_POST['color'].'に変更したよ(\'ω\')</div></div>';
} else {
    echo '<ul>';
    foreach($errorMsg as $v){
        echo '<li>' . $v . '</li>';
    }
    echo '</ul>';
}
 
//2次元配列の子配列と指定配列を比較、マッチした添字の配列を新しいものにいれかえるor末尾に追加して返す
function match_array($array, $new_array) {
   
        //名前がマッチするものが泣ければ、末尾に追加
        $array[] = $new_array;
    
    return $array;
}
?>