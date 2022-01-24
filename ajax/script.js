'use strict';
// importante por causa das versoes

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
            
            var value_exist=localStorage.getItem('moeda');// valor que ja existe
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let index = 0; index < value_exist.length; index++) {
                    //alert(value_exist+' '+result.name);
                    if(value_exist[index]==result.name)
                    {
                        alert("teste");
                        
                    }
                    
                }
            }
            $('#fav',liMedia).attr('scr','img/removerfav.png');
            $('#fav',liMedia).val(result.name);

            $('.media-list').append(liMedia);//adiciona a linhas na tabela
       });
    
    })

    document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))
    
 })

 function favoritos(nome_moeda){
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
   

    //existing.push('tuna');
    
}
 