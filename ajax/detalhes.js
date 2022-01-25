'use strict';
let numero;
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
    console.log(res);
    
    $.each(res, function (index, result){
       
        let valor=value();
        if(result.name==valor)
        {
            $('#Raking_Atual').text(index+1);//adiciona a imagem consoante o array
            $('#logo_moeda').attr('src',result.image);
            $('#nome_moeda  ').text(result.name);
            $('#Valor_atual').text(result.current_price+"$");
            if(result.price_change_percentage_24h>0)
            {
                $('#Mudanca_24').text(result.price_change_percentage_24h.toFixed(2)+"(Subio)");
                $('#Mudanca_24').css("color","green","opacity","0.75");
            }
            else
            {
                $('#Mudanca_24').text(result.price_change_percentage_24h.toFixed(2)+"(Desceu)");
                $('#Mudanca_24').css({"color":"red","opacity":"0.75"});  
            }
            $('#Volume').text(result.total_volume);
            $('#Capitalizacao').text(result.market_cap);

            numero=index;
            
        }
        else
        {

        }
        
   });
   $(function () {
        $("#proximo").click(function () {
            window.location = "detalhes.html?name="+res[numero+1].name;
        });    
    });
    $(function () {
        $("#anterior").click(function () {
            window.location = "detalhes.html?name="+res[numero-1].name;
        });    
    });
})



})
