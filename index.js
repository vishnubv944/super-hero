$.ajax({
 
    // The URL for the request
    url: "https://www.superheroapi.com/api.php/1422493045225633/search/ironman",
 
    // The data to send (will be converted to a query string)
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    dataType : "json",
})

.done(function(json){
    $("#hero-img").attr("src", json.results[0].image.url);
    $("#name").text(json.results[0].name);
     setBio(json);
})

.fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  // Code to run regardless of success or failure;


function setBio(jsonData){
    let data = jsonData.results[0].biography;
    
    // let r1 = "<th scope='row'>1000000</th>"
    // let r2 = "<td>Full Name test</td>"
    // let r3 = "<td>" + data.name + "</td>"
    // var txt2 = $("<tr></tr>").append(r1, r2, r3); 
    // $("#biog").append(txt2);


    $("#full-name").append("<td>" + data["full-name"] + "</td>")
    $("#alter-egos").append("<td>" + data["alter-egos"] + "</td>")
    let str = data.aliases;
    let aliasesString = data.aliases[0];
    for(let i = 1; i < str.length; i++){
        aliasesString = aliasesString + ", ";
        aliasesString = aliasesString + str[i];
        
    }
    // for(i of data.aliases){
    //     aliasesString = aliasesString + i;
    //     aliasesString = aliasesString + ", ";
    // }

    $("#aliases").append("<td>" + aliasesString + "</td>")

    $("#place-of-birth").append("<td>" + data["place-of-birth"] + "</td>")
    $("#first-appearence").append("<td>" + data["first-appearance"]+ "</td>")
    $("#publisher").append("<td>" + data.publisher + "</td>")
    $("#alignment").append("<td>" + data.alignment + "</td>")


}