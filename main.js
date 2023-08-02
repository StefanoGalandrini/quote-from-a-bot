/*-----------
		VARIABILI 
------------*/
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
// Inserisci qui la tua chiave API
const API_KEY = "";

const loader = document.querySelector('.loading');
const modal = document.querySelector(".modal");
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

/*-----------
		FUNCTIONS 
------------*/
async function playCharacter(nameCharacter)
{
	loader.classList.remove("loading-hidden");

	// 2. Chiamare le Api di Open AI
	const action = getRandomAction();
	const temperature = 0.7;

	// 3. Recuperare la risposta
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${API_KEY}`
		},
		body: JSON.stringify({
			model: MODEL,
			messages: [
				{
					role: "user",
					content: `Sei ${nameCharacter}, uno dei protagonistti del libro 'Il Signore degli Anelli', e ti chiedo di ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio`
				}
			],
			temperature: temperature
		})
	});
	// 4. Interpretare la risposta in JSON
	const data = await response.json();

	// 5. Compilare la modale con i dati ricevuti
	const message = data.choices[0].message.content;

	modalContent.innerHTML = `
				<h2>${nameCharacter},<br> ti chiedo di ${action}:</h2>
				<p>«${message}»</p>
				<code>Character: ${nameCharacter}, action: ${action}, temperature: ${temperature}</code>
		`;

	// 6. Nascondere il loader e mostrare la modale
	loader.classList.add("loading-hidden");
	modal.classList.remove("modal-hidden");
}

function getRandomAction()
{
	const actions = [
		"salutare nel tuo modo più iconico",
		"dare un consiglio di vita in base alla tua esperienza",
		"raccontare la tua ultima avventura",
		"svelarmi i tuoi sogni",
		"dirmi chi è il tuo migliore amico",
		"dirmi cosa pensi dell'Unico Anello"
	];

	const indexRandom = Math.floor(Math.random() * actions.length); // da 0 a 5

	return actions[indexRandom];
}

/*-----------
		INIT & EVENTS
------------*/
const characters = Array.from(document.getElementsByClassName("characters"));

for (i = 0; i < characters.length; i++)
{
	characters[i].addEventListener("click", function ()
	{
		let characterName = this.getElementsByClassName("character-name")[0].innerHTML;
		playCharacter(characterName);
	}
	);
}



modalClose.addEventListener("click", function ()
{
	modal.classList.add("modal-hidden");
});
