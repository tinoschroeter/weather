const Weather = require("../");
const weather = new Weather();

test("should find a location with weather information", () => {
  return weather
    .find({ search: "Hamburg_germany", degreeType: "C", lang: "de-DE" })
    .then((data) => {
      console.log(data[0]);
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].location.lat).toMatch("53,544");
      expect(data[0].location.degreetype).toMatch("C");
      expect(data[0].forecast).toBeInstanceOf(Array);
    });
});

test("should find multiple locations with weather information", () => {
  return weather
    .find({ search: "Washington", degreeType: "C" })
    .then((data) => {
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBeGreaterThan(1);
      expect(data[0].location.degreetype).toMatch("C");
      expect(data[0].forecast).toBeInstanceOf(Array);
    });
});

test("should not return any address (bad address)", () => {
  return weather.find({ search: "." }).then((data) => {
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].error).toBeInstanceOf(Object);
  });
});
