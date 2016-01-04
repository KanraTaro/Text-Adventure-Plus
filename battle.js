// ins progress, I am trying to make the "blind" skill make player skip a turn, and finish defining enemy skills and making them work.
// To do: Define player Skills, Define AI Personalities, Skills, and choices. Then follow by adding the calculations that add/subtract HP.
// Need to remember to consider that, although I can modify player OBJ health directly... I still need to reset it, but in a way that remembers any "extra" HP/Mana the char. has gained.

// Just some git test

var pPchoice = "warrior";
var pPIdentifier;
function playerPermaClass(Pchoice){
	 pPIdentifier = playerProfession[Pchoice];
}

//Roll the dice!

var d6;
function rolld6(){
	d6 = Math.floor(Math.random()*6+1);
}

var d8;
function rolld8(){
	d8 =  Math.floor(Math.random()*8+1);
}


//Enemies

var battleStory = {};
	battleStory.statPerc={};
	battleStory.statPerc.ATK=0.52;
	battleStory.statPerc.Mana=0.00;

function Enemy(description,identifier,MaxHP,CurrentHP,ATK,DEF,DEFBONUS,personality,AI){
	this.description = description;
	this.Identifier = identifier;
	this.HPMAX = MaxHP;
	this.HP = CurrentHP;
	this.ATK = ATK;
	this.DEF = DEF;
	this.DEFBONUS = DEFBONUS;
	this.personality = personality;
	this.AI= function() {
	if(enemyDefBonus === true){
		currentBattle.DEFBONUS = 0;
		enemyDefBonus=false;
	}

	enemyPersOffensive();

	pTurn =true;
	hpCheck();
	};
}

var wildmagikarp = new Enemy("Suddenly a wild magikarp appears!", "wildmagikarp", 500, 500, 25, 0, 0, "enemyPersOffensive");


// Battle Handling

var currentBattle;
var battleState;
var battleMsg;
function battleMsgFunc(){
	var battleString = "<div class='message' id='message" + msgCount + "'>" + battleMsg +"</div>"
	$("#story").prepend(battleString);
	$('#message' + msgCount).hide().show(1200);
	msgCount++;
	//msgCleanup();	
	scrolls();
};

var pTurn = false;
function showBattle(battleName){
	playerPermaClass(pPchoice); //set player class // to be moved
	currentBattle = battleName;
	var divString = "<div class='message' id='message" + msgCount + "'>" + currentBattle.description +"</div>";
	$("#story").prepend(divString);
	$('#message' + msgCount).hide().show(1200);
	currentStory = story.battle;	
	$('#commandschool').delay(1200).show(1200);
	HPBar();
	battleMusic();
	pTurn = true;
	battleState = true;
	beginBattle();
	// when battle is over, can set currentStory to the next section!
	scrolls();
	msgCount++;
};

//Dat Battle Music :>

function battleMusic(){
	var snd = new Audio("battletheme.mp3");
	snd.play();
};

// Battle UI

	var HPBar = function() {

	    var currentHp = Math.floor((pPIdentifier.HP/ pPIdentifier.HPMAX)*100);
	    //console.log(currentHp);
	    $('#health').animate({
	        width: currentHp + "%"
	    }, {
	        step: function(now, fx) {
	        }
	    })

		$('#health').text(pPIdentifier.HP + " HP")


	    var currentMp = Math.floor((pPIdentifier.MANA/ pPIdentifier.MANAMAX)*100);
	    //console.log(currentHp);
	    $('#mana').animate({
	        width: currentMp + "%"
	    }, {
	        step: function(now, fx) { 
	        }
	    })

	    $('#mana').text(pPIdentifier.MANA + " MP")


	    var currentEnemyHp = Math.floor((currentBattle.HP/ currentBattle.HPMAX)*100);
	    //console.log(currentHp);
	    $('#enemyhealth').animate({
	        width: currentEnemyHp + "%"
	    }, {
	        step: function(now, fx) {
	            $(this).text(parseInt(now, 10) + '%');
	        }
	    })
	    	    
	};		


//Commands

