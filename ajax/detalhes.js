'use strict';
let numero;
var verificacao = true;
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
            $('#Valor_atual').text((result.current_price*0.89).toFixed(2)+"€");
            if(result.price_change_percentage_24h>0)
            {
                $('#Mudanca_24').text(result.price_change_percentage_24h.toFixed(2)+"(Subiu)");
                $('#Mudanca_24').css("color","green","opacity","0.75");
            }
            else
            {
                $('#Mudanca_24').text(result.price_change_percentage_24h.toFixed(2)+"(Desceu)");
                $('#Mudanca_24').css({"color":"red","opacity":"0.75"});  
            }
            $('#Volume').text(result.total_volume);
            $('#Capitalizacao').text(result.market_cap);

            $('#fav').attr('src','img/adicionar fav.png');// mete todas as imagnes com os corações para adicionar
            $("#fav").attr("onclick","addFavoritos(this.value)");
            $('#fav').val(result.name);
            var values=localStorage.getItem("moeda");
            
            if(values != null)
            {
                values=values.split(',');
                for (let index = 0; index < values.length; index++) {
                    if(values[index]==result.name)
                    {
                        $('#fav').attr('src','img/removerfav.png');
                        $("#fav").attr("onclick","removerFavoritos(this.value)");
                    }
                    
                }
               
            }
            numero=index;
            verificacao=false;
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

    if (verificacao == true) {
        window.location = "index.html";
    }
})



})

function addFavoritos(nome_moeda){
    var value_exist=localStorage.getItem('moeda');// valor que ja existe
    
    if(value_exist != null)
    {
            
        var array_moedas=value_exist+','+nome_moeda;
        localStorage.setItem('moeda' ,array_moedas);//guarda na storage e vai buscar o val ao form
       
    }
    else
    {
        localStorage.setItem('moeda' ,nome_moeda);//guarda na storage e vai buscar o val ao form
    }
    alert("Moeda adicionada com sucesso");
    window.location.reload();
   
}
function removerFavoritos(nome_moeda) {
    var value_exist=localStorage.getItem('moeda');// valor que ja existe
    value_exist=value_exist.split(',');
    var fav="";
    
    if(value_exist.length>1)
    {
        for (let index = 0; index < value_exist.length; index++) {
           
            if(nome_moeda !=value_exist[index])
            {   
               if(index==0)
               {
                fav=value_exist[index];
               }
               else
               {
                fav=fav+','+value_exist[index];
               }
                
            }
            localStorage.setItem('moeda' ,fav);//guarda na storage e vai buscar o val ao form
        }
        
    }
    else
    {
        localStorage.removeItem('moeda');
    }
    alert("Moeda removida com sucesso");
    window.location.reload();


}