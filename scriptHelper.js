// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  let pilotStatus = validateInput(pilot);
  let copilotStatus = validateInput(copilot);
  let fuelStatus = validateInput(fuelLevel);
  let cargoStatus = validateInput(cargoMass);

  if (
    pilotStatus === "Empty" ||
    copilotStatus === "Empty" ||
    fuelStatus === "Empty" ||
    cargoStatus === "Empty"
  ) {
    alert("All fields are required!");
    return;
  }

  if (pilotStatus === "Is a Number" || copilotStatus === "Is a Number") {
    alert("Pilot and Co-pilot names should be strings.");
    return;
  }

  if (fuelStatus === "Not a Number" || cargoStatus === "Not a Number") {
    alert("Fuel level and Cargo mass should be numbers.");
    return;
  }

  document.getElementById(
    "pilotStatus"
  ).innerHTML = `Pilot ${pilot} is ready for launch`;
  document.getElementById(
    "copilotStatus"
  ).innerHTML = `Co-pilot ${copilot} is ready for launch`;

  let launchStatus = document.getElementById("launchStatus");
  let faultyItems = document.getElementById("faultyItems");

  faultyItems.style.visibility = "visible";

  if (fuelLevel < 10000) {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level too low for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level high enough for launch";
  }

  if (cargoMass > 10000) {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass too heavy for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
  } else {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass low enough for launch";
  }

  if (fuelLevel >= 10000 && cargoMass <= 10000) {
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
