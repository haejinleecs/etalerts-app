import * as crud from './searchCrud.js';

// Default get all the elements
const searchButton = document.getElementById('searchButton');
const flightCode = document.getElementById('flightCode');
const noCodeButton = document.getElementById('vagueButton');
const departingIATA = document.getElementById('departCode');
const destinationIATA = document.getElementById('destinCode');
const airlineICAO = document.getElementById('airICAO');
const airlineIATA = document.getElementById('airIATA')

let user = JSON.parse(sessionStorage.getItem('User'));
const dataBox = document.getElementById('dataBox');
const buttonBox = document.getElementById('buttonContainer');
const addButton = document.getElementById('addButton');


searchButton.addEventListener('click', async () => {

  // This is for search code clearing out the previous search
  while(dataBox.firstChild){
    dataBox.removeChild(dataBox.firstChild);
  }

  let flightData = undefined;

  let code = flightCode.value;
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
  flightData = await fetch(`https://airlabs.co/api/v9/flight?api_key=6615549d-043f-42e6-a966-1aeec0366fef&flight_icao=${code}`, requestOptions);
  flightData = await flightData.json();

  let dep_time = flightData['response']['dep_time'];
  let arr_name = flightData['response']['arr_iata'];
  let arr_time = flightData['response']['arr_time'];
  let dep_name = flightData['response']['dep_iata'];
  let arr_gate = flightData['response']['arr_gate'];
  let arr_terminal = flightData['response']['arr_terminal'];
  // departing airport is given by the value field
  // flight code is given by the value field

  async function displayData() {
    const node1 = document.createElement('div');
    node1.className = ('d-flex mt-5 mb-3');
  
    console.log(flightData);
    const text1 = document.createTextNode(`Departure Time: ${flightData['response']['dep_time']}\n`);
    const text2 = document.createTextNode(`Arrival Airport: ${flightData['response']['arr_name']}\n`)
    const text3 = document.createTextNode(`Arrival Time: ${flightData['response']['arr_time']}\n`)
    const text4 = document.createTextNode(`Arrival Gate: ${flightData['response']['arr_gate']}\n`)
    const text5 = document.createTextNode(`Arrival Terminal: ${flightData['response']['arr_terminal']}\n`)
    node1.appendChild(text1);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text2);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text3);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text4);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text5);
    dataBox.appendChild(node1);
  }

  async function fetchData() {
    
    if (confirm("Is this your flight?")){
      let queryID = user['username'];
      let sendBody = {username: queryID, departure_time: dep_time, departure_airport: dep_name, arrival_time: arr_time, arrival_airport: arr_name, flightCode: flightCode, arrival_terminal: arr_terminal, arrival_gate: arr_gate}
      fetch("/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBody),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          flightData = data;
          console.log(data);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error:', error);
        });
    }

    // After fetching data, update the local user data
    user = sessionStorage.setItem('User', JSON.stringify(sendBody));
  }
  
  await displayData();
  setTimeout(() => {
    fetchData();
  }, 1000);

  // If the flight is correct, then fetch and store the data in mongoDB
});


// This is for when someone doesn't have the flight code
noCodeButton.addEventListener('click', async () => {
// This is for search code clearing out the previous search
  while(dataBox.firstChild){
    dataBox.removeChild(dataBox.firstChild);
  }

  // clear out the add button box
  buttonBox.removeChild(buttonBox.firstChild);
  let flightData = undefined;

  const departCode = departingIATA.value;
  const arrivalCode = destinationIATA.value;
  const departICAO = 'K' + departCode;
  const arrivalICAO = 'K' + arrivalCode;
  const airlineIATAcode = airlineIATA.value;
  const airlineICAOcode = airlineICAO.value;

  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
  flightData = await fetch(`https://airlabs.co/api/v9/schedules?api_key=6615549d-043f-42e6-a966-1aeec0366fef&dep_iata=${departCode}&arr_iata=${arrivalCode}&dep_icao=${departICAO}&arr_icao=${arrivalICAO}&airline_icao=${airlineICAOcode}&airline_iata=${airlineIATAcode}`, requestOptions);
  flightData = await flightData.json();

  for(let i = 0; i < flightData['response'].length; ++i){
    let node1 = document.createElement('div');
    node1.className = ('d-flex mt-5 mb-3');
  
    console.log(flightData['response'][i]);
    const text1 = document.createTextNode(`Departure Time: ${flightData['response'][i]['dep_time']}\n`);
    const text2 = document.createTextNode(`Arrival Airport: ${flightData['response'][i]['arr_iata']}\n`);
    const text3 = document.createTextNode(`Arrival Time: ${flightData['response'][i]['arr_time']}\n`);
    const text4 = document.createTextNode(`Arrival Gate: ${flightData['response'][i]['arr_gate']}\n`);
    const text5 = document.createTextNode(`Arrival Terminal: ${flightData['response'][i]['arr_terminal']}\n`);
    const text6 = document.createTextNode(`Flight Code: ${flightData['response'][i]['flight_icao']}\n`)
    node1.appendChild(text1);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text2);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text3);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text4);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text5);
    node1.appendChild(document.createElement('br'));
    node1.appendChild(text6);
  
    // create a checkbox for each data
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "checkbox");
    checkBox.setAttribute("id", flightData['response'][i]['flight_icao']);
  
    node1.appendChild(checkBox);
    dataBox.appendChild(node1);
    dataBox.appendChild(document.createElement('br'));
  }

  let addButton = document.createElement("button");
  addButton.innerHTML = "Add";
  addButton.setAttribute("id", "addButton");
  addButton.setAttribute("class", "btn btn-primary ml-3");
  buttonBox.appendChild(addButton);

});


document.body.addEventListener( 'click', async function (event) {
  if( event.target.id == 'addButton' ) {
    let flights = document.getElementsByClassName('d-flex mt-5 mb-3');
    Array.from(flights).forEach(async function(div) {
      // Find the checkbox within the current div
      let checkbox = div.querySelector('input[type="checkbox"]');
      // Check if the checkbox is checked
      if (checkbox.checked) {
        // Checkbox is checked
        // Get the flightcode of the flight

        let flightCode = checkbox.id;

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        let flightData = await fetch(`https://airlabs.co/api/v9/flight?api_key=6615549d-043f-42e6-a966-1aeec0366fef&flight_icao=${flightCode}`, requestOptions);
        flightData = await flightData.json();

        let dep_time = flightData['response']['dep_time'];
        let arr_name = flightData['response']['arr_iata'];
        let arr_time = flightData['response']['arr_time'];
        let dep_name = flightData['response']['dep_iata'];
        let arr_gate = flightData['response']['arr_gate'];
        let arr_terminal = flightData['response']['arr_terminal'];

        let queryID = user['username'];
        
        let sendBody = {username: queryID, departure_time: dep_time, departure_airport: dep_name, arrival_time: arr_time, arrival_airport: arr_name, flightCode: flightCode, arrival_terminal: arr_terminal, arrival_gate: arr_gate}
          fetch("/search", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendBody),
          })
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            console.log(data);
          })
          .catch(error => {
            // Handle any errors
            console.error('Error:', error);
          });

          // Update local user data
          user = sessionStorage.setItem('User', JSON.stringify(sendBody));
      }
    });
  };
});
