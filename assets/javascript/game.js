
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


/* ===================================================================================
=======================================================================================
=======================================================================================
====================================================================================== */




   
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
            }, 2500);
        },
        printHint: function(newHint) {
            console.log(newHint) 
            document.getElementById(`hint`).innerHTML = newHint;
        },
        outputMessage: function(option) {
            document.getElementById(`message`).classList.remove(`log`);    
            document.getElementById(`message`).innerHTML = option;
            
            setTimeout(() => {
                document.getElementById(`message`).classList.add(`log`);
            }, 2500);
        }
    }
})();





/* ===================================================================================
=======================================================================================
=======================================================================================
====================================================================================== */


let mainController = ((dataCon, UIcon) => {
    
    let setObject = () => {
        gameObject = dataCon.parseObject();
    }

    let elementValues = {
        //scroll
        scroll: ["","",""],
        //score list
        scores: [null, null],
        //lower center
        center: ["","",""],
        //hint
        hint:  ""
    } 
   
    let setupEventListeners = () => {

        document.addEventListener(`keyup`, (event) => {
            let x          = event.which || event.key,
                inputValue = String.fromCharCode(x);
            regulator(inputValue);
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
        console.log(inputValue);
        let constructWord = elementValues.scroll[0],
            letterSet     = elementValues.scroll[1],
            lettersUsed   = elementValues.scroll[2],
            message       = "";

        let testLetter1 = letterSet.includes(inputValue),
            testLetter2 = lettersUsed.includes(inputValue),
            inputCheck  = 0;

        let exp = /[^A-Z]/;


        if (inputValue !== "_" && inputValue !== " ") {
            if(!testLetter1 && !testLetter2) {
                if(constructWord.includes(inputValue)){
                    for(let i = 0; i < constructWord.length; i++){
                        if(inputValue === constructWord[i]) {
                            function strBuild(letterSet, i, inputValue) {
                                return letterSet.substring(0, i) + inputValue + letterSet.substring(i + 1);
                            }
                            letterSet = strBuild(letterSet, i, inputValue);
                            inputCheck++;
                        }
                    }
                    if (inputCheck > 0) {
                        message = "Correct!"
                    }
                }
            }        
            if(inputCheck === 0) {
                lettersUsed = lettersUsed.replace("_", inputValue);
                message = "Incorrect";
                setScores(1);
            } else if (testLetter1 || testLetter2) {
                message = "You've used that value already";
                setScores(1);
            } else if (exp.test(inputValue)) {
                message = "Use letters!";
                setScores(1);
            }
        }
        if(letterSet === constructWord) {
            message = "You guessed it!";
            setScores(2);
        } else if (lettersUsed.indexOf("_") === -1) {
            message = "Out of tries."
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
        }, 1000);
    }

    let setScores = (scoreCode) => {

        let word = elementValues.scores[0],
            remaining = elementValues.scores[1];


        setTimeout(() => {
            switch (scoreCode) {
                case 0:
                    elementValues.scores = [0, 9];
                    UIcon.displayScores(elementValues.scores);
                    break;

                case 1:
                    remaining--;
                    elementValues.scores = [word, remaining];
                    UIcon.displayScores(elementValues.scores);
                    break;

                case 2:
                    word++;
                    remaining = 9;
                    elementValues.scores = [word, remaining];
                    UIcon.displayScores(elementValues.scores);
                    setTimeout(() => {
                        mainController.initialize();
                    }, 1000); 
                    break;

                case 3:
                    remaining = 9;
                    elementValues.scores = [word, remaining];
                    UIcon.displayScores(elementValues.scores); 
                    setTimeout(() => {
                        mainController.initialize();
                    }, 1000);
                    break;  
            }
        }, 2000);
    }

    let regulator = debounce(function(inputValue) {
        evaluateInput(inputValue);
    }, 250)

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    

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


window.addEventListener(`keyup`, () => {
    let screenDOM = document.querySelector(`.starter-cover`);
    screenDOM.style.animation = `1.5s fadeout .5s forwards`;
    setTimeout(() => {    
        screenDOM.style.display = `none`;
        mainController.initialize(0);
    }, 1000);
}, { once: true });










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

// function strBuild(n, str) {
//     if (n < 1) { return str; }

//     if (n % 2 !== 0) {
//         str += "_";
//     } else {
//         str += " ";
//     }

//     return strBuild((n-1), str);
// }