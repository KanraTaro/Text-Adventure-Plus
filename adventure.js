// Story Input

var story = {};

story.intro={};
story.intro.description = "Most of my effort here went into the battle mode and the UI, type 'battle' to check it out! Definitely still not done."
story.intro.decisions = [];
story.intro.decisions.push({inputs:["hiroko", "saeki", "test"], story:"branch1"}); /* Branch 1 */
story.intro.decisions.push({inputs:["battle", "fight", "pokemon"], story:["battle", wildmagikarp]}); /* Branch 2 - battle */

story.branch1=[];
story.branch1.description = "Please don't understand this reference"
story.branch1.decisions = [];
story.branch1.decisions.push({inputs:["intro"], story:"intro"});

story.battle=[];
story.battle.description = "Suddenly, PLACEHOLDER TEXT!"
story.battle.decisions = [];
story.battle.decisions.push({inputs:[], story:"intro"});

var msgCount = 0;
var currentStory;

function scrolls(){
	$("#story").delay(600).animate({ scrollTop: -$('#story').height() }, "slow");};

function showStory(storyName) {
	currentStory = story[storyName];
	var divString = "<div class='message' id='message" + msgCount + "'>" + currentStory.description +"</div>";
	$("#story").prepend(divString);
	$('#message' + msgCount).hide().show(1200);

	msgCount++;
	scrolls();
}


// Processing Begin! I'm ready, I'm ready, I'm ready!

$(document).ready(function() {
 	
 	showStory("intro");
	
 	//showBattle("wildmagikarp");
 	// listen for input
 	$(function (){
		var textBox = $('#command');
		var code = null;
		textBox.keypress(function(e){
		code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) {
		myDecision(this.value);
		e.preventDefault();

			}
		});
    


	});
});

function msgCleanup(){
	var deletemsg = msgCount-4;
	var deletemsg2 = msgCount-6;
	$('#message'+deletemsg).hide(600);
	$('#message'+deletemsg2).remove();
};

function myDecision(decision) {
	//msgCleanup();
	decision = decision.toLowerCase();
	for (var i = 0; i < currentStory.decisions.length; i++){//how many .decisions?
		for (var j = 0; j < currentStory.decisions[i].inputs.length; j++){//Check each selection until no more inputs to check
			if (decision.indexOf(currentStory.decisions[i].inputs[j]) > -1){//if true, do:
				if(currentStory.decisions[i].story[0] == "battle"){
					showBattle(currentStory.decisions[i].story[1]);
					$('#command').val("");
					return;
				}
				showStory(currentStory.decisions[i].story);		
				$('#command').val("");
				return;
		}
	}
}

var errorMsg = [];
errorMsg.push("I'm sorry, I don't speak retard, say again?");
errorMsg.push("Can you explain that a little better? I didn't understand.");
errorMsg.push("Does not compute.");
errorMsg.push("You died a painful death... No, I'm kidding I just didn't hear what you said, can you repeat that?");
var errorMessage = errorMsg[Math.floor(Math.random() * errorMsg.length)];
var divString = "<div class='message' id='message" + msgCount + "'>" + errorMessage +"</div>";
$('#story').prepend(divString);
$('#message' + msgCount).hide().show(600);
msgCount++;
$('#command').val("");
} 
