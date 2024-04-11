//the default cased is that the quiz is not timed
let isTimed = false;

//the initial question is 1
let currentQuestion = 1;

//global total number of questions, initially -1 because has not been set
let numQuestions = -1;

//starts the quiz
function startQuiz(isTimed)
{
    let timeMinutesInputElement = document.getElementById('timeLimit');
    let numQuestionsInputElement = document.getElementById('numQuestions');

    let quizStartInfoElement = document.getElementById('quiz-start-info');

    if(numQuestionsInputElement.checkValidity() == false)
    {
        showMessage();
        return;
    }

     if(timeMinutesInputElement.checkValidity() == false && isTimed == true)
    {
        showMessage(topText = "Sorry :(", messageText = 'Please enter a number that is at least 1 and at most 120 for the number of minutes.');
        return;
    }

    quizStartInfoElement.style.display = "none";

    //sets the variable for the total number of questions in english
    numQuestions = parseInt(numQuestionsInputElement.value);

    let worksheetDivElement = document.getElementsByClassName('worksheet-div')[0];

    //questions remaining element
    var questionsRemainingElement = document.createElement("p");
    questionsRemainingElement.style.fontFamily = 'Rubik, sans-serif';
    questionsRemainingElement.style.width = '25vw'
    questionsRemainingElement.id = 'questionsRemainingText';
    questionsRemainingElement.style.fontSize =  '2vw';
    questionsRemainingElement.style.marginLeft = '20vw';
    questionsRemainingElement.style.marginTop = '-35vw';
    questionsRemainingElement.innerHTML = `Questions Remaining:${numQuestions - 1}`;
    worksheetDivElement.appendChild(questionsRemainingElement);

     //if the quiz is not timed
    if(isTimed)
    {
        var timeLimitElement = document.getElementById('timeLimit');

        var numTime = parseInt(timeLimitElement.value);

        startTimer(numTime);

        //timer text element
        var timerTextElement = document.createElement("p");
        timerTextElement.id = 'timerText';
        timerTextElement.style.fontFamily = 'Rubik, sans-serif';
        timerTextElement.style.width = '25vw'
        timerTextElement.style.fontSize =  '2vw';
        timerTextElement.style.marginLeft = '20vw';
        timerTextElement.style.marginTop = '1vw';
        timerTextElement.innerHTML = `Time Remaining: ${numTime}:00`;
        worksheetDivElement.appendChild(timerTextElement);

    }

    //note input element
    var noteInputElement = document.createElement("input");
    noteInputElement.style.width = '15vw'
    noteInputElement.style.height = '2vw'
    noteInputElement.id = 'userNoteInput';
    noteInputElement.style.fontFamily = 'Rubik, sans-serif';
    noteInputElement.style.fontSize =  '1vw';
    noteInputElement.style.marginLeft = '10vw';
    noteInputElement.style.marginTop = '5vw';
    noteInputElement.style.border = 'solid';
    noteInputElement.style.borderRadius = '0.33vw';
    noteInputElement.style.paddingLeft = '0.33vw';
    noteInputElement.style.borderColor = '#E5E5E5';
    noteInputElement.placeholder = "Enter Note Name Here";
    worksheetDivElement.appendChild(noteInputElement);

    //check button element
    var checkButtonElement = document.createElement("button");
    checkButtonElement.innerText = "Check";
    checkButtonElement.style.width = '15vw'
    checkButtonElement.style.height = '2vw'
    checkButtonElement.style.marginLeft = '10vw';
    checkButtonElement.style.fontFamily = 'Rubik, sans-serif';
    checkButtonElement.style.border = 'solid';
    checkButtonElement.style.fontSize =  '1vw';
    checkButtonElement.style.borderRadius = '0.33vw';
    checkButtonElement.style.borderColor = '#E5E5E5';
    checkButtonElement.style.marginTop = '0.75vw';
    checkButtonElement.id = 'userCheckButtonElement';

    checkButtonElement.addEventListener("click", function () {
        checkUserAnswer();
    });

    worksheetDivElement.appendChild(checkButtonElement);


    //gets the number of questions from the user input
    numQuestions = parseInt(numQuestionsInputElement.value);

    //prompts new question to the user
    askNewQuestion();
}

//hides currently showing pop up message
function hideMessage()
{
    //pop up message element container
    let popUpMessageElement = document.getElementById('popUpMessageContainer');

    //make pop up hidden
    popUpMessageElement.style.visibility = 'hidden';
}

