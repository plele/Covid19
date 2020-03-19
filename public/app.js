"use strict";

const getInputCountry = () =>
  document.getElementById("countriesDropdown").value;

const displayCountryData = ({ country, cases, recovered }) => {
  document.getElementById("enteredCountry").textContent = country;
  document.getElementById("totalCases").textContent = cases;
  document.getElementById("totalRecovered").textContent = recovered;
};

const getCountryData = () =>
  fetch("/countries").then(response => response.json());

const getCountryObject = (countryData, countryName) => {
  return countryData.find(
    countryObject => countryObject.country === countryName
  );
};

const onSelect = event => {
  const inputCountry = getInputCountry();
  event.preventDefault();
  if (inputCountry) {
    getCountryData()
      .then(countryData => {
        const countryObject = getCountryObject(countryData, inputCountry);
        displayCountryData(countryObject);
      })
      .catch(console.error);
  } else {
    console.log("Enter valid country name");
  }
};

const populateDropdown = countryData => {
  const parentNode = document.querySelector("#countriesDropdown");
  countryData.forEach(countryObj => {
    // Create and Append the nodes
    const newNode = document.createElement("option");
    newNode.value = newNode.textContent = countryObj.country;
    parentNode.appendChild(newNode);
  });
};

const countrySelect = document.getElementById("countriesDropdown");
getCountryData().then(populateDropdown);
countrySelect.addEventListener("change", onSelect);
