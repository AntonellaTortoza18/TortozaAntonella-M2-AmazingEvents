async function getDatos() {
  try {
    let res = await fetch("https://mh-amazing.herokuapp.com/amazing");
    let data = await res.json();
    let events = data.events;
    // console.log(events);
    // EVENTOS PASADOS
    let pastEvents = events.filter((event) => data.date > event.date);
    // console.log(pastEvents);
    // filtro categorias de eventos pasados
    let categoriesEventsPast = pastEvents.map((event) => event.category);
    let categoriesEventsFilterPast = [...new Set(categoriesEventsPast)];

    // console.log(categoriesEventsFilterPast);
    // recorro el array de eventos pasados con map y le agrego dos nuevas propiedades a cada evento, percentage y gananciaReal.
    pastEvents.map((everyEvent) => {
      let assistance = everyEvent.assistance;
      let capacity = everyEvent.capacity;
      let percentage = ((assistance / capacity) * 100).toFixed(1);
      everyEvent.percentage = percentage;
      let gananciaReal = everyEvent.price * everyEvent.assistance;
      everyEvent.ganancia = gananciaReal;
    });

    // MAP + FILTER para obtener un array con los eventos de cada categoria. Se utiliza el map porque tengo que transformar el array de categorias en un array con los eventos de CADA CATEGORIA
    let arrayEventsPast = categoriesEventsFilterPast.map((cadaCategoria) => {
      let arrayFiltradoPast = pastEvents.filter(
        (cadaEvento) => cadaEvento.category === cadaCategoria
      );
      return reduceStatsPast(arrayFiltradoPast);
    });
    let ordenadoPorGananciaPast = [...arrayEventsPast].sort(
      (evento1, evento2) => evento2.ganancia - evento1.ganancia
    );
    tablePast(ordenadoPorGananciaPast);

    function reduceStatsPast(array) {
      let elemento0 = {
        category: "",
        ganancia: 0,
        capacity: 0,
        assistance: 0,
      };
      let statsPast = array.reduce((elemento1, elemento2) => {
        return {
          category: elemento2.category,
          ganancia: elemento1.ganancia + elemento2.ganancia,
          capacity: elemento1.capacity + elemento2.capacity,
          assistance: elemento1.assistance + elemento2.assistance,
        };
      }, elemento0);
      statsPast.percentage = (
        (100 * statsPast.assistance) /
        statsPast.capacity
      ).toFixed(1);
      // console.log(statsPast);
      return statsPast;
    }

    // Creo la variable ordenadoPorAsistencia que va a recorrer el array de eventos pasados con sort y este va a ordenar de menor a mayor los eventos segun su asistencia.
    let ordenadoPorAsistencia = [...pastEvents].sort(
      (evento1, evento2) => evento1.percentage - evento2.percentage
    );
    let mayorPorcentajeAsistencia =
      ordenadoPorAsistencia[ordenadoPorAsistencia.length - 1];
    let menorPorcentajeAsistencia = ordenadoPorAsistencia[0];

    // Creo la variable ordenadoPorCapacidad que va a recorrer el array de eventos pasados con sort y este va a ordenar de menor a mayor los eventos segun su capacidad.
    let ordenadoPorCapacidad = [...pastEvents].sort(
      (evento1, evento2) => evento1.capacity - evento2.capacity
    );
    let mayorCapacidad = ordenadoPorCapacidad[ordenadoPorCapacidad.length - 1];
    //  console.log(ordenadoPorCapacidad);

    //llamado de la funcion table1, que me va a imprimir la primer parte de la tabla
    table1(
      mayorPorcentajeAsistencia,
      menorPorcentajeAsistencia,
      mayorCapacidad
    );

    // EVENTOS FUTUROS
    let upcomingEvents = events.filter((event) => data.date < event.date);
    // console.log(upcomingEvents);

    // filtro categorias de eventos futuros
    let categoriesEventsUpcoming = upcomingEvents.map(
      (event) => event.category
    );
    let categoriesEventsFilterUpcoming = [...new Set(categoriesEventsUpcoming)];

    // recorro el array de eventos futuros con map y le agrego dos nuevas propiedades a cada evento, percentage y ganancia estimada.
    upcomingEvents.map((everyEvent) => {
      let estimate = everyEvent.estimate;
      let capacity = everyEvent.capacity;
      let percentageAssistEst = ((estimate / capacity) * 100).toFixed(1);
      everyEvent.percentage = percentageAssistEst;
      let gananciaEstimate = everyEvent.price * everyEvent.estimate;
      everyEvent.ganancia = gananciaEstimate;
    });

    // MAP + FILTER para obtener un array con los eventos de cada categoria. Se utiliza el map porque tengo que transformar el array de categorias en un array con los eventos de CADA CATEGORIA

    let arrayEventsUpcoming = categoriesEventsFilterUpcoming.map(
      (cadaCategoria) => {
        let arrayFiltradoUpcoming = upcomingEvents.filter(
          (cadaEvento) => cadaEvento.category === cadaCategoria
        );

        return reduceStatsUpcoming(arrayFiltradoUpcoming);
      }
    );
    let ordenadoPorGananciaUpcoming = [...arrayEventsUpcoming].sort(
      (evento1, evento2) => evento2.ganancia - evento1.ganancia
    );
    tableUpcoming(ordenadoPorGananciaUpcoming);

    function reduceStatsUpcoming(array) {
      let elemento0 = {
        category: "",
        ganancia: 0,
        capacity: 0,
        estimate: 0,
      };
      let statsUpcoming = array.reduce((elemento1, elemento2) => {
        return {
          category: elemento2.category,
          ganancia: elemento1.ganancia + elemento2.ganancia,
          capacity: elemento1.capacity + elemento2.capacity,
          estimate: elemento1.estimate + elemento2.estimate,
        };
      }, elemento0);
      statsUpcoming.percentage = (
        (100 * statsUpcoming.estimate) /
        statsUpcoming.capacity
      ).toFixed(1);
      // console.log(statsUpcoming);

      return statsUpcoming;
    }
  } catch (error) {
    console.log(error);
  }
}
getDatos();

function table1(maxP, minP, maxC) {
  let tableOne = document.getElementById("tableOne");
  tableOne.innerHTML += `
    <tr>
    <td>${maxP.name}: ${maxP.percentage}% of attendance </td>
    <td>${minP.name}: ${minP.percentage}% of attendance</td>
    <td>${maxC.name}: ${maxC.capacity} total capacity</td>
     </tr>
    `;
}

function tableUpcoming(array) {
  array.forEach((event) => {
    let tableUpcoming2 = document.getElementById("tableUpcoming");
    tableUpcoming2.innerHTML += `<tr>
    <td>${event.category}</td>
     <td>US$ ${event.ganancia}</td>
    <td>${event.percentage}%</td>
     </tr>`;
  });
}

function tablePast(array) {
  array.forEach((event) => {
    let tablePast2 = document.getElementById("tablePast");
    tablePast2.innerHTML += `<tr>
    <td>${event.category}</td>
     <td>US$ ${event.ganancia}</td>
    <td>${event.percentage}%</td>
     </tr>`;
  });
}
