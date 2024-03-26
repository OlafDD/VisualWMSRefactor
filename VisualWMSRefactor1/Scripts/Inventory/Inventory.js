﻿let warehouse = document.getElementById('plantaTituloInventario');
let loader = document.getElementById('preloader_4');
let contenedorInventario = document.getElementById('inventario');
var tipoAlmacenamiento = [];
var locacion = [];
const cantidadPaginacion = 50;
let arrayGlobalInventario = [];

window.onload = function () {

    cargarInventario();
}

let cargarInventario = async () => {

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let planta = urlParams.get('idp');

    //Nombre título warehouse
    warehouse.innerHTML = `INVENTORY ${planta}`;

    contenedorInventario.setAttribute('class', 'uk-grid-column-small uk-grid-row-large uk-child-width-1-5@s uk-text-center');
    contenedorInventario.setAttribute('uk-grid', '');

    await axios.get(`/Inventory/ObtenerInventario?planta=${planta}`)
        .then(response => {

            let inventario = response.data;

            arrayGlobalInventario = inventario;
            cargarPaginacion(inventario.length);
            inventario.forEach(function (inv) {

                tipoAlmacenamiento.push(inv.StorageType);
                locacion.push(inv.StorageLocation);

                loader.style.display = 'none';
            });

            cargarFiltroAlmacenamiento(tipoAlmacenamiento);
            cargarFiltroLocacion(locacion);
        })
        .catch(error => {
            console.log(error);
        });

}

let cargarPaginacion = (longitudArrayInventario) => {

    let contadorPaginacion = 1;
    const ulPaginacion = document.getElementById('paginacion');

    for (let paginacion = 0; paginacion < longitudArrayInventario; paginacion += cantidadPaginacion) {

        let listaPaginacion = document.createElement('li');
        let enlacePaginacion = document.createElement('a');

        enlacePaginacion.innerText = contadorPaginacion;
        enlacePaginacion.setAttribute('onclick', `verCards(${paginacion})`);
        contadorPaginacion++;

        listaPaginacion.appendChild(enlacePaginacion);
        ulPaginacion.appendChild(listaPaginacion);
    }

}

let cargarFiltroAlmacenamiento = (tipoAlmacenamiento) => {

    let seccionFiltroAlmacenamiento = document.getElementById('filtro-tipo-almacenamiento-inv');

    eliminarDuplicados(tipoAlmacenamiento);
    tipoAlmacenamiento.forEach((tipo) => {

        let labelTipoAlmacenamiento = document.createElement('label');
        let checkTipoAlmacenamiento = document.createElement('input');

        checkTipoAlmacenamiento.setAttribute('class', 'uk-checkbox uk-margin-small-left uk-margin-medium-right');
        checkTipoAlmacenamiento.setAttribute('type', 'checkbox');
        /*checkTipoAlmacenamiento.setAttribute('onchange', `filtroAlmacenamiento("${tipo}")`);*/
        checkTipoAlmacenamiento.setAttribute('id', `${tipo}`);

        labelTipoAlmacenamiento.innerText = tipo;
        labelTipoAlmacenamiento.appendChild(checkTipoAlmacenamiento);

        seccionFiltroAlmacenamiento.appendChild(labelTipoAlmacenamiento);
    });
}

let cargarFiltroLocacion = (locacion) => {

    let seccionFiltroLocacion = document.getElementById('filtro-localizar');

    eliminarDuplicados(locacion);
    locacion.forEach((tipo) => {

        let labelTipoLocacion = document.createElement('label');
        let checkTipoLocacion = document.createElement('input');

        checkTipoLocacion.setAttribute('class', 'uk-checkbox uk-margin-small-left uk-margin-medium-right');
        checkTipoLocacion.setAttribute('type', 'checkbox');
        /*checkTipoAlmacenamiento.setAttribute('onchange', `filtroAlmacenamiento("${tipo}")`);*/
        checkTipoLocacion.setAttribute('id', `${tipo}`);

        labelTipoLocacion.innerText = tipo;
        labelTipoLocacion.appendChild(checkTipoLocacion);

        seccionFiltroLocacion.appendChild(labelTipoLocacion);
    });
}

let verCards = (limiteInferiorArray) => {

    contenedorInventario.innerHTML = '';
    let limiteSuperiorArray = limiteInferiorArray + 50;
    console.log(arrayGlobalInventario[50]);

    for (let x = limiteInferiorArray; x < limiteSuperiorArray; x++) {

        let card = document.createElement('div');
        let interiorCard = document.createElement('div');
        let tituloParte = document.createElement('h3');
        let parrafoMaterial = document.createElement('p');
        let parrafoDescMaterial = document.createElement('p');
        let total = document.createElement('p');
        let totalSuma = document.createElement('p');
        let divSumaTotal = document.createElement('div');
        let inv = arrayGlobalInventario[x];

        tituloParte.innerText = `${inv.StorageBin}`;
        parrafoMaterial.innerText = `${inv.Material}`;
        parrafoDescMaterial.innerText = `${inv.MaterialDesc}`;
        total.innerText = `${inv.TotalStock}`;
        totalSuma.innerText = `${inv.StockSuma}`;

        card.appendChild(interiorCard);
        interiorCard.appendChild(tituloParte);
        interiorCard.appendChild(parrafoMaterial);
        interiorCard.appendChild(parrafoDescMaterial);
        divSumaTotal.appendChild(total);
        divSumaTotal.appendChild(totalSuma);
        interiorCard.appendChild(divSumaTotal);

        divSumaTotal.setAttribute('class','flex-space');

        contenedorInventario.appendChild(card);
    }
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