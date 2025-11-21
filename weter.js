async function haeSaa(kaupunki) {
  const apiKey = "a78d824d46f3f8b4416a6e0ed70b2d54"; // lisää oma avain
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${apiKey}&units=metric&lang=fi`;
  try {
    const vastaus = await fetch(url);
    if (!vastaus.ok) throw new Error("Kaupunkia ei löytynyt");

    const data = await vastaus.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Virhe haussa:", error);
    return null;
  }
}

async function naytaSaa(kaupunki) {
  const kohde = document.querySelector("#" + kaupunki);

  const data = await haeSaa(kaupunki);
  if (!data) {
    tulos.textContent = "Säätietoja ei voitu hakea.";
    return;
  }

  const kuvaus = data.weather[0].description;
  const lampo = Math.round(data.main.temp);
  const ikoni = data.weather[0].icon;
  const tuntuu = Math.round(data.main.feels_like);
  const tuuli = Math.round(data.wind.speed);

  kohde.innerHTML += `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${ikoni}@2x.png">
        <p>${kuvaus}, ${lampo} °C</p>
        <p>tuntuu kuin ${tuntuu} °C</p>
        <p>tuulen  nopeus ${tuuli} m/s</p>
      `;
}

naytaSaa("Raahe");
naytaSaa("Beppu");
naytaSaa("Bryssel");
naytaSaa("Ekaterinburg");
