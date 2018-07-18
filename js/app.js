var card, cardCount, moves, moveText, moveCount, movesTaken, timeTaken, stars, card_1, ul, cardOpenCount, flag, afterText, playAgain_yes, playAgain_no, afterText_moves, afterText_playAgain, timer, flag_timer, sec, min, hrs, t;

card = document.getElementsByClassName('card');
moves = document.getElementsByClassName('moves');
moveText = document.getElementsByClassName('move');
stars = document.getElementsByClassName('fa-star');
ul = document.getElementsByClassName('fa-repeat');
afterText = document.getElementById('afterText');
afterText_moves = document.getElementById('afterText_moves');
afterText_playAgain = document.getElementById('afterText_playAgain');
movesTaken = document.getElementById('movesTaken');
timeTaken = document.getElementById('timeTaken');
playAgain_yes = document.getElementById('playAgain_yes');
playAgain_no = document.getElementById('playAgain_no');
timer = document.getElementsByClassName('time')[0];

reset();

for (var i = 0; i < 16; i++) {
    card[i].addEventListener('click', function () {
        if (flag_timer) {
            if (sec === 0 && min === 0 && hrs === 0) {
                t = setInterval(add, 1000);
            }
            flag_timer = false;
        }

        if (flag) {
            cardOpen(this);
        }
    });
}

ul[0].addEventListener('click', function () {
    clearInterval(t);
    reset();
    timer.textContent = (hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
});

playAgain_yes.addEventListener('click', function () {
    clearInterval(t);
    reset();
    timer.textContent = (hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
});

playAgain_no.addEventListener('click', function () {
    afterText_moves.style.display = "none";
    afterText_playAgain.style.display = "none";
});

function cardOpen(index) {
    if (!(index.classList.contains('open'))) {
        if (cardOpenCount == 0) {
            card_1 = index;
            card_1.classList.add('open');
            cardOpenCount++;
        } else if (cardOpenCount == 1) {
            moves[0].textContent = ++moveCount;
            cardOpenCount = 0;
            flag = false;
            index.classList.add('open');

            if (card_1.isEqualNode(index)) {
                cardCount -= 2;
                setTimeout(function () {
                    index.classList.add("match");
                    card_1.classList.add("match");
                    flag = true;
                }, 500);
            } else {
                setTimeout(function () {
                    index.classList.remove("open");
                    card_1.classList.remove("open");
                    index.classList.toggle("shake");
                    card_1.classList.toggle("shake");
                    flag = true;
                }, 1000);
                index.classList.toggle("shake");
                card_1.classList.toggle("shake");

            }
            if (cardCount == 0) {
                clearInterval(t);
                setTimeout(function () {
                    afterText.style.display = "";
                    movesTaken.textContent = moveCount;
                    timeTaken.textContent = timer.textContent;
                    if (moveCount >= 16) {
                        stars[4].style.display = "none";
                        stars[5].style.display = "none";
                    } else if (moveCount >= 12) {
                        stars[5].style.display = "none";
                    }
                }, 500);
            }
        }
    }

    if (moveCount >= 16) {
        stars[1].style.display = "none";
    } else if (moveCount >= 12) {
        stars[2].style.display = "none";
    }

}


function reset() {
    init();
    sec = 0;
    min = 0;
    hrs = 0;
    shuffle();
}


function init() {

    flag = true;
    flag_timer = true;
    moveCount = 0;
    moves[0].textContent = 0;
    cardOpenCount = 0;
    cardCount = card.length;
    afterText.style.display = "none";
    for (var i = 0; i < card.length; i++) {
        card[i].classList.remove('open', 'match');
    }
    for (var i = 1; i < 3; i++) {
        stars[i].style.display = "";
    }
}

function shuffle() {
    var ul = document.getElementsByClassName('deck');
    for (var i = ul[0].children.length; i >= 0; i--) {
        ul[0].appendChild(ul[0].children[Math.random() * i | 0]);
    }
}


function add() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
    timer.textContent = (hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
}