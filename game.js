document.addEventListener('DOMContentLoaded', function() {
    var backgroundmusic = document.getElementById('backgroundmusic');
    backgroundmusic.play();
});
// Display name and nickname
function displayname() {
    let playername = document.getElementById("namedisplay");
    let playernickname = document.getElementById("nicknamedisplay");
    playername.textContent = localStorage.getItem('name');
    playernickname.textContent = localStorage.getItem('nickname');
}
 
 // Shuffle tiles and start game
 let tiles = Array.from(document.getElementsByClassName("tile"));
 
 function shuffletiles(tiles) {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    // console.log(tiles)
    return tiles;
 }
 function startgame() {
    tiles = shuffletiles(tiles);
    tiles.forEach((item, index) => {
        item.style.order = index + 1;
    });
    return tiles
 }
 console.log(tiles)
 let duplicatetiles=startgame()
 console.log(duplicatetiles)
 let board=[]
 for(var i=0;i<8;i++){
    board[i]=[];
    for(var j=0;j<8;j++){
        board[i][j]=duplicatetiles.shift();
    }
 } 
 console.log(board)

let bombcontainers = [];
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const tile = board[i][j];
        if (tile.classList.contains('bombcontainer')) {
            bombcontainers.push([i,j]);
        }
    }
}
console.log(bombcontainers);

function incrementNearbyBombs(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < 8 && j >= 0 && j < 8) {
                const tile = board[i][j];
                if (!tile.classList.contains('bombcontainer')) {
                    // Increment the bomb count for non-bomb tiles
                    let bombCount = parseInt(tile.querySelector('.tileback p').textContent);
                    bombCount++;
                    tile.querySelector('.tileback p').textContent = bombCount;
                }
            }
        }
    }
}
let tilefront=Array.from(document.getElementsByClassName("tilefront"));
console.log(tilefront)

let emptytiles=tilefront.filter(tile=>tile.classList.contains('emptytile'));

console.log(emptytiles)





// Loop through bomb containers to set nearby bomb counts
for (let i = 0; i < bombcontainers.length; i++) {
    const [x, y] = bombcontainers[i];
    incrementNearbyBombs(x, y);
}

function revealAdjacentZeroes(x, y) {
    const adjacentTiles = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*[0, 0],*/ [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (const [dx, dy] of adjacentTiles) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            const tile = board[newX][newY];
            const tileBack = tile.querySelector('.tileback p');
            const isTileFrontDisplayed = tile.querySelector('.tilefront').style.display !== 'none';

            if (isTileFrontDisplayed && tileBack.textContent === '0') {
                tile.querySelector('.tilefront').style.display = 'none';
                revealAdjacentZeroes(newX, newY);
            } else if (isTileFrontDisplayed && parseInt(tileBack.textContent) !== 0) {
                tile.querySelector('.tilefront').style.display = 'none';
            }
        }
    }
}



function checkIfGameWon() {
    let isGameWon = true;

    for (const tile of emptytiles) {
        if (tile.style.display !== 'none') {
            isGameWon = false;
            break;
        }
    };

    return isGameWon;
}

tilefront.forEach((item, index) => {
    item.addEventListener('click', () => {
        const x = Math.floor(index / 8);
        const y = index % 8;

        if (parseInt(item.nextElementSibling.querySelector('p').textContent) === 0) {
            item.style.display = 'none';
            revealAdjacentZeroes(x, y);

        if (checkIfGameWon()) {
            location.href = "gameoverwin.html";
        }
    } else {
        item.style.display = 'none';
    }
    });
});




 // Timer
 let finaltime = 0;
 let finalnoofclicks = 0;
 let time = document.getElementById('time');
 let seconds = 0;
 let timer;
 
 function startTimer() {
    timer = setInterval(() => {
        seconds++;
        time.textContent = seconds;
        finaltime = seconds;
    }, 1000);
 }
 
 // Updating clicks
 let clicks = 0;
 let click = document.getElementById('clicks');
 
 tilefront.forEach((item) => {
    item.addEventListener('click', () => {
        clicks++;
        click.textContent = clicks;
        finalnoofclicks = clicks;
    });
 });
 
 // Game over
 let bombs = Array.from(document.getElementsByClassName('bombtile'));
 let boomsound=document.getElementById("boomsound");
 let bombs1 = Array.from(document.getElementsByClassName('bomb'));
 

 bombs.forEach((item) => {
    item.addEventListener('click', () => {
        bombs.forEach((item1)=>{item1.style.display='none'})
        // boomsound.play();
        location.href = "gameoverlost.html";
        localStorage.setItem("timetaken", finaltime);
        localStorage.setItem("noofclicks", finalnoofclicks);
    });
 });

 tilefront.forEach((item)=>{
    item.addEventListener('click',()=>{item.style.display='none'})
 })
 tilefront.forEach((item)=>{
    item.addEventListener('contextmenu',(event)=>{
        event.preventDefault();
        console.log(item.style.backgroundImage);
        item.classList.toggle('red');
 })
 })



// tilefront.forEach(()=>{
//     if(checkIfGameWon()){
//         location.href = "gameoverwin.html";
//     }
// })

 // Call startgame only once
 startgame();
 displayname();
 startTimer();
//  shuffletiles(tiles);