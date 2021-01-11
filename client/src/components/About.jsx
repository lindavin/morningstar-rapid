import React from 'react';
import Section from './Section.jsx';

function About(){
	return ( // anchor tag works interestingly here.
		<Section title='About'>
			<a href='https://www.google.com' target='_blank'>Google.com</a>
		</Section>
	);
}

export default About;
