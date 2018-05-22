
/* immediately invoked function expressions */


/* INTERNAL CALL INSTANT & MAINCONTROLLER
    wordObject created that contains all data with the property word<number>
        nested in the word property are 3 properties of name (the answer to word guess),
        question (the question provieded to guess the name), and hint (an array of 3 hints
        randomly provided in easy mode).
    parseObject is a function of DATACONTROLLER that randomizes the word<number> property
        and the hint array. This function also collects name data and the answer data.
    RETURNS an object to MAINCONTROLLER called randomObject
            randomObject consist of 1 first level property of wordObject and its sub-
            properties with it */
let dataController = (() => {

    let wordObject = {
        "word1": {
            name: "pompeii",
            question: "In 79 AD, Mount Vesuvius erupted destroying which nearby coastal town ?",
            hint: ["The name of this town rhymes with Bombay",
                "This town's name has 4 vowels, two of which are the same.",
                "The name of this town sound similar to a Roman statesman who rivaled Julius Caesar."]
        },
        "word2": {
            name: "hippocrates",
            question: "This Greek physician and philosopher is especially known for known for his oath about medical practice.",
            hint: ["This person's name can be seen as an amalgamation of Archimedes and hippopotamus.",
                "This person is known as the Father of Western Medicine.",
                "He is known for the quote, 'Let thy food be thy medicine and thy medicin be thy food."]
        },
        "word3": {
            name: "persephone",
            question: "This mythological Greek Queen of the Underworld is often associated with pomegranates.",
            hint: ["The name of a very common voice transmitting device is in her name.",
                "The last part of her name sorta spelled like 'pony'.",
                "Her name has 4 destinct vowel sounds."]
        },
        "word4": {
            name: "hannibal",
            question: "During the 2nd Punic War, this Carthaginian general crossed Iberia and the Alps and set his army on Rome.",
            hint: ["The general shares his name with a character from a 1991 thriller that won many awards.",
                "His name is similar to cannonball.",
                "This general's name has 3 distinct vowels in it."]
        }
    }

    let parseObject = function(){
        let indexRandomProperty = Math.floor(Math.random() * 4) + 1,
            propertyName    = `word${indexRandomProperty}`;
           
        let randomObject = {
            name: wordObject[propertyName].name,
            question: wordObject[propertyName].question,
            hint: wordObject[propertyName].hint
        }
        return randomObject;   
    }
    return parseObject();
    
})();

   
//let wordArray = ["pompeii", "hippocrates", "persephone", "hannibal"],




let UIcontroller = (() => {

    
    return {
        displayInitialScores: function(initScores) {
            let scoreList = document.querySelector(`.stats`).getElementsByTagName('li'),
                        i = 0;
            for (let key in initScores) {
                scoreList[i].innerHTML = initScores[key];
                i++;
            }
            
        },
        postQuestion: function(question) {
            document.querySelector(`.question`).innerHTML = question;
        },
        startLetterPicker: function(holder) {
            if(holder === 0){
                document.querySelector(`.letter-pick`).innerHTML = "_";
            } else {
                document.querySelector(`.letter-pick`).innerHTMl = holder;
            }
        },
        printHint: function(newHint) { 
            document.getElementById(`hint`).innerHTML = newHint;
        },
        outputMessage: function(option) {
            let messageOut = document.querySelector(`message`);
            if (option === 0) {
                messageOut.classList.remove(`.log`);
                messageOut = `please enter a letter`;
            }
        },
        updateLoadString: function (usedCharElement, fillOption) {

        }
    }
    // for (let i = 0; i < nameRandom.length; i++) {
    //     nameRandom[i] = "_"
    // }

    // document.getElementById(`query`).textContent = wordObject[nameRandom].question;
    // document.getElementById(`hint`).textContent = hintRandom; 

})();


