import React from 'react';
import Section from './Section';
import { getSuggestionsByAutocomplete, getCompanyProfile } from '../services/morningstar.service';
import { useForm } from 'react-hook-form';

import '../styles/main.css';

function Main() {

	const { register, handleSubmit, errors } = useForm();
	const [status, setStatus] = React.useState('');
	const [companyName, setCompanyName] = React.useState('');
	const [companyProfile, setCompanyProfile] = React.useState({});
	const [suggestions, setSuggestions] = React.useState([]);
	const [requestError, setRequestError] = React.useState('');

	const onSubmit = (data) => {
		setCompanyName(data.companyName);
	};

	React.useEffect(() => {
		if (companyName) {
			setRequestError('');
			setStatus('Retrieving company suggestions...')
			getSuggestionsByAutocomplete(companyName)
				.then((suggestions) => {
					setSuggestions(suggestions);
					setStatus('Done!');
				})
				.catch(error => setRequestError(error.message))
		}
	}, [companyName]);

	const blockStyle = {
		display: 'block',
		margin: 'auto'
	}

	const getProfile = (performanceId) => () => {
		setCompanyProfile({});
		setStatus('Retrieving company profile...');
		getCompanyProfile(performanceId)
			.then(profile => {
				setCompanyProfile(profile);
				setStatus('Done!');
			})
			.catch(error => setRequestError(error.message))
	}

	return (
		<div >
			{!requestError && status &&
				(<div style={{ ...blockStyle, backgroundColor: 'lightgreen', opacity: '0.6', maxWidth: '50%' }}>
					{status}
				</div>)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<label style={blockStyle}>Company Name</label>
				<input name="companyName" ref={register({ required: true })} style={blockStyle} />
				{errors.companyName && <span style={{}}>This field is required.</span>}
				<input type="submit" style={blockStyle} />
			</form>
			{suggestions.length !== 0 && suggestions.map(suggestion => (
				<div key={suggestion.performanceId} style={{...blockStyle, marginTop: '5px', marginBottom: '5px'}}>
					<span>name: {suggestion.name} </span>
					<button onClick={getProfile(suggestion.performanceId)}> Get profile </button>
				</div>
			))}
			{ Object.keys(companyProfile).length !== 0 && (
				<Section title='About'>
					<p style={{ textAlign: 'left', maxWidth: '60%', margin: 'auto' }}> {companyProfile.about} </p>
				</Section>
			)}
			{ requestError && (
				<div style={{
					backgroundColor: '#ff5050',
					border: '5px solid red',
					boxShadow: '0px 0px 5px 5px #ff5050',
					margin: 'auto',
					marginBottom: '10px',
					maxWidth: '50%',
					opacity: '0.8',
					padding: '5px'
				}}>
					{ requestError}
				</div>
			)}
		</div>
	)
}

export default Main;
