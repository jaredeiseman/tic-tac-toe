//BUSINESS LOGIC
function Game() {
  this.board;
  this.playerOne;
  this.playerTwo;
}

function Board() {
  this.spaces = [];
}

function Space(x, y) {
  this.position = [x, y];
  this.markedBy;
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

Array.prototype.compareArrays = function(array) {
  if (this[0] === array[0] && this[1] === array[1]) {
    return true;
  }
  return false;
}

Game.prototype.checkForWinner = function(spaceMarked) {
  //check space around spaceMarked if they match, then win
  //array of array with winning coordinates combinations
  // [ [[1,1], [1,2], [1,3]],
  //   [[...], [...], [...]] ]
  var winningCombinations = [[[1,1],[1,2],[1,3]],[[2,1],[2,2],[2,3]],[[3,1],[3,2],[3,3]],[[1,1],[2,1],[3,1]],[[1,2],[2,2],[3,2]],[[1,3],[2,3],[3,3]],[[1,1],[2,2],[3,3]],[[3,1],[2,2],[1,3]]];
  // loop over outer array
  for (var i = 0; i < winningCombinations.length; i++) {
    //loop over inner array
    for (var j = 0; j < winningCombinations[i].length; j++) {
      // if any of those inner inner inner arrays match the space marked
      if (winningCombinations[i][j].compareArrays(spaceMarked.position)) {
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
}

//USER INTERFACE LOGIC
$(document).ready(function() {
  //construct the game
  var game = new Game();
  game.build();
  var activePlayer = game.playerOne;

  $('.box').click(function() {
    //get this boxes x and y coordinates
    //jQuery returns an array of objects that match the selector
    //$(this) is the selector, [0] is the first and only element in the array
    //dataset.row/col is how it stores the data for data-row/data-col from the html
    var x = parseInt($(this).attr('data-row'));
    var y = parseInt($(this).attr('data-col'));

    //mark this box
    var spaceToMark = game.board.find([x,y]);
    $(this).text(activePlayer.markSpace(spaceToMark));
    //toggle the player
    if (activePlayer === game.playerOne) {
      activePlayer = game.playerTwo;
    } else {
      activePlayer = game.playerOne;
    }
    //check if there is a winner
    if (game.checkForWinner(spaceToMark)) {
      alert("winner")
    }
  });
});
