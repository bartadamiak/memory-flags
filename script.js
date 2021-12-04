const gameBoard = document.querySelector('.game-board');
const card = document.querySelectorAll('card');


/// tworzenie planszy z grą \\\

function createBoard(level) {

    const mainTeamsTab = ['albania', 'afghanistan', 'algeria', 'angola', 'austria', 'bangladesh', 'belgium', 'benin', 'bostwana', 'brazil', 'bulgaria', 'burkina', 'cameroon', 'canada', 'chile', 'china', 'colombia', 'croatia', 'cuba', 'cyprus', 'czech', 'denmark', 'ecuador', 'estonia', 'england', 'egypt', 'finland', 'france', 'greece', 'germany', 'hungary', 'honduras', 'india', 'ireland', 'italy', 'kenya', 'kazakhstan', 'japan', 'jamaica', 'lebanon', 'liberia', 'liberia', 'lithuania', 'mexico', 'marocco', 'norway', 'nigeria', 'poland', 'rwanda', 'russia', 'romania', 'portugal', 'slovakia', 'slovenia', 'somalia', 'south-korea', 'spain', 'thailand', 'sweden', 'switzerland', 'trinidad', 'tunisia', 'turkey', 'united-states', 'ukraine', 'uruguay', 'vietnam', 'wales', 'zambia', 'zimbabwe']
   
    mainTeamsTab.sort((a, b) => 0.5 - Math.random());

    function fillTab(array, lenght) {
        let finalTab1 = [];
        let finalTab2 = [];

        for (let i = 0; i < lenght; i++) {
            finalTab1.push(array[i]);
            finalTab2.push(array[i]);
        }

        let finalTab = finalTab1.concat(finalTab2);

        return finalTab
    }


    let teamsArray = fillTab(mainTeamsTab, level)


    const shuffledArray = teamsArray.sort((a, b) => 0.5 - Math.random());
    const arrayLenght = teamsArray.length;



    for (let i = 0; i < arrayLenght; i++) {
        let newCard = document.createElement('div');
        gameBoard.appendChild(newCard);
        newCard.classList.add('card');

        let newBack = document.createElement('div');
        newCard.appendChild(newBack);
        newBack.classList.add('card-back', 'hide');

        let backContent = document.createElement('img');
        newBack.appendChild(backContent);
        backContent.src = 'images/earth.png';

        backContent.classList.add('back-content')

        let newFront = document.createElement('div');
        newCard.appendChild(newFront);
        newFront.classList.add('card-front')

        let frontContent = document.createElement('img');
        newFront.appendChild(frontContent);

        let randomTeam = shuffledArray[i];


        frontContent.src = "images/" + randomTeam + ".png"


        frontContent.classList.add('front-content');

        /// zakrywanie kart \\\

        setTimeout(() => {
            newFront.classList.add('hide');
            newBack.classList.remove('hide');
        }, 3000);

    }
}

createBoard(8)

const cardBack = document.querySelectorAll('.card-back');

/// sprawdzanie poprawności \\\

function turnBack() {

    setTimeout(() => {

        if (document.querySelectorAll('.opened-front').length == 2) {

            document.querySelectorAll('.opened-front').forEach(element => {
                element.classList.toggle('hide')
            });

            document.querySelectorAll('.opened-back').forEach(element => {
                element.classList.toggle('hide')
            });

            document.querySelectorAll('.opened-front').forEach(element => {
                element.classList.remove('opened-front')
            });

            document.querySelectorAll('.opened-back').forEach(element => {
                element.classList.remove('opened-back')
            });

        }


    }, 1000);
}

function goodJob() {

    setTimeout(() => {
        document.querySelectorAll('.opened-front').forEach(element => {
            element.parentElement.classList.add('opa');
        });

        document.querySelectorAll('.opened-front').forEach(element => {
            element.classList.remove('opened-front')
        });

        document.querySelectorAll('.opened-back').forEach(element => {
            element.classList.remove('opened-back')
        });

        if (document.querySelectorAll('.opa').length == 16) {
            setTimeout(() => {
                gameBoard.innerHTML = "";
                createBoard(8)
            }, 3000);
        }

    }, 300);


}

function ifOpen() {
    const currentOpened = document.querySelectorAll('.opened-front');


    if (currentOpened.length == 2) {
        if (currentOpened[0].querySelector('img').src == currentOpened[1].querySelector('img').src) {
            goodJob()
        }
        else {
            turnBack()
        }
    }
}



/// odkrywanie kart \\\

cardBack.forEach(element => {



    element.addEventListener('click', function (e) {

        let opened = document.querySelectorAll('.opened-front');


        if (opened.length < 2) {
            this.classList.toggle('hide');
            this.classList.toggle('opened-back');
            this.nextElementSibling.classList.toggle('hide');
            this.nextElementSibling.classList.toggle('opened-front');
            ifOpen()



        }
        else {
            return false
        };

    })



});


