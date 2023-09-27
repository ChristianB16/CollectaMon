var data = '[{"name":"Gengar & Mimikyu GX","type":"Psychic","ability":"N/A","attack":"Poltergeist","set":"Team Up","setNumber":"53","price":"$15"}, {"name":"Charizard","type":"Fire","ability":"Flame Breath","attack":"Fire Blast","set":"Base Set","setNumber":"4","price":"$100"}, {"name":"Blastoise","type":"Water","ability":"Hydro Pump","attack":"Hydro Cannon","set":"Base Set","setNumber":"2","price":"$80"}, {"name":"Pikachu","type":"Electric","ability":"Static","attack":"Thunderbolt","set":"Base Set","setNumber":"1","price":"$50"}, {"name":"Mewtwo","type":"Psychic","ability":"Psycho Barrier","attack":"Psychic","set":"Base Set","setNumber":"10","price":"$60"}]';


// Place Solution below
var jsonObject = JSON.parse(data);

main();

function main() {
    console.log(data);
    console.log(jsonObject);

    showTable();
}

function showTable() {
    var htmlString = "";
    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].name + "</td>";
        htmlString += "<td>" + jsonObject[i].type + "</td>";
        htmlString += "<td>" + jsonObject[i].ability + "</td>";
        htmlString += "<td>" + jsonObject[i].attack + "</td>";
        htmlString += "<td>" + jsonObject[i].set + "</td>";
        htmlString += "<td>" + jsonObject[i].setNumber+ "</td>";
        htmlString += "<td>" + jsonObject[i].price + "</td>";
        htmlString += "</tr>";
    }

    $("#cardTable").html(htmlString);
}

$("#refresh").click(function () {
    var newCard = {
        name: "New Card",
        type: "New Type",
        ability: "New Ability",
        attack: "New Attack",
        set: "New Set",
        setNumber: "54",
        price: "$10"
    };

    jsonObject.push(newCard);

    showTable();
});