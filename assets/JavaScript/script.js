
$(document).ready(function(){
    let buscar = $('#btnBuscarsuperhero')
    let inputId = $('.input-superhero')

    buscar.click(function(e){
        e.preventDefault()
        let id = inputId.val()
        var permitido = /^[0-9]+$/
        if(id.match(permitido)){
            buscarIdSuperHero(id)
        } else{
            alert('ingrese un número')
        }
    })

function buscarIdSuperHero (id){


    $.ajax({
        type:'GET',
        url:`https://superheroapi.com/api.php/4905856019427443/${id}`,
        dataType:'json',

        success:function(response){
            console.log(response)
            let infoHero = {
                biografia : response.biography['first-appearance'],
                editor : response.biography.publisher,
                genero : response.appearance.gender
            }
            var heroDom = `
            <div class="card mx-auto" style="width: 18rem;">
            <img src="${response.image.url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${response.name}</h5>
              <p class="card-text">Afiliación grupal: ${response.connections['group-affiliation']}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Primera aparición ${response.biography['first-appearance']}</li>
                 <li class="list-group-item">Editado por : ${response.biography.publisher}</li>
                 <li class="list-group-item">Género: ${response.appearance.gender}</li>
            </ul>

          </div>
            `
            $('#resultadoSuperHero').append(heroDom)
            var options = {
                title: {
                    text: `Estadísticas para ${response.name}`
                },
                subtitles: [{
                    text: "As of November, 2017"
                }],
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: [
                        { y: `${response.powerstats.intelligence}`, label: "Inteligence" },
                        { y: `${response.powerstats.strength}`, label: "Strength" },
                        { y:`${response.powerstats.speed}`, label: "Speed" },
                        { y:`${response.powerstats.durability}`, label: "Durability" },
                        { y:`${response.powerstats.power}`, label: "Power" },
                        { y:`${response.powerstats.combat}`, label: "Combat" },
                        
                    ]
                }]
            };
            $("#chartContainer").CanvasJSChart(options);

        },
        error: function(xhr,status){
            alert('Lo sentimos, tuvimos un problema =(((')
        }
    })
}





})

