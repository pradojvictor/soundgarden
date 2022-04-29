

const parseQueryString = (queryString) => {
    const tmpQueryString = queryString.slice(1);

    return Object.fromEntries(
        tmpQueryString.split("&").map((param) => {
            return param.split("=");
        })
    );
};

const main = async () => {
    const params = parseQueryString(window.location.search);
    if (!params.id) {
        window.location.replace("admin.html");
    }

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";


    const trLoading = document.createElement("tr");
    const tdLoading = document.createElement("td");
    tdLoading.setAttribute("colspan", 5);
    tdLoading.setAttribute("align", "center");
    tdLoading.append("Carregando ...");

    trLoading.appendChild(tdLoading);
    tbody.appendChild(trLoading);


    const data = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${params.id}`).then(
        (response) => response.json()
    );


    tbody.innerHTML = "";

    if (data.length === 0) {
        const trSemReserva = document.createElement("tr");
        const tdSemReserva = document.createElement("td");
        tdSemReserva.setAttribute("colspan", 5);
        tdSemReserva.setAttribute("align", "center");
        tdSemReserva.append("Não possui Reservas ...");
        

        trSemReserva.appendChild(tdSemReserva);
        tbody.appendChild(trSemReserva);
    }


    document.querySelector("#nomeEvento").innerHTML = data[0]?.event.name;      // faz com que o nome do evento seja mostrado, e faz uma verificação com "?." caso não aja reservas, serve como um if.

    data.forEach((valo, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML =
            `
      <th scope="row" width="20px">${index + 1}</th>
      <td>${new Date(valo.created_at).toLocaleString("pt-br")}</td>
      <td>${valo.owner_name}</td>
      <td>${valo.owner_email}</td>
      <td>${valo.number_tickets}</td>
    `;
        tbody.appendChild(tr);
    });

};

main();
