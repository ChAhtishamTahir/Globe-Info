const countriesContainer = document.querySelector("main .countriesContainer");
const regionName = new URLSearchParams(window.location.search).get("name");
const darkMode = document.querySelector(".headerContent p");
const lightMode = document.querySelector(".headerContent .lightMode");
const body = document.body;
const header = document.querySelector("header");
const searchInput = document.querySelector(".searchBar input");
const searchIcon = document.querySelector(".searchBar i");
const filterBtn = document.querySelector(".searchAndFilter .filter");
const headerTitle = document.querySelector(".headerContent a");
const filterBtnArrow = document.querySelector(".searchAndFilter .filter i");
const regionLinks = document.querySelector(".searchAndFilter .regionLinks");

const ApiURL = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population";

if (regionName) {
  ApiURL = `https://restcountries.com/v3.1/region/${regionName}`;
} else {
  ApiURL = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population";


}
let allCountriesData;

let darkModeLocalStorage = localStorage.getItem("darkModeLocalStorage");
if (darkModeLocalStorage === "true") {
  body.classList.add("darkMode");
}
// ! Fetch Data Function
async function fetchData() {
  try {
    const data = await (await fetch(ApiURL)).json();
    allCountriesData = data;
    showData(data);
  } catch (err) {
    console.log(err);
  }
}
fetchData();
// ! Show Data Function
function showData(countriesData) {
  for (let i = 0; i < countriesData.length; i++) {
    const country = document.createElement("a");
    country.classList.add("country");
    country.href = `https://globeinformation.netlify.app/country.html?name=${countriesData[i].name.common}`;
    country.innerHTML = `
            <div class="flag">
              <img src="${countriesData[i].flags.svg}" alt="" />
              </div>
              <div class="countryContent">
                <h2>${countriesData[i].name.common}</h2>
                <p><b>Population: </b>${countriesData[
                  i
                ].population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${countriesData[i].region}</p>
                <p><b>Capital: </b>${countriesData[i].capital || " "}</p>
              </div>`;
    countriesContainer.append(country);
  }
}
// ! Dark Mode Enable Disable
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
// ! Filter by Region
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterBtnArrow.classList.toggle("filterIconDisplay");
  regionLinks.classList.toggle("regionLinksDisplay");
  window.addEventListener("click", () => {
    filterBtnArrow.classList.remove("filterIconDisplay");
    regionLinks.classList.remove("regionLinksDisplay");
  });
  //* Functionality for page load according to certain region
  const allRegionLinks = document.querySelectorAll(
    ".searchAndFilter .regionLinks a"
  );
  allRegionLinks.forEach((region) => {
    region.addEventListener("click", () => {
      console.log(region.innerText);
      region.href = `https://globeinformation.netlify.app/index.html?name=${region.innerText}`;
    });
  });
});
// ! Redirect to Index.html when header title clicked
headerTitle.href = "https://globeinformation.netlify.app/index.html";

// ! Search Bar Functionality (Also Working but not that good)
// searchInput.addEventListener("input", () => {
//   const countryNames = document.querySelectorAll(".countryContent h2");
//   if (searchInput.value) {
//     countryNames.forEach((ele) => {
//       if (searchInput.value.toLowerCase() === ele.innerText.toLowerCase()) {
//         fetch(
//           `https://restcountries.com/v3.1/name/${searchInput.value}?fullText=true`
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             countriesContainer.innerText = "";
//             showData(data);
//           });
//       }
//     });
//   }
// });

// ! Search Bar Functionality ( The One which i thought but could not(now working and currently Implemented))
searchInput.addEventListener("input", () => {
  const filteredCountries = allCountriesData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });
  countriesContainer.innerText = "";
  showData(filteredCountries);
});
