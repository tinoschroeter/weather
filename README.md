# Weather

[![NPM][npm-image]][npm-url]

Weather is a module for obtaining weather information.

## Installation

```bash
npm i @tinoschroeter/weather-js
```

## Usage

```javascript
const Weather = require("@tinoschroeter/weather-js");
const weather = new Weather();

// Options:
// search:     location name or zipcode
// degreeType: F or C <optional> default = F
// lang:       de-DE  <optional> default = en-US

weather
  .find({ search: "Hamburg, Germany", degreeType: "C", lang: "de-DE" })
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

// async await IIFE version
try {
  (async () => {
    const data = await weather.find({
      search: "Hamburg, Germany",
      degreeType: "C",
      lang: "de-DE",
    });
    console.log(data);
  })();
} catch (error) {
  console.error(error);
}
```

## Result

```json
[
  {
    "location": {
      "name": "Hamburg, HH",
      "lat": "53,545",
      "long": "10,024",
      "timezone": "2",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/de/"
    },
    "current": {
      "temperature": "16",
      "skycode": "27",
      "skytext": "Meist bewölkt",
      "date": "2023-10-02",
      "observationtime": "22:25:42",
      "observationpoint": "Hamburg",
      "feelslike": "16",
      "humidity": "94",
      "winddisplay": "5 km/h West",
      "day": "Montag",
      "shortday": "Mo",
      "windspeed": "5 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/de/law/27.gif"
    },
    "forecast": [
      {
        "low": "15",
        "high": "23",
        "skycodeday": "28",
        "skytextday": "Meist bewölkt",
        "date": "2023-10-02",
        "day": "Montag",
        "shortday": "Mo",
        "precip": "7"
      },
      {
        "low": "12",
        "high": "21",
        "skycodeday": "11",
        "skytextday": "Regenschauer",
        "date": "2023-10-03",
        "day": "Dienstag",
        "shortday": "Di",
        "precip": "83"
      },
      {
        "low": "12",
        "high": "17",
        "skycodeday": "9",
        "skytextday": "Leichter Regen",
        "date": "2023-10-04",
        "day": "Mittwoch",
        "shortday": "Mi",
        "precip": "53"
      },
      {
        "low": "10",
        "high": "16",
        "skycodeday": "11",
        "skytextday": "Regen",
        "date": "2023-10-05",
        "day": "Donnerstag",
        "shortday": "Do",
        "precip": "76"
      },
      {
        "low": "14",
        "high": "16",
        "skycodeday": "28",
        "skytextday": "Meist bewölkt",
        "date": "2023-10-06",
        "day": "Freitag",
        "shortday": "Fr",
        "precip": "23"
      }
    ]
  }
]
```

## Notes

- It uses `weather.service.msn.com`

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/weather-js
[npm-image]: https://img.shields.io/badge/npm%20package%20-3.0.1-green
