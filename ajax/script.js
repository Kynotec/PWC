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
            $('.nome',liMedia).text(result.name);//adiciona a imagem consoante o array

         

            $('.media-list').append(liMedia);//adiciona a linhas na tabela
       });     
     
        

    })
 })