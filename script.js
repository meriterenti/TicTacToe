$("button").click(function(e){
	e.preventDefault()
	let fieldSize = parseInt($("#quantity").val());
	if(fieldSize < 3 || fieldSize > 100){
		$("#title").html("The number must be from 3 to 100")
	} else {
		$("#fieldProportions").hide();
		$("#choosePlayer").css('display', 'block');
		playGame(fieldSize);
	}
})

$("label").click(function(){
	setTimeout( "$('#choosePlayer').hide();", 300);
})

const playGame = (fieldSize) => {
	$( ".cells").unbind( "click" );
	$( "#inputfield input").unbind( "change" );
	let indexOfCell = [];
	let arr = []; 
	arr.length = fieldSize*fieldSize;
	let cells = $(".cells");
	let container = $("#container");
	for(let i = 0; i < arr.length; i++){
		$("#container").append("<div class='cells'></div>");
	}
	if(fieldSize >= 3 && fieldSize < 7){
		$("#container").css({"width": "calc(" + fieldSize + " * 100px)"});
		$(".cells").css({"width": "100px", "height": "100px", "font-size": "5.5em"});
	} else if(fieldSize >= 7 && fieldSize < 14){
		$("#container").css({"width": "calc(" + fieldSize + " * 50px)"});
		$(".cells").css({"width": "50px", "height": "50px", "font-size": "2.7em"});
	} else{
		$("#container").css({"width": "calc(" + fieldSize + " * 30px)"});
		$(".cells").css({"width": "30px", "height": "30px", "font-size": "1.5em"});
	}
	let currentValue = document.getElementById("container").getElementsByClassName("cells");
	$('#inputfield input').on('change', function() {
		let selectedPlayer = $('input[name=choosePlayer]:checked', '#inputfield').val();
		if(selectedPlayer == 0){
			let randomnumber = Math.floor((Math.random() * arr.length));
			$(currentValue[randomnumber]).append("0").off("click");
			arr[$(currentValue[randomnumber]).index()] = 0;
		}
		let win = false;
		$(".cells").one("click", function(e){
			if(typeof arr[$(this).index()] !== 'undefined'){
				e.preventDefault();
				return
			}
			if(!win){
				$(this).append("X");
			}
			arr[$(this).index()] = 1;
			for(let i = 0; i < arr.length; i++){
				if(typeof arr[i] === 'undefined'){
					indexOfCell.push(i);
				}
			}
			let rand = indexOfCell[Math.floor(Math.random() * indexOfCell.length)];	
			win = checkWin(arr, currentValue, fieldSize);
			if(!win){
				setTimeout( () => $(currentValue[rand]).append("0").off("click"), 10);
				arr[$(currentValue[rand]).index()] = 0;
			}
			checkWin(arr, currentValue, fieldSize);
			indexOfCell = [];
			$('#gameResult').click(function() {
				location.reload();
			});
		});
	});
}

const checkWin = (arr, currentValue, fieldSize) => {
	let newGame = "Tap to start new game";
	
	/*horizontal match*/ 
	let incrementFieldSize = 0;
	let redArrHor = [];
	for(let i = 0; i < arr.length; i = i + fieldSize){
		let count = 0;
		incrementFieldSize++
		for(let j = i+1; j < incrementFieldSize*fieldSize; j++){
			if(typeof arr[i] !== 'undefined'){
				if(arr[i] === arr[j]){
					count++;
					redArrHor.push(j);
				}
				if(count === fieldSize - 1){
					if(arr[i] === 1){
						$("#gameResult").html("You win :) <br />" + newGame);
					}
					if(arr[i] === 0){
						$("#gameResult").html("You lost :( <br />" + newGame);
					}
					$(currentValue[i]).css('color', 'red');
					for(let i in redArrHor){$(currentValue[redArrHor[i]]).css('color', 'red');}
					$("#gameResult").css('display', 'block');
					return true;
				}
			}
		}	
	}
	
	/*vertical match */
	let redArrVert = [];
	for(let i = 0; i < fieldSize; i++){
		let count = 0;
		for(let j = i + fieldSize; j < arr.length; j += fieldSize ){
			if(typeof arr[i] !== 'undefined'){
				if(arr[i] === arr[j]){
					count++;
					redArrVert.push(j);
				}
				if(count === fieldSize - 1){
					if(arr[i] === 1){
						$("#gameResult").html("You win :) <br />" + newGame);
					}
					if(arr[i] === 0){
						$("#gameResult").html("You lost :( <br />" + newGame);
					}
					$(currentValue[i]).css('color', 'red');
					for(let i in redArrVert){$(currentValue[redArrVert[i]]).css('color', 'red');}
					$("#gameResult").css('display', 'block');
					return true;
				}
			}
		}
	}
	
	/*diagonal match*/
	let redArrDiag = [];
	let countDiag = 0;
	for(let i = 1; i < fieldSize; i++){
		if(typeof arr[0] !== 'undefined'){
			if(arr[0] === arr[(fieldSize * i) + i]){
				countDiag++;
				redArrDiag.push((fieldSize * i) + i)
			}		
			if(countDiag === fieldSize - 1){
				if(arr[0] === 1){
					$("#gameResult").html("You win :) <br />" + newGame);
				}
				if(arr[0] === 0){
					$("#gameResult").html("You lost :( <br />" + newGame);
				}
				$(currentValue[0]).css('color', 'red');
				for(let i in redArrDiag){$(currentValue[redArrDiag[i]]).css('color', 'red');}
				$("#gameResult").css('display', 'block');
				return true;
			}
		}
	}
	
	/*antidiagonal match*/
	let redArrAntidiag = [];
	let countAntidiag = 0;
	for(let i = 2; i <= fieldSize; i++){
		if(typeof arr[fieldSize - 1] !== 'undefined'){
			if(arr[fieldSize - 1] === arr[(fieldSize * i) - i]){
				countAntidiag++;
				redArrAntidiag.push((fieldSize * i) - i);
			}		
			if(countAntidiag === fieldSize - 1){
				if(arr[fieldSize - 1] === 1){
					$("#gameResult").html("You win :) <br />" + newGame);
				}
				if(arr[fieldSize - 1] === 0){
					$("#gameResult").html("You lost :( <br />" + newGame);
				}
				$(currentValue[fieldSize - 1]).css('color', 'red');
				for(let i in redArrAntidiag){$(currentValue[redArrAntidiag[i]]).css('color', 'red');}
				$("#gameResult").css('display', 'block');
				return true;
			}
		}
	}
	
	/*draw (no match) */
	let draw = true;
	for(let v of arr){
		if(typeof v === 'undefined'){
			draw = false;
		}
	}
	if(draw){
		$("#gameResult").html("It's draw <br />" + newGame).css('display', 'block');
		return true
	}
	return false;
}