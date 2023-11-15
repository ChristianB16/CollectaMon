var pokeUrl = "http://localhost:5000";

$('#submit').click(function(){
    var name = $('#name').val();
    var type  = $('#type').val();
    var ability  = $('#ability').val();
    var attack = $('#attack').val();
    var set = $('#set').val();
    var setNumber = $('#setNumber').val();
    var price = $('#price').val();

    var jsonObject = {
        name: name,
        type: type,
        ability: ability,
        attack: attack,
        set: set,
        setNumber: setNumber,
        price: price
    }

    $.ajax({
        url: pokeUrl + '/write-record', 
        type: 'post',
        data: jsonObject,
        success: function(response){
            var data = JSON.parse(response)
            if(data.msg == "SUCCESS"){
                alert("Data Saved");
            } else {
                console.log(data.msg);
            }
        },
        error: function(err){
            console.log(err);
        }
    });
});

$("#clear").click(function(){
    $("#name").val("");
    $("#type").val("");
    $("#ability").val("");
    $("#attack").val("");
    $("#set").val("");
    $("#setNumber").val("");
    $("#price").val("");
});
