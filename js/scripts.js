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

Space.prototype.coords = function() {
  return this.position;
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
  for (var i = 0; i < this.length; i++) {
    if (this[i] === array[i]) {
      return i;
    }
  }
  return false;
}

Game.prototype.checkForWinner = function(spaceMarked) {
  //check space around spaceMarked if they match, then win
  //array of array with winning coordinates combinations
  // [ [[1,1], [1,2], [1,3]],
  //   [[...], [...], [...]] ]
  // loop over outer array
    //loop over inner array
      // if any of those inner inner inner arrays match the space marked
        //check the other coordinates to see if the mark matches
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
    console.log(spaceToMark);
    $(this).text(activePlayer.markSpace(spaceToMark));
    //toggle the player
    if (activePlayer === game.playerOne) {
      activePlayer = game.playerTwo;
    } else {
      activePlayer = game.playerOne;
    }
    //check if there is a winner
    console.log(game.checkForWinner(spaceToMark));
  });
});
