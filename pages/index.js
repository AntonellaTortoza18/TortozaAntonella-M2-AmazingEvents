getDatos();

async function getDatos() {
  try {
    let res = await fetch("https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events");
    let data = await res.json();
    let events = data;

    // createCards(events, "events");
    createCards(events)
    createCheckBoxes(events);

    const checkBoxes = document.querySelectorAll(".form-check-input");

    checkBoxes.forEach((checks) => {
      checks.addEventListener("click", (event) => {
        let checked = event.target.checked;
        console.log(checked);
        if (checked) {
          checksSelected.push(event.target.value);
          console.log(checksSelected);
          filtradoCombinadoCyS(events);
          console.log(checksSelected);
        } else {
          checksSelected = checksSelected.filter(
            (uncheck) => uncheck !== event.target.value
          );
          filtradoCombinadoCyS(events);
        }
      });
    });

    let inputSearch = document.getElementById("js-search");
    inputSearch.addEventListener("keyup", function (evento) {
      searchText = evento.target.value;
      filtradoCombinadoCyS(events);
    });
  }catch(error) {
    console.log(error)
}
}

let checksSelected = [];
let searchText = "";

let container18 = document.getElementById("container18");
let containerCheckBoxes = document.getElementById("js-container-check");

function createCards(data) {
  container18.innerHTML = "";
  if (data.length > 0) {
    data.forEach((events) => {
      let div = document.createElement("div");
      div.className = "card card1";
      div.innerHTML = `
            <img src="${events.image}" class="imgcard card-img-top"  alt:"${events.name}"/>
            <div class="card-body d-flex flex-column align-items-center text-center justify-content-between">
              <h5 class="card-title">${events.name}</h5>
              <p class="card-text">
              ${events.description}
              </p>
              <p class="price">Price: US$${events.price}</p>
              <a href="../pages/details.html?id=${events._id}"  class="btn btn-dark">Read More ></a>
            </div>
            `;
      container18.appendChild(div);
    });
  } else {
    container18.innerHTML = ` 
    <div class=container-message><img src="${"https://cdn.boletius.com/images/v3/search.png"}" class="img-message"  alt:"${"Event not found"}"/>
    <p id="message"> Event not found, adjust search filter! </p>
    </div>`;
  }
}

//FILTRADO DE CATEGORIAS Y ELIMINACION DE DUPLICADOS:

//Recorro el array de eventos con map y separo de este la propiedad categorias.
// console.log(categoriesEvents);
//Dado que al recorrer el array anterior me va a dar todas las categorias, con el metodo set elimino las repetidas y dejo solo el primer elemento encontrado, el resto lo descarta y guardo el dato obtenido con el metodo anterior en la variable categoriesEventsFilter.
// let categoriesEventsFilter = [...new Set(categoriesEvents)];

//CREACION DE CHECKBOX DINAMICOS: declaro dentro de la funcion createCheckBoxes la variable vacia checkContainer, luego con la funcion forEach recorro categoriesEventsFilter, que son las categorias que habia filtrado anteriormente, para que pueda recoorer el array completo y utilice el parametro categoria para que en cada vuelta del forEacg aloje en checContainer el templete, luego llamo al dom, al elemento padre, que es containerCheckBoxes y le imprimo el contenido de checkContainer. .

function createCheckBoxes(array) {
  let categoriesEvents = array.map((event) => event.category);
  console.log(categoriesEvents);
  let categoriesEventsFilter = [...new Set(categoriesEvents)];
  console.log(categoriesEventsFilter);
  checkContainer = "";
  categoriesEventsFilter.forEach((categoria) => {
    checkContainer += `
        <div class="form-check form-check-inline" >
                  <input
                    class="form-check-input"
                    type="checkbox" 
                    value="${categoria}"  id="${categoria}"
                  />
                  <label class="form-check-label" for="${categoria}"
                    >${categoria}</label
                  >
                </div>
        `;
  });
  containerCheckBoxes.innerHTML = checkContainer;
}

//APLICACION DE ESCUCHADOR DE EVENTOS A LOS CHECKBOX: creo la variable checksSelected para poder guardar los eventos con clickeo o desclickeo, luego llamo a todos los elementos input con su clase y los guardo en una constante checBoxes para luego usarlos en la funcion.

//Con forEach recorro el array checBoxes que almacena todos los input, para aplicarle a c/u de sus checks un escuchador de eventos de tipo click, y creo un condicional, en el cual establezco que al escuchar click, es decir true, se ingrese el valor del evento mediante el push al array que habia dejado vacio de checksSelected, y que de lo contrario lo filtre.
// En cada condicional, sea true o false, llamo a la funcion de filtradoCombinadoCyS que me traera el contenido correspondiente.
// esta funcion queda guardada en checksSelected para usarla en el filtrado.

//APLICACION DE ESCUCHADOR DE EVENTOS A LA BARRA SEARCH: creo una variable vacia de tipo string, llamada searchText para guardar los eventos de tipo keyup. Luego llamo y guardo el elemento (js-search) en la variable variable inputSearch, para usarlos en la funcion.

//CREACION DE LA FUNCION DE FILTRADO COMBINANDO LOS EVENTOS DE CHECKBOX Y SEARCH:
//POR ULTIMO EJECUTO LA FUNCION CON SU LLAMDADO.
function filtradoCombinadoCyS(array) {
  let datos = [];

  if (checksSelected.length > 0 && searchText !== "") {
    checksSelected.map((categoria) =>
      datos.push(
        ...array.filter(
          (evento) =>
            evento.name
              .toLowerCase()
              .includes(searchText.trim().toLowerCase()) &&
            evento.category == categoria
        )
      )
    );
  } else if (checksSelected.length > 0 && searchText == "") {
    checksSelected.map((categoria) =>
      datos.push(...array.filter((evento) => evento.category == categoria))
    );
  } else if (checksSelected.length == 0 && searchText !== "") {
    datos.push(
      ...array.filter(
        (evento) =>
          evento.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          evento.category
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
      )
    );
  } else {
    datos.push(...array);
  }
  createCards(datos);
}

//  alt + 96 backticks
// alt + 39 '' comillas simples
