'use strict';
// importante por causa das versoes
var verificacao = true;
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
            var value_exist=localStorage.getItem('moeda');// valor que ja existe
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let pos = 0; pos < value_exist.length; pos++) {
                    //alert(value_exist+' '+result.name);
                    if(value_exist[pos]==result.name)
                    {
                    $('.pos',liMedia).text(index+1);//adiciona a imagem consoante o array
                    $('.nome',liMedia).text(result.name);
                    $('.link',liMedia).attr('href','detalhes.html?name='+result.name);
                    $('#simbolo',liMedia).attr('src',result.image);
                    $('.preco',liMedia).text(result.current_price+"$");
                    if(result.price_change_percentage_24h>0)
                    {
                        $('.last24h',liMedia).text(result.price_change_percentage_24h.toFixed(2)+"(Subiu)");
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
                    $('#fav',liMedia).attr('src','img/removerfav.png');
                    $("#fav",liMedia).attr("onclick","removerFavoritos(this.value)");

                    $('.media-list').append(liMedia);//adiciona a linhas na tabela
                    
                    verificacao=false; // caso ele encontre uma moeda guadada
                                        // no local storage passa a false para que assim
                                        //caso o utilizador nao tiver moedas nos favoritos e enviado para a pagina inicial
                    }
                    
                }
            }  
        });
        
        if (verificacao == true) {
            alert("Não existem moedas adicionadas aos favoritos,tente adicionar algumas moedas aos favoritos :)");
            window.location = "index.html";
        }
    })
 })


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


$("#procurar").click(function(){
    
    
    var moeda = $("#search").val(); 
    if(moeda ==""){

        alert("O campo não pode ser vazio");
        window.location.reload();
    }
    else{
        var moedalist

        for(let index=1;index<101;index++){
         moedalist=$('tr:eq('+index+') .nome').text()     
            if(moeda != moedalist){
                $('tr:eq('+index+')').css("display","none");
            }
        
        }
        
    }
        
})
 
