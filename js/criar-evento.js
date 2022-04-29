const formSelector = document.querySelector('#form');                  // selecionar o formulario
console.log(formSelector);

formSelector.addEventListener('submit', (click) => {                   // para que o preenchimento o ocorra só quando o botão enviar foi clicado // o addEventListener espera um evento e espera uma função
    click.preventDefault();

    const formObject = new FormData(formSelector);                               // selecionar o formulario e amazenas os dados dele em uma variavel
    const nameHolder = formObject.get('name-input');                             //formdata é usado para criar um objetor
    const attractionsHolder = formObject.get('attractions-input').split(', ');   //atrraction esta no fomato de string e precisa ser transformado em uma array para não da o erro 400, usando o metodo .split, dividindo uma string em uma array
    const descriptionHolder = formObject.get('description-input');
    const dateHolder = formObject.get('date-input');                             // foi mudado o type="datetime-local" no html
    const capacityHolder = formObject.get('capacity-input');

    const body = {                                                   //Podemos colocar o formObject.get('') dentro do body, mas para finz didaticos 
        "name": nameHolder,
        "poster": "N/D",                                             
        "attractions": attractionsHolder,                              
        "description": descriptionHolder,
        "scheduled": dateHolder,
        "number_tickets": capacityHolder,
    }


    fetch("https://xp41-soundgarden-api.herokuapp.com/events", {       // fetch pego do insomnia
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)                                  // para não da o erro 500, devemos transforma o objeto js em json, faremos isso usando o meto json.stringfy
    })
        .then(response => {                                           //recebe uma resposta da API e mostra os dados
            console.log(response);                                
        })
        .catch(err => {
            console.error(err);
        });

}) 