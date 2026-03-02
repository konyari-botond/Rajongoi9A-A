// ============================
// Kvíz adatok
// ============================
const quiz = [
{ question: "Melyik szellem képes lemásolni más szellemek képességeit?", answers: [
    { text: "The Mimic", correct: true },
    { text: "Oni", correct: false },
    { text: "Raiju", correct: false },
    { text: "Shade", correct: false }
]},
{ question: "Melyik szellem öregszik és gyengül idővel?", answers: [
    { text: "Thaye", correct: true },
    { text: "Jinn", correct: false },
    { text: "Mare", correct: false },
    { text: "Yurei", correct: false }
]},
{ question: "Melyik szellem gyorsabb elektronikus eszközök közelében?", answers: [
    { text: "Raiju", correct: true },
    { text: "Spirit", correct: false },
    { text: "Shade", correct: false },
    { text: "Myling", correct: false }
]},
{ question: "Melyik szellem nem hagy UV lábnyomot?", answers: [
    { text: "Wraith", correct: true },
    { text: "Obake", correct: false },
    { text: "Phantom", correct: false },
    { text: "Banshee", correct: false }
]},
{ question: "Melyik szellem választ ki egyetlen célpont játékost?", answers: [
    { text: "Banshee", correct: true },
    { text: "Oni", correct: false },
    { text: "Spirit", correct: false },
    { text: "Yokai", correct: false }
]},
{ question: "Melyik szellem mindig tudja a játékos helyét?", answers: [
    { text: "Deogen", correct: true },
    { text: "Revenant", correct: false },
    { text: "Shade", correct: false },
    { text: "Goryo", correct: false }
]},
{ question: "Melyik szellem DOTS bizonyítéka csak kamerán látható?", answers: [
    { text: "Goryo", correct: true },
    { text: "Poltergeist", correct: false },
    { text: "Mare", correct: false },
    { text: "Spirit", correct: false }
]},
{ question: "Melyik eszköz méri az elektromágneses aktivitást?", answers: [
    { text: "EMF Reader", correct: true },
    { text: "Hőmérő", correct: false },
    { text: "UV Lámpa", correct: false },
    { text: "Spirit Box", correct: false }
]},
{ question: "Melyik eszközzel kommunikálhatsz hangalapon a szellemmel?", answers: [
    { text: "Spirit Box", correct: true },
    { text: "Video Kamera", correct: false },
    { text: "Kézi Lámpa", correct: false },
    { text: "Mozgásérzékelő", correct: false }
]},
{ question: "Melyik eszköz képes megakadályozni a vadászat elindulását?", answers: [
    { text: "Crucifix", correct: true },
    { text: "Salt", correct: false },
    { text: "UV Lámpa", correct: false },
    { text: "Hőmérő", correct: false }
]},
{ question: "Melyik eszköz nyugtatja meg ideiglenesen a szellemet?", answers: [
    { text: "Smudge Stick", correct: true },
    { text: "Flashlight", correct: false },
    { text: "Tripod", correct: false },
    { text: "Kamera", correct: false }
]},
{ question: "Melyik szellem gyorsabb hideg hőmérsékleten?", answers: [
    { text: "Hantu", correct: true },
    { text: "Mare", correct: false },
    { text: "Spirit", correct: false },
    { text: "Oni", correct: false }
]},
{ question: "Melyik szellem dobál gyakran több tárgyat?", answers: [
    { text: "Poltergeist", correct: true },
    { text: "Shade", correct: false },
    { text: "Goryo", correct: false },
    { text: "Yurei", correct: false }
]},
{ question: "Melyik bizonyíték látható kizárólag kamerán?", answers: [
    { text: "Ghost Orbs", correct: true },
    { text: "EMF Level 5", correct: false },
    { text: "Freezing Temperatures", correct: false },
    { text: "Spirit Box", correct: false }
]},
{ question: "Melyik szellem ritkábban mutatja magát játékosok közelében?", answers: [
    { text: "Shade", correct: true },
    { text: "Oni", correct: false },
    { text: "Raiju", correct: false },
    { text: "Banshee", correct: false }
]}
];

// ============================
// Változók
// ============================
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const counterEl = document.getElementById("question-counter");

// ============================
// Függvények
// ============================
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextBtn.innerText = "Következő";
    scoreEl.innerText = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = quiz[currentQuestion];
    questionEl.innerText = question.question;

    // KÉRDÉSSZÁMLÁLÓ
    counterEl.innerText = `Kérdés ${currentQuestion + 1} / ${quiz.length}`;

    shuffleArray(question.answers).forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) button.dataset.correct = "true";
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

// ============================
// Next gomb
// ============================
nextBtn.addEventListener("click", () => {
    if (nextBtn.innerText === "Indítás") {
        startQuiz();
        return;
    }

    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionEl.innerText = "A kvíz véget ért! 🎉";
    resetState();
    scoreEl.innerText = `Pontszám: ${score} / ${quiz.length}`;

    nextBtn.innerText = "Vissza a főoldalra";
    nextBtn.style.display = "block";
    nextBtn.onclick = () => window.location.href = "index.html";
}

// ============================
// Inicializálás
// ============================
nextBtn.innerText = "Indítás";
nextBtn.style.display = "block";