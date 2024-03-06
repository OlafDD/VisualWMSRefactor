window.onload = function () {

    cargarRequerimientos();
}

let cargarRequerimientos = () => {

    let fechaHace24Horas = moment().subtract(1, 'days').format('LLL');
    let contenedorRequerimientos = document.getElementById('requerimientos');

    contenedorRequerimientos.setAttribute('class', 'uk-grid-column-small uk-grid-row-large uk-child-width-1-4@s uk-text-center');
    contenedorRequerimientos.setAttribute('uk-grid', '');

    axios.get(`/OpenReq/ObtenerRequerimientos?fechaLimiteInferior=${fechaHace24Horas}`)
        .then(response => {

            let requerimientos = response.data;
            console.log(requerimientos);
            requerimientos.forEach(function (req) {

                let card = document.createElement('div');
                let interiorCard = document.createElement('div');
                let tituloParte = document.createElement('h3');
                let parrafoMaterial = document.createElement('p');
                let parrafoDescMaterial = document.createElement('p');
                let parrafoUsuario = document.createElement('p');
                let parrafoExistencia = document.createElement('p');
                let parrafoFecha = document.createElement('p');

                tituloParte.innerText = req.DestStorBin;
                parrafoMaterial.innerText = req.Material.MatNR;
                parrafoDescMaterial.innerText = req.Material.MacTX;
                parrafoUsuario.innerText = `User: ${req.OP_User}`;
                parrafoExistencia.innerText = `Stock Requeriment ${req.TRReqQuantity}`;
                parrafoFecha.innerText = req.CreatedOn;

                interiorCard.setAttribute('class', 'uk-card uk-card-default uk-card-hover');
                tituloParte.setAttribute('class', 'wms-color-secundario-letra');

                card.appendChild(interiorCard);
                interiorCard.appendChild(tituloParte);
                interiorCard.appendChild(parrafoMaterial);
                interiorCard.appendChild(parrafoDescMaterial);
                interiorCard.appendChild(parrafoUsuario);
                interiorCard.appendChild(parrafoExistencia);
                interiorCard.appendChild(parrafoFecha);

                contenedorRequerimientos.appendChild(card);

            });

        })
        .catch(error => {
            console.log(error);
        });
}


