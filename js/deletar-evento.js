const idEvento = window.location.search.slice(4);
console.log(idEvento);
const BASE_url = `https://xp41-soundgarden-api.herokuapp.com/events/${idEvento}`;

const buscarEvento = (evento) => {
  const inputName = document.getElementById("nome");
  const inputBanner = document.getElementById("banner");
  const inputAttractions = document.getElementById("atracoes");
  const inputDescription = document.getElementById("descricao");
  const inputDate = document.getElementById("data");
  const inputTickets = document.getElementById("lotacao");

  const arrAtracoes = evento.attractions;
  const atracoes = arrAtracoes.join(", ");
  console.log(atracoes);
  const data = evento.scheduled.slice(0, -1);

  inputName.value = evento.name;
  inputBanner.value = evento.poster;
  inputAttractions.value = atracoes;
  inputDescription.value = evento.description;
  inputDate.value = data;
  inputTickets.value = evento.number_tickets;
};

const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

fetch(BASE_url, requestOptions)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    buscarEvento(data);
  })
  .catch((error) => {
    console.log("error", error);
  });

const excluirEvento = (e) => {
  e.preventDefault();

  alert("Tem certeza que deseja excluir o evento?");

  const requestOptions = {
    method: "DELETE",
  };

  fetch(BASE_url, requestOptions)
    .then(() => {
      alert("Evento excluído com sucesso");
      setTimeout(function () {
        window.location.href = "admin.html";
      }, 1000);
      // window.location.replace("admin.html");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// const botaoDelete = document.getElementById("botao-delete");
// botaoDelete.addEventListener("submit", excluirEvento);
const formulario = document.getElementById("formulario");
console.log(formulario);
formulario.addEventListener("submit", excluirEvento);
