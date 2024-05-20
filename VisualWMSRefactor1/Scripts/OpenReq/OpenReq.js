let warehouse = document.getElementById('plantaTitulo');
let loader = document.getElementById('preloader_4');
const contenedorRequerimientos = document.getElementById('requerimientos');
const modalQR = document.getElementById('modal-qr');
const selectFiltro = document.getElementById('selectFiltro');
let tipoAlmacenamiento;
let idCardCompletada;
let planta;

let filtroAlmacenamientoReq = [];
let material = [];

window.onload = function () {

    contenedorRequerimientos.setAttribute('class', 'uk-grid-column-small uk-grid-row-large uk-child-width-1-5@s uk-text-center');
    contenedorRequerimientos.setAttribute('uk-grid', '');
    cargarRequerimientos();
}

let cargarFiltro = () => {

    if (selectFiltro.value === 'todo') cargarTodoRequerimientos();
    if (selectFiltro.value === '24') cargarRequerimientos();

}

let cargarRequerimientos = async () => {

    let fechaHace24Horas = moment().subtract(1, 'days').format('LLL');
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    planta = urlParams.get('idp');
    tipoAlmacenamiento = [];
    material = [];

    //Nombre título warehouse
    warehouse.innerHTML = `OPEN REQUEST / ORDENES ABIERTAS ${planta}`;

    await axios.get(`/OpenReq/ObtenerRequerimientos?fechaLimiteInferior=${fechaHace24Horas}&planta=${planta}`)
        .then(response => {

            let requerimientos = response.data;

            contenedorRequerimientos.innerHTML = '';

            loader.style.display = 'flex';
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

                interiorCard.setAttribute('class', `${req.DestStoryType} ${req.DestStorBin} wms-borde-card`);
                interiorCard.setAttribute('id', `${req.ID}`);
                tituloParte.setAttribute('class', 'wms-color-secundario-letra');
                parrafoMaterial.setAttribute('onclick', `generarQR("${req.Material.MatNR}","${req.DestStorBin}","${req.ID}")`);
                parrafoMaterial.setAttribute('class', 'wms-material-hover');

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
                material.push(req.DestStorBin);

            });

            filtroAlmacenamientoReq = tipoAlmacenamiento;
            filtroMaterial = material;

            cargarFiltroAlmacenamiento(tipoAlmacenamiento);
            cargarFiltroMaterial(filtroMaterial);

            loader.style.display = 'none';
            lastUpdate();
        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
        });
}

let cargarTodoRequerimientos = async () => {


    tipoAlmacenamiento = [];
    material = [];

    loader.style.display = 'flex';

    await axios.get(`/OpenReq/ObtenerTodo?planta=${planta}`)
        .then(response => {

            let requerimientos = response.data;

            contenedorRequerimientos.innerHTML = '';

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

                interiorCard.setAttribute('class', `${req.DestStoryType} ${req.DestStorBin} wms-borde-card`);
                interiorCard.setAttribute('id', `${req.ID}`);
                tituloParte.setAttribute('class', 'wms-color-secundario-letra');
                parrafoMaterial.setAttribute('onclick', `generarQR("${req.Material.MatNR}","${req.DestStorBin}","${req.ID}")`);
                parrafoMaterial.setAttribute('class', 'wms-material-hover');

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
                material.push(req.DestStorBin);

            });

            filtroAlmacenamientoReq = tipoAlmacenamiento;
            filtroMaterial = material;

            cargarFiltroAlmacenamiento(tipoAlmacenamiento);
            cargarFiltroMaterial(filtroMaterial);

            lastUpdate();
            loader.style.display = 'none';
        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
        });
}

