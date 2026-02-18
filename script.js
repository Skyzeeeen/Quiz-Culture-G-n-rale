const questions = [
  { question: "Quelle est la capitale de l'Australie ?", reponses: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
  { question: "Combien d'os possède le corps humain adulte ?", reponses: ["186", "206", "226", "246"], correct: 1 },
  { question: "En quelle année a eu lieu la Révolution française ?", reponses: ["1776", "1789", "1804", "1815"], correct: 1 },
  { question: "Quel est le plus grand océan du monde ?", reponses: ["Atlantique", "Indien", "Arctique", "Pacifique"], correct: 3 },
  { question: "Qui a peint la Joconde ?", reponses: ["Michel-Ange", "Raphaël", "Leonardo da Vinci", "Botticelli"], correct: 2 },
  { question: "Quelle est la formule chimique de l'eau ?", reponses: ["CO2", "H2O2", "H2O", "HO2"], correct: 2 },
  { question: "Quel est le plus long fleuve du monde ?", reponses: ["Amazone", "Nil", "Mississippi", "Yangtsé"], correct: 1 },
  { question: "Combien de joueurs dans une équipe de football ?", reponses: ["9", "10", "11", "12"], correct: 2 },
  { question: "Quelle planète est appelée la planète rouge ?", reponses: ["Jupiter", "Saturne", "Mars", "Vénus"], correct: 2 },
  { question: "Dans quel pays se trouve le Mont Everest ?", reponses: ["Inde", "Tibet/Népal", "Pakistan", "Bhoutan"], correct: 1 },
  { question: "Qui était le premier homme à marcher sur la Lune ?", reponses: ["Buzz Aldrin", "Youri Gagarine", "Neil Armstrong", "John Glenn"], correct: 2 },
  { question: "Combien de cordes sur une guitare classique ?", reponses: ["4", "5", "6", "7"], correct: 2 },
  { question: "Quelle est la vitesse de la lumière ?", reponses: ["150 000 km/s", "300 000 km/s", "450 000 km/s", "600 000 km/s"], correct: 1 },
  { question: "Quel est l'élément chimique le plus abondant dans l'univers ?", reponses: ["Oxygène", "Carbone", "Hélium", "Hydrogène"], correct: 3 },
  { question: "En quelle année a eu lieu la première Coupe du Monde de football ?", reponses: ["1926", "1930", "1934", "1938"], correct: 1 }
];

let timerInterval = null;
let tempsRestant = 20;

    function startQuiz() {
      document.getElementById('accueil').style.display = 'none';
      document.getElementById('quiz').style.display = 'block';
      afficherQuestion();
    }

function choisirReponse(index) {
  clearInterval(timerInterval);
  const q = questions[questionActuelle];
  const boutons = document.querySelectorAll('#reponses button');

  boutons.forEach(function(btn) {
    btn.disabled = true;
  });

  if (index === q.correct) {
    score++;
    document.getElementById('score-live').textContent = 'Score : ' + score;
    boutons[index].style.background = 'green';
    boutons[index].style.color = 'white';
  } else {
    boutons[index].style.background = 'red';
    boutons[index].style.color = 'white';
    boutons[q.correct].style.background = 'green';
    boutons[q.correct].style.color = 'white';
  }

  setTimeout(function() {
    questionActuelle++;
    if (questionActuelle < questions.length) {
      afficherQuestion();
    } else {
      document.getElementById('quiz').style.display = 'none';
      document.getElementById('resultats').style.display = 'block';

      let emoji, titre;
      if (score === 15)     { emoji = '🏆'; titre = 'Parfait !'; }
      else if (score >= 12) { emoji = '🌟'; titre = 'Excellent !'; }
      else if (score >= 9)  { emoji = '👍'; titre = 'Bien joué !'; }
      else if (score >= 6)  { emoji = '🧐​'; titre = 'Pas mal...'; }
      else                  { emoji = '😔​'; titre = 'Il va falloir réviser !'; }

      document.getElementById('resultat-emoji').textContent = emoji;
      document.getElementById('resultat-titre').textContent = titre;
      document.getElementById('score-final').textContent =
        'Tu as eu ' + score + '/' + questions.length + ' bonnes réponses !';
    }
  }, 1000);
}

let questionActuelle = 0;
let score = 0;

function afficherQuestion() {
  const q = questions[questionActuelle];

  document.getElementById('compteur').textContent = 
    'Question ' + (questionActuelle + 1) + '/' + questions.length;

  document.getElementById('question-texte').textContent = q.question;

  const reponsesDiv = document.getElementById('reponses');
  reponsesDiv.innerHTML = ''; // vide les anciennes réponses

  q.reponses.forEach(function(reponse, index) {
    const btn = document.createElement('button');
    btn.textContent = reponse;
    btn.onclick = function() { choisirReponse(index); };
    reponsesDiv.appendChild(btn);
  });
   startTimer();
}

function rejouer() {
  questionActuelle = 0;
  score = 0;
  document.getElementById('score-live').textContent = 'Score : 0'; // ← ajoute ça
  document.getElementById('resultats').style.display = 'none';
  document.getElementById('accueil').style.display = 'block';
}

function startTimer() {
  clearInterval(timerInterval);
  tempsRestant = 20;
  document.getElementById('timer').textContent = '⏱️ ' + tempsRestant;

  timerInterval = setInterval(function() {
    tempsRestant--;
    document.getElementById('timer').textContent = '⏱️ ' + tempsRestant;

    if (tempsRestant <= 0) {
      clearInterval(timerInterval);

      const q = questions[questionActuelle];
      const boutons = document.querySelectorAll('#reponses button');
      boutons.forEach(function(btn) { btn.disabled = true; });
      boutons[q.correct].style.background = 'green';
      boutons[q.correct].style.color = 'white';

      setTimeout(function() {
        questionActuelle++;
        if (questionActuelle < questions.length) {
          afficherQuestion();
        } else {
          document.getElementById('quiz').style.display = 'none';
          document.getElementById('resultats').style.display = 'block';
          document.getElementById('score-final').textContent =
            'Tu as eu ' + score + '/' + questions.length + ' bonnes réponses !';
        }
      }, 1000);
    }
  }, 1000);

}
