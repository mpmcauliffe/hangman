
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
    return {
        parseObject: function(){
            let indexRandomProperty = Math.floor(Math.random() * 4) + 1,
                propertyName    = `word${indexRandomProperty}`;
            
            let randomObject = {
                name: wordObject[propertyName].name,
                question: wordObject[propertyName].question,
                hint: wordObject[propertyName].hint
            }
            return randomObject;   
        }
    }  
})();

   
//let wordArray = ["pompeii", "hippocrates", "persephone", "hannibal"],
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
let UIcontroller = (() => {
    return {
        updateScroll: function(scrollStrings) {
            document.getElementById(`word`).innerHTML = scrollStrings[1];
            document.getElementById(`inputs`).innerHTML = scrollStrings[2];
        },
    
        displayScores: function(scores) {
            document.getElementById(`word-score`).innerHTML =  scores[0];
            document.getElementById(`tries-remaining`).innerHTML = scores[1];
        },
        updateCenter: function(center) {
            document.querySelector(`.letter-pick`).innerHTML = center[0];
            document.querySelector(`.question`).innerHTML = center[1];
            
            setTimeout(() => {
                document.querySelector(`.letter-pick`).innerHTML = "_";
            }, 3500);
        },
        printHint: function(newHint) {
            console.log(newHint) 
            document.getElementById(`hint`).innerHTML = newHint;
        },
        outputMessage: function(option) {
            let messageOut = document.querySelector(`message`);    
            messageOut.classList.remove(`.log`);
            messageOut.innerHTML = option;
            
            setTimeout(() => {
                messageOut.classList.add(`.log`);
            }, 3500);
        }
    }
})();


let mainController = ((dataCon, UIcon) => {
    
    let setObject = () => {
        gameObject = dataCon.parseObject();
    }

    let elementValues = {
        //scroll
        scroll: ["","",""],
        //score list
        scores: [0, 0],
        //lower center
        center: ["","",""],
        //hint
        hint:  ""
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
        
        let parseName       = gameObject.name,
            initialScroll   = "",
            loadString      = "",
            spaceLength     = (parseName.length * 2) - 1,
            thread          = 0;
        console.log(parseName)
        for(let i = 0; i < spaceLength; i++) {
            if(i > 0 && i % 2 !== 0) {
                initialScroll += " ";
                loadString += " ";
            } else {
                initialScroll += parseName.charAt(thread);
                loadString    += "_"
                thread++; 
            }
        }
        initialScroll = initialScroll.toUpperCase();
        let lettersUsed = "_ _ _ _ _ _ _ _ _";

        elementValues.scroll = [initialScroll, loadString, lettersUsed];
    
        UIcon.updateScroll(elementValues.scroll);
    }

    let setCenter = () => {
        elementValues.center[0] = `_`
        elementValues.center[1] = gameObject.question;
        UIcon.updateCenter(elementValues.center);
    }
    let loadHint = () => {
            let indexRandomHint = Math.floor(Math.random() * 3);
                elementValues.hint = gameObject.hint[indexRandomHint];
    
        UIcon.printHint(elementValues.hint);
    }
    let evaluateInput = (inputValue) => {
        let constructWord = elementValues.scroll[0],
            letterSet     = elementValues.scroll[1],
            lettersUsed   = elementValues.scroll[2],
            message       = "";

        let testLetter1 = letterSet.includes(inputValue),
            testLetter2 = lettersUsed.includes(inputValue),
            inputCheck  = 0;

        if (inputValue !== "_") {
            if(!testLetter1 && !testLetter2) {
                for(let i = 0; i < constructWord.length; i++){
                    if(inputValue === constructWord[i]) {
                        letterSet.replace("_", inputValue); 
                        inputCheck++;
                    }
                }
                if (inputCheck > 0) {
                    message = "Correct!"
                }
            }        
            if(inputCheck === 0 || testLetter1 || testLetter2) {
                lettersUsed = lettersUsed.replace("_", inputValue);
                message = "Incorrect";
                setScores(1);
            }
        }
        if(letterSet === constructWord) {
            message = "You guessed it!";
            setScores(2);
        } else if (lettersUsed.indexOf("_") === -1) {
            message = "You missed it."
            setScores(3);
        }

        elementValues.scroll = [constructWord, letterSet, lettersUsed];
        elementValues.center[0] = inputValue;

        UIcon.updateCenter(elementValues.center);
        

        setTimeout(() => {
            UIcon.outputMessage(message);
        }, 1000);
        
        setTimeout(() => {
            UIcon.updateScroll(elementValues.scroll);
        }, 2000);
    }

    let setScores = (scoreCode) => {
        setTimeout(() => {
            switch (scoreCode) {
                case 0:
                    elementValues.scores = [0, 9];
                    break;

                case 1:
                    elementValues.scrores[1]--;
                    break;

                case 2:
                    elementValues.scores[0]++;
                    initialize();
                    break;

                case 3:
                    elementValues.scores[1] = 9;
                    initialize();
                    break;
            }
            UIcon.displayScores(elementValues.scores);
        }, 2000);   
    }

    return {
        initialize: function (resetCode) {
            if (resetCode === 0) {
                setScores(0);
            }
            setObject();
            createScrollString();
            setCenter();
            loadHint();
            setupEventListeners();
           
        }
    }
})(dataController, UIcontroller);

mainController.initialize(0);

/* ACCESS
    testData["pompeii"].question
    testData["pompeii"].hint[1] */
    

/*  FOR DOMs THAT HAVE MUCH LONGER LISTS
    let scoreList = document.querySelector(`.stats`).getElementsByTagName('li'),
    i = 0;
    for (let key in initScores) {
        scoreList[i].innerHTML = initScores[key];
        i++;
    } */