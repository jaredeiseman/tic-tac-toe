# Tic-Tac-Toe

## Created by Leah Sherrell and Jared Eiseman


## Description
A simple Tic-Tac-Toe game made with JavaScript and jQuery.



## Specs

| Behavior| Input Example | Output Example |
|:-------------:|:-------------:|:-------------:|
| Constructor for the Game object | new Game() | {board, playerOne: "X", playerTwo: "O"} |
| Constructor for the Board object | new Board() | {spaces: []} |
| Constructor for the Space object | new Space(1,2) | { position: [1,2] } |
| Constructor for a Player object | new Player('X' || 'O') | {mark: 'X' || 'O'} |
| Prototype method for Game to construct all of the objects into a complete game object | game.build() | see data structure |
| Prototype for Space that will return it's coordinates | space.coords() | [1,2] |
| Prototype for Space that will return who it's been marked by | space.markedBy() | {playerOne} || {playerTwo} || false (not marked) |
| Prototype for Board that will return the space object at a coordinate | board.find(1,2) | {space with position [1,2]} |
| When the user clicks a space, it should mark the appropriate space object with that players mark | clicked space | space.markedBy = "X" || "O" |
| Will track the active player | After a mark is made | change activePlayer to next player |
| Prototype for Game that will detect if there is a winner | game.checkForWinner() | true || false |

Data Structure:
var game = {
  board: {
    spaces: [
      {
        position: [1,1],
        markedBy: player
      },
      {
        position: [1,2],
        markedBy: player
      },
      {
        position: [1,3],
        markedBy: player
      }
      ... 9 of them
    ]
  },
  playerOne: {
    mark: "X"
  },
  playerTwo: {
    mark: "0"
  }
}

## Setup/Installation Requirements

  * Clone the github repository to your local machine.
  * Open the directory created and load "index.html" into your browser of choice.
  * Enjoy the magic that is JavaScript!


## Bugs
There are no known bugs at this time, but please contact the creator with questions or concerns regarding this application.


## Technologies Used

  * HTML
  * CSS (Bootstrap)
  * JavaScript (jQuery)


## Licensing
MIT

Copyright &copy; 2017 Leah Sherrell and Jared Eiseman All Rights Reserved.