let cargarFiltroAlmacenamiento = (tipoAlmacenamiento) => {

    let seccionFiltroAlmacenamiento = document.getElementById('filtro-tipo-almacenamiento');

    seccionFiltroAlmacenamiento.innerHTML = '';

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

let cargarFiltroMaterial = (material) => {

    let selectFiltroMaterial = document.getElementById('filtroMaterialSelectOR');

    selectFiltroMaterial.innerHTML = '';

    let opMaterial = document.createElement('option');

    opMaterial.setAttribute('id', `Reset`);
    opMaterial.innerText = 'Reset';

    selectFiltroMaterial.appendChild(opMaterial);

    eliminarDuplicados(material);
    material.forEach((mat) => {

        let opMaterial = document.createElement('option');

        opMaterial.setAttribute('id', `${mat}`);
        opMaterial.innerText = mat;

        selectFiltroMaterial.appendChild(opMaterial);
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

    let checkBox = document.getElementById(tipoAlmacenamiento);
    let hijosInventario = contenedorRequerimientos.childNodes;
    let materialItem = document.getElementById('filtroMaterialSelectOR').value;
    let matFiltro = [];

    if (checkBox.checked) {
        filtroAlmacenamientoReq.push(tipoAlmacenamiento);
    }
    else {
        filtroAlmacenamientoReq = filtroAlmacenamientoReq.filter(filtro => filtro != tipoAlmacenamiento);
    }


    for (let x = 0; x < hijosInventario.length; x++) {

        let claseAlmacenamiento = false;

        let nombreClaseAlmacenamiento = hijosInventario[x].firstChild.className.split(" ")[0];
        let nombreClaseMaterial = hijosInventario[x].firstChild.className.split(" ")[1];

        filtroAlmacenamientoReq.forEach((filtro) => {
            if (nombreClaseAlmacenamiento === filtro)
                claseAlmacenamiento = true;
        });

        if (claseAlmacenamiento) {
            hijosInventario[x].style.display = 'block';
            matFiltro.push(nombreClaseMaterial);
        }
        else
            hijosInventario[x].style.display = 'none';
    }
    cargarFiltroMaterial(matFiltro);
}

let filtroMaterialFunc = () => {

    let hijosInventario = contenedorRequerimientos.childNodes;
    let materialItem = document.getElementById('filtroMaterialSelectOR').value;

    if (materialItem === 'Reset') {
        for (let x = 0; x < hijosInventario.length; x++) {

            let claseAlmacenamiento = false;

            let nombreClaseAlmacenamiento = hijosInventario[x].firstChild.className.split(" ")[0];

            filtroAlmacenamientoReq.forEach((filtro) => {
                if (nombreClaseAlmacenamiento === filtro)
                    claseAlmacenamiento = true;
            });

            if (claseAlmacenamiento)
                hijosInventario[x].style.display = 'block';
            else
                hijosInventario[x].style.display = 'none';
        }
    }
    else {
        for (let x = 0; x < hijosInventario.length; x++) {

            let claseAlmacenamiento = false;
            let claseMaterial = false;

            let nombreClaseAlmacenamiento = hijosInventario[x].firstChild.className.split(" ")[0];
            let nombreClaseMaterial = hijosInventario[x].firstChild.className.split(" ")[1];

            filtroAlmacenamientoReq.forEach((filtro) => {
                if (nombreClaseAlmacenamiento === filtro)
                    claseAlmacenamiento = true;
            });
            if (nombreClaseMaterial === materialItem)
                claseMaterial = true;

            if (claseAlmacenamiento && claseMaterial)
                hijosInventario[x].style.display = 'block';
            else
                hijosInventario[x].style.display = 'none';
        }
    }

}

let generarQR = (material, parte, idRequerimiento) => {

    let divQR = document.getElementById('qrcode');
    let pQR = document.getElementById('qr-p');
    let pMaterial = document.getElementById('material-p');
    let pParte = document.getElementById('parte-p');
    let cadenaQR = `Y${parte}\t\tP${material}`;

    divQR.innerHTML = '';
    var qrcode = new QRCode("qrcode");

    qrcode.makeCode(cadenaQR);

    pQR.innerText = `QR: ${cadenaQR}`
    pMaterial.innerText = `Material: ${material}`;
    pParte.innerText = `Part: ${parte}`;

    idCardCompletada = idRequerimiento;

    UIkit.modal(modalQR).show();
}

let completarRequerimiento = () => {

    let cardCompletadaVerde = document.getElementById(idCardCompletada);

    cardCompletadaVerde.style.backgroundColor = '#49ff49';
    UIkit.modal(modalQR).hide();
    UIkit.notification("Requirement completed...", "success");
}

let lastUpdate = () => {

    const parrafoActualizacion = document.getElementById('lastUpdateOR');

    axios.get(`/OpenReq/ObtenerUltimaActualizacion`)
        .then(response => {
            utimaActualizacion = response.data;

            console.log(utimaActualizacion);

            parrafoActualizacion.innerHTML = '';
            parrafoActualizacion.innerHTML = utimaActualizacion;
        })
        .catch(error => {
            console.log(error);
        });
}