import React from 'react';

function Section(props){
	return (
		<div>
			<div style={{ color: '#ffcc00', padding: '20px' }}>{props.title}</div>
			<div>{props.children}</div>
		</div>
	);
}

export default Section;
