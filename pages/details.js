let container18 = document.getElementById("container18");

async function getDatos (){
  try {
   let id = location.search.slice(4);
   let res = await fetch(`https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events/${id}`)
   let data = await res.json()
   console.log(data);
   let events = data
   console.log(events);
   let date = data.date
  console.log(date);
   createCardDetails(events)
  
} catch(error) {
  console.log(error)
}
}
getDatos()


function createCardDetails(event) {
  let div = document.createElement("div");
    div.className = "row g-0";
    div.innerHTML = `
          <div class="col-md-5">
          <img
            src="${event.image}"
            class="img-fluid rounded-start"
            style="height: 100%; object-fit: cover; width: 100%"
            alt="${event.description}"
          />
        </div>
        <div class="col-md-7 card-body">
            <h5 class="card-title">${event.name}</h5>
            <p>Date: ${event.date}</p>
            <p class="card-text">
              ${event.description}
            </p>
            <p>Place: ${event.place}</p>
            <p>Capacity: ${event.capacity}</p>
            <p>Assistance: ${event.assistance || event.estimate + " Estimate"}</p>
            <p class="price">Price: US$${event.price}</p>
        </div>
                `;
    container18.appendChild(div);
}