//starts a timer given a time
function startTimer(minutes = 10)
{
        //timer
        // Set the countdown duration in minutes
        const countdownMinutes = minutes;

        // Calculate the target date and time
        const targetDate = new Date();
        targetDate.setMinutes(targetDate.getMinutes() + countdownMinutes);
        targetDate.setSeconds(targetDate.getSeconds() + 2); // Add 2 seconds as a buffer

        // Update the countdown every second
        const interval = setInterval(function() {
        // Get the current date and time
        const currentDate = new Date().getTime();

        // Calculate the remaining time in milliseconds
        const remainingTime = targetDate - currentDate;

        // Calculate minutes and seconds
        const minutes = String(Math.floor(remainingTime / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, '0');

        // Display the countdown
        document.getElementById('timerText').innerHTML = `Time Remaining: ${minutes}:${seconds}`;

        // Check if the countdown has reached zero
        if (remainingTime < 0) {
          clearInterval(interval);
          document.getElementById('timerText').innerHTML = 'Countdown expired!';
        }
    }, 1000); // Update every second

}

//asks a new question for the user for worksheet one
function askNewQuestion()
{
    let measureElements = document.getElementsByClassName('measureClass');

    let presentMeasureElement = null;

    //if there is already a measure element
    if(measureElements != null)
    {
        presentMeasureElement = measureElements[0];
    }

    //gets worksheet element
    let worksheetDivElement = document.getElementsByClassName('worksheet-div')[0];

    //gets a random clef
    const randomClef = getRandomClef();

    //creates a new measure
    var newMeasure = createMeasure(measureId = 'measure', minPitch = 'C1', maxPitch = 'C7', clef=randomClef, showClef=true);
    newMeasure.style.marginLeft = '-30vw';

    var randomNote = -1;

    //different range of random note depending on the clef type
    if(randomClef == 'treble')
    {
       randomNote = getRandomDiatonicNote('C3', 'F6');
    }
    else if(randomClef == 'bass')
    {
       randomNote = getRandomDiatonicNote('F1', 'F4');
    }
    else if(randomClef == 'alto')
    {
        randomNote = getRandomDiatonicNote('G2', 'F4');
    }
    else if(randomClef == 'tenor')
    {
        randomNote = getRandomDiatonicNote('G2', 'F4');
    }

    //adds random note to measure
    addNote(newMeasure, noteType = 'whole', note = randomNote, accidental = getRandomAccidental(), noteLeftMargin = 8);

    //if there is already a current problem being asked
    if(presentMeasureElement != null)
    {
        presentMeasureElement.replaceWith(newMeasure);
    }
    //if this is the first problem being asked to the user
    else
    {
        worksheetDivElement.prepend(newMeasure);
    }
}

//checks the user answer for the current note
function checkUserAnswer()
{
    //user input element
    var userInputElement = document.getElementById('userNoteInput');

    //accidental image element
    var accidentalElement = document.getElementsByClassName('accidental')[0];

    var accidentalName = accidentalElement.id;

    //gets note image element
    var noteImageElement = document.getElementsByClassName('note')[0];

    //gets note line or space element
    var noteElement = noteImageElement.parentElement;

    //name of note
    var noteName = noteElement.id.charAt(0) + accidentalName;

    //gets what the user has inputted
    var userInput = userInputElement.value;

    //if the user's answer is right
    if(noteName == userInput)
    {
        //increases what question the user is on
        currentQuestion++;

        //if there are remaining questions
        if(currentQuestion <= numQuestions)
        {
            var questionsRemainingElement = document.getElementById('questionsRemainingText');
            questionsRemainingElement.innerHTML = `Questions Remaining:${numQuestions - currentQuestion}`;

            //asks new question to user
            askNewQuestion();
        }
        //if this is the last question
        else
        {
            let quizStartInfoElement = document.getElementById('quiz-start-info');

            quizStartInfoElement.style.visibility = 'hidden';
        }
    }
    //if the user's answer is wrong
    else
    {
         showMessage(topText = "Sorry :(", messageText = "The answer you entered is incorrect. Please try again.");
    }

}

//displays a popup message
function showMessage(topText = "Sorry :(", messageText = "Please enter a number that is at least 4 or at most 100 for the number of questions", buttonText = "Okay", topTextColor = 'FF474D', dismissButtonColor = 'FF474D')
{

    //pop up message element container
    let popUpMessageElement = document.getElementById('popUpMessageContainer');

    //pop up message text element
    let popupMessageTextElement = document.getElementById('popupMessageText');
    popupMessageTextElement.innerHTML  = messageText;

    //make pop up visible
    popUpMessageElement.style.visibility = 'visible';

}

//listener for is is timed toggle, changes isTimed function
document.addEventListener('DOMContentLoaded', function () {
        // Wait for the DOM to be fully loaded
        var isTimeLimitToggle = document.getElementById('isTimeLimitToggle');

        // Check if the element exists (optional, but good practice)
        if (isTimeLimitToggle) {
            // Add an event listener for the 'change' event
            isTimeLimitToggle.addEventListener('change', function () {
                // Handle the change event here
                if (isTimeLimitToggle.checked) {
                    // Checkbox is checked
                    isTimed = true;
                    var timeMinutesInputElement = document.getElementById('timeLimitDiv');
                    timeMinutesInputElement.style.display = "flex";
                    // Perform actions for checked state

                } else {
                    isTimed = false;
                    // Checkbox is unchecked
                    console.log('Checkbox is unchecked');
                    var timeMinutesInputElement = document.getElementById('timeLimitDiv');
                    timeMinutesInputElement.style.display = "none";
                    // Perform actions for unchecked state
                }
            });
        }

        //start quiz button element and its listener
        var startQuizButtonElement = document.getElementById('startQuizButton');
        startQuizButtonElement.addEventListener("click", function () {


            startQuiz(isTimed);
        });

        //start dismiss button element and its listener
        var dismissButtonElement = document.getElementById('messageDismissButton');
        dismissButtonElement.addEventListener("click", function () {
            hideMessage();
        });

});

