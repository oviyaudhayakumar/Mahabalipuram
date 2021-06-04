const questions = [
    {
        question: " ___ Hospital & Research Centre is a general hospital located near the Thirupuram temple complex and is also run by the ‘Sri Narayani Peedam’ Charitable Trust.",
        optionA: "The Narayani",
        optionB: "The Sri Narayani",
        optionC: "The Sri",
        optionD: "None of the above",
        correctOption: "optionB"
    },

    {
        question: "The temple is located on ____of land and has been constructed by the Vellore-based charitable trust",
        optionA: "100 acres ",
        optionB: "101 acres",
        optionC: "110 acres ",
        optionD: "120 acres ",
        correctOption: "optionA"
    },

    {
        question: "Sripuram’s design features a star-shaped path (Sri chakra), positioned in the middle of the lush green landscape, with a length of over ___ ",
        optionA: "2.9 km.",
        optionB: "2.8 km.",
        optionC: "1.9 km.",
        optionD: "1.8 km.",
        correctOption: "optionD"
    },

    {
        question: "Golden Temple Vellore complex inside the Thirupuram spiritual park is situated at the __ of a small range of green hills at Thirumalaikodi (or simply Malaikodi) Vellore in Tamil Nadu, India",
        optionA: "Tail",
        optionB: "Head",
        optionC: "Foot",
        optionD: "Top",
        correctOption: "optionC"
    },

    {
        question: "Every single detail in the temple art has significance from the ___",
        optionA: "Christains",
        optionB: "Muslims",
        optionC: "Hindus",
        optionD: "Vedas",
        correctOption: "optionD"
    },

    {
        question: "The salient feature of ‘Thirupuram’ is the Lakshmi Narayani temple whose __ is covered with pure gold, housing the deity Sri Lakshmi Narayani (female consort/wife of Narayana).",
        optionA: "Vimanam",
        optionB: "Ardha Mandapam",
        optionC: "Both A & B",
        optionD: "None of the above",
        correctOption: "optionC"
    },

    {
        question: "The words “Golden Temple” remind us of the magnificent Golden Temple of __, in the northern part of India.",
        optionA: "Jammu",
        optionB: "Amritsar",
        optionC: "Mandi",
        optionD: "Chamba",
        correctOption: "optionB"
    },

    {
        question: "As one walks along this ‘__path’ to reach the temple in the middle, one can also read various spiritual messages – such as the gift of the human birth itself, and the value of spirituality – along the way.",
        optionA: "Star",
        optionB: "Circle",
        optionC: "Square",
        optionD: "Curve",
        correctOption: "optionA"
    },

    {
        question: "___ Ghee Lamps were lit in front of Sri Srinivasa Perumal Deity",
        optionA: "108",
        optionB: "1009",
        optionC: "1007",
        optionD: "1008",
        correctOption: "optionD"
    },

    {
        question: "The southern India’s ___ temple holds the crown of world’s largest Golden Temple.",
        optionA: "Sri Narayani",
        optionB: "Lakshmi Narayana",
        optionC: "Lakshmi Sri Narayani",
        optionD: "Sri Lakshmi Narayani",
        correctOption: "optionD"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
