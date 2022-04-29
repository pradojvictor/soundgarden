//const tableSelector = document.querySelector('.table'); // usado um metodo mais longo sem usar ID
// console.log(tableSelector); // usado para descobri a posição do tbody

// hildNodes: NodeList(5) 
// 0: text  
// 1: thead
// 2: text
// 3: tbody#table-adm-body  // posição 3
// 4: text
// length: 5

//const tableBodySelector = tableSelector.childNodes[3]; // quando usado o metodo anterior usa-se este para selecionar o objeto requerido
//console.log(tableBodySelector); //mostra no console o item desejado

const tableBodySelector = document.querySelector('#table-adm-body')

function createElementFromEvent(element) {
    element.forEach((objetoevent, posicao) => {                 //callbackfunction (value, index, array)/ value = objeto; index = index do elemento; array = todo o array
        const TrElement = document.createElement('tr');

        const ThElement = document.createElement('th');         // primeiro elemento da tabela um th
        ThElement.innerText = posicao + 1;                      // ele vai numerar cada item, somando +1 pq uma array começa em zero 

        const DataElement = document.createElement('td');                             // primeiro elemento da tabela
        const date = objetoevent.scheduled.substring(0, 10).replaceAll('-', '/');      // vamos tratar essa data usando o substring, onde (inicio,fim) indica a posição usada ex.usado 2022-04-29T11:59:00.000Z, usando o replaceAll, ele subistitui "-" por "/", ele pecorre a string e troca um item por outro.
        const hora = objetoevent.scheduled.substring(11, 16);                          // tratar a hora usando o metodo acima
        DataElement.innerText = date + " " + hora;

        const TituloElement = document.createElement('td');
        TituloElement.innerText = objetoevent.name;

        const AtracoesElement = document.createElement('td')
        AtracoesElement.innerText = objetoevent.attractions.join(", ");              // usando o .join(); pegando uma array e transfomando em uma string, recebendo um parametros ex (", ");

        const ButtonElement = document.createElement('td');

        const reservasAnchor = document.createElement('a');
        reservasAnchor.innerText = "ver reservas"
        reservasAnchor.href = "reservas-evento.html?id="+objetoevent._id;
        reservasAnchor.classList.add('btn')
        reservasAnchor.classList.add('btn-dark')

        const editarAnchor = document.createElement('a');
        editarAnchor.innerText = "editar"
        editarAnchor.href = "editar-evento.html?id="+objetoevent._id;
        editarAnchor.classList.add('btn')
        editarAnchor.classList.add('btn-secondary')

        const delelarAnchor = document.createElement('a');
        delelarAnchor.innerText = "excluir"
        delelarAnchor.href = "excluir-evento.html?id="+objetoevent._id;
        delelarAnchor.classList.add('btn')
        delelarAnchor.classList.add('btn-danger')


        tableBodySelector.appendChild(TrElement);
        TrElement.appendChild(ThElement);                     // afim de um melhor leitura/estudo colocarei um de cada vez, mais poderia usar append(), assim podendo add multiplos elementos
        TrElement.appendChild(DataElement);
        TrElement.appendChild(TituloElement);
        TrElement.appendChild(AtracoesElement);
        TrElement.appendChild(ButtonElement);
        ButtonElement.append(reservasAnchor, editarAnchor, delelarAnchor);

    });
}

fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
    "method": "GET",
    "headers": {},
}
).then(Response => { return Response.json() }
).then(data => createElementFromEvent(data)
).catch(error => console.log(error));