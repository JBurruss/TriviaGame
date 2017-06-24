$(document).ready(function() {

// Start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();


$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){

	//answeredQuestion = true;

	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/dv.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  

	//  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  

	//  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/dv.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();																				
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["How many times has R2D2 been to Dagobah?", "Which Imperial Star Destroyer intercepted Princess Leia’s ship above Tatooine in Star Wars- A New Hope?", "How did Gold 5 know to watch for incoming enemy fighters during Battle of Yavin?", "Anakin Skywalker piloted a Y-wing into battle against what massive Separatist warship?", "How many landing craft did the Finalizer deploy to the village on Jakku?", "Where did Pre Vizsla‘s darksaber come from?", "Who was the only Rebel to harpoon an AT-AT during the Battle of Hoth?", "What was the name of Admiral Akbar’s command ship in the Battle of Endor?"];
var answerArray = [["3", "7", "2", "4"], ["The Avenger","The Devastator","Tyrant","Relentless"], ["Yavin Base warned them.","Obi-wan told luke.","Turbolasers stopped firing.","Wedge visually spotted them."], ["Lucid Voice", "Invisible Hand", "Malevolence", "Scimitar"], ["7", "2", "9", "5"], ["It was taken from the Jedi Temple during the fall of the Old Republic.","He took it from a jedi he killed.","Won it in a game of pazzak.","Was the reward of a bounty an ancestor recieved."], ["Soontir Fel", "Wes Janson", "Hobbie Klivian", "Luke"], ["Liberty","Sytche","Viscount","Home One "]];
var imageArray = ["<img class='center-block img-right' src='assets/images/r2.jpg'>", "<img class='center-block img-right' src='assets/images/ds.png'>", "<img class='center-block img-right' src='assets/images/g5.jpg'>", "<img class='center-block img-right' src='assets/images/ml.jpg'>", "<img class='center-block img-right' src='assets/images/lc.png'>", "<img class='center-block img-right' src='assets/images/darks.jpg'>", "<img class='center-block img-right' src='assets/images/wes.jpg'>", "<img class='center-block img-right' src='assets/images/ho.jpg'>"];
var correctAnswers = ["A. 3", "B. The Devastator", "C. Turbolasers stopped firing.", "C. Malevolence", "D. 5", "A. It was taken from the Jedi Temple during the fall of the Old Republic.", "B. Wes Janson", "D. Home One "];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/lso.mp3");



