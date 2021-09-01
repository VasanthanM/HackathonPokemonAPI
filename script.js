function pokeTable() {
  const header = document.createElement("HEADER");
  header.setAttribute("class", "header");
  document.body.appendChild(header);
  const h1 = document.createElement("H1");
  const txt = document.createTextNode("Pokemon API");
  h1.appendChild(txt);
  header.appendChild(h1);
  const hrline = document.createElement("hr");
  document.body.appendChild(hrline);

  const thead = document.createElement("thead");
  thead.setAttribute("class", "thead");
  const th = document.createElement("tr");
  const thName = document.createElement("th");
  thName.innerHTML = "Name";
  const thWeight = document.createElement("th");
  thWeight.innerHTML = "Weight";
  const thMovesCount = document.createElement("th");
  thMovesCount.innerHTML = "Number of Moves";
  const thAbilityList = document.createElement("th");
  thAbilityList.innerHTML = "Abilities";
  th.append(thName, thWeight, thMovesCount, thAbilityList);
  thead.append(th);
  document.body.appendChild(thead);

  pokeman();
}

//GET  THE LIST OF POKEMON
async function pokeman() {
  try {
    const pokeList = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`
    ).then((response) => response.json());
    const pokeInfoUrls = pokeList.results.map((ele) => ele.url);

    for (let i = 0; i < pokeInfoUrls.length; i++) {
      const result = pokemanitems(pokeInfoUrls[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

//ACCESSING EACH ITEMS

async function pokemanitems(url) {
  try {
    const result = await fetch(`${url}`).then((response) => response.json());
    const abilityList = result.abilities.map((ele) => ele.ability["name"]);
    const movesCount = result.moves.length;
    //console.log(`${result.name} ${result.weight}  ${movesCount}  ${abilityList} `)

    const table = document.createElement("table");
    table.setAttribute("class", "table");

    const tbody = document.createElement("tbody");
    tbody.setAttribute("class", "thead-dark");

    const tr = document.createElement("tr");
    const tName = document.createElement("td");
    tName.innerHTML = result.name;
    const tWeight = document.createElement("td");
    tWeight.innerHTML = result.weight;
    const tMovesCount = document.createElement("td");
    tMovesCount.innerText = movesCount;
    const tAbilityList = document.createElement("td");
    tAbilityList.innerText = abilityList;

    tr.append(tName, tWeight, tMovesCount, tAbilityList);
    tbody.append(tr);

    table.append(tbody);
    document.body.append(table);
  } catch (err) {
    console.log(err);
  }
}
