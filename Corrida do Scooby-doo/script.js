/* =====================================================
   SCOOBY-DOO MYSTERY RUNNER
   script.js
   Parte 3A
===================================================== */

/* =========================
   ELEMENTOS
========================= */

const startScreen =
document.getElementById("startScreen");

const pauseScreen =
document.getElementById("pauseScreen");

const gameOverScreen =
document.getElementById("gameOverScreen");

const loadingScreen =
document.getElementById("loadingScreen");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const jumpBtn =
document.getElementById("jumpBtn");

const scoobyContainer =
document.getElementById("scoobyContainer");

const scooby =
document.getElementById("scooby");

const obstaclesContainer =
document.getElementById("obstaclesContainer");

const cluesContainer =
document.getElementById("cluesContainer");

const collectEffects =
document.getElementById("collectEffects");

const scoreElement =
document.getElementById("score");

const cluesElement =
document.getElementById("clues");

const recordElement =
document.getElementById("record");

const fpsElement =
document.getElementById("fps");

const finalScore =
document.getElementById("finalScore");

const finalClues =
document.getElementById("finalClues");

const finalRecord =
document.getElementById("finalRecord");

/* =========================
   ÁUDIOS
========================= */

const jumpSound =
document.getElementById("jumpSound");

const clueSound =
document.getElementById("clueSound");

const gameOverSound =
document.getElementById("gameOverSound");

const backgroundMusic =
document.getElementById("backgroundMusic");

/* =========================
   ESTADO DO JOGO
========================= */

let gameRunning = false;

let gamePaused = false;

let gameOver = false;

let score = 0;

let clues = 0;

let record = 0;

let gameSpeed = 6;

/* =========================
   SCOOBY
========================= */

let scoobyY = 0;

let velocityY = 0;

let gravity = 0.5;

let jumpForce = -17;

let isJumping = false;

/* =========================
   TIMERS
========================= */

let scoreTimer = null;

let obstacleTimer = null;

let clueTimer = null;

/* =========================
   FPS
========================= */

let fps = 0;

let frameCount = 0;

let lastFpsUpdate =
performance.now();

/* =========================
   LOCAL STORAGE
========================= */

record =
parseInt(
localStorage.getItem(
"scoobyRecord"
)
) || 0;

recordElement.textContent =
record;

/* =========================
   LOADING
========================= */

window.addEventListener(
"load",
()=>{

    setTimeout(()=>{

        loadingScreen.style.display =
        "none";

    },2000);

}
);

/* =========================
   INICIAR JOGO
========================= */

startBtn.addEventListener(
"click",
startGame
);

function startGame(){

    startScreen.classList.remove(
        "active"
    );

    resetVariables();

    gameRunning = true;

    scooby.classList.add(
        "running"
    );

    startScore();

    startSpawners();

    startMusic();

    requestAnimationFrame(
        gameLoop
    );
}

/* =========================
   RESET
========================= */

function resetVariables(){

    score = 0;

    clues = 0;

    gameSpeed = 6;

    scoobyY = 0;

    velocityY = 0;

    isJumping = false;

    gamePaused = false;

    gameOver = false;

    scoreElement.textContent =
    0;

    cluesElement.textContent =
    0;

    scoobyContainer.style.bottom =
    "140px";

    obstaclesContainer.innerHTML =
    "";

    cluesContainer.innerHTML =
    "";

    collectEffects.innerHTML =
    "";

    pauseScreen.style.display =
    "none";

    gameOverScreen.classList.remove(
        "active"
    );

    scooby.classList.remove(
        "dead"
    );
}

/* =========================
   MÚSICA
========================= */

function startMusic(){

    if(!backgroundMusic) return;

    backgroundMusic.volume = 0.3;

    backgroundMusic.play()
    .catch(()=>{});
}

/* =========================
   SOM
========================= */

function playSound(audio){

    if(!audio) return;

    audio.currentTime = 0;

    audio.play()
    .catch(()=>{});
}

/* =========================
   PULAR
========================= */

function jump(){

    if(!gameRunning) return;

    if(gamePaused) return;

    if(gameOver) return;

    if(isJumping) return;

    isJumping = true;

    velocityY = jumpForce;

    scooby.classList.add(
        "jumping"
    );

    playSound(
        jumpSound
    );

    setTimeout(()=>{

        scooby.classList.remove(
            "jumping"
        );

    },300);
}

/* =========================
   TECLADO
========================= */

document.addEventListener(
"keydown",
(event)=>{

    if(
        event.code === "Space" ||
        event.code === "ArrowUp"
    ){

        event.preventDefault();

        jump();
    }

    if(
        event.key === "p" ||
        event.key === "P"
    ){

        togglePause();
    }

}
);

/* =========================
   BOTÃO MOBILE
========================= */

