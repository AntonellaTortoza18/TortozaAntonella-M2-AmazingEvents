async function getDatos (){
  try {
 
   let res = await fetch("https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events")
   let data = await res.json()
   const currentDate = "2022-01-01"
   let upcomingEvents = data.filter((event) => currentDate < event.date);
   createCards(upcomingEvents) 
   createCheckBoxes(upcomingEvents)
  
   const checkBoxes = document.querySelectorAll(".form-check-input");
   checkBoxes.forEach((checks) => {
    checks.addEventListener("click", (event) => {
      let checked = event.target.checked;
      if (checked) {
        checksSelected.push(event.target.value);
        filtradoCombinadoCyS(upcomingEvents);
      } else {
        checksSelected = checksSelected.filter(
          (uncheck) => uncheck !== event.target.value
        );
        filtradoCombinadoCyS(upcomingEvents);
      }
    });
  });

   let inputSearch = document.getElementById("js-search");
   inputSearch.addEventListener("input", function (evento) {
     searchText = evento.target.value;
     filtradoCombinadoCyS(upcomingEvents);
   });

} catch(error) {
  console.log(error)
}
}
getDatos()


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
              <a href="../pages/details.html?id=${events._id}" class="btn btn-dark">Read More ></a>
            </div>
            `;
      container18.appendChild(div);
    });
  }else {
    container18.innerHTML = ` 
    <div class=container-message><img src="${"https://cdn.boletius.com/images/v3/search.png"}" class="img-message"  alt:"${"Event not found"}"/>
    <p id="message"> Event not found, adjust search filter! </p>
    </div>`;
  }
}



function createCheckBoxes(array) {
  let categoriesEvents = array.map((event) => event.category);
let categoriesEventsFilter = [...new Set(categoriesEvents)];
  checkContainer = "";
  categoriesEventsFilter.forEach((categoria) => {
    checkContainer += `
        <div class="form-check form-check-inline" >
                  <input
                    class="form-check-input"
                    type="checkbox" 
                    value="${categoria}"  id="inlineCheckbox1"
                  />
                  <label class="form-check-label" for="inlineCheckbox1"
                    >${categoria}</label
                  >
                </div>
        `;
  });
  containerCheckBoxes.innerHTML = checkContainer;
}

let checksSelected = [];
let searchText = "";


//CREACION DE LA FUNCION DE FILTRADO COMBINANDO LOS EVENTOS DE CHECKBOX Y SEARCH
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
      datos.push(
        ...array.filter((evento) => evento.category == categoria)
      )
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

