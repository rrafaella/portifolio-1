const form = document.getElementById("form");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");

let dados = JSON.parse(localStorage.getItem("financeiro")) || [];

function salvar() {
  localStorage.setItem("financeiro", JSON.stringify(dados));
}

function atualizarTela() {
  lista.innerHTML = "";
  let total = 0;

  dados.forEach(item => {
    const li = document.createElement("li");
    li.classList.add(item.tipo);

    li.innerHTML = `
      <span>${item.descricao}</span>
      <span>R$ ${item.valor.toFixed(2)}</span>
    `;

    lista.appendChild(li);

    total += item.tipo === "entrada" ? item.valor : -item.valor;
  });

  totalSpan.innerText = `R$ ${total.toFixed(2)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  dados.push({ descricao, valor, tipo });
  salvar();
  atualizarTela();
  form.reset();
});

atualizarTela();
