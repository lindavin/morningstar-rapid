import React from 'react';

function Section(props){
	return (
		<div>
			<div style={{ color: '#ffcc00' }}>{props.title}</div>
			<div>{props.children}</div>
		</div>
	);
}

export default Section;
