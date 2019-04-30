$(document).ready(function(){
  var turns
  var winsX = 0
  var winsO = 0
  var playerOne // "X" or "O"
  var playerTwo // "O" or "X"
  var playerArray // stores the positions of the moves the players make
  var vsComputer = true;
  var computerPlayer = ""
  var win = false;

  
  if (vsComputer){
    $("#LED").css("background", "green")
    $("#choose").css("display", "block")
  } else {
    $("#LED").css("background", "red")
    $("#choose").css("display", "none")
  }
  
  var emptyFields = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  function clearBoard(){
    $("#one").html("")
    $("#two").html("")
    $("#three").html("")
    $("#four").html("")
    $("#five").html("")
    $("#six").html("")
    $("#seven").html("")
    $("#eight").html("")
    $("#nine").html("")
  }
  
  function checkForWin(){
    // checks which player wins this round 
    // checking rows
    if (playerArray[0]==playerArray[1] && playerArray[1]==playerArray[2] && playerArray[0]!="" && playerArray[1]!="" && playerArray[2]!=""){
      $("#notifications").html("Win for "+ playerArray[0])
      if (playerArray[0] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else if (playerArray[3]==playerArray[4] && playerArray[4]==playerArray[5] && playerArray[3]!="" && playerArray[4]!="" && playerArray[5]!=""){
      $("#notifications").html("Win for "+ playerArray[4])
      if (playerArray[3] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else if (playerArray[6]==playerArray[7] && playerArray[7]==playerArray[8] && playerArray[6]!="" && playerArray[7]!="" && playerArray[8]!=""){
      $("#notifications").html("Win for "+ playerArray[6])
      if (playerArray[6] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    }  else 
    // checkig columns
    if (playerArray[0]==playerArray[3] && playerArray[3]==playerArray[6] && playerArray[0]!="" && playerArray[3]!="" && playerArray[6]!=""){
      $("#notifications").html("Win for "+ playerArray[0])
      if (playerArray[0] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else if (playerArray[1]==playerArray[4] && playerArray[4]==playerArray[7] && playerArray[1]!="" && playerArray[4]!="" && playerArray[7]!=""){
      $("#notifications").html("Win for "+ playerArray[1])
      if (playerArray[1] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else if (playerArray[2]==playerArray[5] && playerArray[5]==playerArray[8] && playerArray[2]!="" && playerArray[5]!="" && playerArray[8]!=""){
      $("#notifications").html("Win for "+ playerArray[2])
      if (playerArray[2] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else
      //checking diagonals
    if (playerArray[0]==playerArray[4] && playerArray[4]==playerArray[8] && playerArray[0]!="" && playerArray[4]!="" && playerArray[8]!=""){
      $("#notifications").html("Win for "+ playerArray[0])
      if (playerArray[0] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    } else if (playerArray[2]==playerArray[4] && playerArray[4]==playerArray[6] && playerArray[2]!="" && playerArray[4]!="" && playerArray[6]!=""){
      $("#notifications").html("Win for "+ playerArray[2])
      if (playerArray[2] == "X"){winsX++; $("#winsX").html("Wins X: " + winsX)}
      else {winsO++; $("#winsO").html("Wins O: " + winsO)}
      win = true;
    }
    // reset all variables, start  new round
    if (win) { 
      setTimeout(function(){
        newRound()
      }, 1000)
    }
    // check for draw, start a new round
    if (turns == 9 && !win){
      $("#notifications").html("Draw.")
      setTimeout(function(){
        newRound()
      }, 1000)
    }
  }
  
  function computerDraw(){
    if (vsComputer){
      if (!win){
        // select a random empty field
        var rndField = emptyFields[Math.floor(Math.random()*emptyFields.length)]
        setTimeout(function(){
          if (computerPlayer == playerOne){
            if (turns%2 == 0){
              $("#"+rndField).html(playerOne)
              playerArray[idToNum(rndField)-1] = playerOne
              turns++
              checkForWin()
              // remove the selected field from the empty fields list
              emptyFields.splice(emptyFields.indexOf(rndField),1)
            }
          } 
          if (computerPlayer == playerTwo) {
            if (turns%2 != 0){
              $("#"+rndField).html(playerTwo)
              playerArray[idToNum(rndField)-1] = playerTwo
              turns++
              checkForWin()
              // remove the selected field from the empty fields list
              emptyFields.splice(emptyFields.indexOf(rndField),1)
            }
          }
        },500)
      }
    }
  }
  
  function newRound(){
    clearBoard()
    // randomly select which player goes first
    playerOne = Math.random() < 0.5 ? "X" : "O"
    playerTwo = playerOne == "X" ? "O" : "X"
    if ((vsComputer && computerPlayer) || (!vsComputer)){
      $("#notifications").html(playerOne + " goes first and " + playerTwo + " goes second.")
    } else {
      $("#notifications").html("")
    }
    playerArray = ["", "", "", "", "", "", "", "", ""]
    emptyFields = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    turns = 0
    win = false
    computerDraw()
  }
  
  if (vsComputer && computerPlayer){
    newRound()
  } else if(!vsComputer) {
    newRound()
  }
  
  
  function idToNum(id){
    // convert "word of numbers" to actual numbers
    switch(id){
      case "one": return 1; break;
      case "two": return 2; break;
      case "three": return 3; break;
      case "four": return 4; break;
      case "five": return 5; break;
      case "six": return 6; break;
      case "seven": return 7; break;
      case "eight": return 8; break;
      case "nine": return 9; break;
    }
  }
  
  
  
  
  function draw(id){
    // draw either X or O inside the specified field, depending on the turn. check if a winnin move was made
    if ((vsComputer && computerPlayer) || !vsComputer){
      if ($("#"+id).html() === ""){
        if (turns%2 == 0){
          $("#"+id).html(playerOne)
          playerArray[idToNum(id)-1] = playerOne
        } else {
          $("#"+id).html(playerTwo)
          playerArray[idToNum(id)-1] = playerTwo
        }
      }
      turns++
      checkForWin()
      // remove the selected field from the empty fields list
      emptyFields.splice(emptyFields.indexOf(id),1)
    }
  }
  
  
  $("#startBtn").click(function(){
    // restart the game, resetting all variables
    newRound()
    winsX = 0; $("#winsX").html("Wins X: " + 0)
    winsO = 0; $("#winsO").html("Wins O: " + 0)
  })
  
  $("#vsComputer").click(function(){
    // toggles if you want to play against a (bad) AI or against a person
    clearBoard()
    $("#notifications").html("")
    computerPlayer = ""
    vsComputer = !vsComputer
    $("#btnX").css("background", "white")
    $("#btnO").css("background", "white")
    
    winsX = 0; $("#winsX").html("Wins X: " + 0)
    winsO = 0; $("#winsO").html("Wins O: " + 0)
    if (vsComputer){
      $("#LED").css("background", "green")
      $("#choose").css("display", "block")
    } else {
      $("#LED").css("background", "red")
      $("#choose").css("display", "none")
    }
    if (vsComputer && computerPlayer || !vsComputer){
      newRound()
    }
  })
  
  
  // select if you want to play as "O" or "X"
  $("#btnX").click(function(){
    computerPlayer = "O"
    $("#btnX").css("background", "gray")
    $("#btnO").css("background", "white")
    winsX = 0; $("#winsX").html("Wins X: " + 0)
    winsO = 0; $("#winsO").html("Wins O: " + 0)
    newRound()
  })
  
  $("#btnO").click(function(){
    computerPlayer = "X"
    $("#btnX").css("background", "white")
    $("#btnO").css("background", "gray")
    winsX = 0; $("#winsX").html("Wins X: " + 0)
    winsO = 0; $("#winsO").html("Wins O: " + 0)
    newRound()
  })
  
  // click events for tic tac toe fields
  $("#one").click(function(){
    draw("one")
    computerDraw()
  })
  $("#two").click(function(){
    draw("two")
    computerDraw()
  })
  $("#three").click(function(){
    draw("three")
    computerDraw()
  })
  $("#four").click(function(){
    draw("four")
    computerDraw()
  })
  $("#five").click(function(){
     draw("five")
    computerDraw()
  })
  $("#six").click(function(){
    draw("six")
    computerDraw()
  })
  $("#seven").click(function(){
    draw("seven")
    computerDraw()
  })
  $("#eight").click(function(){
    draw("eight")
    computerDraw()
  })
  $("#nine").click(function(){
    draw("nine")
    computerDraw()
  })
});