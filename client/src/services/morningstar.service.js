import axios from 'axios';

const path =  "https://morning-star.p.rapidapi.com/market/v2";

const headers = {
	"x-rapidapi-key": process.env.REACT_APP_MORNINGSTAR_TOKEN,
	"x-rapidapi-host": "morning-star.p.rapidapi.com",
	"useQueryString": true
};

async function getSuggestionsByAutocomplete(text){
	if(!text){
		throw new Error("User needs to supply text for autocomplete.");
	}
	const res = await axios.get(`${path}/auto-complete`, {
		headers: headers,
		params: {
			"q": text
		}
	});
	return res.data.results;
}

export {
	getSuggestionsByAutocomplete
}
