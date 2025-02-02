const Weather = require("../");
const weather = new Weather();

test("should find a location with weather information", () => {
  return weather
    .find({ search: "San Francisco, CA", degreeType: "F", lang: "en-US" })
    .then((data) => {
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].location.lat).toMatch("11.897");
      expect(data[0].location.degreetype).toMatch("F");
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