$(document).ready(function(){
	$('#Attacks').click(function(){
		$("#command-attacks").show(600);
		$('#command-magic').hide(600);
		$('#command-items').hide(600);
	});

	$('#Magic').click(function(){
		$("#command-magic").show(600);
		$('#command-attacks').hide(600);
		$('#command-items').hide(600);
	});

	$('#Items').click(function(){
		$("#command-items").show(600);
		$('#command-attacks').hide(600);
		$('#command-magic').hide(600);
	});


//Player Skills

function slash (){
	rolld6();
	var atkdmg = Math.floor((pPIdentifier.ATK*playerProfession.statPerc.ATK)*d6 - (currentBattle.DEF + currentBattle.DEFBONUS));
	currentBattle.HP= currentBattle.HP - atkdmg;
	battleMsg = "You strike for " + atkdmg + " damage!";
	battleMsgFunc();
	hpCheck();
}

function feralStrike (){
	rolld8();
	var atkdmg = Math.floor((pPIdentifier.ATK*playerProfession.statPerc.ATK)*d8 - (currentBattle.DEF + currentBattle.DEFBONUS));
	currentBattle.HP= currentBattle.HP - atkdmg;
	battleMsg = "You strike for " + atkdmg + " damage!";
	battleMsgFunc();
	pPIdentifier.HP = pPIdentifier.HP - 20;
	battleMsg = "You take 20 damage in return!";
	battleMsgFunc();
	hpCheck();
}

function weakStrike (){
	rolld8();
	var atkdmg = Math.floor((pPIdentifier.ATK*playerProfession.statPerc.ATK)*d8 - (currentBattle.DEF + currentBattle.DEFBONUS)-20);
	currentBattle.HP= currentBattle.HP - atkdmg;
	battleMsg = "You hit like a girl for " + atkdmg + " damage!";
	battleMsgFunc();
	hpCheck();
}

function dropkick (){
	rolld8();
	var atkdmg = Math.floor((pPIdentifier.ATK*playerProfession.statPerc.ATK)*d8 - (currentBattle.DEF + currentBattle.DEFBONUS)-20);
	currentBattle.HP= currentBattle.HP - atkdmg;
	battleMsg = "You dropkick your enemy for " + atkdmg + " damage!";
	battleMsgFunc();
	hpCheck();
}

function mpcheck (){

}


function enrage (){
	rolld8();
	var atkdmg = Math.floor((pPIdentifier.ATK*playerProfession.statPerc.ATK)*d8 - (currentBattle.DEF + currentBattle.DEFBONUS)+50);
	currentBattle.HP= currentBattle.HP - atkdmg;
	pPIdentifier.MANA= pPIdentifier.MANA - 25;
	battleMsg = "Suddenly you are thrown into a violent rage! You strike for " + atkdmg + " damage!";
	battleMsgFunc();
	hpCheck();
}


//battle command listen

	$('.atkCommand').click(function(){
			if(battleState == true){
				var thisCommand = $(this).html();	
				if (pTurn == true){
					switch (thisCommand){


			//physical attacks
					case "Slash" :
						
						slash();
						pTurn = false;
						beginBattle();
						break;
					
					case "Feral Strike" :
						feralStrike();
						pTurn = false;
						beginBattle();
						break;

					case "Weak Strike" :
						weakStrike();
						pTurn = false;
						beginBattle();
						break;

					case "Dropkick" :
						dropkick();
						pTurn = false;
						beginBattle();
						break;

			// mana based spells
					case "Enrage" :
						mpcheck();
						// create a function that subtracts the mana cost from the current mana pool and IF the result is greater than or equal to 1, continue, else, not enough mana.
						if(pPIdentifier.MANA <= 0){
							battleMsg = "You have no mana!";
							battleMsgFunc();
						}else{
							enrage();
							pTurn = false;
							beginBattle();
						};
							break;


					case "Heal" :
						heal();
						pTurn = false;
						beginBattle();
						break;

					case "Fireball" :
						fireball();
						pTurn = false;
						beginBattle();
						break;

					case "Freeze" :
						freeze();
						pTurn = false;
						beginBattle();
						break;

			// items
					

					};
				};
			}else{}
		});
});


//Player Classes

var playerProfession = {};

playerProfession.statPerc={};
playerProfession.statPerc.ATK=0.65;
playerProfession.statPerc.Mana=0.72;

playerProfession.warrior={};
playerProfession.warrior.HPMAX=500;
playerProfession.warrior.HP=500;
playerProfession.warrior.ATK=25;
playerProfession.warrior.MANAMAX=50;
playerProfession.warrior.MANA=50;
playerProfession.warrior.ARMOR=0;
playerProfession.warrior.ARMORBONUS=0;

playerProfession.mage={};
playerProfession.mage.HPMAX=250;
playerProfession.mage.HP=250;
playerProfession.mage.ATK=25;
playerProfession.mage.MANAMAX=0;
playerProfession.mage.MANA=0;
playerProfession.mage.ARMOR=0;
playerProfession.mage.ARMORBONUS=0;


// Enemy Skill Pool

var enemySkills = {};
var enemyDefBonus = false;

enemySkills.offensive= []; // Make us all arrays D:

