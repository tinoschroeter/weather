/*
 * Weather
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true, sub: true */
"use strict";

const qs = require("querystring");
const xml2JS = require("xml2js");

class Weather {
  constructor() {
    this.baseUrl = "http://weather.service.msn.com/find.aspx";

    this.xmlParser = new xml2JS.Parser({
      charkey: "C$",
      attrkey: "A$",
      explicitArray: true,
    });
  }

  async find(probs) {
    if (!probs || typeof probs !== "object") {
      throw new Error("invalid options");
    }

    const { search = "", degreeType = "F", lang = "en-US" } = probs;

    this.search = search;

    if (!this.search) {
      throw new Error("missing search input");
    }

    this.lang = lang;
    this.degreeType = degreeType;
    this.search = qs.escape("" + this.search);
    this.reqUrl =
      this.baseUrl +
      "?src=outlook&weadegreetype=" +
      this.degreeType +
      "&culture=" +
      this.lang +
      "&weasearchstr=" +
      this.search;

    return fetch(this.reqUrl)
      .then((response) => response.text())
      .then((xml) => this.xmlParser.parseStringPromise(xml))
      .then((data) => {
        this.checkParser(data);
        this.checkMissingWeatherInfo(data);

        return this.groomWeatherData(data);
      })
      .catch((error) => {
        return [{ error }];
      });
  }

  checkParser(data) {
    if (!data || !data.weatherdata || !data.weatherdata.weather) {
      return new Error("failed to parse weather data");
    }
  }

  checkMissingWeatherInfo(data) {
    if (!(data.weatherdata.weather instanceof Array)) {
      return new Error("missing weather info");
    }
  }

  groomWeatherData(data) {
    const size = data.weatherdata.weather.length;
    const result = [];
    const weatherItem = {};

    for (let i = 0; i < size; i++) {
      weatherItem.location = {
        name: data.weatherdata.weather[i]["A$"]["weatherlocationname"],
        zipcode: data.weatherdata.weather[i]["A$"]["zipcode"],
        lat: data.weatherdata.weather[i]["A$"]["lat"],
        long: data.weatherdata.weather[i]["A$"]["long"],
        timezone: data.weatherdata.weather[i]["A$"]["timezone"],
        alert: data.weatherdata.weather[i]["A$"]["alert"],
        degreetype: data.weatherdata.weather[i]["A$"]["degreetype"],
        imagerelativeurl: data.weatherdata.weather[i]["A$"]["imagerelativeurl"],
      };
      weatherItem.current = null;
      weatherItem.forecast = null;

      if (
        data.weatherdata.weather[i]["current"] instanceof Array &&
        data.weatherdata.weather[i]["current"].length > 0
      ) {
        if (
          typeof data.weatherdata.weather[i]["current"][0]["A$"] === "object"
        ) {
          weatherItem.current = data.weatherdata.weather[i]["current"][0]["A$"];

          weatherItem.current.imageUrl =
            weatherItem.location.imagerelativeurl +
            "law/" +
            weatherItem.current.skycode +
            ".gif";
        }
      }

      if (data.weatherdata.weather[i]["forecast"] instanceof Array) {
        weatherItem.forecast = [];
        for (
          let k = 0;
          k < data.weatherdata.weather[i]["forecast"].length;
          k++
        ) {
          if (
            typeof data.weatherdata.weather[i]["forecast"][k]["A$"] === "object"
          )
            weatherItem.forecast.push(
              data.weatherdata.weather[i]["forecast"][k]["A$"]
            );
        }
      }
      // Push weather item into result
      result.push(weatherItem);
    }

    return result;
  }
}

module.exports = Weather;