document.addEventListener('DOMContentLoaded', function() {
    var goblincackle = document.getElementById('goblincackle');
    goblincackle.play();
});
function displayresults(){
    let timetaken=document.getElementById("timetaken");
    let noofclicks=document.getElementById("noofclicks");

    timetaken.textContent=localStorage.getItem('timetaken')+'s';
    noofclicks.textContent=localStorage.getItem('noofclicks');
    
}
displayresults();

//winlossstatements
let lossStatements=["Oh no! A mine detonated!","Oh No!! The goblins blew up the farm","Unfortunate! But remember, every defeat is a lesson.",">Don't lose heart! Even experts face setbacks."]
let winstatements = ["Success! You've skillfully neutralized mines.","Victory belongs to the persevering.","Congratulations you have successfully saved the farm","Your expertise is unmatched"]

let lossStatement=document.getElementById("lossstatement")
let winStatement=document.getElementById("winstatement")

if(document.getElementById('lossstatement')){
function getrandomlossstatement(){
    let i=Math.floor(Math.random() * lossStatements.length);
    return lossStatements[i];
}
lossStatement.textContent=getrandomlossstatement();
}


function getrandomwinstatement(){
    let j=Math.floor(Math.random() * winstatements.length);
    return winstatements[j];
}
winStatement.textContent=getrandomwinstatement();