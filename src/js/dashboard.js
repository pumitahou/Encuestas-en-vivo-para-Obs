const formulario = document.getElementById("formulario");
const tagsection = document.getElementById("tagsavaible");
const nametag = document.getElementById("nametag");
tagsection === null || tagsection === void 0 ? void 0 : tagsection.classList.add("tagsavaible");
formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener("submit", e => {
    e.preventDefault();
    console.log(nametag === null || nametag === void 0 ? void 0 : nametag.value);
    const data = {
        nametag: nametag === null || nametag === void 0 ? void 0 : nametag.value
    };
    sendformu(data);
});
function sendformu(data) {
    fetch(`${window.location.origin}/maketag`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(function (res) {
        res.text().then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}
function settagOnSection() {
    fetch(`${window.location.origin}/getAllTags`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
        res.text().then(lista => {
            let jsonlist = JSON.parse(lista);
            for (let i = 0; i < jsonlist.length; i++) {
                /*
                la idea es que cree un
                <div>
                    <div><p>Detalles</p></div>
                    <div>deleteButton</div>
                </div>
                */
                let gadet = jsonlist[i];
                let TAG = document.createElement('DIV');
                let divParrafo = document.createElement('DIV');
                let botonBorrar = document.createElement('DIV');
                let parrafo = document.createElement('P');
                TAG.classList.add("elemento");
                parrafo.classList.add("text-white");
                parrafo.innerText = `${window.location.origin}/gadet?${gadet["uuid"]}`;
                divParrafo.appendChild(parrafo);
                TAG.appendChild(divParrafo);
                TAG.appendChild(botonBorrar);
                tagsection === null || tagsection === void 0 ? void 0 : tagsection.appendChild(TAG);
                console.log(jsonlist[i]);
            }
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}
settagOnSection();