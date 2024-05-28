const warehouse = document.getElementById('plantaTituloMinMax');
const loader = document.getElementById('preloader_4');
const tbody = document.getElementById('bodyMinMax');

window.onload = function () {

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    planta = urlParams.get('idp');

    //Nombre título warehouse
    warehouse.innerHTML = `MIN & MAX ${planta}`;

    cargarMinMax();
    lastUpdate();
}

let cargarMinMax = async () => {

    await axios.get(`/Receiving/ObtenerMinMax?planta=${planta}`)
        .then(response => {

            let minMax = response.data;
            console.log(minMax);

            minMax.forEach((mm) => {

                let tr = document.createElement('tr');
                let tdWareHouse = document.createElement('td');
                let tdStorageBin = document.createElement('td');
                let tdMaterial = document.createElement('td');
                let tdMinimum = document.createElement('td');
                let tdMaximum = document.createElement('td');
                let tdTotalStock = document.createElement('td');

                tdWareHouse.innerText = mm.Max_Warehouse;
                tdStorageBin.innerText = mm.Max_Storage_Bin;
                tdMaterial.innerText = mm.Max_Material;
                tdMinimum.innerText = mm.Max_Minimum_Bin_Qty;
                tdMaximum.innerText = mm.Max_Maximum_Bin_Qty;
                tdTotalStock.innerText = mm.Total_Stock;

                tr.appendChild(tdWareHouse);
                tr.appendChild(tdStorageBin);
                tr.appendChild(tdMaterial);
                tr.appendChild(tdMinimum);
                tr.appendChild(tdMaximum);
                tr.appendChild(tdTotalStock);

                //Validacion de colores de total stock

                if (mm.Total_Stock > mm.Max_Minimum_Bin_Qty && mm.Total_Stock < mm.Max_Maximum_Bin_Qty)
                    tdTotalStock.setAttribute('class', 'wms-verde');
                else if (mm.Total_Stock <= mm.Max_Minimum_Bin_Qty)
                    tdTotalStock.setAttribute('class', 'wms-rojo');
                else if (mm.Total_Stock >= mm.Max_Maximum_Bin_Qty)
                    tdTotalStock.setAttribute('class', 'wms-amarillo');

                tbody.appendChild(tr);
            });
            loader.style.display = 'none';

        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
        });

}

let filtrarMinMax = async () => {

    let filtroMaterial = document.getElementById('material-filtro').value;
    let filtroBin = document.getElementById('bin-filtro').value;

    await axios.get(`/Receiving/ObtenerMinMaxFiltro?planta=${planta}&material=${filtroMaterial}&bin=${filtroBin}`)
        .then(response => {

            let minMax = response.data;
            console.log(minMax);

            tbody.innerHTML = '';

            minMax.forEach((mm) => {

                let tr = document.createElement('tr');
                let tdWareHouse = document.createElement('td');
                let tdStorageBin = document.createElement('td');
                let tdMaterial = document.createElement('td');
                let tdMinimum = document.createElement('td');
                let tdMaximum = document.createElement('td');
                let tdTotalStock = document.createElement('td');

                tdWareHouse.innerText = mm.Max_Warehouse;
                tdStorageBin.innerText = mm.Max_Storage_Bin;
                tdMaterial.innerText = mm.Max_Material;
                tdMinimum.innerText = mm.Max_Minimum_Bin_Qty;
                tdMaximum.innerText = mm.Max_Maximum_Bin_Qty;
                tdTotalStock.innerText = mm.Total_Stock;

                tr.appendChild(tdWareHouse);
                tr.appendChild(tdStorageBin);
                tr.appendChild(tdMaterial);
                tr.appendChild(tdMinimum);
                tr.appendChild(tdMaximum);
                tr.appendChild(tdTotalStock);

                //Validacion de colores de total stock

                if (mm.Total_Stock > mm.Max_Minimum_Bin_Qty && mm.Total_Stock < mm.Max_Maximum_Bin_Qty) {
                    tdTotalStock.setAttribute('class', 'wms-verde');
                    tdTotalStock.style.color = '#000000';
                }

                else if (mm.Total_Stock <= mm.Max_Minimum_Bin_Qty) {
                    tdTotalStock.setAttribute('class', 'wms-rojo ');
                    tdTotalStock.style.color = '#FFFFFF';
                }

                else if (mm.Total_Stock >= mm.Max_Maximum_Bin_Qty) {
                    tdTotalStock.setAttribute('class', 'wms-amarillo');
                    tdTotalStock.style.color = '#000000';
                }


                tbody.appendChild(tr);
            });

        })
        .catch(error => {
            console.log(error);
        });
    lastUpdate();
}

let lastUpdate = () => {

    const parrafoActualizacion = document.getElementById('lastUpdateMinMax');

    axios.get(`/Inventory/ObtenerUltimaActualizacion`)
        .then(response => {
            utimaActualizacion = response.data;

            parrafoActualizacion.innerHTML = '';
            parrafoActualizacion.innerHTML = utimaActualizacion;
        })
        .catch(error => {
            console.log(error);
        });
}