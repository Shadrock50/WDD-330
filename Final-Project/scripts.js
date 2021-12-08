
var genType;
var baseDndURL = "https://www.dnd5eapi.co/";
var nameGenURL = "https://api.fungenerators.com/name/generate?category=elf&api_key=";
function getType(){

    genType = document.getElementById("genType").value; 
    //apiCall(baseURL, 'api/classes/barbarian').then(data => { dndClass = data;});  
    revealOptions(genType);

}

function revealOptions(type){

    //Clears all old selectors.
    list = document.getElementsByClassName("reset");
    for (var i = 0; i < list.length; i = i + 1){
        list[i].style.display = "none";
    }

    //Displays relevant Selectors.
    list = document.getElementsByClassName(type);
    for (var i = 0; i < list.length; i = i + 1){
        list[i].style.display = "flex";
    }
}

//Decides which generator to use.
function generateNPC(){
    if (genType = "npc"){
        npcGen();
    }
    else if (genType = "class"){
        classGen();
    }
    else {
        return;
    }
}

//Function for making API calls
async function apiCall(url, endpoint){
    let response = await fetch(url + endpoint);
    let data = await response.json();
    return data;
}

//Generates a generic character.
function npcGen(){

    //Sets variables selected by user
    let gender = document.getElementById("gender").value;
    let profession = document.getElementById("profession").value;

    //Gets random disposition
    let randomAccess = getRandomInt(dispositionsList.length);
    let disposition = dispositionsList[randomAccess];

    //Calls the API to fetch Alighnments JSON
    apiCall(baseDndURL, 'api/alignments/').then(data => {

        //Gets a random alignment from API json
        randomAccess = getRandomInt(data['results'].length)
        let alignment = data['results'][randomAccess]['name'];

        apiCall(baseDndURL, 'api/races/').then(data => {

            //Gets a random race.
            randomAccess = getRandomInt(data['results'].length);
            let race = data['results'][randomAccess]['name'];

            apiCall(nameGenURL, APIKey).then(data => {
                //Gets the characters name from separate API
                randomAccess = getRandomInt(data['contents']['names'].length);
                charName = data['contents']['names'][randomAccess];
                console.log(charName, gender, profession, alignment, race, disposition);

            });
        });
    });
}

//Generates a character with a class attached.
function classGen(){


}

//Lots of randomizing going on.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
