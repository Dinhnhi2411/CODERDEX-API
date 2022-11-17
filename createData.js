const fs = require("fs");
const csv = require("csvtojson");
const { faker } = require("@faker-js/faker");

const createData = async () => {
  let data = JSON.parse(fs.readFileSync("db.json"));

  let newData = await csv().fromFile("pokemon.csv");
  newData = new Set(newData);
  newData = Array.from(newData);
  newData = newData.slice(0, 721);

  newData = newData.map((pokemon, index) => {
    let description = faker.lorem.sentence();
    let abilities = faker.hacker.verb();
    let height = `${faker.datatype.number({ max: 50, precision: 0.1 })}'`;
    let weight = `${faker.datatype.number({ max: 40, precision: 0.1 })}. lbs`;
    let category = faker.word.adjective();
    let type1 = pokemon.Type1.toLowerCase();
    let type2 = pokemon.Type2?.toLowerCase();
    console.log(newData);
     return {
      id: ++index,
      name: pokemon.Name,
      types: type2 ? [type1, type2] : [type1],
      url: `http://localhost:8000/images/${index}.jpg`,
      description,
      height,
      weight,
      category,
      abilities,
    };
  });

  data.totalPokemons = [newData.length];

  data.data = newData;

  fs.writeFileSync("db.json", JSON.stringify(data));
};

createData();
