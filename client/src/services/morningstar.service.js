import axios from 'axios';

const marketPath =  "https://morning-star.p.rapidapi.com/market/v2";
const stockPath =  "https://morning-star.p.rapidapi.com/stock/v2";

const headers = {
	"x-rapidapi-key": process.env.REACT_APP_MORNINGSTAR_TOKEN,
	"x-rapidapi-host": "morning-star.p.rapidapi.com",
	"useQueryString": true
};

// retrieves suggestions
async function getSuggestionsByAutocomplete(text){
	if(!text){
		throw new Error("User needs to supply text for autocomplete.");
	}
	const res = await axios.get(`${marketPath}/auto-complete`, {
		headers: headers,
		params: {
			"q": text
		}
	});
	return res.data.results;
}

// performanceId is used by morningstar api
async function getCompanyProfile(performanceId){
	if(!performanceId){
		throw new Error("In order to search we need a valid performanceId.");
	}
	const res = await axios.get(`${stockPath}/get-profile`, {
		headers: headers,
		params: {
			"performanceId": performanceId
		}
	});
	if(res.data[performanceId]){
		const company = res.data[performanceId];
		return {
			about: company.companyProfile.value,
			industry: company.industry.value
		}
	} else {
		throw new Error(`No company corresponding to performanceId ${performanceId} was found.`);
	}
}

export {
	getSuggestionsByAutocomplete,
	getCompanyProfile
}
