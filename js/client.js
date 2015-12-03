/**
 * AJAX long-polling
 *
 * 1. sends a request to the server (without a timestamp parameter)
 * 2. waits for an answer from server.php (which can take forever)
 * 3. if server.php responds (whenever), put data_from_file into #response
 * 4. and call the function again
 *
 * @param timestamp
 */

var startText = "<br>K.O.E.創設からの20年間という全ての時間に・全ての人に・その全ての想いに対する感謝を込めて。<br>あなたと、その場その時間そこにいる全ての人間と、<br>幸せを、喜びを、感動を分かち合いたい。<br>僕たちがここにこうしていられる幸せをかみしめながら…。<br><br>一夜限りの最高の音楽の祭典。<br>きらめく音、輝くステージ、圧倒的な迫力、最新の技術、渦巻く感動。<br>感情が爆発 - BLAST!- する瞬間をあなたとともに!<br><br>アカペラサークルの枠を完全に逸脱した至高のエンターテイメント!<br><br>K.O.E.の「今」の全てを、一夜に。<br>そして新たな夜明けへと…。"
var breakText = "只今、休憩時間です。<br>引き続き、<br>A Cappella Singers K.O.E. Summer Concert 2015 <br>Blast!<br>をお楽しみください。"
var endText   = "本日は、<br>A Cappella Singers K.O.E. Summer Concert 2015 <br>Blast!<br>にご来場いただき、<br>誠にありがとうございました。<br>またのご来場を心よりお待ちしております。"
function getContent(timestamp)
{
    var queryString = {'timestamp' : timestamp};

    $.ajax(
        {
            type: 'GET',
            url: 'server.php',
            data: queryString,
            success: function(data){
                // put result data into "obj"
                var obj = jQuery.parseJSON(data);
                // put the data_from_file into #response
                $('#response').html(obj.data_from_file);
                // call the function again, this time with the timestamp we just got from server.php
                getContent(obj.timestamp);
                var obj = jQuery.parseJSON(obj.data_from_file);
                changeBands(obj);
                changeColor(obj);
            }
        }
    );
}

// initialize jQuery
$(function() {
    getContent();
});

function changeBands(obj){
    $('#band-wapper').empty();
    var band = obj.band;
    band = band.replace(/\u002f/g,"<br>")
    var num = obj.num;

    num = 17;

    if (num=='start') {
        $('#light').fadeOut(1000);
        $('#band-wapper').fadeIn(1000);
        $('#band-wapper').html('<p class="text-center band-name" >'+startText+'</p>');
    }else if(num=='break'){
        $('#light').fadeOut(1000);
        $('#band-wapper').fadeIn(1000);
        $('#band-wapper').html('<p class="text-center band-name" >'+breakText+'</p>');
    }else if(num=='end'){
        $('#light').fadeOut(1000);
        $('#band-wapper').fadeIn(1000);
        $('#band-wapper').html('<p class="text-center band-name" >'+endText+'</p>');
    }else if(num=='17'){

        // $('#band-wapper').html('<h3 class="text-center band-name" >'+band+'</h3><div class="image-wapper" style="text-align:center;"><img src="images/bands/'+num+'.jpg" alt="" class="centerimg" width="80%"></div>');
        setTimeout("$('#band-wapper').fadeOut(1000)", 3000);
        setTimeout("$('#light').fadeIn(1000)", 3000);
    }else{
        $('#light').fadeOut(1000);
        $('#band-wapper').fadeIn(1000);
        $('#band-wapper').html('<h3 class="text-center band-name" >'+band+'</h3><div class="image-wapper" style="text-align:center;"><img src="images/bands/'+num+'.jpg" alt="" class="centerimg" width="80%"></div>');
    }

}

function changeColor(obj){
    var color = obj.color;
    $('#light').css('background-color',color);
    
}

