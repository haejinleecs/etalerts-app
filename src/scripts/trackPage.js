const mainContainer = document.getElementsByClassName("flight-container"); // main container storing user and friends' flight data
const userContainer = document.getElementById("user-container"); // div that stores user's flight data
const friendContainer = document.getElementById("friend-container"); // div that stores friends' flight data
const user = JSON.parse(sessionStorage.getItem('User'));

function loadUserFlights() {
  let flight = document.createElement("div"); // create HTML elements for each flight f that user is tracking
  flight.classList.add("container-md"); // create medium container for each user flight f
  userContainer.appendChild(flight);

  // create name element
  let name = document.createElement("h2");
  if("flightCode" in user){
    name.innerHTML = `Flight ${user.flightCode}`; // Flight #flightInfo
    name.classList.add("name"); // add name class to element
    flight.appendChild(name); // append to the container

    let tableAndButton = document.createElement("div");
    tableAndButton.classList.add("info-button")
    flight.appendChild(tableAndButton);

    // create table to display flight info
    let table = document.createElement("table");
    tableAndButton.appendChild(table); // append table to the contianer
    table.classList.add("table","borderless"); // add class

    // Create row element for headings
    let headings = table.insertRow(-1);
    // Create cells
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");

    // Insert data to cells
    c1.innerHTML = "Departure";
    c2.innerHTML = "Arrival";

    // Append cells to headings row
    headings.appendChild(c1);
    headings.appendChild(c2);

    // Create second row for flight info
    let info = table.insertRow(-1);

    let c3 = document.createElement("td");
    let c4 = document.createElement("td");

    // modify after Alex is done!!
    c3.innerHTML = user.departure_airport +" "+user.departure_time; // ** MIGHT HAVE TO CHANGE ***
    c4.innerHTML = user.arrival_airport + " " +user.arrival_time; // ** MIGHT HAVE TO CHANGE ***

    // Append cells to headings row
    info.appendChild(c3);
    info.appendChild(c4);

    // ** figure out how to display flight??? iFrames doesn't work for flightaware.com
    // add track button -> externally links to flightaware.com
    let t_button = document.createElement("button");
    // add id to button with flight #
    t_button.id = user.flightCode; // *** CHANGE ACCORDING TO DATA
    t_button.innerHTML = "Track";
    t_button.addEventListener("click", async(e) => window.location = `https://flightaware.com/live/flight/${t_button.id}` ); // add event listener  tableAndButton.appendChild(t_button);
    t_button.classList.add("track-button","btn", "btn-primary", "btn-lg");
    tableAndButton.appendChild(t_button);

  }
  else {
    name.innerHTML = `No flights to track!`; // Flight #flightInfo
    name.classList.add("name"); // add name class to element
    flight.appendChild(name); // append to the container
  }
  
}

// loads the list of friends who have flights they are tracking and displays the flight info for each of those flights
function loadFriendFlights() {
  let friends = user.friends;
  // iterate through each friend f
  friends.forEach(f => {
    // ** ASK FOR HELP -> get friend f's flight info 
    // check if friend f has any flights to display, if so continue
    if ("flightCode" in f) {
      // create small container for each friend
      let flight = document.createElement("div");
      flight.classList.add("container-sm");
      friendContainer.appendChild(flight);

      // create name element
      let name = document.createElement("h4");
      name.innerHTML = `${f.firstname} ${f.lastname}`; // Friend's <First Name> <Last Name>
      name.classList.add("name"); // add name class to element
      flight.appendChild(name); // append to the container

      let tableAndButton = document.createElement("div");
      tableAndButton.classList.add("info-button");
      flight.appendChild(tableAndButton);

      // create table displaying flight #, departure, arrival
      // create table to display flight info
      let table = document.createElement("table");
      tableAndButton.appendChild(table); // append table to the contianer
      table.classList.add("table", "borderless"); // add class
      // Create row element for headings
      let headings = table.insertRow(-1);
      // Create cells
      let c1 = document.createElement("td");
      let c2 = document.createElement("td");
      let c3 = document.createElement("td");
   
      // Insert data to cells
      c1.innerHTML = "Flight";
      c2.innerHTML = "Departure";
      c3.innerHTML = "Arrival";
    
      // Append cells to headings row
      headings.appendChild(c1);
      headings.appendChild(c2);
      headings.appendChild(c3);

      // Create second row info for flight info
      let info = table.insertRow(-1);

      let c4 = document.createElement("td");
      let c5 = document.createElement("td");
      let c6 = document.createElement("td");

      // modify depending on Alex + Lyss
      c4.innerHTML = f.flightCode;
      c5.innerHTML = f.departure_airport+" "+f.departure_time;
      c6.innerHTML = f.arrival_airport+" "+f.arrival_time;
      // c8.innerHTML = f.status; ** figure out status with Alex using API
    
      // Append cells to headings row
      info.appendChild(c4);
      info.appendChild(c5);
      info.appendChild(c6);

      // add track button -> externally links to flightaware.com
      let t_button = document.createElement("button")
      // add id to button with flight #
      t_button.id = f.flightCode; // *** CHANGE ACCORDING TO DATA
      t_button.innerHTML = "Track";
      t_button.classList.add("track-button","btn", "btn-primary", "btn-lg");
      t_button.addEventListener("click", async(e) => window.location = `https://flightaware.com/live/flight/${t_button.id}/history` ); // add event listener
      tableAndButton.appendChild(t_button);
    }
  });
}

// call the loading functions of flight data
loadUserFlights();
loadFriendFlights();