﻿
let plantaSeleccionada; 

window.onload = function () {

    obtenerPlantasDistintas();
}

let obtenerPlantasDistintas = () => {
    let selectPlantas = document.getElementById('plantas');

    axios.get(`/Home/ObtenerPlantasDistintas`)
        .then(response => {

            let requerimientos = response.data;
            console.log(requerimientos);
            requerimientos.forEach(function (req) {
                let opcionPlanta = document.createElement('option');

                opcionPlanta.innerText = req;
                opcionPlanta.setAttribute('value',req);

                selectPlantas.appendChild(opcionPlanta);
            });
        })
        .catch(error => {
            console.log(error);
        });

}

let IrRequerimientos = () => {

    plantaSeleccionada = document.getElementById('plantas').value;

    if (plantaSeleccionada === "")
        UIkit.notification("You must choose a plant...", "warning");
    else
        window.location.href = `/OpenReq/Index?idp=${plantaSeleccionada}`;
}

let IrInventario = () => {

    plantaSeleccionada = document.getElementById('plantas').value;

    if (plantaSeleccionada === "")
        UIkit.notification("You must choose a plant...", "warning");
    else
        window.location.href = `/Inventory/Index?idp=${plantaSeleccionada}`;
}

let IrReceiving = () => {

    plantaSeleccionada = document.getElementById('plantas').value;

    if (plantaSeleccionada === "")
        UIkit.notification("You must choose a plant...", "warning");
    else
        window.location.href = `/Receiving/Index?idp=${plantaSeleccionada}`;
}