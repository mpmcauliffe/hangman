

let dataController = (() => {

    let wordObject = {
        "pompeii":{
            question: "In 79 AD, Mount Vesuvius erupted destroying which nearby coastal town ?",
                hint: ["The name of this town rhymes with Bombay", 
                        "This town's name has 4 vowels, two of which are the same.",
                        "The name of this town sound similar to a Roman statesman who rivaled Julius Caesar."]
        },
        "hippocrates":{
            question: "This Greek physician and philosopher is especially known for known for his oath about medical practice.",
                hint: ["This person's name can be seen as an amalgamation of Archimedes and hippopotamus.",
                        "This person is known as the Father of Western Medicine.",
                        "He is known for the quote, 'Let thy food be thy medicine and thy medicin be thy food."]
        },
        "persephone":{
            question: "This mythological Greek Queen of the Underworld is often associated with pomegranates.",
                hint: ["The name of a very common voice transmitting device is in her name.",
                        "The last part of her name sorta spelled like 'pony'.",
                        "Her name has 4 destinct vowel sounds."]
        },
        word4: {
                name: "hannibal",
            question: "During the 2nd Punic War, this Carthaginian general crossed Iberia and the Alps and set his army on Rome.",
                hint: ["The general shares his name with a character from a 1991 thriller that won many awards.",
                        "His name is similar to cannonball.",
                        "This general's name has 3 distinct vowels in it."]
        }
    }

    let parseObject = {
        wordObject.[word${a number goes here}]
        wordArray = ["pompeii", "hippocrates", "persephone", "hannibal"],
        indexRandomName = Math.floor(Math.random() * 4),
        indexRandomHint = Math.floor(Math.random() * 3),
        nameRandom = wordArray[indexRandomName],
        hintRandom = seedData1[nameRandom].hint[indexRandomHint]
    }
    

   

       
        
    //return wordObject;
});



let UIcontroller = (() => {
    for (let i = 0; i < nameRandom.length; i++) {
        nameRandom[i] = "_"
    }

    document.getElementById(`query`).textContent = wordObject[nameRandom].question;
    document.getElementById(`hint`).textContent = hintRandom; 

});

let mainController = (() => {
    

})(dataController, UIcontroller);


/* ACCESS
    testData["pompeii"].question
    testData["pompeii"].hint[1] */