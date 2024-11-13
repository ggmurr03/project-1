function renderCharacters() {
    return fetch("http://localhost:3000/characters")
        .then(resp => resp.json())
        .then(characters => {
            characters.forEach(character => {
                const ul = document.querySelector("ul");

                // Create character card elements
                const charLi = document.createElement("li");
                const charH2 = document.createElement("h2");
                const imgElement = document.createElement("img");
                const charP = document.createElement("p");
                const charPBio = document.createElement("p");
                const levelBtn = document.createElement("button");

                // Set the content for each element
                charH2.textContent = character.name;
                imgElement.src = character.image;
                charP.textContent = `Level: ${character.level}`;
                charPBio.textContent = character.biography;
                levelBtn.textContent = "Level Up!";

                // Append elements to the list item
                charLi.appendChild(charH2);
                charLi.appendChild(imgElement);
                charLi.appendChild(charP);
                charLi.appendChild(charPBio);
                charLi.appendChild(levelBtn);

                // Add mouseover effect for character card
                charLi.addEventListener("mouseover", () => {
                    charLi.style.backgroundColor = "#e0f7fa"; // Light cyan color
                    charLi.style.transition = "background-color 0.3s ease"; // Smooth transition
                });

                // Reset mouseover effect when mouse leaves
                charLi.addEventListener("mouseout", () => {
                    charLi.style.backgroundColor = ""; // Reset to default
                });

                // Add event listener for leveling up
                levelBtn.addEventListener("click", () => lvlHandler(charP, character.id));

                // Append the character card to the list
                ul.appendChild(charLi);
            });
        });
}

function addNewChar() {
    const charForm = document.querySelector("#character-form");
    const ul = document.querySelector("ul");

    charForm.addEventListener("submit", e => {
        e.preventDefault();

        // Create new character card elements
        const charLi = document.createElement("li");
        const charH2 = document.createElement("h2");
        const imgElement = document.createElement("img");
        const charP = document.createElement("p");
        const charPBio = document.createElement("p");
        const levelBtn = document.createElement("button");

        // Set the content for the new character card
        charH2.textContent = document.querySelector("#name").value;
        imgElement.src = document.querySelector("#image").value;
        charP.textContent = `Level: ${document.querySelector("#level").value}`;
        charPBio.textContent = document.querySelector("#bio").value;
        levelBtn.textContent = "Level Up!";

        // Append the new elements to the list item
        charLi.appendChild(charH2);
        charLi.appendChild(imgElement);
        charLi.appendChild(charP);
        charLi.appendChild(charPBio);
        charLi.appendChild(levelBtn);


        // Append the new character card to the list
        ul.appendChild(charLi);
        console.log("Character created");

        // Prepare the new character object
        const charObj = {
            name: charH2.textContent,
            image: imgElement.src,
            level: parseInt(charP.textContent.replace("Level: ", "")),
            biography: charPBio.textContent
        };

        // Send the new character data to the server
        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(charObj)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            levelBtn.addEventListener("click", () => lvlHandler(charP, data.id));
        })
        .catch(error => console.error(error));

        // Reset form fields after submission
        charForm.reset();  // This resets the form fields
    });
}

function lvlHandler(charLvl, charId) {
    // Get the current level from the paragraph text
    let numLvl = parseInt(charLvl.textContent.replace("Level: ", ""));

    // Increment the level
    numLvl++;

    // Update the level text
    charLvl.textContent = `Level: ${numLvl}`;
    
    // Show a message to notify the level up
    alert("Level increased!!!");

    // Update the character's level in the server
    fetch(`http://localhost:3000/characters/${charId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: numLvl })
    })
    .then(resp => resp.json())
    .then(data => console.log("Level updated on server"))
    .catch(error => console.error(error));
}

function init() {
    renderCharacters(); // Render existing characters
    addNewChar(); // Allow adding new characters
}

init();


