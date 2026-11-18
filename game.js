const categories = [
    {id: "maantieto", name: "Maantieto"},
    {id: "viihde", name: "Viihde"},
    {id: "historia", name: "Historia"},
    {id: "taide", name: "Taide"},
    {id: "tiede", name: "Tiede"},
    {id: "urheilu", name: "Urheilu"},
];

// local questions
const LOCAL_QUESTIONS = {
    maantieto: [
        {
            question: "Mikä on Suomen pääkaupunki?",
            answers: ["Turku", "Oulu", "Tampere", "Helsinki"],
            correctAnswer: 3,
            explanation: "Helsinki on Suomen pääkaupunki.",
        }
    ],

    historia: [
        {
            question: "Missä maassa antiikin olympialaiset syntyivät?",
            answers: ["Italia", "Egypti", "Kreikka", "Ranska"],
            correctAnswer: 2,
            explanation: "Antiikin olympialaiset järjestettiin Kreikassa.",
        }
    ],

    taide: [
        {
            question: "Kuka maalasi Mona Lisan?",
            answers: ["Pablo Picasso", "Alvar Aalto", "Vincent van Gogh", "Leonardo da Vinci"],
            correctAnswer: 3,
            explanation: "Mona Lisan maalasi italialainen Leonardo da Vinci."
        }
    ],

    urheilu: [
        {
            question: "Kuinka monta pelaajaa yhdellä jalkapallojoukkueella on kentällä normaalisti?",
            answers: ["8", "10", "11", "12"],
            correctAnswer: 2,
            explanation: "Jalkapallojoukkueella on normaalisti kentällä 11 pelaajaa maalivahti mukaan lukien."
        }
    ],

    tiede: [
        {
            question: "Mikä planeetta on lähimpänä Aurinkoa?",
            answers: ["Mars", "Pluto", "Merkurius", "Maa"],
            correctAnswer: 2,
            explanation: "Merkurius on Aurinkokunnan lähimpänä Aurinkoa sijaitseva planeetta."
        }
    ],

    viihde: [
        {
            question: "Kuka näytteli Jack Dawsonia elokuvassa Titanic?",
            answers: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Channing Tatum"],
            correctAnswer: 0,
            explanation: "Leonardo DiCaprio näytteli Jack Dawsonia vuoden 1997 elokuvassa Titanic."
        }
    ],
};

const BOARD_SIZE = 18;
const boardElement = document.querySelector("#board");

const gameState = {
    player: {
        name: "Pelaaja",
        position: 0,
    }
};

const rollButton = document.querySelector("#roll-button");
const diceElement = document.querySelector("#dice");

rollButton.addEventListener("click", rollDice);

createaBoard();

function createaBoard() {
    boardElement.innerHTML = ""

    const coordinates = createBoardCoordinates();

    for(let index = 0; index < BOARD_SIZE; index += 1){

        const category = categories[index % categories.length];
        const square = document.createElement("div");
        const coordinate = coordinates[index];

        square.className = "square";
        
        square.dataset.spaceIndex = index;

        // ruutu sijoitetaan oikeaan kohtaan
        square.style.gridColumn = coordinate.column;
        square.style.gridRow = coordinate.row;

        square.dataset.category = category.id;
        square.textContent = category.name;

        boardElement.append(square);
    }
}

function createBoardCoordinates() {
    const coordinates = [];

    // pelilaudan ylärivin koordinaatit
    for (let column = 1; column <= 7; column += 1) {
        coordinates.push({ row: 1, column });
    }

    // pelilaudan oikea pystyreuna
    for (let row = 2; row <= 4; row ++) {
        coordinates.push({ row, column: 7});
    }

    // pelilaudan alareuna
    for (let column = 6; column >= 1; column --) {
        coordinates.push({ row: 4, column });
    }

    // pelilaudan vasen pystyreuna
    for (let row = 3; row >= 2; row --) {
        coordinates.push({ row, column: 1});
    }

    return coordinates;
}


function rollDice() {
    console.log("Noppaa heitetty");

    // random numero 0-1 välillä -> * 6 -> pyöristää alaspäin
    const result = Math.floor(Math.random() * 6) + 1;
    diceElement.textContent = result;

    movePlayer(result);
}

function movePlayer(steps) {
    const player = gameState.player;

    // uusi sijainti saadaan lisäämällä nopan tulos 
    // --> % board_size mahdollistaa ruutujen laskemisen alusta 
    player.position = (player.position + steps) % BOARD_SIZE;

    updateToken();

    // selvitetään minkä aihealueen ruutuun pelaajan nappula pysähtyi
    const categoryPosition = getCategoryAtPosition(player.position);
    console.log(categoryPosition);

    // haetaan kyseisen aihealueen paikallinen testikysymys (local question)
    const question = getLocalQuestion(categoryPosition.id);
    console.log(question);
    console.log(question.question);
}

function updateToken() {
    // poistetaan vanha nappula kaikista ruuduista
    document.querySelectorAll(".token").forEach((token) => {
        token.remove();
    });

    // etsitään pelaajan nykyinen ruutu
    const currentSpace = document.querySelector(
        `[data-space-index="${gameState.player.position}"]`
    );

    // luodaan uusi nappula - Pelaaja
    const token = document.createElement("span");
    token.className = "token player-token";
    token.textContent = "P";

    currentSpace.append(token);
}

// haetaan kategoria, jossa pelaaja on
function getCategoryAtPosition(position) {
    return categories[position % categories.length];
}

// haetaan testikysymys - local question
function getLocalQuestion(categoryId) {
    const questions = LOCAL_QUESTIONS[categoryId];
    console.log(questions);
    return questions[0];
}