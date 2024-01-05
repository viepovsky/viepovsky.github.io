fetch(`https://3.72.88.245/city-walk-app/localization/countries`)
  .then(response => response.json())
  .then(data => {
    const countrySelect = document.getElementById("countrySelect");
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  })
  .catch(error => console.error(error));

function loadCities() {
  var countrySelect = document.getElementById("countrySelect");
  var citySelect = document.getElementById("citySelect");

  citySelect.disabled = true;

  if (countrySelect.value) {
    const countryCode = countrySelect.value;

    fetch(`https://city-walk-app--viepovsky.repl.co/city-walk-app/localization/cities?country-code=${countryCode}`)
      .then(response => response.json())
      .then(data => {
        citySelect.innerHTML = "<option value=''>Select city</option>";
        data.forEach(city => {
          const option = document.createElement("option");
          option.textContent = city.name;
          option.setAttribute("latitude", city.latitude);
          option.setAttribute("longitude", city.longitude);
          citySelect.appendChild(option);
        });
        citySelect.disabled = false;
      })
      .catch(error => console.error(error));
  }
}

function getWearRecommendation() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Gathering data to give recommendation.";
  var citySelect = document.getElementById("citySelect");
  if (citySelect.value) {
  const selectedOption = citySelect.options[citySelect.selectedIndex];
  const latitude = selectedOption.getAttribute("latitude");
  const longitude = selectedOption.getAttribute("longitude");
  let today = new Date();
  today = today.toISOString().split('T')[0];

  fetch(`https://city-walk-app--viepovsky.repl.co/city-walk-app/recommendation/wear?date=${today}&latitude=${latitude}&longitude=${longitude}`)
  .then(response => response.json())
  .then(data => {
    resultDiv.innerHTML = "<p>Weather short description: " + data.weatherDesc + "</p>" +
    "<p>Will it rain: " + data.rain + "</p>" +
    "<p>Recommendation wear:" + "</p>" +
    "<p>Head: " + data.head + "</p>" +
    "<p>Upper body: " + data.upperBody + "</p>" +
    "<p>Lower body: " + data.lowerBody + "</p>" +
    "<p>Foot: " + data.foot + "</p>";
  })
  .catch(error => console.error(error));
  } else {
    resultDiv.innerHTML = "Please select a country and a city.";
  }
}

function getWalkRecommendation() {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Gathering data to give recommendation.";
    var citySelect = document.getElementById("citySelect");

    if (citySelect.value) {
    const selectedOption = citySelect.options[citySelect.selectedIndex];
    const latitude = selectedOption.getAttribute("latitude");
    const longitude = selectedOption.getAttribute("longitude");
  
    fetch(`https://city-walk-app--viepovsky.repl.co/city-walk-app/recommendation/walk?latitude=${latitude}&longitude=${longitude}`)
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = "<p>Walk recommendation: " + data.recommendation + "</p>" +
      "<p>Air Quality Index: " + data.aqiScale + "</p>" +
      "<p>UV index: " + data.uvIndexScale + "</p>";
    })
    .catch(error => console.error(error));
  } else {
    resultDiv.innerHTML = "Please select a country and a city.";
  }
}
