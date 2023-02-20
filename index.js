function fav(){
    let i = 1;
    $(".search-container").css("display", "none")
    $(".list-container").css("display", "inherit")
    $("#home").removeClass("hide");
    $(".list-container-search").addClass("hide")
    cont = document.getElementById('fav');
    let arr = JSON.parse(sessionStorage.getItem("items"))
    for(item of arr){
        let div1 = document.createElement('div');
        div1.setAttribute('class' ,'col mt-3');
        let div2 = document.createElement('div');
        div2.setAttribute('class', 'card');
        //div2.style('width', '18rem');
        div2.setAttribute('style', 'width: 18rem;')
        let im = document.createElement('img');
        im.setAttribute('src', item.img);
        im.setAttribute('class', 'card-img-top')
        let div3 = document.createElement('div')
        div3.setAttribute('class', 'card-body')
        let h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title')
        h5.innerHTML = item.title;

        let r = document.createElement('a');
        r.setAttribute('class', 'btn btn-secondary');
        r.setAttribute('id', 'remLink' + i)
        r.onclick = function(event){
            let idxStr = event.target.id;
            let arr = JSON.parse(sessionStorage.getItem("items"))
            sessionStorage.removeItem("items")
            var remIndex = idxStr[7];
            console.log(remIndex)
            arr.splice(remIndex-1, 1);
            window.sessionStorage.setItem("items", JSON.stringify(arr));
            cont.remove();
            // <div class="row" id="fav">
                  
            // </div> 
            let favv = document.getElementById("favP");
            let div = document.createElement("div");
            div.setAttribute("class", "row")
            div.setAttribute("id", "fav");
            console.log(favv)
            favv.appendChild(div)
            fav()
        }
        r.innerHTML = "Remove from Fav"

        div3.appendChild(h5);
        div3.appendChild(r);

        div2.appendChild(im);
        div2.appendChild(div3);

        div1.appendChild(div2);

        cont.appendChild(div1);
        i++;
    }
}


    
    


function addToFav(){
    let favImg = $('#searchImg');
    let favTitle = $('#searchTitle');
    favimg = favImg[0].attributes[1].nodeValue;
    favTitle = favTitle[0].innerHTML
    let arr = JSON.parse(sessionStorage.getItem("items"))
    if(arr == null){
        let favourites = [{
            "img": favimg,
            "title": favTitle
        }]
        window.sessionStorage.setItem("items", JSON.stringify(favourites));
        $('#favButton').removeClass('btn btn-primary')
        $('#favButton').addClass('btn btn-outline-danger')
        return
    }
    let i = arr.findIndex(e => e.title == favTitle);
    if(i == -1){
        arr.push({
            img: favimg,
            title: favTitle
        })
        window.sessionStorage.removeItem("items")
        window.sessionStorage.setItem("items", JSON.stringify(arr));
        $('#favButton').removeClass('btn btn-primary')
        $('#favButton').addClass('btn btn-outline-danger')
        $('a #favButton').val("Added to Fav")
    }
    
    

    //console.log(favourites.length)
}

function goToSearch(){
    $('#favPage').addClass("hide")

    // $('.list-container').removeAttr("style");
    // $('.search-container').removeAttr("style");
    // $('#home').addClass("hide")
}



$( function() {
    $( "#searchInput" ).autocomplete({
      source: superHeroList
    });
  } );


function searchFunc(){
    let name = document.getElementById("searchInput").value;
    console.log(charNames[name]);
    onLoadSuperhero(charNames[name]);
    $(".list-container-search").css("display", "inherit")
}

function onLoadSuperhero(id){
    $.ajax({
        url: "https://www.superheroapi.com/api.php/1422493045225633/" + id,
        type: "GET",
        dataType : "json",
    })
    
    
    .done(function(json){
        console.log(json)
        $("#searchImg").attr("src", json.image.url)
        $("#searchTitle").text(json.name);
        shd = json;
        localStorage.setItem("id", id);
    })
        
    .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    })
}


function loadSHPage(){
    id = localStorage.getItem("id");
    $.ajax({
        url: "https://www.superheroapi.com/api.php/1422493045225633/" + id,
        type: "GET",
        dataType : "json",
    })
    
    
    .done(function(json){
        console.log(json)
        setData(json)
    })
        
    .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    })
}


function setData(jsonData){
    console.log(jsonData)
    let data = jsonData
    $("#hero-img").attr("src", data.image.url)
    $("#name").text(data.name);
    //BIO DATA
    data = jsonData.biography;
    $("#full-name").append("<td>" + data["full-name"] + "</td>")
    $("#alter-egos").append("<td>" + data["alter-egos"] + "</td>")
    let str = data.aliases;
    let aliasesString = data.aliases[0];
    for(let i = 1; i < str.length; i++){
        aliasesString = aliasesString + ", ";
        aliasesString = aliasesString + str[i];        
    }
    $("#aliases").append("<td>" + aliasesString + "</td>")
    $("#place-of-birth").append("<td>" + data["place-of-birth"] + "</td>")
    $("#first-appearence").append("<td>" + data["first-appearance"]+ "</td>")
    $("#publisher").append("<td>" + data.publisher + "</td>")
    $("#alignment").append("<td>" + data.alignment + "</td>")


    //POWERSTATS DATA
    data = jsonData.powerstats
    $("#intel").append("<td>" + data.intelligence + "</td>")
    $("#strength").append("<td>" + data.strength + "</td>")
    $("#speed").append("<td>" + data.speed + "</td>")
    $("#durability").append("<td>" + data.durability + "</td>")
    $("#power").append("<td>" + data.power + "</td>")
    $("#combat").append("<td>" + data.combat + "</td>")

    //Appeareance DATA
    data = jsonData.appearance
    $("#gender").append("<td>" + data.gender + "</td>")
    $("#race").append("<td>" + data.race + "</td>")
    $("#height").append("<td>" + data.height[0] + ", " + data.height[1] + "</td>")
    $("#weight").append("<td>" + data.weight[0] + ", " + data.weight[1] + "</td>")
    $("#eye-color").append("<td>" + data["eye-color"] + "</td>")
    $("#hair-color").append("<td>" + data["hair-color"] + "</td>")

    //Work Data
    data = jsonData.work
    $("#occupation").append("<td>" + data.occupation + "</td>")
    $("#base").append("<td>" + data.base + "</td>")

    //connections Data
    data = jsonData.connections
    $("#group-affiliation").append("<td>" + data["group-affiliation"] + "</td>")
    $("#relatives").append("<td>" + data.relatives + "</td>")
}


