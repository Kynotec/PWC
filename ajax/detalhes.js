'use strict';
/*
function value()
{
    let value;
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("name"))
    {
        value=urlParams.get("name");
    }

    return value;
}
$( window ).on( "load", function() {  $.ajax({
    type: "GET",
    datatype: 'json',
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
})
.done(function(res){
    
    $.each(res, function (index, result){
       
        $('.pos',liMedia).text(index+1);//adiciona a imagem consoante o array
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
        $('#fav',liMedia).attr('src','img/adicionar fav.png');// mete todas as imagnes com os corações para adicionar
        $("#fav",liMedia).attr("onclick","addFavoritos(this.value)");
        $('#fav',liMedia).val(result.name);
        var value_exist=localStorage.getItem('moeda');// valor que ja existe
        if(value_exist != null)
        {
            value_exist=value_exist.split(',');
            for (let index = 0; index < value_exist.length; index++) {
                //alert(value_exist+' '+result.name);
                if(value_exist[index]==result.name)
                {
                    $('#fav',liMedia).attr('src','img/removerfav.png');
                    $("#fav",liMedia).attr("onclick","removerFavoritos(this.value)");
                }
                
            }
        }
        
       

        $('.media-list').append(liMedia);//adiciona a linhas na tabela
        
   });

})



})
//let valor=value();*/
