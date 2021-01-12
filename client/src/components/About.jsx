import React from 'react';
import Section from './Section.jsx';
import { getSuggestionsByAutocomplete } from '../services/morningstar.service.js';
import PropTypes from 'prop-types';

function About(props){
	const [suggestion, setSuggestion]  = React.useState('');
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		(async function (){
			try{
				const about = await getSuggestionsByAutocomplete(props.name);
				setSuggestion(about.toString());
				setError('');
			}
			catch(error){
				setError(error.message);
			}
		})();
	});

	return ( // anchor tag works interestingly here.
		<Section title='About'>
			{ error && (
				<div style={{ 
					backgroundColor: '#ff5050',
					border: '5px solid red',
					boxShadow: '0px 0px 5px 5px #ff5050',
					margin: 'auto',
					maxWidth: '50%',
					opacity: '0.8',
					padding: '5px'
					}}>
				{ error }
				</div>
			) }
			<div>
				{ suggestion }
			</div>
		</Section>
	);
}

export default About;

About.propTypes = {
	name: PropTypes.string.isRequired
}
