const categories = [
    {id: "maantieto", name: "Maantieto"},
    {id: "yleistieto", name: "Yleistieto"},
    {id: "historia", name: "Historia"},
    {id: "taide ja kulttuuri", name: "Taide & Kulttuuri"},
    {id: "tiede", name: "Tiede"},
    {id: "urheilu", name: "Urheilu"},
];

const BOARD_SIZE = 18;
const boardElement = document.querySelector("#board");

createaBoard();

function createaBoard() {
    boardElement.innerHTML = ""

    const coordinates = createBoardCoordinates();

    for(let index = 0; index < BOARD_SIZE; index += 1){

        const category = categories[index % categories.length];
        const square = document.createElement("div");
        const coordinate = coordinates[index];

        square.className = "square";

        // ruutu sijoitetaan oikeaan kohtaan
        square.style.gridColumn = coordinate.column;
        square.style.gridRow = coordinate.row;

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