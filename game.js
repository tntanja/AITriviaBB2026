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
    boardElement.innerHTML = "";

    for(let index = 0; index < BOARD_SIZE; index += 1){

        const category = categories[index % categories.length];
        const square = document.createElement("div");

        square.className = "square";

        boardElement.append(square);
    }
}