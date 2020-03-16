const fs = require("fs");
const path = require("path");

const getData = new Promise((res, rej) => {
  fs.readFile(
    path.resolve(
      __dirname,
      // "COVID-19-geographic-disbtribution-worldwide-2020-03-14_1.csv"
      // "COVID-19-geographic-disbtribution-worldwide-2020-03-15.csv"
      "COVID-19-geographic-disbtribution-worldwide-2020-03-16.csv"
    ),
    (err, data) => {
      if (err) rej(err);
      else res(data.toString());
    }
  );
});

const reduceByCountry = stringData =>
  stringData
    .split("\n")
    .map(item => item.split(";"))
    .reduce(
      (acc, item) => ({ ...acc, [item[1]]: [...(acc[item[1]] || []), item] }),
      {}
    );

const casesPerCountry = countryData =>
  Object.keys(countryData).map(_countryKey => ({
    country: _countryKey,
    caseCount: countryData[_countryKey].reduce(
      (acc, item) => Number(acc) + Number(item[2]),
      0
    ),
    deathCount: countryData[_countryKey].reduce(
      (acc, item) => Number(acc) + Number(item[3]),
      0
    ),
    growthRateLast10Days:
      countryData[_countryKey]
        .reduce(
          (acc, item, index, _array) => [
            ...acc,
            item[2] /
              (_array[index + 1] ? _array[index + 1][2] : 10000000000000)
          ],
          []
        )
        .slice(0, 10)
        .reduce((acc, item) => acc + item, 0) / 10,
    growthRateLast10DaysData: countryData[_countryKey]
      .reduce(
        (acc, item, index, _array) => [
          ...acc,
          item[2] / (_array[index + 1] ? _array[index + 1][2] : 10000000000000)
        ],
        []
      )
      .slice(0, 10)
  }));

const sortByGrowthRate = casesPerCountry => {
  return casesPerCountry
    .filter(
      item =>
        item.growthRateLast10Days !== Infinity &&
        !isNaN(item.growthRateLast10Days)
    )
    .sort((a, b) => (a.growthRateLast10Days < b.growthRateLast10Days ? 1 : -1));
};

getData.then(reduceByCountry).then(data => {
  // console.log(data, data.CountryExp, Object.keys(data).length);
  console.log(sortByGrowthRate(casesPerCountry(data)).slice(0, 25));
  fs.writeFile(
    path.resolve(__dirname, "growthRate.json"),
    JSON.stringify(sortByGrowthRate(casesPerCountry(data)), null, 2),
    (a, b) => {
      console.log(a, b);
    }
  );
  // console.log(
  //   casesPerCountry(data)
  //     .filter(
  //       item =>
  //         item.growthRateLast10Days !== Infinity &&
  //         !isNaN(item.growthRateLast10Days)
  //     )
  //     .sort((a, b) =>
  //       a.growthRateLast10Days < b.growthRateLast10Days ? 1 : -1
  //     )
  //     .slice(0, 25)
  // );
});

// https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide

/*[
  'DateRep',
  'CountryExp',
  'NewConfCases',
  'NewDeaths',
  'GeoId',
  'Gaul1Nuts1',
  'EU\r'
]*/
