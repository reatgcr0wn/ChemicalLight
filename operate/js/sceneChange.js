var currentBand = "開演前",currentNum = "start" ,currentColor = "#000000" ; 
$(function(){
    
		$(".changeColor").click(function () {
        $.ajax({
            type: "POST",
            url: "save.php",
            data: "color="+this.value+"&num="+currentNum+"&band="+currentBand,
            success: function(msg){
								getCurrentJson();
                $('ul#result input#comment').val('');
                $('div#msg').html(msg).css('display','block');
                setTimeout("$('div#msg').fadeOut(1000)", 2000);
            }
        });
    });

		$(".changeBand").click(function () {
        $.ajax({
            type: "POST",
            url: "save.php",
            data: "color="+currentColor+"&num="+this.value+"&band="+this.innerHTML,
            success: function(msg){
								getCurrentJson();
                $('ul#result input#comment').val('');
                $('div#msg').html(msg).css('display','block');
                setTimeout("$('div#msg').fadeOut(1000)", 2000);
            }
        });
    });

		function getCurrentJson(){
			jQuery.getJSON("../data.json", function(data){
				currentBand = data.band;
        $('#currentBand .panel-body').html(currentBand);
        currentColor = data.color;
        $('#currentColor .panel-body').html(currentColor);
        $('#currentColor .panel-body').css('background-color',currentColor);
        currentNum = data.num;

        $('button').css('background-color','');
        $('button[value~="'+currentColor+'"]').css('background-color','#e6e6e6');
        $('button[value~="'+currentNum+'"]').css('background-color','#e6e6e6');
   	 });

			// var currentJson =  jQuery.parseJSON(currentJson);
    	
		}
		
		getCurrentJson();
 
});