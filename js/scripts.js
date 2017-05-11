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

var game = new Game();
game.build();
var spaceToMark = game.board.find([1,1]);
game.playerOne.markSpace(spaceToMark);
console.log(game.board.find([1,1]));
