import React from 'react';
import About from './About';
import { useForm } from 'react-hook-form';

import '../styles/main.css';

function Main(){

	const { register, handleSubmit, errors  } = useForm();
	const [companyName, setCompanyName] = React.useState("");
	const onSubmit = (data) => {
		setCompanyName(data.companyName);
	};

	const blockStyle = {
		display: 'block',
		margin: 'auto'
	}

	return (
		<div >
			<form onSubmit={handleSubmit(onSubmit)}>
				<label style={blockStyle}>Company Name</label>
				<input name="companyName" ref={register({ required: true  })} style={blockStyle}/>
				{errors.companyName && <span style={{ }}>This field is required.</span>  }
				<input type="submit" style={blockStyle}/>
			</form>
			{ !errors.companyName && <About name={companyName} />  }
		</div>
	)
}

export default Main;
