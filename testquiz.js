const quizData = [
    {
      label: "Question 1 of 5",
      question: "What is a possible treatment option for ACD?",
      options: ["Prevention", "Antibiotics", "Quarantining", "Exposure Therapy"],
      answer: "Prevention",
      explanation: "Avoiding your known allergic triggers is the most effective method of treatment. Keeping a tracking journal may be useful."
    },
    {
      label: "Question 2 of 5",
      question: "How is ACD diagnosed?",
      options: ["Urine Analysis", "Patch testing", "Word of Mouth", "Vibes"],
      answer: "Patch testing",
      explanation: "Patch testing is a comprehensive exam with accurate results."
    },
    // Add more questions here...
  ];
  
  const labelElement = document.getElementById("label");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const explabelElement = document.getElementById("explabel");
  const explanationElement = document.getElementById("explanation");

  let currentQuestion = 0;
  let score = 0;
  


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
      } else {
        showResult();
      }
    }, 4500);
    }
  
  
  function showResult() {
    

    if (score<2){
      quiz.innerHTML =  `
      <h1>Your Results</h1>
      <div id="label">Your score: ${score}/${quizData.length}</div>
      <body>Oof. Maybe study up, next time?</body>
      `;
    } else {
      quiz.innerHTML =`
      <h1>Your Results</h1>
      <div id="label">Your score: ${score}/${quizData.length}</div>
      <body>Yay!! You did it.</body>
      `;
    }
    
  }



 showQuestion();
