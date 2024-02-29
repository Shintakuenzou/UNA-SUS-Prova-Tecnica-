// Primeiro, selecione o botão do menu dropdown
var dropdownButton = document.querySelector(".drpodow-menu button");

// Em seguida, selecione o menu dropdown
var dropdownMenu = document.querySelector(".drpodow-menu ul");

// Adicione um ouvinte de evento ao botão do menu dropdown
dropdownButton.addEventListener("click", function () {
  // Quando o botão é clicado, alterne a visibilidade do menu dropdown
  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});

// Define as opções e as embaralha
const options = ["Opção 01", "Opção 02", "Opção 03", "Opção 04", "Opção 05"];
options.sort(() => Math.random() - 0.5);

// Função para embaralhar um array
function shuffle(array) {
  let i = array.length;
  let j;
  let temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Embaralha as opções
let shuffledOptions = shuffle(Array.from({ length: options.length }, (_, i) => i));

// Escolhe uma opção correta
const correctOption = shuffledOptions[0];
console.log(correctOption);
// Quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões do acordeão
  const buttons = document.querySelectorAll("#accordion-button");

  // Para cada botão
  buttons.forEach((button) => {
    const content = button.nextElementSibling;
    console.log(content);
    const img = button.querySelector("#accordion-img");

    // Verifica o estado inicial do acordeão e define a imagem correta
    const isExpanded = content.classList.contains("show");

    img.src = isExpanded ? "./assets/chevron-up.svg" : "./assets/chevron-down.svg";

    // Adiciona um evento de clique ao botão
    button.addEventListener("click", () => {
      // Alterna a visibilidade do conteúdo do acordeão
      content.classList.toggle("show");

      // Atualiza a imagem com base no novo estado do acordeão
      const isExpanded = content.classList.contains("show");
      img.src = isExpanded ? "./assets/chevron-up.svg" : "./assets/chevron-down.svg";
    });
  });

  // Insere as opções no container
  const answersContainer = document.getElementById("answersContainer");
  options.forEach((option, index) => {
    // Cria um novo elemento de opção
    const optionElement = document.createElement("div");
    optionElement.classList.add("options");
    optionElement.innerHTML = `
      <div>
        <input type="radio" name="options" id="opcao${index + 1}" data-index="${index}">
        <label for="opcao${index + 1}">${option}</label>
      </div>
      <div class="feedback" id="feedback${index}" style="background-color: #edbebe;">
        <p id="parag">Esta resposta está errada. <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque leo at
          metus consectetur luctus. Vestibulum arcu lectus, tempus eget augue a, dapibus facilisis leo.
          Quisque mollis purus sed eleifend bibendum. Lorem ipsum dolor sit ame</p>
      </div>
    `;
    // Adiciona o elemento de opção ao container
    answersContainer.appendChild(optionElement);
  });

  // Adiciona um evento de clique para mostrar feedback
  document.querySelectorAll(".options input").forEach((input) => {
    input.addEventListener("click", showFeedback);
  });

  // Função para mostrar feedback
  function showFeedback(event) {
    // Desabilita todas as opções após uma ser selecionada
    document.querySelectorAll(".options input").forEach((input) => {
      input.disabled = true;
    });

    const selectedOptionIndex = event.target.dataset.index;
    const feedbackElement = document.getElementById(`feedback${selectedOptionIndex}`);
    feedbackElement.style.display = "block";

    // Verifica a opção selecionada e exibe feedback correto ou incorreto conforme necessário
    if (Number(selectedOptionIndex) === correctOption) {
      feedbackElement.style.backgroundColor = "#c6efc5";
      feedbackElement.innerHTML = `<p>Você acertou.  <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque leo at
        metus consectetur luctus. Vestibulum arcu lectus, tempus eget augue a, dapibus facilisis leo.
        Quisque mollis purus sed eleifend bibendum. Lorem ipsum dolor sit amet</p>`;
    } else {
      feedbackElement.style.backgroundColor = "#edbebe";
      feedbackElement.innerHTML = `<p>Esta resposta está errada. <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque leo at
        metus consectetur luctus. Vestibulum arcu lectus, tempus eget augue a, dapibus facilisis leo.
        Quisque mollis purus sed eleifend bibendum. Lorem ipsum dolor sit ame</p>`;

      // Destaca a resposta correta
      const correctFeedbackElement = document.getElementById(`feedback${correctOption}`);
      correctFeedbackElement.style.display = "block";
      correctFeedbackElement.style.backgroundColor = "#c6efc5";
      correctFeedbackElement.innerHTML = `<p>Esta é a resposta correta. <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque leo at
        metus consectetur luctus. Vestibulum arcu lectus, tempus eget augue a, dapibus facilisis leo.
        Quisque mollis purus sed eleifend bibendum. Lorem ipsum dolor sit amet</p>`;
    }
  }
});
