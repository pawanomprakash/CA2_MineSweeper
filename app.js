
// form validation

const form=document.getElementById('form')
const submitbtn=document.getElementById('submitbutton')
submitbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const Name=document.getElementById('name').value
    const nickname=document.getElementById('nickname').value
    if(Name!=='' && nickname!==''){
        location.href="./game.html";
    } else{
        alert("Please, Fill your name and nickname");
    }
    localStorage.setItem('name',Name)
    localStorage.setItem('nickname',nickname)
});

document.addEventListener('DOMContentLoaded', function() {
    var opening = document.getElementById('opening');
    opening.play();
});

// bombs.forEach((item)=>{
//     item.addEventListener('click',()=>{
//         location.href="gameoverlost.html"
//         // displayresults();
//     })
// })

//display score