jumpBtn.addEventListener(
"click",
jump
);

/* =========================
   PAUSA
========================= */

function togglePause(){

    if(!gameRunning) return;

    if(gameOver) return;

    gamePaused =
    !gamePaused;

    pauseScreen.style.display =
    gamePaused
        ? "flex"
        : "none";

    if(!gamePaused){

        requestAnimationFrame(
            gameLoop
        );
    }
}

/* =========================
   SCORE
========================= */

function startScore(){

    clearInterval(
        scoreTimer
    );

    scoreTimer =
    setInterval(()=>{

        if(gamePaused) return;

        if(gameOver) return;

        score++;

        scoreElement.textContent =
        score;

        if(score > record){

            record = score;

            recordElement.textContent =
            record;
        }

        if(
            score % 100 === 0
        ){

            gameSpeed += 0.5;
        }

    },100);
}

/* =========================
   GRAVIDADE
========================= */

function updateJump(){

    if(!isJumping) return;

    velocityY += gravity;

    scoobyY += velocityY;

    if(scoobyY >= 0){

        scoobyY = 0;

        velocityY = 0;

        isJumping = false;
    }

    scoobyContainer.style.bottom =
    `${140 - scoobyY}px`;
}

/* =========================
   FPS
========================= */

function updateFPS(){

    frameCount++;

    const now =
    performance.now();

    if(
        now - lastFpsUpdate >=
        1000
    ){

        fps = frameCount;

        fpsElement.textContent =
        fps;

        frameCount = 0;

        lastFpsUpdate = now;
    }
}

/* =========================
   LOOP PRINCIPAL
========================= */

function gameLoop(){

    if(!gameRunning) return;

    if(gamePaused) return;

    if(gameOver) return;

    updateJump();

    updateFPS();

    requestAnimationFrame(
        gameLoop
    );
}

/* =========================
   SPAWNERS
========================= */

function startSpawners(){

    /* Parte 3B */

}
/* =====================================================
   SCOOBY-DOO MYSTERY RUNNER
   script.js
   Parte 3B
===================================================== */

/* =========================
   TEMPLATES
========================= */

const obstacleTemplate =
document.getElementById(
"obstacleTemplate"
);

const clueTemplate =
document.getElementById(
"clueTemplate"
);

const collectTemplate =
document.getElementById(
"collectTemplate"
);

/* =========================
   IMAGENS DOS OBSTÁCULOS
========================= */

const obstacleImages = [

    "Imagens/Lápide",

    "Imagens/Barril.png",

    "Imagens/Caixa.png",

    "Imagens/Fantasma2.jpg"

];

/* =========================
   SPAWNERS
========================= */

function startSpawners(){

    clearInterval(
        obstacleTimer
    );

    clearInterval(
        clueTimer
    );

    /* Obstáculos */

    obstacleTimer =
    setInterval(()=>{

        if(gamePaused) return;

        if(gameOver) return;

        createObstacle();

    },1800);

    /* Pistas */

    clueTimer =
    setInterval(()=>{

        if(gamePaused) return;

        if(gameOver) return;

        createClue();

    },1400);

}

/* =========================
   OBSTÁCULO
========================= */

function createObstacle(){

    const obstacle =
    obstacleTemplate.content
    .firstElementChild
    .cloneNode(true);

    const image =
    obstacle.querySelector("img");

    image.src =
    obstacleImages[
        Math.floor(
            Math.random() *
            obstacleImages.length
        )
    ];

    obstacle.style.left =
    `${window.innerWidth +100}px`;

    obstaclesContainer.appendChild(
        obstacle
    );

    moveObstacle(
        obstacle
    );
}

/* =========================
   MOVIMENTO OBSTÁCULO
========================= */

function moveObstacle(
    obstacle
){

    let position =
    window.innerWidth + 100;

    const move =
    setInterval(()=>{

        if(gamePaused) return;

        if(gameOver){

            clearInterval(move);
            return;
        }

        position -= gameSpeed;

        obstacle.style.left =
        `${position}px`;

        checkObstacleCollision(
            obstacle
        );

        if(position < -150){

            clearInterval(move);

            obstacle.remove();
        }

    },20);
}

/* =========================
   CRIAR PISTA
========================= */

function createClue(){

    const clue =
    clueTemplate.content
    .firstElementChild
    .cloneNode(true);

    const height =

    Math.floor(
        Math.random() * 120
    ) + 170;

    clue.style.bottom =
    `${height}px`;

    clue.style.left =
    `${window.innerWidth + 100}px`;

    cluesContainer.appendChild(
        clue
    );

    moveClue(
        clue
    );
}

/* =========================
   MOVIMENTO PISTA
========================= */

