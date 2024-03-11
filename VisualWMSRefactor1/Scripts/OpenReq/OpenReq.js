let warehouse = document.getElementById('plantaTitulo');
window.onload = function () {

    cargarRequerimientos();
}

let cargarRequerimientos = async () => {

    let fechaHace24Horas = moment().subtract(1, 'days').format('LLL');
    let contenedorRequerimientos = document.getElementById('requerimientos');
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let planta = urlParams.get('idp');
    var tipoAlmacenamiento = [];

    //Nombre título warehouse
    warehouse.innerHTML = `OPEN REQUEST ${planta}`;

    contenedorRequerimientos.setAttribute('class', 'uk-grid-column-small uk-grid-row-large uk-child-width-1-4@s uk-text-center');
    contenedorRequerimientos.setAttribute('uk-grid', '');

    await axios.get(`/OpenReq/ObtenerRequerimientos?fechaLimiteInferior=${fechaHace24Horas}&planta=${planta}`)
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

                interiorCard.setAttribute('class', `uk-card uk-card-default uk-card-hover ${req.DestStoryType} cartas wms-borde-card`);
                tituloParte.setAttribute('class', 'wms-color-secundario-letra');

                card.appendChild(interiorCard);
                interiorCard.appendChild(tituloParte);
                interiorCard.appendChild(parrafoMaterial);
                interiorCard.appendChild(parrafoDescMaterial);
                interiorCard.appendChild(parrafoUsuario);
                interiorCard.appendChild(parrafoExistencia);
                interiorCard.appendChild(parrafoFecha);

                contenedorRequerimientos.appendChild(card);

                //Añadir a arreglo de almacenamiento
                tipoAlmacenamiento.push(req.DestStoryType);

            });

            cargarFiltroAlmacenamiento(tipoAlmacenamiento);
        })
        .catch(error => {
            console.log(error);
        });
}

let cargarFiltroAlmacenamiento = (tipoAlmacenamiento) => {

    let seccionFiltroAlmacenamiento = document.getElementById('filtro-tipo-almacenamiento');

    eliminarDuplicados(tipoAlmacenamiento);
    tipoAlmacenamiento.forEach((tipo) => {

        let labelTipoAlmacenamiento = document.createElement('label');
        let checkTipoAlmacenamiento = document.createElement('input');

        checkTipoAlmacenamiento.setAttribute('class', 'uk-checkbox uk-margin-small-left uk-margin-medium-right');
        checkTipoAlmacenamiento.setAttribute('type', 'checkbox');
        checkTipoAlmacenamiento.checked = true;
        checkTipoAlmacenamiento.setAttribute('onchange', `filtroAlmacenamiento("${tipo}")`);
        checkTipoAlmacenamiento.setAttribute('id', `${tipo}`);

        labelTipoAlmacenamiento.innerText = tipo;
        labelTipoAlmacenamiento.appendChild(checkTipoAlmacenamiento);

        seccionFiltroAlmacenamiento.appendChild(labelTipoAlmacenamiento);
    });
}

let eliminarDuplicados = (a) => {

    for (let i = a.length - 1; i > 0; i--) {
        let elem = a[i];
        for (let j = i - 1; j >= 0; j--) {
            if (elem == a[j]) {
                a.splice(j, 1);
            }
        }
    }
}

let filtroAlmacenamiento = (tipoAlmacenamiento) => {

    let cardsOcultar = document.getElementsByClassName(tipoAlmacenamiento);
    let cardsMostrar = document.getElementsByClassName('cartas');
    let checkBox = document.getElementById(tipoAlmacenamiento);

    if (!checkBox.checked) {
        for (let carta = 0; carta < cardsMostrar.length; carta++) {
            cardsMostrar[carta].style.display = 'block';
        }
        for (let carta = 0; carta < cardsOcultar.length; carta++) {
            cardsOcultar[carta].style.display = 'none';
        }
    }
    else {
        for (let carta = 0; carta < cardsOcultar.length; carta++) {
            cardsOcultar[carta].style.display = 'block';
        }
    }

}