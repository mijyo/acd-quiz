const quizData = [
  
  {
      label: "Question 1 of 5",
      question: "What causes allergic contact dermatitis (ACD)?",
      options: ["A contagious skin infection", "An allergic reaction when the immune system reacts to a harmless substance", "A reaction that occurs only from touching poison ivy", "A problem caused by not washing the skin enough"],
      answer: "An allergic reaction when the immune system reacts to a harmless substance",
      explanation: "B is correct because ACD happens when the immune system mistakenly attacks a harmless substance like metal, fragrance, or a cosmetic ingredient."

    },
    {
      label: "Question 2 of 5",
      question: "What is the BEST description of how ACD develops over time?",
      options: ["The rash appears only the first time you touch an allergen", "Your body becomes sensitized the first time, and future exposures trigger a rash", "A rash forms instantly the moment you touch an allergen", "You get lifelong immunity after one reaction"],
      answer: "Your body becomes sensitized the first time, and future exposures trigger a rash",
      explanation: "B is correct because ACD happens in two steps: first your immune system “learns” the allergen, and later exposures cause inflammation and rash."
    },
    {
      label: "Question 3 of 5",
      question: "Which of the following is a common symptom of ACD?",
      options: ["Itchy rash, redness, or blisters", "High fever without a rash", "Chest pain", "Hair loss"],
      answer: "Itchy rash, redness, or blisters",
      explanation: "A is correct because common symptoms include itching, redness, bumps, blisters, swelling, dryness, peeling, and stinging."
    },
    {
      label: "Question 4 of 5",
      question: "What is the purpose of patch testing for ACD?",
      options: ["To treat the rash by applying medication", "To check for bacterial infection", "To identify which allergen is causing the rash", "To permanently cure allergies"],
      answer: "To identify which allergen is causing the rash",
      explanation: "Patch testing is a comprehensive exam with accurate results."
    },
    {
      label: "Question 5 of 5",
      question: "Which situation means you should seek medical care for ACD?",
      options: ["A mild rash that goes away in a day", "A rash with blistering, infection signs, severe itching, or lasting more than 1–3 weeks", "Any rash that feels slightly dry", "A spot of redness after scratching the skin"],
      answer: "A rash with blistering, infection signs, severe itching, or lasting more than 1–3 weeks",
      explanation: "B is correct because you should contact a provider if the rash blisters, becomes painful, spreads, shows infection, prevents sleep, affects sensitive areas, or doesn’t improve within 1–3 weeks."
    },
  ];
  
  const labelElement = document.getElementById("label");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const explabelElement = document.getElementById("explabel");
  const explanationElement = document.getElementById("explanation");
  const progressBarFill = document.querySelector('.progress-fill');
  const nextButton = document.getElementById("next-button");


  const totalQuestions = quizData.length;

  let currentQuestion = 0;
  let score = 0;
  
  function startQuiz() {
  currentQuestion = 0;
  score = 0;
  //nextButton.innerHTML = 'Get Started';
  //nextButton.addEventListener("click", () => {
  showQuestion();
  //currentQuestion++;
  
}

  function showQuestion() {
    const label = quizData[currentQuestion];
    labelElement.innerText = label.label;

    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
  
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      optionsElement.appendChild(button);
      button.addEventListener("click", selectAnswer);
    });

    nextButton.innerHTML = 'Next';
    
  }

  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;  
  
    if (selectedButton.innerText === answer) {
      selectedButton.style.backgroundColor = "#44842E";
      selectedButton.style.color = "white";
    // 1. Disable all buttons to prevent multiple clicks
      const allButtons = optionsElement.querySelectorAll("button");
      allButtons.forEach(button => {
      button.removeEventListener("click", selectAnswer);
      button.disabled = true; // Visually indicate they are disabled
    });

      const explanation = quizData[currentQuestion];
      explanationElement.innerText = explanation.explanation;
      explabelElement.innerHTML =`
      <div id="explabel">Answer Explanation</div>      `
      ;
      score++;

    } else {
      selectedButton.style.backgroundColor = "#E11919";
      selectedButton.style.color = "white";
      


    // 1. Disable all buttons to prevent multiple clicks
      const allButtons = optionsElement.querySelectorAll("button");
      allButtons.forEach(button => {
      button.removeEventListener("click", selectAnswer);
      button.disabled = true; // Visually indicate they are disabled
      if (button.innerText === answer){
        button.style.backgroundColor = "#44842E";
        button.style.color = "white";
      }
      });
      
      const explanation = quizData[currentQuestion];
      explanationElement.innerText = explanation.explanation;
      explabelElement.innerHTML =`
      <div id="explabel">Answer Explanation</div>      `
      ;
    }
    
    currentQuestion++;

  
    setTimeout(() => {
      explanationElement.innerText = "";
      explabelElement.innerHTML = "";

      if (currentQuestion < quizData.length) {
        showQuestion();
        updateProgressBar(currentQuestion, totalQuestions);
      
      } else {
        showResult();
      }
    }, 4500);

    }
  
    function updateProgressBar(currentQuestion, totalQuestions){
      let questionIndex = currentQuestion++;
      const progressPercentage = (questionIndex / totalQuestions) * 100;
      progressBarFill.style.width = `${progressPercentage}%`;
    }
  
  function showResult() {

    if (score<2){
      quiz.innerHTML =  `
      <h1>Your Results</h1>
      <div id="label">Your score: ${score}/${quizData.length}</div>
      <body>Oof. Maybe study up, next time?</body>
      <button id="next-button">Play Again</button>
      `
      nextButton.addEventListener("click", () => {

      resetQuiz();
      startQuiz();

      })

    } else {
      quiz.innerHTML =`
      <h1>Your Results</h1>
      <div id="label">Your score: ${score}/${quizData.length}</div>
      <body>Yay!! You did it.</body>
      <button id="next-button">Play Again</button>
      nextButton.addEventListener("click", () => {
      resetQuiz();
      })
      `;
      
      
    }
    
  }

  

function resetQuiz(){
currentQuestion = 0;
score = 0;
showQuestion();
}


startQuiz();