function moveClue(
    clue
){

    let position =
    window.innerWidth + 100;

    const move =
    setInterval(()=>{

        if(gamePaused) return;

        if(gameOver){

            clearInterval(move);
            return;
        }

        position -= gameSpeed;

        clue.style.left =
        `${position}px`;

        checkClueCollision(
            clue
        );

        if(position < -100){

            clearInterval(move);

            clue.remove();
        }

    },20);
}

/* =========================
   COLISÃO OBSTÁCULO
========================= */

function checkObstacleCollision(
    obstacle
){

    const scoobyRect =
    scoobyContainer
    .getBoundingClientRect();

    const obstacleRect =
    obstacle
    .getBoundingClientRect();

    const hit =

    scoobyRect.left <
    obstacleRect.right &&

    scoobyRect.right >
    obstacleRect.left &&

    scoobyRect.top <
    obstacleRect.bottom &&

    scoobyRect.bottom >
    obstacleRect.top;

    if(hit){

        triggerGameOver();
    }
}

/* =========================
   COLISÃO PISTA
========================= */

function checkClueCollision(
    clue
){

    const scoobyRect =
    scoobyContainer
    .getBoundingClientRect();

    const clueRect =
    clue
    .getBoundingClientRect();

    const collected =

    scoobyRect.left <
    clueRect.right &&

    scoobyRect.right >
    clueRect.left &&

    scoobyRect.top <
    clueRect.bottom &&

    scoobyRect.bottom >
    clueRect.top;

    if(collected){

        collectClue(
            clue
        );
    }
}

/* ===  ======================
   COLETAR PISTA
========================= */

function collectClue(
    clue
){

    if(!clue) return;

    clues++;

    cluesElement.textContent =
    clues;

    cluesElement.classList.add(
        "score-pop"
    );

    setTimeout(()=>{

        cluesElement.classList.remove(
            "score-pop"
        );

    },300);

    createCollectEffect(
        clue
    );

    createParticles(
        clue
    );

    playSound(
        clueSound
    );

    clue.remove();
}

/* =========================
   TEXTO +1
========================= */

function createCollectEffect(
    clue
){

    const effect =
    collectTemplate.content
    .firstElementChild
    .cloneNode(true);

    const rect =
    clue.getBoundingClientRect();

    effect.style.left =
    `${rect.left}px`;

    effect.style.top =
    `${rect.top}px`;

    collectEffects.appendChild(
        effect
    );

    setTimeout(()=>{

        effect.remove();

    },800);
}

/* =========================
   PARTÍCULAS
========================= */

function createParticles(
    clue
){

    const rect =
    clue.getBoundingClientRect();

    const particlesLayer =
    document.getElementById(
        "particles"
    );

    for(
        let i=0;
        i<8;
        i++
    ){

        const spark =
        document.createElement(
            "span"
        );

        spark.className =
        "spark";

        spark.style.left =
        `${rect.left + 20}px`;

        spark.style.top =
        `${rect.top + 20}px`;

        spark.style.transform =
        `translate(
            ${Math.random()*50-25}px,
            ${Math.random()*50-25}px
        )`;

        particlesLayer.appendChild(
            spark
        );

        setTimeout(()=>{

            spark.remove();

        },1000);
    }
}

/* =========================
   DIFICULDADE
========================= */

setInterval(()=>{

    if(!gameRunning) return;

    if(gamePaused) return;

    if(gameOver) return;

    if(gameSpeed < 18){

        gameSpeed += 0.05;
    }

},3000);

/* =========================
   SCORE VISUAL
========================= */

setInterval(()=>{

    if(!gameRunning) return;

    if(gamePaused) return;

    if(gameOver) return;

    scoreElement.classList.add(
        "score-pop"
    );

    setTimeout(()=>{

        scoreElement.classList.remove(
            "score-pop"
        );

    },250);

},1500);

/* =========================
   ESTRELAS
========================= */

function createStars(){

    const layer =
    document.getElementById(
        "starsLayer"
    );

    for(
        let i=0;
        i<40;
        i++
    ){

        const star =
        document.createElement(
            "span"
        );

        star.className =
        "star";

        star.style.left =
        `${Math.random()*100}%`;

        star.style.top =
        `${Math.random()*50}%`;

        star.style.opacity =
        Math.random();

        layer.appendChild(
            star
        );
    }
}

createStars();

/* =========================
   PARTE 3C CONTINUA
========================= */
/* =====================================================
   SCOOBY-DOO MYSTERY RUNNER
   script.js
   Parte 3C
===================================================== */

/* =========================
   GAME OVER
========================= */

