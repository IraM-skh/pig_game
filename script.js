"use strict";

const player1 = {
    score: 0,
    currentScore: 0,
    active: true,
};

const player2 = {
    score: 0,
    currentScore: 0,
    active: !player1.active,
};

document.querySelector(".dice").classList.add("hidden");

function roll() {
    return Math.trunc(Math.random() * 6) + 1;
}

function changePlayar(player1Active) {
    //Активен 1 игрок
    if (player1Active) {
        player1.active = false;
        document.querySelector(".player--0").classList.remove("player--active");
        document.querySelector(".player--1").classList.add("player--active");
    }
    //Активен 2 игрок
    else { 
        player1.active = true;
        document.querySelector(".player--1").classList.remove("player--active");
        document.querySelector(".player--0").classList.add("player--active");
    }
}

function changeScore(player1Active) {
    if (player1Active) {
        document.querySelector("#score--0").textContent = player1.score;
    } else {
        document.querySelector("#score--1").textContent = player2.score;
    }
}

function changeCurrentScore(player1Active) {
    if (player1Active) {
        document.querySelector("#current--0").textContent =
            player1.currentScore;
    } else {
        document.querySelector("#current--1").textContent =
            player2.currentScore;
    }
}

function startNewPlay() {
    player1.score = 0;
    player1.currentScore = 0;
    player1.active = false;
    player2.score = 0;
    player2.currentScore = 0;
    changeScore(player1.active);
    changeCurrentScore(player1.active);
    changePlayar(player1.active);
    changeScore(player1.active);
    changeCurrentScore(player1.active);
}

changeScore(player1.active);
changeScore(player2.active);

//Бросок кубика по клавише
document.querySelector(".btn--roll").addEventListener("click", function () {
    //Кидаем куб и присваиваем текущие очки
    let rollNow = roll();

    document.querySelector(".dice").classList.remove("hidden");
    if (rollNow == 1) {
        //выпала 1
        if (player1.active) {
            player1.currentScore = 0;
            changeCurrentScore(player1.active);
        } else {
            player2.currentScore = 0;
            changeCurrentScore(player2.active);
        }

        changePlayar(player1.active);
    }

    //выпала не 1
    else {
        if (player1.active) {
            player1.currentScore += rollNow;
            changeCurrentScore(player1.active);
        } else {
            player2.currentScore += rollNow;
            changeCurrentScore(player1.active);
        }
    }

    //меняем картинку куба
    document.querySelector(".dice").src = `pictures/dice${rollNow}.png`;
});

//сохранение счета по клавише
document.querySelector(".btn--hold").addEventListener("click", function () {
    //прибавление счета
    if (player1.active) {
        player1.score += player1.currentScore;
        player1.currentScore = 0;
        changeScore(player1.active);
        changeCurrentScore(player1.active);
    } else {
        player2.score += player2.currentScore;
        player2.currentScore = 0;
        changeScore(player1.active);
        changeCurrentScore(player1.active);
    }
    document.querySelector(".dice").classList.add("hidden");

    // смена игрока
    changePlayar(player1.active);

    //выигрыш modal-window
    if (player1.score >= 100 || player2.score >= 100) {
        let player;
        document.querySelector(".modal-window").classList.remove("hidden");
        player1.score >= 100 ? (player = "1") : (player = "2");
        document.querySelector(
            ".drk"
        ).textContent = `Игрок ${player} выиграл! Ты молодец!`;
    }
});

//новая игра

document.querySelector(".btn--new").addEventListener("click", startNewPlay);

//Закрытие модального окна

document
    .querySelector(".close-modal-window")
    .addEventListener("click", function () {
        startNewPlay();
        document.querySelector(".modal-window").classList.add("hidden");
    });
