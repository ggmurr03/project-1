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
                levelBtn.textContent = "Level Up!";

                charLi.appendChild(charH2);
                charLi.appendChild(imgElement);
                charLi.appendChild(charP);
                charLi.appendChild(charPBio);
                charLi.appendChild(levelBtn);

                levelBtn.addEventListener("click", ()=> lvlHandler(charP,character.id));

                ul.appendChild(charLi);
            });
        });
}

function addNewChar(){
    const charForm = document.querySelector("#character-form")
    const ul = document.querySelector("ul");

    charForm.addEventListener("submit", e =>{
        e.preventDefault();
                
        const charLi = document.createElement("li");
        const charH2 = document.createElement("h2");
        const imgElement = document.createElement("img"); 
        const charP = document.createElement("p");
        const charPBio = document.createElement("p");
        const levelBtn = document.createElement("button");


        charH2.textContent = document.querySelector("#name").value;
        imgElement.src = document.querySelector("#image").value; 
        charP.textContent = `Level: ${document.querySelector("#level").value}`; 
        charPBio.textContent = document.querySelector("#bio").value;
        levelBtn.textContent = "Level Up!";

        charLi.appendChild(charH2);
        charLi.appendChild(imgElement);
        charLi.appendChild(charP);
        charLi.appendChild(charPBio);
        charLi.appendChild(levelBtn);

        //levelBtn.addEventListener("click", ()=> lvlHandler(charP));

        ul.appendChild(charLi);
        console.log("character created");

        const charObj = {
            name: charH2.textContent,
            image: imgElement.src,
            level: parseInt(charP.textContent.replace("Level: ", "")),
            biography: charPBio.textContent};
        
        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(charObj)
        }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            levelBtn.addEventListener("click", ()=> lvlHandler(charP, data.id));
        })
        .catch(error =>console.error(error))
      }
   )

}

function lvlHandler(charP, charId){
    //get lvl integer value
    let numLvl = parseInt(charP.textContent.replace("Level: ", ""));

    //increment level by +1
    numLvl++;

    //reinsert
    charP.textContent = `Level: ${numLvl}`;
    //message
    alert("Level increased!!!");


fetch(`http://localhost:3000/characters/${charId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({level: numLvl})
}).then(resp=>resp.json())
.then(data=> console.log("PATCH"))
.catch(error=> console.error(error))
}


function init() {
    renderCharacters();
    addNewChar()
}

init();

console.log("test")

// testing