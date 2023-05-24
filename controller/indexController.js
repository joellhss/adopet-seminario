import { animalServices } from "../services/animalServices.js"

// Obtém a data e hora atual
var timestamp = new Date().getTime();

// Redireciona para a mesma página com um parâmetro de data e hora único
window.location.href = window.location.href + '?timestamp=' + timestamp;


(async () => {
    const listaDeAnimais =await animalServices.getAll();
    const newListaDeAnimais = shuffle(listaDeAnimais)
    const listaDeEspecies =await animalServices.getSpecies();

    const boxAnimal = $("#box-animals")

    listaDeEspecies.forEach(element => {
        const boxLista = $(insereListaDeEspecies(element))
        boxAnimal.append(boxLista.css('opacity', 0).animate({opacity: 1}, 500));

        newListaDeAnimais.forEach((animal, index) => {
            if(animal.idSpecies == element.id && index < 9) {
                const animalElement = $(cardAnimal(animal))
                $(`#specieId-${element.id}`).append(animalElement.css('opacity', 0))
                animalElement.delay(index * 300).animate({opacity: 1}, 500);
            }
        })

    });


})();

function insereListaDeEspecies(objeto) {
    const boxList = document.createElement("section");
    boxList.classList.add("box-animals-list");

    const boxListHeader = document.createElement("div");
    boxListHeader.classList.add("box-animals-list-header");
    boxListHeader.innerHTML = `<h2>${objeto.name}</h2> <a href="/pages/allAnimals.html?id=${objeto.id}">Ver todos</a>`
    
    const boxListBody = document.createElement("div");
    boxListBody.classList.add("box-animals-list-body");
    boxListBody.id = "specieId-" + objeto.id

    boxList.appendChild(boxListHeader);
    boxList.appendChild(boxListBody)

    return boxList;
}

function cardAnimal(animalObject) {
    const card = document.createElement("a");
    card.href = `/pages/animalPage.html?id=${animalObject.animalId}`
    card.classList.add("card-animal")

    const img = document.createElement("img");
    img.src = animalObject.url_image || "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg";
    img.alt = animalObject.name;

    const name = document.createElement("h3");
    name.textContent = animalObject.name;

    card.appendChild(img);
    card.appendChild(name);

    return card;
}

function shuffle(array) {
    // percorre a array do final para o início
    for (let i = array.length - 1; i > 0; i--) {
      // escolhe um índice aleatório entre 0 e i
      const j = Math.floor(Math.random() * (i + 1));
      // troca os elementos nas posições i e j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