let mainController = ((dataCon, UIcon) => {
    
    let elementValues = {
        //scroll
        item1: {
                keyPair: ["","",""]
            },
        //score list
        itme2: {
                keyPair: []
        },
        //lower center
        item3: {
                keyPair: ["","",""]
        },
        //hint
        item4: {
                keyPair: ""
        }
    }

    let setObject = () => {
        let gameObject = dataCon;
        return gameObject;
    }
    let setupEventListeners = () => {

        document.addEventListener(`keyup`, (event) => {
            let x          = event.which || event.key,
                inputValue = String.fromCharCode(x);
            
            evaluateInput(inputValue);
        });


        document.querySelector(`.reset-hint`).addEventListener(`click`, () => {
            loadHint();
        });
    }

    let createScrollString = () => {
        /* iterates through name propert adding spaces
            between every odd underscore to initially print
            to the DOM */

        let gameObject      = setOject();
            parseName       = gameObject.name,
            initialScroll   = "",
            loadString      = "",
            spaceLength     = (parseName.length * 2) - 1,
            thread          = 0;

        for(let i = 0; i < spaceLength; i++) {
            if(i > 0 && i % 2 !== 0) {
                initialScroll += " ";
                loadString    += " ";
            } else {
                initialScroll += parseName.charAt(thread);
                loadString    += "_"
                thread++; 
            }
        }
        let lettersUsed = "_ _ _ _ _ _ _ _ _"

        elementValues.item1.keyPair = [initialScroll, loadString, lettersUsed];
    }

    let setQuestion = () => {
        let gameObject = setObject();
        elementValues.item3.keyPair[1] = gameObject.question;
    }
    
    let loadHint = () => {
        let gameObject      = setObject();
            indexRandomHint = Math.floor(Math.random() * 3),
            hintRandom      = gameObject.hint[indexRandomHint];
        elementValues.item4.keyPair = hintRandom;
    }
    let evaluateInput = (inputValue) => {
        inputValue = inputValue.toUpperCase();
        let constructWord = elementValues.item1.keyPair[0],
            letterSet     = elementValues.item1.keyPair[1],
            lettersUsed   = elementValues.item1.keyPair[2],
            message       = "",
            scoreCode     = 5;

        let testLetter1 = letterSet.includes(inputValue),
            testLetter2 = letterSet.includes(inputValue),
            inputCheck  = 0;

        if(!testLetter1 && !testLetter2) {
            for(let i = 0; i < constructWord.length; i++){
                if(inputValue === constructWord.indexOf(i)) {
                    letterSet.indexOf(i) = inputValue;
                    inputCheck++;
                }
            }
            if(inputCheck > 0){
                 message = "Correct!"
                 scoreCode = 1;
            }
        }
        if(inputCheck === 0 || testLetter1 || testLetter2) {
            lettersUsed = lettersUsed.replace("_", inputValue);
            message = "Incorrect";
        }
        
        elementValues.item1.keyPair = [constructWord, letterSet, lettersUsed];
    }

    let setScores = (scoreCode) => {
        if (elementValues.itme2.keyPair[0] === null) {
            elementValues.itme2.keyPair = [0,0,9,0];
        }
    }


    // let isEasy = true;
    
    // document.querySelector(`.hard`).addEventListener(`click`, () => {
    //     isEasy = false;
    // });

    // dataController.parseObject;
    
        

    // document.querySelector(`.letter-pick`).addEventListener(`keyup`, () => {
    //     let x = event.which || event.key,
    //         press = String.fromCharCode(x),
    //         choice = press.toLowerCase();
    //     console.log(choice);
    // });

    return {
        initialize: function () {
            console.log('Word Guess started');
            elementValues.itme2.keyPair = [null,null,null,null];
            loadHint();
            setScores();
            setQuestion();
            //UIcon.startLetterPicker(0);
            setupEventListeners();
        }
    }
})(dataController, UIcontroller);


mainController.initialize();

/* ACCESS
    testData["pompeii"].question
    testData["pompeii"].hint[1] */