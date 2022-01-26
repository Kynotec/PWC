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
            
           
            if(index>10)
            {
               
                $('tr:eq('+index+')').attr('id', 'esconder');
            }
            
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

//Mostra as 10 ou 100 moedas
function esconde() 
{  
    var visibilidade=$("#esconder").css("display");
    if(visibilidade!="none")
    {
        for (let index = 11; index < 101; index++) {
            $('tr:eq('+index+')').css("display","none");
           
        }
        $('.setas').attr('src','img/seta_para_baixo.png');
    }
    else
    {
        for (let index = 11; index < 101; index++) {
            $('tr:eq('+index+')').css("display","");
            
        }
        $('.setas').attr('src','img/seta_para_cima.png');
    }
}
<<<<<<< HEAD
 

=======



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
 
>>>>>>> 2fa4375f6dd748be963f53e87a21c2e22372c41b
