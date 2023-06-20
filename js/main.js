const list = document.querySelector(".list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let API = "https://pokeapi.co/api/v2/pokemon";

async function getData() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}

render();
async function render() {
  const character = await getData();
  totalCount = character.results;
  nextPage = character.next;
  prevPage = character.previous;
  list.innerHTML = "";
  character.results.forEach(async (item) => {
    const res = await fetch(item.url);
    const data = await res.json();
    const imgUrl = data.sprites.front_default;
    list.innerHTML += ` 
    <div class="card">
      <div class="card-front">
         <img src="${imgUrl}"/>
         <p class="title">${item.name}</p>
         <p class="subtitle">${data.types[0].type.name}</p>
      </div>
      <div class="card-back">
         <p>Name: ${item.name}</p>
         <p>Type: ${data.types[0].type.name}</p>
         <p>Height: ${data.height}</p>
         <p>Weight: ${data.weight}</p>
      </div>
   </div>
  `;
  });
}

prev.addEventListener("click", () => {
  page--;
  render();
});

next.addEventListener("click", () => {
  page++;
  render();
});
