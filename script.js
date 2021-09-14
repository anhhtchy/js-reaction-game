(function() {
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
            this.bestTime = bestTime.toFixed(2);
            this.averageTime = (totalTime / numberOfRounds).toFixed(2);
        }
        var players = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            var player = new Player(document.getElementById("playerName" + i).value);
    
            players.push(player);
        }
    
        var roundsPerPlayer = 5;
        createGame(players, roundsPerPlayer);
    }
    
    function createGame(players, roundsPerPlayer) {
        document.getElementById("screen1").style.display = "none";
        document.getElementById("screen2a").style.display = "block";
        document.getElementById("screen2b").style.display = "block";
        showAsButton("Start Game");
    
        var timesClicked = 1;
        var oneSet = roundsPerPlayer + 1; // button - shape - shape = ...
        var createdTime;
        var reactionTime;
        var totalTime = 0;
        var bestTime = 0;
        var numberOfPlayers = players.length;
        var playerNumber = 0;
        var status = "button";
    
        document.getElementById("answer").onclick = function () {
            switch (status) {
                case "button":
                    if (timesClicked == oneSet * numberOfPlayers + 1) {
                        displayResults(players);
                    } else {
                        totalTime = 0;
                        reactionTime = 0;
                        bestTime = 0;
                        document.getElementById("besttime").innerHTML = "0";
                        document.getElementById("reactiontime").innerHTML = "0";
                        document.getElementById("averagetime").innerHTML = "-";
                        removeAllShapes();
                        createdTime = createAllShapes();
                        document.getElementById("answer").className = "shape";
                        status = "shape";
                    }
                    break;
                case "shape":
                    reactionTime = (Date.now() - createdTime) / 1000;
                    totalTime = totalTime + reactionTime;
                    if (reactionTime < bestTime || bestTime === 0) {
                        bestTime = reactionTime;
                        document.getElementById("besttime").innerHTML = bestTime.toFixed(2);
                    }
                    document.getElementById("reactiontime").innerHTML = reactionTime.toFixed(2);
                    if (timesClicked % oneSet === 0) {
                        players[playerNumber].setTime(bestTime, totalTime, roundsPerPlayer);
                        document.getElementById("averagetime").innerHTML = players[playerNumber].averageTime;
                        document.getElementById("instructions").innerHTML = "End of Game";
                        playerNumber++;
                        status = "button";
                        removeAllShapes();
                        showAsButton("Click Here to Continue");
                    } else {
                        removeAllShapes();
                        createdTime = createAllShapes();
                    }
                    break;
            }
            timesClicked++;
        }
    }
    
    function showAsButton(message) {
        var answerElement = document.getElementById("answer");
        answerElement.className = "instructionbutton";
        answerElement.style.display = "block";
        answerElement.innerHTML = message;
    }
    
    function removeAllShapes() {
        document.getElementById("answer").style.display = "none";
        for (var i = 1; i <= 10; i++) {
            document.getElementById("shape" + i).style.display = "none";
        }
    }
    
    function createAllShapes() {
        var createdTime;
        var width;
        var height;
        var top;
        var left;
        var shape;
        var color;
        var id;
        var maxWidth = document.getElementById("screen2b").clientWidth * 0.2;
        var maxHeight = document.getElementById("screen2b").clientHeight * 0.5;
        var answerIndex = Math.floor(Math.random() * 10) + 1;
        var answerColor = getColor();
        for (var i = 1; i <= 10; i++) {
            if (Math.random() > 0.3 || i === answerIndex) {
                shape = getShape();
                width = getShapeWidth(maxWidth);
                height = getShapeHeight(maxHeight);
                if (shape == "Circle" || shape == "Square") {
                    height = Math.min(width, height);
                    width = height;
                }
                left = getShapeLeft(i, maxWidth, width);
                top = getShapeTop(i, maxHeight, height);
                if (i === answerIndex) {
                    drawOneShape("answer", shape, answerColor, height, width, top, left);
                    document.getElementById("instructions").innerHTML = answerColor + "<br/>" + shape;
                    document.getElementById("answer").innerHTML = "";
                } else {
                    do {
                        color = getColor();
                    } while (color == answerColor);
                    id = "shape" + i;
                    drawOneShape(id, shape, color, height, width, top, left);
                }
            }
        }
        createdTime = Date.now();
        return createdTime;
    }
    
    function getShape() {
        var shapes = ["Square", "Circle", "Rect", "Oval"];
        var i = Math.floor(Math.random() * 4);
        return shapes[i];
    }
    
    function getColor() {
        var colors = ["Green", "Blue", "Red", "Orange", "Pink", "Yellow", "Purple", "Black", "Gray", "Cyan"];
        var i = Math.floor(Math.random() * 10);
        return colors[i];
    }
    
    function getShapeWidth(maxWidth) {
    
        return Math.max(20, Math.floor(Math.random() * (maxWidth + 1)));
    }
    
    function getShapeHeight(maxHeight) {
        return Math.max(20, Math.floor(Math.random() * (maxHeight + 1)));
    }
    
    function getShapeLeft(index, maxWidth, width) {
        index = index > 5 ? index - 5 : index;
        return Math.floor(Math.random() * (maxWidth - width + 1)) + ((index - 1) * maxWidth);
    }
    
    function getShapeTop(index, maxHeight, height) {
        if (index <= 5) {
            return Math.floor(Math.random() * (maxHeight - height + 1));
        } else {
            return Math.floor(Math.random() * (maxHeight - height + 1)) + maxHeight;
        }
    }
    
    function drawOneShape(id, shape, color, height, width, top, left) {
    
        var element = document.getElementById(id);
    
        if (shape == "Circle") {
            element.style.borderRadius = 0.5 * width + "px";
        } else if (shape == "Oval") {
            element.style.borderRadius = 0.5 * width + "px / " + 0.5 * height + "px";
        } else {
            element.style.borderRadius = 0;
        }
        element.style.top = top + "px";
        element.style.left = left + "px";
        element.style.width = width + "px";
        element.style.height = height + "px";
    
        element.style.backgroundColor = color;
        element.style.display = "block";
    
    
    }
    
    function displayResults(players) { 
        document.getElementById("screen2a").style.display = "none";
        document.getElementById("screen2b").style.display = "none";
        document.getElementById("screen3").style.display = "block";
        players.sort(function(a, b){return a.averageTime - b.averageTime});
        var table = document.getElementById("results");
        var headerTr = document.createElement("tr");
        var headerCells = ["Rank", "Name", "Best Time", "Average Time"];
        for(var headerCell of headerCells) {
            var cell = document.createElement("th")
            cell.innerHTML = headerCell
            headerTr.appendChild(cell);
        }
        table.appendChild(headerTr);
        for(var i = 0; i < players.length; i++) {
            var playerTr = document.createElement("tr");
            
            var rankCell = document.createElement("td");
            rankCell.innerHTML = i + 1;
            playerTr.appendChild(rankCell);
            
            var nameCell = document.createElement("td");
            nameCell.innerHTML = players[i].name;
            playerTr.appendChild(nameCell);
            
            var bestTimeCell = document.createElement("td");
            bestTimeCell.innerHTML = players[i].bestTime;
            playerTr.appendChild(bestTimeCell);
            
            var averageTimeCell = document.createElement("td");
            averageTimeCell.innerHTML = players[i].averageTime;
            playerTr.appendChild(averageTimeCell);
    
            table.appendChild(playerTr);
        }    
    }
    
    startApp();

})();