function triggerGameOver(){

    if(gameOver) return;

    gameOver = true;

    gameRunning = false;

    clearInterval(
        scoreTimer
    );

    clearInterval(
        obstacleTimer
    );

    clearInterval(
        clueTimer
    );

    playSound(
        gameOverSound
    );

    if(backgroundMusic){

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;
    }

    scooby.classList.remove(
        "running"
    );

    scooby.classList.add(
        "dead"
    );

    document.body.classList.add(
        "flash-red"
    );

    setTimeout(()=>{

        document.body.classList.remove(
            "flash-red"
        );

    },500);

    saveRecord();

    showGameOverScreen();
}

/* =========================
   RECORDE
========================= */

function saveRecord(){

    if(clues > record){

        record = clues;

        localStorage.setItem(
            "scoobyRecord",
            record
        );
    }

    recordElement.textContent =
    record;
}

/* =========================
   TELA GAME OVER
========================= */

function showGameOverScreen(){

    finalScore.textContent =
    score;

    finalClues.textContent =
    clues;

    finalRecord.textContent =
    record;

    gameOverScreen.classList.add(
        "active"
    );
}

/* =========================
   REINICIAR
========================= */

restartBtn.addEventListener(
    "click",
    restartGame
);

function restartGame(){

    removeAllObstacles();

    removeAllClues();

    removeAllEffects();

    scooby.classList.remove(
        "dead"
    );

    scooby.classList.remove(
        "jumping"
    );

    scooby.classList.add(
        "running"
    );

    gameOverScreen.classList.remove(
        "active"
    );

    resetVariables();

    gameRunning = true;

    startScore();

    startSpawners();

    startMusic();

    requestAnimationFrame(
        gameLoop
    );
}

/* =========================
   LIMPAR OBSTÁCULOS
========================= */

function removeAllObstacles(){

    document
    .querySelectorAll(
        ".obstacle"
    )
    .forEach(
        obstacle =>
        obstacle.remove()
    );
}

/* =========================
   LIMPAR PISTAS
========================= */

function removeAllClues(){

    document
    .querySelectorAll(
        ".clue"
    )
    .forEach(
        clue =>
        clue.remove()
    );
}

/* =========================
   LIMPAR EFEITOS
========================= */

function removeAllEffects(){

    collectEffects.innerHTML =
    "";

    document
    .querySelectorAll(
        ".spark"
    )
    .forEach(
        spark =>
        spark.remove()
    );
}

/* =========================
   PAUSA AUTOMÁTICA
========================= */

document.addEventListener(
    "visibilitychange",
    ()=>{

        if(
            document.hidden &&
            gameRunning &&
            !gameOver
        ){

            gamePaused = true;

            pauseScreen.style.display =
            "flex";
        }
    }
);

/* =========================
   PREVENIR SCROLL MOBILE
========================= */

document.addEventListener(
    "touchmove",
    (event)=>{

        if(gameRunning){

            event.preventDefault();
        }

    },
    {
        passive:false
    }
);

/* =========================
   RECORDE PULSANDO
========================= */

setInterval(()=>{

    if(
        clues >= record &&
        clues > 0
    ){

        recordElement.classList.add(
            "record-beat"
        );
    }

},1000);

/* =========================
   LIMPEZA AUTOMÁTICA
========================= */

setInterval(()=>{

    const obstacles =
    document.querySelectorAll(
        ".obstacle"
    );

    if(
        obstacles.length > 30
    ){

        obstacles[0].remove();
    }

    const cluesList =
    document.querySelectorAll(
        ".clue"
    );

    if(
        cluesList.length > 30
    ){

        cluesList[0].remove();
    }

},5000);

/* =========================
   TECLA R
========================= */

document.addEventListener(
    "keydown",
    (event)=>{

        if(
            event.key === "r" ||
            event.key === "R"
        ){

            if(gameOver){

                restartGame();
            }
        }

    }
);

/* =========================
   DEBUG
========================= */

function debugInfo(){

    console.clear();

    console.log(
        "Pontos:",
        score
    );

    console.log(
        "Pistas:",
        clues
    );

    console.log(
        "Recorde:",
        record
    );

    console.log(
        "Velocidade:",
        gameSpeed
    );
}

/*
Descomente para testar:

setInterval(
    debugInfo,
    3000
);
*/

/* =========================
   ERROS
========================= */

window.addEventListener(
    "error",
    (error)=>{

        console.log(
            "Erro detectado:",
            error
        );

    }
);

/* =========================
   VALORES INICIAIS
========================= */

recordElement.textContent =
record;

scoreElement.textContent =
0;

cluesElement.textContent =
0;

fpsElement.textContent =
0;

/* =========================
   MENSAGEM
========================= */

console.log(`

🔍 SCOOBY-DOO MYSTERY RUNNER

Controles:

ESPAÇO = Pular
↑ = Pular
P = Pausar
R = Reiniciar

A turma fica parada.
Os obstáculos se movem da direita para a esquerda.

Boa diversão!

`);

/* =========================
   FIM DO SCRIPT
========================= */