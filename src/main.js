import * as crud from './crud.js';

window.onload = function() {
    init();
    icons.forEach(element => {
        element.addEventListener('click', activateIcon);
    });
    games.forEach((element, index) => {
        element.id = `g${index + 1}`;
        element.addEventListener('click', gameInfo);
    });
    if (document.URL.includes("add.html")) {
        addGameOptions(gameNames);
        let submit = document.getElementById('add-game-submit');
        submit.addEventListener('click', async e => {
            let gameSelect = document.getElementById('gameSelect');
            let price = document.getElementById('add-game-price').value;
            let condition = document.getElementById('add-game-condition').value;
            let selectedGame = gameSelect.options[gameSelect.selectedIndex].text;
            const listing = await crud.createListing(selectedGame, price, condition);
        });
    }
}

let icons = [];
let games = [];
let gameNames = {};

function init() {
    icons = document.querySelectorAll(".icon");
    games = document.querySelectorAll(".game");
    // Need to add some way of storing the names of the games that are on the discover page, this is just temporary.
    gameNames = {
        'g1': "God of War",
        'g2': "Fifa 21",
        'g3': "Pokemon - Legends of Arceus",
        'g4': "Elden Ring",
        'g5': "Spider-Man: Miles Morales",
        'g6': "Super Mario Party",
    }
}

function activateIcon() {
    let location = this.id + ".html";
    window.location.href = location;
}

async function gameInfo() {
    let parent = document.getElementById("card-wrapper");
    let card = document.createElement("div");
    card.classList.add("info-card");
    card.id = 'gameCard';

    let banner = document.createElement("div");
    banner.classList.add("banner");

    let content = document.createElement("div");
    content.classList.add("content");

    let background = document.createElement("img");
    background.src = this.src;
    background.classList.add("banner-game");

    let gameData = document.createElement("div");
    gameData.classList.add("game-data");

    let gameArt = document.createElement("img");
    gameArt.src = this.src;

    let gameCont = document.createElement("div");
    gameCont.classList.add("game-cont");

    let gameHead = document.createElement("h1");
    
    gameHead.innerHTML = gameNames[this.id]

    let gameDis = document.createElement("h2");
    gameDis.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum leo vel orci porta non. Venenatis urna cursus eget nunc scelerisque viverra mauris in."

    let gameGroup = document.createElement("a");
    gameGroup.innerHTML = "Join Community";
    gameGroup.classList.add("link");

    let exit = document.createElement("div");
    exit.innerHTML = "X";
    exit.classList.add("exit");

    exit.addEventListener('click', () => document.getElementById("gameCard").remove());
    
    let list = document.createElement("div");
    list.classList.add('list-wrapper');
    addRentals(list, gameNames[this.id]);

    //banner
    banner.appendChild(background);
    card.appendChild(banner);
    //Discription
    gameCont.appendChild(gameHead);
    gameCont.appendChild(gameDis);
    gameCont.appendChild(gameGroup);
    //content
    gameData.appendChild(gameArt);
    gameData.appendChild(gameCont);
    gameData.appendChild(exit);
    content.appendChild(gameData);
    content.appendChild(list);   
    card.appendChild(content);
    //adding to page
    parent.appendChild(card);
}   

async function addRentals (parent, game) {
    // let rentals = [{price: "$3", condition: "fair", seller: "Pacific 3/5"}, {price: "$5", condition: "mint", seller: "Iris 4/5"}, {price: "$3", condition: "fair", seller: "Pacific 3/5"}, {price: "$5", condition: "mint", seller: "Iris 4/5"}];

    const rentals = await crud.readListings(game);

    rentals.forEach(i => {
        let listing = document.createElement("div");
        listing.classList.add("listing");

        let price = document.createElement("div");
        // price.innerHTML = "Price: " + i["price"];
        price.innerHTML = `Price: $${i["price"]}`;

        let condition = document.createElement("div");
        condition.innerHTML = "Condition: " + i["condition"];

        let seller = document.createElement("div");
        seller.innerHTML = "Seller: " + i["seller"];

        let rent = document.createElement("button");
        rent.innerHTML = "Rent";

        listing.appendChild(price);        
        listing.appendChild(condition);
        listing.appendChild(seller);
        listing.appendChild(rent);
        parent.appendChild(listing);
    });
}

function addGameOptions(gameNames) {
    let gameSelect = document.getElementById('gameSelect');
    for (let id in gameNames) {
        gameSelect.options.add(new Option(gameNames[id], id))
    }
}