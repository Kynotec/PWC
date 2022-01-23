'use strict';// importante por causa das versoes

var cloneMedia=$('.media').clone();//clona o codgio das linhas

$( window ).on( "load", function() {  $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    })
    .done(function(res){
        $("tr:has(td)").remove();//remove a primeira linha
        $.each(res, function (index, result){
           
                
            var liMedia=cloneMedia.clone();
            
            $('.pos',liMedia).text(index + 1);//adiciona a imagem consoante o array
            $('.nome',liMedia).text(result.name);
            $('.link',liMedia).attr('href','detalhes.html?name='+result.name);
            $('#simbolo',liMedia).attr('src',result.image);
            $('.preco',liMedia).text(result.current_price+"$");
            if(result.price_change_percentage_24h>0)
            {
                $('.last24h',liMedia).text(result.price_change_percentage_24h.toFixed(2)+"(Subio)");
                $('.bck-color',liMedia).css("color","green","opacity","0.75");
                
                console.log(liMedia.text());
            }
            else
            {
                $('.last24h',liMedia).text(result.price_change_percentage_24h.toFixed(2)+"(Desceu)");
                $('.bck-color',liMedia).css({"color":"red","opacity":"0.75"});  
            } 
          

            $('#fav',liMedia).val(result.name);

            $('.media-list').append(liMedia);//adiciona a linhas na tabela
       });
    
    })

    
    
 })
 

    $('#btn1').click(function() 
    {
        alert($("#btn1").text());
    })





 document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))
