import React from 'react';
import About from './About';
import { getSuggestionsByAutocomplete, getCompanyProfile } from '../services/morningstar.service';
import { useForm } from 'react-hook-form';

import '../styles/main.css';

function Main() {

	const { register, handleSubmit, errors } = useForm();
	const [companyName, setCompanyName] = React.useState('');
	const [companyProfile, setCompanyProfile] = React.useState();
	const [suggestions, setSuggestions] = React.useState([]);
	const [requestError, setRequestError] = React.useState('');

	const onSubmit = (data) => {
		setCompanyName(data.companyName);
	};

	React.useEffect(() => {
		if (companyName) {
			setRequestError('');
			getSuggestionsByAutocomplete(companyName)
				.then(setSuggestions)
				.catch(error => setRequestError(error.message))
		}
	}, [companyName]);

	const blockStyle = {
		display: 'block',
		margin: 'auto'
	}

	const getProfile = (pid) => () => {
		getCompanyProfile(pid)
		.then(setCompanyProfile)
		.catch(error => setRequestError(error.message))
	}

	return (
		<div >
			<form onSubmit={handleSubmit(onSubmit)}>
				<label style={blockStyle}>Company Name</label>
				<input name="companyName" ref={register({ required: true })} style={blockStyle} />
				{errors.companyName && <span style={{}}>This field is required.</span>}
				<input type="submit" style={blockStyle} />
			</form>
			{suggestions.length !== 0 && suggestions.map(suggestion => (
				<div key={suggestion.performanceId} style={blockStyle}>
					<span>name: {suggestion.name} </span>
					<button onClick={getProfile}> Get profile </button>
				</div>
			)) }
			{/* { !errors.companyName && <About name={companyName} />  } */}
			{ requestError && (
				<div style={{ 
					backgroundColor: '#ff5050',
					border: '5px solid red',
					boxShadow: '0px 0px 5px 5px #ff5050',
					margin: 'auto',
					maxWidth: '50%',
					opacity: '0.8',
					padding: '5px'
					}}>
				{ requestError }
				</div>
			) }
		</div>
	)
}

export default Main;
