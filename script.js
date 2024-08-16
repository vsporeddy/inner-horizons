let sceneIndex = 0;
let score = {
    socialist: 0,
    anarchist: 0,
    capistalist: 0,
    rizz: 0,
    cleanliness: 0,
    tardiness: 0,
    chaotic: 0,
    lawful: 0,
    turbulence: 0,
    assertiveness: 0,
    stoicism: 0,
    reactiveness: 0,
    mysteriousness: 0
};

const scenes = [
    {
        image: "heart.png",
        text: "Embark on a journey of self-discovery.",
        choices: [
            { text: "Start Quiz", scoreChanges: {} } // No score changes
        ]
    },
    {
        image: "city_street.png",
        text: "[PLACEHOLDER] What do?",
        choices: [
            { text: "Get pizza.", scoreChanges: { socialist: 1, anarchist: -1, lawful: 1 } },
            { text: "Go for a run.", scoreChanges: { stoicism: 2, rizz: 6 } },
            { text: "Call mom.", scoreChanges: { lawful: -3, mysteriousness: 1, tardiness: -1 } },
            { text: "Keep working.", scoreChanges: { rizz: -1, socialist: 5 } }
        ]
    },
];

function updateScene() {
    const scene = scenes[sceneIndex];
    document.getElementById("scene-image").src = "images/" + scene.image;
    document.getElementById("scene-text").textContent = scene.text;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = ""; 

    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.classList.add("choice");
        button.textContent = choice.text;

        button.addEventListener("click", () => {
            for (const key in choice.scoreChanges) {
                score[key] += choice.scoreChanges[key];
            }

            sceneIndex++;
            if (sceneIndex < scenes.length) {
                updateScene();
            } else {
                showResult();
            }
        });
        choicesContainer.appendChild(button);
    });
}

function showResult() {
    // TODO ACTUAL LOGIC: determine sunset image card based on score
    // PLACEHOLDER: display score as text
    let resultText = "[YOUR SUNSET GOES HERE]:\n\n";
    for (const key in score) {
        resultText += `${key}: ${score[key]}\n`;
    }

    document.getElementById("scene").style.display = "none";
    document.querySelector('h1').style.display = 'none';
    document.getElementById("result").style.display = "block";
    document.getElementById("result-text").textContent = resultText;
}

updateScene();