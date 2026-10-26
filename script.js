const questions = [
  {q:"Which keyword defines a function in Python?",o:["func","def","function","lambda"],a:1},
  {q:"What does len([1, 2, 3]) return?",o:["2","3","4","Error"],a:1},
  {q:"Which data type stores key-value pairs in Python?",o:["list","tuple","dictionary","set"],a:2},
  {q:"What does HTML stand for?",o:["Hyper Text Markup Language","High Tech Modern Language","Hyper Transfer Markup Link","Home Tool Markup Language"],a:0},
  {q:"Which CSS property changes the text colour?",o:["font-color","text-style","color","background"],a:2},
  {q:"Which method adds an item to the end of a JavaScript array?",o:["push()","add()","append()","insert()"],a:0},
  {q:"What is the output of 2 ** 3 in Python?",o:["6","5","8","9"],a:2},
  {q:"Which Git command uploads commits to GitHub?",o:["git pull","git push","git clone","git init"],a:1}
];

const $ = id => document.getElementById(id);
let index, score, answers;

function show(id){["start","game","result"].forEach(s => $(s).hidden = s !== id)}

function startQuiz(){
  index = 0; score = 0; answers = [];
  show("game"); loadQuestion();
}

function loadQuestion(){
  const item = questions[index];
  $("counter").textContent = `Question ${index + 1} of ${questions.length}`;
  $("score").textContent = `Score: ${score}`;
  $("fill").style.width = `${(index / questions.length) * 100}%`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("nextBtn").hidden = true;
  $("nextBtn").textContent = index === questions.length - 1 ? "See Results" : "Next";
  $("options").innerHTML = "";
  item.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = text;
    btn.onclick = () => choose(i);
    $("options").appendChild(btn);
  });
}

function choose(i){
  const item = questions[index];
  const buttons = document.querySelectorAll(".opt");
  buttons.forEach(b => b.disabled = true);
  buttons[item.a].classList.add("correct");
  const right = i === item.a;
  if (right) { score++; $("feedback").textContent = "Correct!"; }
  else { buttons[i].classList.add("wrong"); $("feedback").textContent = `Wrong. Answer: ${item.o[item.a]}`; }
  answers.push({q: item.q, right, correct: item.o[item.a], picked: item.o[i]});
  $("score").textContent = `Score: ${score}`;
  $("nextBtn").hidden = false;
}

function next(){
  index++;
  index < questions.length ? loadQuestion() : finish();
}

function finish(){
  show("result");
  const pct = Math.round((score / questions.length) * 100);
  $("final").textContent = `You scored ${score} out of ${questions.length} (${pct}%)`;
  $("message").textContent = pct >= 80 ? "Excellent work!" : pct >= 50 ? "Good effort, keep practising!" : "Keep learning, you'll get there!";
  $("review").innerHTML = answers.map(a =>
    `<li class="${a.right ? "ok" : "bad"}">${a.right ? "✔" : "✘"} ${a.q}${a.right ? "" : ` (Correct: ${a.correct})`}</li>`).join("");
}

$("startBtn").onclick = startQuiz;
$("nextBtn").onclick = next;
$("restartBtn").onclick = startQuiz;
