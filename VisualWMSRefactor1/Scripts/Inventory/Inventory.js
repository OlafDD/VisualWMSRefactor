
const seccionFiltroAlmacenamiento = document.getElementById('filtro-tipo-almacenamiento-inv');
const seccionFiltroLocacion = document.getElementById('filtro-localizar');
const btnActualizar = document.getElementById('btnActualizar');
const cantidadPaginacion = 50;
let warehouse = document.getElementById('plantaTituloInventario');
let loader = document.getElementById('preloader_4');
let contenedorInventario = document.getElementById('inventario');
let tipoAlmacenamiento = [];
let locacion = [];
let arrayGlobalInventario = [];
let direccionAlmacenamiento = [];
let materialesEliminar = [];
let filtros = {
    almacenamiento: [],
    locacion: []
};
let inicioCardsInventario = 0;
let planta;

window.onload = function () {

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    planta = urlParams.get('idp');

    //Nombre título warehouse
    warehouse.innerHTML = `INVENTORY ${planta}`;

    contenedorInventario.setAttribute('class', 'uk-grid-column-small uk-grid-row-large uk-child-width-1-5@s uk-text-center');
    contenedorInventario.setAttribute('uk-grid', '');

    cargarInventario();
}

let cargarInventario = async () => {

    tipoAlmacenamiento = [];
    locacion = [];
    arrayGlobalInventario = [];
    direccionAlmacenamiento = [];
    materialesEliminar = [];
    filtros = {
        almacenamiento: [],
        locacion: []
    };
    inicioCardsInventario = 0;

    loader.style.display = 'flex';

    contenedorInventario.innerHTML = '';
    seccionFiltroAlmacenamiento.innerHTML = '';
    seccionFiltroLocacion.innerHTML = '';

    btnActualizar.disabled = true;

    await axios.get(`/Inventory/ObtenerInventario?planta=${planta}`)
        .then(response => {

            let inventario = response.data;

            console.log(inventario);

            arrayGlobalInventario = inventario;
            inventario.forEach(function (inv) {

                tipoAlmacenamiento.push(inv.StorageType);
                locacion.push(inv.StorageLocation);

                //Llenar array de locacion almacenamiento con los diferentes

                if (!direccionAlmacenamiento.includes(inv.StorageBin)) {

                    direccionAlmacenamiento.push(inv.StorageBin);
                    materialesEliminar = [];

                    for (let x = arrayGlobalInventario.length - 1; x > 0; x--) {

                        if (arrayGlobalInventario[x].StorageBin === inv.StorageBin) {
                            if (materialesEliminar.includes(arrayGlobalInventario[x].Material))
                                arrayGlobalInventario.splice(x, 1);

                            else
                                materialesEliminar.push(arrayGlobalInventario[x].Material);

                        }
                    }
                }
            });

            //cargarPaginacion(arrayGlobalInventario.length);
            cargarFiltroAlmacenamiento(tipoAlmacenamiento);
            cargarFiltroLocacion(locacion);

            filtros.almacenamiento = tipoAlmacenamiento;
            filtros.locacion = locacion;

            verCards();
            checkFiltros();
            btnActualizar.disabled = false;
            loader.style.display = 'none';
        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
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

    eliminarDuplicados(tipoAlmacenamiento);
    tipoAlmacenamiento.forEach((tipo) => {

        let labelTipoAlmacenamiento = document.createElement('label');
        let checkTipoAlmacenamiento = document.createElement('input');

        checkTipoAlmacenamiento.setAttribute('class', 'uk-checkbox uk-margin-small-left uk-margin-medium-right');
        checkTipoAlmacenamiento.setAttribute('type', 'checkbox');
        checkTipoAlmacenamiento.setAttribute('id', `${tipo}`);
        checkTipoAlmacenamiento.setAttribute('onclick', `filtroAlmacenamiento('${tipo}')`);

        labelTipoAlmacenamiento.innerText = tipo;
        labelTipoAlmacenamiento.appendChild(checkTipoAlmacenamiento);

        seccionFiltroAlmacenamiento.appendChild(labelTipoAlmacenamiento);
    });
}

let cargarFiltroLocacion = (locacion) => {

    eliminarDuplicados(locacion);
    locacion.forEach((tipo) => {

        let labelTipoLocacion = document.createElement('label');
        let checkTipoLocacion = document.createElement('input');

        checkTipoLocacion.setAttribute('class', 'uk-checkbox uk-margin-small-left uk-margin-medium-right');
        checkTipoLocacion.setAttribute('type', 'checkbox');
        checkTipoLocacion.setAttribute('id', `${tipo}`);
        checkTipoLocacion.setAttribute('onclick', `filtroLocacion('${tipo}')`);

        labelTipoLocacion.innerText = tipo;
        labelTipoLocacion.appendChild(checkTipoLocacion);

        seccionFiltroLocacion.appendChild(labelTipoLocacion);
    });
}

let verCards = (/*limiteInferiorArray*/) => {

    contenedorInventario.innerHTML = '';
    //let limiteSuperiorArray = limiteInferiorArray + 50;

    //if (limiteSuperiorArray > arrayGlobalInventario.length) limiteSuperiorArray = arrayGlobalInventario.length;

    //inicioCardsInventario = limiteInferiorArray;

    //filtros.almacenamiento = tipoAlmacenamiento;
    //filtros.locacion = locacion;

    for (let x = 0; x < arrayGlobalInventario.length; x++) {

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
        total.innerText = `${inv.StockPut}`;
        totalSuma.innerText = `${inv.StockSuma}`;

        card.appendChild(interiorCard);
        interiorCard.appendChild(tituloParte);
        interiorCard.appendChild(parrafoMaterial);
        interiorCard.appendChild(parrafoDescMaterial);
        divSumaTotal.appendChild(total);
        divSumaTotal.appendChild(totalSuma);
        interiorCard.appendChild(divSumaTotal);

        tituloParte.setAttribute('class', 'wms-color-secundario-letra wms-material-hover');
        tituloParte.setAttribute('onclick', `verPartesIguales('${inv.StorageBin}','${inv.Material}','${planta}')`);
        divSumaTotal.setAttribute('class', 'flex-space');
        totalSuma.setAttribute('class', 'margin-total');
        interiorCard.setAttribute('class', 'wms-borde-card');
        card.setAttribute('class', `${inv.StorageType} ${inv.StorageLocation}`);

        contenedorInventario.appendChild(card);
    }
}

let filtroAlmacenamiento = (tipoAlmacenamiento) => {

    let checkBox = document.getElementById(tipoAlmacenamiento);
    let hijosInventario = contenedorInventario.childNodes;

    if (checkBox.checked) {
        filtros.almacenamiento.push(tipoAlmacenamiento);
    }
    else {
        filtros.almacenamiento = filtros.almacenamiento.filter(filtro => filtro != tipoAlmacenamiento);
    }

    for (let x = 0; x < hijosInventario.length; x++) {

        let claseAlmacenamiento = false;
        let claseLocacion = false;
        let nombreClaseAlmacenamiento = hijosInventario[x].className.split(" ")[0];
        let nombreClaseLocacion = hijosInventario[x].className.split(" ")[1];

        filtros.almacenamiento.forEach((filtro) => {
            if (nombreClaseAlmacenamiento === filtro)
                claseAlmacenamiento = true;
        });
        filtros.locacion.forEach((filtro) => {
            if (nombreClaseLocacion === filtro)
                claseLocacion = true;
        })
        if (claseAlmacenamiento && claseLocacion)
            hijosInventario[x].style.display = 'block';
        else
            hijosInventario[x].style.display = 'none';
    }
    console.log(filtros);
}

let filtroLocacion = (locacionAlmacenamiento) => {

    let checkBox = document.getElementById(locacionAlmacenamiento);
    let hijosInventario = contenedorInventario.childNodes;

    if (checkBox.checked) {
        filtros.locacion.push(locacionAlmacenamiento);
    }
    else {
        filtros.locacion = filtros.locacion.filter(filtro => filtro != locacionAlmacenamiento);
    }

    for (let x = 0; x < hijosInventario.length; x++) {

        let claseAlmacenamiento = false;
        let claseLocacion = false;
        let nombreClaseAlmacenamiento = hijosInventario[x].className.split(" ")[0];
        let nombreClaseLocacion = hijosInventario[x].className.split(" ")[1];

        filtros.almacenamiento.forEach((filtro) => {
            if (nombreClaseAlmacenamiento === filtro)
                claseAlmacenamiento = true;
        });
        filtros.locacion.forEach((filtro) => {
            if (nombreClaseLocacion === filtro)
                claseLocacion = true;
        })
        if (claseAlmacenamiento && claseLocacion)
            hijosInventario[x].style.display = 'block';
        else
            hijosInventario[x].style.display = 'none';
    }
    console.log(filtros);
}

let checkFiltros = () => {

    locacion.forEach((loc) => {
        document.getElementById(loc).checked = true;
    });

    tipoAlmacenamiento.forEach((tipo) => {
        document.getElementById(tipo).checked = true;
    });

}

let uncheckFiltros = () => {

    locacion.forEach((loc) => {
        document.getElementById(loc).checked = false;
    });

    tipoAlmacenamiento.forEach((tipo) => {
        document.getElementById(tipo).checked = false;
    });

}

let checkTodo = () => {
    let checkTodo = document.getElementById('checkTodo');
    let hijosInventario = contenedorInventario.childNodes;

    if (checkTodo.checked) {
        checkFiltros();
        filtros.almacenamiento = tipoAlmacenamiento;
        filtros.locacion = locacion;
        for (let x = 0; x < hijosInventario.length; x++) {
            hijosInventario[x].style.display = 'block';
        }
    }
    else {
        uncheckFiltros();
        filtros.almacenamiento = [];
        filtros.locacion = [];
        for (let x = 0; x < hijosInventario.length; x++) {
            hijosInventario[x].style.display = 'none';
        }
    }
    console.log(filtros);


}

let verPartesIguales = async (nombreParte, material, planta) => {

    let modalTablaInventario = document.getElementById('modal-parte-inv');
    let bodyTablaIgualesParte = document.getElementById('tbodyTabla');

    bodyTablaIgualesParte.innerHTML = '';

    await axios.get(`/Inventory/ObtenerPartesIguales?planta=${planta}&material=${material}&parte=${nombreParte}`)
        .then(response => {
            partesIguales = response.data;

            console.log(partesIguales);

            partesIguales.forEach((inv) => {

                let tr = document.createElement('tr');
                let tdTitulo = document.createElement('td');
                let tdMaterial = document.createElement('td');
                let tdMaterialDescripcion = document.createElement('td');
                let tdTotal = document.createElement('td');
                let tdTotalStock = document.createElement('td');
                let grNumber = document.createElement('td');
                let tdUnidadAlmacen = document.createElement('td');

                tdTitulo.innerText = inv.StorageBin;
                tdMaterial.innerText = inv.Material;
                tdMaterialDescripcion.innerText = inv.MaterialDesc;
                tdTotal.innerText = inv.TotalStock;
                tdTotalStock.innerText = inv.StockSuma;
                grNumber.innerText = inv.GrNumber;
                tdUnidadAlmacen.innerText = inv.StorageUnit;

                tr.appendChild(tdTitulo);
                tr.appendChild(tdMaterial);
                tr.appendChild(tdMaterialDescripcion);
                tr.appendChild(tdTotal);
                tr.appendChild(tdTotalStock);
                tr.appendChild(grNumber);
                tr.appendChild(tdUnidadAlmacen);

                bodyTablaIgualesParte.appendChild(tr);
            });

        })
        .catch(error => {
            console.log(error);
        });

    UIkit.modal(modalTablaInventario).show();
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
