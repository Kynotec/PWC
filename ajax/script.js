'use strict';// importante por causa das versoes

var cloneMedia=$('.media').clone();//clona o codgio das linhas

$( window ).on( "load", function() {  $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    })
    .done(function(res){
        console.log(res);
        
        $.each(res, function (index, result){          
                
            var liMedia=cloneMedia.clone();
            
            $('.pos',liMedia).text(index);//adiciona a imagem consoante o array
            $('.nome',liMedia).text(result.name);
            $('.link',liMedia).attr('href','file:///C:/Users/tiago/Documents/GitHub/PWC/detalhes.html');
            $('#simbolo',liMedia).attr('src',result.image);
            $('.preco',liMedia).text(result.current_price+"$");
            if(result.ath_change_percentage>0)
            {
                $('.last24h',liMedia).text(result.ath_change_percentage+"(Subio)");
                $('.bck-color',liMedia).css("background-color","green","opacity","0.75");
               
                console.log(liMedia.text());
            }
            else
            {
                $('.last24h',liMedia).text(result.ath_change_percentage+"(Desceu)");
                $('.bck-color',liMedia).css({"background-color":"red","opacity":"0.75"});  
            }
          
            $('#fav',liMedia).attr('src','img/adicionar fav.png');

            $('.media-list').append(liMedia);//adiciona a linhas na tabela
       });     
       
        

    })
 })