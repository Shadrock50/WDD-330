
var genType;
var baseDndURL = "https://www.dnd5eapi.co";
var genURL = "https://api.fungenerators.com/name/generate?category=elf";
var APIKeyAddOn = "&api_key=";
var genderAddOn = "&variation=";

window.onload = (event) => {
    //Onload, generates the select lists that I can dynamically create. 
    //These selects are hidden from the user on page load, so it's fine to edit them. 

    //Sets the level select list.
    //Generic first option
    var x = document.createElement("OPTION");
    x.setAttribute("value", "none");
    x.setAttribute("disabled", "disabled");
    x.setAttribute("selected", "selected");
    var t = document.createTextNode("--- Select Level ---");
    x.appendChild(t);
    document.getElementById("level").appendChild(x);

    //Actual Levels
    for (var i = 1; i < 21; i = i+1){

        var x = document.createElement("OPTION");
        x.setAttribute("value", i);
        var t = document.createTextNode(i);
        x.appendChild(t);
        document.getElementById("level").appendChild(x);

    }

    //Gets the Classes from API and adds them to the select list
    apiCall(baseDndURL, "/api/classes/").then( data => {

        dndClass = data['results'];

        //Generic First option
        var x = document.createElement("OPTION");
        x.setAttribute("value", "none");
        x.setAttribute("disabled", "disabled");
        x.setAttribute("selected", "selected");
        var t = document.createTextNode("--- Select Class ---");
        x.appendChild(t);
        document.getElementById("class").appendChild(x);

        //Displays classes from given JSON
        for (var i = 0; i < dndClass.length; i = i+1){

            var x = document.createElement("OPTION");
            x.setAttribute("value", dndClass[i]['url']); //Gets the URL to specific class info for later API call.
            var t = document.createTextNode(dndClass[i]['name']);
            x.appendChild(t);
            document.getElementById("class").appendChild(x);
        }
    });
  };

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

    if (genType == "npc"){
        npcGen();
    }
    else if (genType == "class"){
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

    if (gender == "none" || profession == "none"){
        //Returns after alerting user to fill in more info.
        window.alert("Please select all available options!");
        return
    }

    //Gets random disposition
    let randomAccess = getRandomInt(dispositionsList.length);
    let disposition = dispositionsList[randomAccess];

    //Calls the API to fetch Alighnments JSON
    apiCall(baseDndURL, '/api/alignments/').then(data => {

        //Gets a random alignment from API json
        randomAccess = getRandomInt(data['results'].length)
        let alignment = data['results'][randomAccess]['name'];

        apiCall(baseDndURL, '/api/races/').then(data => {

            //Gets a random race.
            randomAccess = getRandomInt(data['results'].length);
            let race = data['results'][randomAccess]['name'];

            //Gets a random name from simple name API
            let nameUrl;

            if (gender != "other"){

                nameURL = genURL + genderAddOn + gender + APIKeyAddOn; 
            }
            else{
                nameURL = genURL + APIKeyAddOn; 
            }
            

            apiCall(nameURL, APIKey).then(data => {
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

    //Sets variables selected by user
    let gender = document.getElementById("gender").value;
    let dndClass = document.getElementById("class").value;
    let level = document.getElementById("level").value;

    //Gets a random name from simple name API
    let nameUrl;

    if (gender != "other"){
    
        nameURL = genURL + genderAddOn + gender + APIKeyAddOn; 
    }
        else{
            nameURL = genURL + APIKeyAddOn; 
        }
            
    apiCall(nameURL, APIKey).then(data => {

        //Gets the characters name from separate API
        randomAccess = getRandomInt(data['contents']['names'].length);
        charName = data['contents']['names'][randomAccess];

        apiCall(baseDndURL, '/api/races/').then(data => {

            randomAccess = getRandomInt(data['results'].length);
            let raceURL = data['results'][randomAccess]['url']; //Have to get the race URL for API call because API doesn't deliver all race info at once. Have to go more specific.

            //Getting specific race info.
            apiCall(baseDndURL, raceURL).then(data => {
                console.log(data);
    
                let speed = data['speed'];
                let languages = data['languages'];

                if (data['language_options'] != undefined){

                    //Some races let you pick languages.
                    randomAccess = getRandomInt(data['language_options']['from'].length)
                    languages.push(data['language_options']['from'][randomAccess]);

                }

                let statsArray = getStats(data['ability_bonuses']);

                //Getting specific Class info.  
                apiCall(baseDndURL, dndClass).then(data => {

                    console.log(data);

                    //Should be the last API call.
                    apiCall(baseDndURL, '/api/alignments/').then(data => {

                        //Gets a random alignment from API json
                        randomAccess = getRandomInt(data['results'].length)
                        let alignment = data['results'][randomAccess]['name'];

                    });
                });
            });
        });
    });
}

//Lots of randomizing going on.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getStats(bonuses){

    //Define the six stats at base.
    let str = 8;
    let dex = 8;
    let con = 8;
    let int = 8;
    let wis = 8;
    let chr = 8;
    let stats = [];

    //All race bonuses must be added.
    for(var i = 0; i < bonuses.length; i = i + 1){

        if (bonuses[i]['ability_score']['index'] == 'str'){
            str = str + bonuses[i]['bonus'];
        }
        else if (bonuses[i]['ability_score']['index'] == 'dex'){
            dex = dex + bonuses[i]['bonus'];
        }
        else if (bonuses[i]['ability_score']['index'] == 'con'){
            con = con + bonuses[i]['bonus'];
        }
        else if (bonuses[i]['ability_score']['index'] == 'int'){
            int = int + bonuses[i]['bonus'];
        }
        else if (bonuses[i]['ability_score']['index'] == 'wis'){
            wis = wis + bonuses[i]['bonus'];
        }
        else if (bonuses[i]['ability_score']['index'] == 'chr'){
            chr = chr + bonuses[i]['bonus'];
        }
    }

    stats.push(str);//Convert individual stats to array. There's a better way to do this, but I don't have time. 
    stats.push(dex);
    stats.push(con);
    stats.push(int);
    stats.push(wis);
    stats.push(chr);

    for (var i = 0; i < stats.length; i + i + 1){

        randomStat = getRandomInt(11); //Will add a random amount between 0 and 10.
        stats[i] = stats[i] + randomStat;
    }

    console.log(stats);



}
