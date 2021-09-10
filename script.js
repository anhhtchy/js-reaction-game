function startApp() {
    document.getElementById("screen1").style.display = "block";
    document.getElementById("screen2a").style.display = "none";
    document.getElementById("screen2b").style.display = "none";
    document.getElementById("screen3").style.display = "none";

    document.getElementById("howManyPlayers").addEventListener('change', createTextInput);
}

function createTextInput() {
    var selectedIndex = document.getElementById("howManyPlayers").selectedIndex;
    var numberOfPlayers = document.getElementById("howManyPlayers").options[selectedIndex].value;
    document.getElementById("howManyPlayers").style.display = "none";
    document.getElementById("question").innerHTML = "Enter Names of Players";
    documentFragment = document.createDocumentFragment();
    var inputElement;
    var myButton;
    for (var i = 0; i < numberOfPlayers; i++) {
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("class", "nameInput");
        inputElement.setAttribute("id", "playerName" + i);
        inputElement.setAttribute("value", "Name of Player " + (i + 1));
        inputElement.onclick = function () {
            this.value = "";
        }
        documentFragment.appendChild(inputElement);
        documentFragment.appendChild(document.createElement("br"));
        documentFragment.appendChild(document.createElement("br"));
    }
    myButton = document.createElement("button");
    myButton.setAttribute("type", "button");
    myButton.setAttribute("id", "submitNames");
    myButton.innerHTML = "Submit Names";
    myButton.onclick = function () {
        storePlayers(numberOfPlayers);
    }
    documentFragment.appendChild(myButton);
    document.getElementById("screen1").appendChild(documentFragment);
}

function storePlayers(numberOfPlayers) {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.setTime = function (bestTime, totalTime, numberOfRounds) {
        this.bestTime = bestTime;
        this.averageTime = totalTime / numberOfRounds;
    }
    var players = [];
    for (var i = 0; i < numberOfPlayers; i++) {
        players.push(Player(document.getElementById("playerName" + i).value));
    }
    var numberOfRounds = 5;
    createGame(players, numberOfRounds);
}

startApp();