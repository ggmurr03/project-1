function renderCharacters() {
    return fetch("http://localhost:3000/characters")
        .then(resp => resp.json())
        .then(characters => {
            characters.forEach(character => {
                const ul = document.querySelector("ul");

                
                const charLi = document.createElement("li");
                const charH2 = document.createElement("h2");
                const imgElement = document.createElement("img"); 
                const charP = document.createElement("p");
                const charPBio = document.createElement("p");
                const levelBtn = document.createElement("button");

                charH2.textContent = character.name;
                imgElement.src = character.image; 
                charP.textContent = `Level: ${character.level}`; 
                charPBio.textContent = character.biography;
                levelBtn.textContent = "Leveled Up!";

                charLi.appendChild(charH2);
                charLi.appendChild(imgElement);
                charLi.appendChild(charP);
                charLi.appendChild(charPBio);
                charLi.appendChild(levelBtn);

                ul.appendChild(charLi);
            });
        });
}

function init() {
    renderCharacters();
}

init();

console.log("test")

// testing