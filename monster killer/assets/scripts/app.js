const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 40;
const MONSTER_ATTACK_VALUE = 21;
const HEAL_VALUE = 20;
const enterValue = prompt('Maximum life for you and Monster ','100');

let chosenMaxLife = parseInt(enterValue);
if(isNaN(enterValue)||chosenMaxLife<0){
  chosenMaxLife =100;  
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
const MODE_ATTACK = 'ATTACK';//ATTACK = 0;
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

adjustHealthBars(chosenMaxLife);

function reSet(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound(){
  let intialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if(currentPlayerHealth<=0 && hasBonusLife){
    hasBonusLife =false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('You would be dead but bonus life Save you.');  

  }

  if(currentMonsterHealth<=0&&currentPlayerHealth>0){
    alert('You Are Win');
  }else if(currentPlayerHealth<=0&&currentMonsterHealth>0){
    alert('You Are Lost');
  }else if(currentMonsterHealth<=0&&currentPlayerHealth<=0){
    alert('You Are Drrow');
  }
}

function attackMonster(mode){
  let maxDamage;
  if(mode ===MODE_ATTACK){
    maxDamage = ATTACK_VALUE;
  }else if(mode === MODE_STRONG_ATTACK){
    maxDamage = STRONG_ATTACK_VALUE;
  } 
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
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
  endRound();
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);



