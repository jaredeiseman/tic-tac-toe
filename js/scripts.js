//BUSINESS LOGIC
function Game() {
  this.board;
  this.playerOne;
  this.playerTwo;
  this.activePlayer;
}

function Board() {
  this.spaces = [];
}

function Space(x, y) {
  this.position = [x, y];
  this.markedBy = undefined;
}

function Player(mark) {
  this.mark = mark;
}

Game.prototype.build = function() {
  this.board = new Board();
  this.playerOne = new Player("X");
  this.playerTwo = new Player("O");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      this.board.spaces.push(new Space(i + 1, j + 1));
    }
  }
  this.activePlayer = this.playerOne;
}

Space.prototype.markedBy = function() {
  return this.markedBy;
}

Board.prototype.find = function (coordinate) {
  var result;
  this.spaces.forEach(function(space) {
    if (space.position[0] === coordinate[0] && space.position[1] === coordinate[1]) {
      result = space;
    }
  });
  return result;
}

Player.prototype.markSpace = function(space) {
  space.markedBy = this.mark;
  return space.markedBy;
}

Array.prototype.compareCoordinates = function(array) {
  if (this[0] === array[0] && this[1] === array[1]) {
    return true;
  }
  return false;
}

//swap active player
Game.prototype.swapActive = function() {
  if (this.activePlayer === this.playerOne) {
    this.activePlayer = this.playerTwo;
  } else {
    this.activePlayer = this.playerOne;
  }
}

Game.prototype.checkForWinner = function(spaceMarked) {
  //check space around spaceMarked if they match, then win
  //array of array with winning coordinates combinations
  // [ [[1,1], [1,2], [1,3]],
  //   [[...], [...], [...]] ]
  var winningCombinations = [[[1,1],[1,2],[1,3]],[[2,1],[2,2],[2,3]],[[3,1],[3,2],
                              [3,3]],[[1,1],[2,1],[3,1]],[[1,2],[2,2],[3,2]],[[1,3],
                              [2,3],[3,3]],[[1,1],[2,2],[3,3]],[[3,1],[2,2],[1,3]]];
  // loop over outer array
  for (var i = 0; i < winningCombinations.length; i++) {
    //loop over inner array
    for (var j = 0; j < winningCombinations[i].length; j++) {
      // if any of those inner inner inner arrays match the space marked
      if (winningCombinations[i][j].compareCoordinates(spaceMarked.position)) {
        //check the other coordinates to see if the mark matches
        var x = this.board.find(winningCombinations[i][0]);
        var y = this.board.find(winningCombinations[i][1]);
        var z = this.board.find(winningCombinations[i][2]);
        if (x.markedBy === y.markedBy && x.markedBy === z.markedBy) {
          return true;
        }
      }
    }
  }
  var holder = [];
  this.board.spaces.forEach(function(space) {
    if (space.markedBy !== undefined) {
      holder.push(space.markedBy);
    }
  });
  if (holder.length === 9) {
    return "catsGame";
  }
}

//USER INTERFACE LOGIC
$(document).ready(function() {
  //function to reset the game
  function resetGame() {
    game.build();
    $('.box').each(function() {
      $(this).text("");
    });
    game.activePlayer = game.playerOne;
  }

  //construct the game
  var game = new Game();
  game.build();

  $('.box').click(function() {
    //get this boxes x and y coordinates
    //jQuery returns an array of objects that match the selector
    //$(this) is the selector, [0] is the first and only element in the array
    //dataset.row/col is how it stores the data for data-row/data-col from the html
    var x = parseInt($(this).attr('data-row'));
    var y = parseInt($(this).attr('data-col'));

    //mark this box
    var spaceToMark = game.board.find([x,y]);
    $(this).text(game.activePlayer.markSpace(spaceToMark));
    //toggle the player
    game.swapActive();
    //check if there is a winner
    var winnerCheck = game.checkForWinner(spaceToMark);
    if (winnerCheck === true) {
      alert("winner");
      resetGame();
    } else if (winnerCheck === "catsGame") {
      alert("cats game");
      resetGame();
    }
  });
});