enemySkills.offensive[0]= function(){
	//slash
	rolld6();
	var atkdmg = Math.floor((currentBattle.ATK*battleStory.statPerc.ATK)*d6 - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	pPIdentifier.HP= pPIdentifier.HP - atkdmg;
	battleMsg = currentBattle.Identifier + " Slashes for " + atkdmg + " damage!";
	battleMsgFunc();

};

enemySkills.offensive[1]=function(){
	//cleave
	rolld8();
	var atkdmg = Math.floor((currentBattle.ATK*battleStory.statPerc.ATK)*d8 - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	pPIdentifier.HP= pPIdentifier.HP - (atkdmg - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	battleMsg = currentBattle.Identifier + " Cleaves for " + atkdmg + " damage!";
	battleMsgFunc();

};

enemySkills.offensive[2]=function(){
	//tackle
	rolld6();
	var atkdmg = Math.floor((currentBattle.ATK*battleStory.statPerc.ATK)*d6 - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	pPIdentifier.HP= pPIdentifier.HP - (atkdmg - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	battleMsg = currentBattle.Identifier + " Tackles you for " + atkdmg + " damage!";
	battleMsgFunc();

};

enemySkills.offensive[3]=function(){
	// body slam
	rolld8();
	var atkdmg = Math.floor((currentBattle.ATK*battleStory.statPerc.ATK)*d8 - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	pPIdentifier.HP= pPIdentifier.HP - (atkdmg - (pPIdentifier.ARMOR + pPIdentifier.ARMORBONUS));
	battleMsg = currentBattle.Identifier + " Body Slam's you for " + atkdmg + " damage!";
	battleMsgFunc();

};


enemySkills.defensive= [];

var blindDeBuff;
enemySkills.defensive[0]=function(){
	//Blind
	var chance1or2 = Math.floor(Math.random()*2+1);
	
	if(chance1or2 === 1){
		battleMsg = currentBattle.Identifier + " blinds you, making you unable to attack!";
		var blindDeBuff = true;
		battleMsgFunc();
		beginBattle();
		
	}else{
		battleMsg = currentBattle.Identifier + " tried to blind you but failed.";
		battleMsgFunc();
	}


};

enemySkills.defensive[1]=function(){
	//defend
	var enemyDefBonus = true;
	currentBattle.DEFBONUS = currentBattle.DEFBONUS + 5;
	battleMsg = currentBattle.Identifier + " raised defense by 5!";
	battleMsgFunc();


};

enemySkills.healing = [];

enemySkills.healing[0]=function(){
	//heal
	var heal = 50;
	if(currentBattle.HP + heal >= currentBattle.HPMAX){
		currentBattle.HP = currentBattle.HPMAX;
	}else{
		currentBattle.HP = currentBattle.HP + heal;
	}
	
	battleMsg = currentBattle.Identifier + " recovers " + heal + " hp!";
	battleMsgFunc();


};


// enemy AI personalities

var attackmove;
var skillType;
var diceResult;
function rollDice (){	
	diceResult = Math.floor(Math.random()*10+1);
} 

function enemyPersOffensive () {
	//alert(enemySkills.offensive.length);
	rollDice();
	if (diceResult <= 7){
		attackmove = [Math.floor(Math.random() * (enemySkills.offensive.length))]; // I need to randomly select a # betwen 1-3... or between .length now!!
		//alert("attack move "+attackmove);
		enemySkills.offensive[attackmove]();
	}else if (diceResult >=9){
		attackmove = [Math.floor(Math.random() * (enemySkills.defensive.length))];
		//alert("defensive move "+attackmove);
		enemySkills.defensive[attackmove]();
	}else {
		
		if(currentBattle.HP == currentBattle.HPMAX){
			enemyPersOffensive();
		}else{
			attackmove = [Math.floor(Math.random() * (enemySkills.healing.length))];
			//alert("healing move "+attackmove);
			enemySkills.healing[attackmove]();
		}
	};
};


// Check to see if I'm alive!!

function hpCheck (){ // tell me where to find health variables!
	HPBar();
	if (pPIdentifier.HP < 1){
		battleMsg = "You have been defeated."
		battleMsgFunc();
		battleState = false;
		//hideBattle(); // Define me! Because otherwise the battle is not ending! D:
		
		//endGame Msg;
	}else if ( currentBattle.HP < 1){
		battleMsg = "You have defeated " + currentBattle.Identifier + "!";
		battleMsgFunc();
		battleState = false;
		//hideBattle(); // Define me!
		//continue story
	}else{ 
		// Continue on your merry way :)
	};
}; // Still need to set the "story" state afterwards so it either displays end msg or next story path



function beginBattle(){
	if(battleState === true){
		
	hpCheck();

	if(blindDeBuff=true){pTurn==false}

	if(pTurn==false){

		setTimeout(function(){

			switch (currentBattle){
					case wildmagikarp :
						wildmagikarp.AI();
						break;

					case " " :
						break;

					case " " :
						break;

				}; },2000);		

	}else{};

	}
	
	
	// Tell me how to get the story moving again!	
	// Also, tell me which, if any, variables should be "reset" so that the next battle begins without a hitch!	

};
// Need to create an endBattle or "hideBattle" function that hides the battle UI and/or continues story, and can probably reset variables if need be to put it all in one place.