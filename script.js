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
	let indexOfCell = [];
	let arr = []; arr.length = 9;
	let currentValue = document.getElementById("container").getElementsByClassName("cells");
	console.log(fieldSize);
	$( "#inputfield input").unbind( "change" );
	$('#inputfield input').on('change', function() {
		let selectedPlayer = $('input[name=choosePlayer]:checked', '#inputfield').val();
		if(selectedPlayer == 0){
			let randomnumber = Math.floor((Math.random() * 9));
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
			win = checkWin(arr, currentValue);
			if(!win){
				setTimeout( () => $(currentValue[rand]).append("0").off("click"), 10);
				arr[$(currentValue[rand]).index()] = 0;
			}
			checkWin(arr, currentValue);
			indexOfCell = [];
			$('#gameResult').click(function() {
				location.reload();
			});
		});
	});
}



const checkWin = (arr, currentValue) => {
	let newGame = "Tap to start new game";
	for(let i = 0; i < arr.length; i += 3){
		if(typeof arr[i] !== 'undefined'){
			if(arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]){
				if(arr[i] === 1){
					$("#gameResult").html("You win :) <br />" + newGame);
				}
				if(arr[i] === 0){
					$("#gameResult").html("You lost :( <br />" + newGame);
				}
				$(currentValue[i]).add($(currentValue[i+1])).add($(currentValue[i+2])).css('color', 'red');
				$("#gameResult").css('display', 'block');
				return true;
			}
		}
	}
	for(let i = 0; i < arr.length; i++){
		if(typeof arr[i] !== 'undefined'){
			if(arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]){
				if(arr[i] === 1){
					$("#gameResult").html("You win :) <br />" + newGame);
				}
				if(arr[i] === 0){
					$("#gameResult").html("You lost :( <br />" + newGame);
				}
				$(currentValue[i]).add($(currentValue[i+3])).add($(currentValue[i+6])).css('color', 'red');
				$("#gameResult").css('display', 'block');
				return true;
			}
		}
	}
	if(typeof arr[0] !== 'undefined'){
		if(arr[0]===arr[4]&&arr[4]===arr[8]){
			if(arr[0] === 1){
				$("#gameResult").html("You win :) <br />" + newGame);
			}
			if(arr[0] === 0){
				$("#gameResult").html("You lost :( <br />" + newGame);
			}
			$(currentValue[0]).add($(currentValue[4])).add($(currentValue[8])).css('color', 'red');
			$("#gameResult").css('display', 'block');
			return true;
		}		
	}
	if(typeof arr[2] !== 'undefined'){
		if(arr[2]===arr[4]&&arr[4]===arr[6]){
			if(arr[2] === 1){
				$("#gameResult").html("You win :) <br />" + newGame);
			}
			if(arr[2] === 0){
				$("#gameResult").html("You lost :( <br />" + newGame);
			}
			$(currentValue[2]).add($(currentValue[4])).add($(currentValue[6])).css('color', 'red');
			$("#gameResult").css('display', 'block');
			return true;
		}
	}
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