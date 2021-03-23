'use strict';           c
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 40;
const MONSTER_ATTACK_VALUE = 21;
const HEAL_VALUE = 20;

let battleLog = [];



function getMaxLifeValues(){
  const enterValue = prompt('Maximum life for you and Monster ','100');
  const parsedValue = parseInt(enterValue);
  if(isNaN(parsedValue)||parsedValue<0){
      throw{message:'Invalid User Input / Not a Number.'};
  }
  return parsedValue;
}
let chosenMaxLife;
try{
  chosenMaxLife = getMaxLifeValues();
}catch(error){
  console.log(error);
  chosenMaxLife = 100;
  alert('You can Enter somthing Wrong But you have defalt value is 100.');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
const MODE_ATTACK = 'ATTACK';//ATTACK = 0;
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

adjustHealthBars(chosenMaxLife);
function writeToLog(ev,val,monsterHealth,playerHealth){
  let logEntry ={
    event:ev,
    value:val,
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
switch(ev){
  case LOG_EVENT_PLAYER_ATTACK:logEntry.target = 'MONSTER';
  break;
  case LOG_EVENT_PLAYER_STRONG_ATTACK:logEntry={
    event:ev,
    value:val,
    target:'Monster',
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
  break;
  case LOG_EVENT_MONSTER_ATTACK:logEntry={
    event:ev,
    value:val,
    target:'PLAYERS',
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
  break;
  case LOG_EVENT_PLAYER_HEAL:logEntry={
    event:ev,
    value:val,
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
  break;
  case LOG_EVENT_GAME_OVER:logEntry={
    event:ev,
    value:val,
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
  break;
  default:logEntry={};
}

    // if(ev === LOG_EVENT_PLAYER_ATTACK){
    //   logEntry={
    //     event:ev,
    //     value:val,
    //     target:'Monster',
    //     finalMonsterHealth:monsterHealth,
    //     finalPlayerHealth:playerHealth
    //   };
      
    // }
    // else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    //   logEntry={
    //     event:ev,
    //     value:val,
    //     target:'Monster',
    //     finalMonsterHealth:monsterHealth,
    //     finalPlayerHealth:playerHealth
    //   };
      
    // }
    // else if(ev === LOG_EVENT_MONSTER_ATTACK){
    //   logEntry={
    //     event:ev,
    //     value:val,
    //     target:'Player',
    //     finalMonsterHealth:monsterHealth,
    //     finalPlayerHealth:playerHealth
    //   };

      
    // }
    // else if(ev === LOG_EVENT_PLAYER_HEAL){
    //   logEntry={
    //     event:ev,
    //     value:val,
    //     finalMonsterHealth:monsterHealth,
    //     finalPlayerHealth:playerHealth
    //   };
      
    // }
    // else if(ev ===LOG_EVENT_GAME_OVER){
    //   logEntry={
    //     event:ev,
    //     value:val,
    //     finalMonsterHealth:monsterHealth,
    //     finalPlayerHealth:playerHealth
    //   };
      
    // }
  battleLog.push(logEntry);
}

function reSet(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound(){
  let intialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
    );

  if(currentPlayerHealth<=0 && hasBonusLife){
    hasBonusLife =false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('You would be dead but bonus life Save you.');  

  }

  if(currentMonsterHealth<=0&&currentPlayerHealth>0){
    alert('You Are Win');
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
      );
  }else if(currentPlayerHealth<=0&&currentMonsterHealth>0){
    alert('You Are Lost');
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
      );
  }else if(currentMonsterHealth<=0&&currentPlayerHealth<=0){
    alert('You Are Drrow');
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      'A DRROW',
      currentMonsterHealth,
      currentPlayerHealth
      );
  }
}

function attackMonster(mode){
  let maxDamage = mode ===MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent = mode ===MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if(mode ===MODE_ATTACK){
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // }else if(mode === MODE_STRONG_ATTACK){
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // } 
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
    );
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if(currentMonsterHealth<=0&&currentPlayerHealth>0){
    alert('You Are Win');
  }else if(currentPlayerHealth<=0&&currentMonsterHealth>0){
    alert('You Are Lost');
  }else if(currentMonsterHealth<=0&&currentPlayerHealth<=0){
    alert('You Are Drrow');
  }

  if(currentMonsterHealth<=0&&currentPlayerHealth>0||currentPlayerHealth<=0&&currentMonsterHealth>0||currentMonsterHealth<=0&&currentPlayerHealth<=0){
    reSet();
  }
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}
function strongAttackHandler(){
   
   attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler(){
  let healVlaue;
  if(currentPlayerHealth >= chosenMaxLife-HEAL_VALUE){
    alert("You Can't heal to more than your max intial health.")
  }else{
    healVlaue=HEAL_VALUE;
  }
  increasePlayerHealth(healVlaue);
  currentPlayerHealth += healVlaue;
  writeToLog(
     LOG_EVENT_PLAYER_HEAL,
    healVlaue,
    currentMonsterHealth,
    currentPlayerHealth
    );
  endRound();
}

function printLogHandler(){
  let j =0;
  // while(j<3){
  //   console.log(j);
  //   j++;
  // }

  // do {
  //   console.log(j);
  //   j++;
  // }while(j<3);

  // for (let i = 0 ; i<battleLog.length;i++){
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for(const logEntry of battleLog){

    console.log(`#${i}`);
    i++;
    for(const key in logEntry){
      console.log(`${key} => ${logEntry[key]}`);
       
    }
  }
  
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);
