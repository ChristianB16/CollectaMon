const buttonListener = document.getElementById("submit");
buttonListener.addEventListener("click", function(){
    const name = document.getElementById("name");
    const type = document.getElementById("type");
    const ability = document.getElementById("ability");
    const attack = document.getElementById("attack");
    const set = document.getElementById("set");
    const setNumber = document.getElementById("setNumber");
    const price = document.getElementById("price");

    var input1 = name.value;
    var input2 = type.value;
    var input3 = ability.value;
    var input4 = attack.value;
    var input5 = set.value;
    var input6 = setNumber.value;
    var input7 = price.value;

    console.log(input1);
    console.log(input2);
    console.log(input3);
    console.log(input4);
    console.log(input5);
    console.log(input6);
    console.log(input7);

    alert(input1 + "\n" + input2 + "\n" + input3 + "\n" + input4 + "\n" + input5 + "\n" + input6 + "\n" + input7);
    
    return false;
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
