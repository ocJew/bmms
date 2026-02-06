const steps = [
  { image: "img/enigma1.png", password: "banco" },
  { image: "img/enigma2.png", password: null },
];

const puzzle = document.getElementById("puzzle");
const form = document.getElementById("form");
const answer = document.getElementById("answer");
const msg = document.getElementById("msg");

function getStep() {
  const n = Number(sessionStorage.getItem("step") || "0");
  return Number.isFinite(n) ? Math.max(0, Math.min(n, steps.length - 1)) : 0;
}
function setStep(n) { sessionStorage.setItem("step", String(n)); }

function render() {
  const i = getStep();
  const step = steps[i];

  puzzle.src = step.image;
  msg.textContent = "";
  answer.value = "";

  if (step.password === null) {
    form.style.display = "none";
    return;
  }

  form.style.display = "block";

  // mobile: foca sem “pular” a tela
  setTimeout(() => answer.focus(), 50);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const i = getStep();
  const step = steps[i];

  const attempt = answer.value.trim().toLowerCase();
  const correct = String(step.password).toLowerCase();

  if (attempt === correct) {
    setStep(i + 1);
    render();
  } else {
    msg.textContent = "não.";
    answer.select();
  }
});

render();
