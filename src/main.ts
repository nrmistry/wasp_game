import './main.scss';

const hitWasp = document.querySelector<HTMLButtonElement>(".waspButton");
const gameAreaElement = document.querySelector<HTMLElement>("#gameArea");

type WaspType = 'Queen' | 'Worker' | 'Drone';

type Wasp = {
  type: WaspType;
  points: number; 
}

// ARRAY FOR WASPS + TYPE AND POINTS
const queenWasp: Wasp = { type: 'Queen', points: 80 };

const workerWasps: Wasp[] = [];
for (let i = 0; i < 5; i++) {
  workerWasps.push({ type: 'Worker', points: 68 });
}

const droneWasps: Wasp[] = [];
for (let i = 0; i < 8; i++) {
  droneWasps.push({ type: 'Drone', points: 60 });
}

const allWasps: Wasp[] = [queenWasp, ...workerWasps, ...droneWasps];

// SET DISPLAY STATE 
const displayGameArea = () => {
  if (gameAreaElement) {
    gameAreaElement.innerHTML = `<p>Hit all the Wasps...</p>`;
    gameAreaElement.innerHTML += allWasps
      .map((wasp, index) => `<p id="${wasp.type.toLowerCase()}${index}" 
      class="${wasp.points <= 0 ? 'hit' : ''}">${wasp.type}: ${Math.max(0, wasp.points)} P</p>`)
      .join('');
  }
};


// FILTER TO LOOP THROUGH ARRAY TO HIT RANDOM WASP
const hitRandomWasp = () => {
  const stillThereWasps = allWasps.filter(wasp => wasp.points > 0);

  if (stillThereWasps.length > 0) {
    const randomWasp = stillThereWasps[Math.floor(Math.random() * stillThereWasps.length)];

    const pointDeduction = {
      'Queen': 7,
      'Worker': 10,
      'Drone': 12,
    };

    randomWasp.points = Math.max(0, randomWasp.points - pointDeduction[randomWasp.type]);

    displayGameArea();

    //CHECK IF ALL WASPS ARE DEAD 

    if (allWasps.every(wasp => wasp.points <= 0 || queenWasp.points <=0)) {
      alert('Game Over! You hit all the wasps! Start a new game!');
      resetGame();
    }
  }
};


//RESET GAME BACK TO ORIGINAL SETTINGS
const resetGame = () => {
  allWasps.forEach(wasp => {
    switch (wasp.type) {
      case 'Queen':
        wasp.points = 80;
        break;
      case 'Worker':
        wasp.points = 68;
        break;
      case 'Drone':
        wasp.points = 60;
        break;
    }
  });
  displayGameArea();
};

//EVENT LISTENER FOR BUTTON

if (hitWasp) hitWasp.addEventListener('click', hitRandomWasp);

displayGameArea();