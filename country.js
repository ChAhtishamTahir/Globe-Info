// Getting name from URL
const countryName = new URLSearchParams(window.location.search).get("name");
// fetch Data URL based on country
const countryInfoUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
const backButton = document.querySelector(".backButton");
const main = document.querySelector("body main");
const header = document.querySelector("body header");
const darkMode = document.querySelector(".headerContent p");
const lightMode = document.querySelector(".headerContent .lightMode");
const body = document.body;
const headerTitle = document.querySelector(".headerContent a");
if (localStorage.getItem("darkModeLocalStorage") === "true") {
  body.classList.add("darkMode");
}
//! Data Fetching
fetch(countryInfoUrl)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);

    const countryContainer = document.createElement("div");
    countryContainer.classList.add("countryContainer");
    countryContainer.innerHTML = `  <div class="flag"><img src="${
      country.flags.svg
    }" alt="" /></div>
       <div class="countryInfo">
         <h1>${country.name.common}</h1>
         <div class="info">
           <div class="left">
             <p ><b>Native Name: </b>${
               Object.values(country.name?.nativeName || {})[0]?.common || " "
             }</p>
             <p><b>Population: </b>${country.population.toLocaleString(
               "en-IN"
             )}</p>
             <p><b>Region: </b>${country.region}</p>
             <p><b>Sub Region: </b>${
               country.subregion ? country.subregion : " "
             }</p>
             <p><b>Capital: </b>${country.capital ? country.capital : " "}</p>
           </div>
           <div class="right">
             <p><b>Top Level Domain : </b> ${country.tld.join(",  ")}</p>
             <p><b>Currencies: </b>${Object.values(
               country.currencies || {}
             ).map((ele) => ele.name)}</p>
             <p><b>Languages: </b>${Object.values(country.languages || {}).join(
               ", "
             )}</p>
           </div>
         </div>
         <div class="borderCountries">
           <p><b>Border Countries:</b></p>
           <div class="borderCountriesContainer">
           </div>
         </div>
       </div>`;
    main.append(countryContainer);
    const borders = country.borders;
    if (borders) {
      borders.forEach((border) => {
        const anchor = document.createElement("a");
        document.querySelector(".borderCountriesContainer").append(anchor);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([countryData]) => {
            anchor.innerText = countryData.name.common;
            anchor.href = `https://globeinformation.netlify.app/country.html?name=${anchor.innerText}`;
          });
      });
    }
  });

// ! Back Button
backButton.addEventListener("click", () => {
  history.back();
});

// ! Dark Mode
darkMode.addEventListener("click", () => {
  const darkModeLocalStorageFlag = body.classList.toggle("darkMode");
  localStorage.setItem("darkModeLocalStorage", darkModeLocalStorageFlag);
  darkMode.style.display = "none";
  lightMode.style.display = "block";
});
lightMode.addEventListener("click", () => {
  const darkModeLocalStorageFlag = body.classList.toggle("darkMode");
  localStorage.setItem("darkModeLocalStorage", darkModeLocalStorageFlag);
  darkMode.style.display = "block";
  lightMode.style.display = "none";
});

// ! Redirect to Index.html when header title clicked
headerTitle.href = "https://globeinformation.netlify.app/index.html";
