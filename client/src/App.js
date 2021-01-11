import './App.css';
import About from './components/About.jsx';
import React from 'react';

function App() {
  return (
    <div className="App">
		<br />
		<div>
			This is a GUI wrapper for useful AOU endpoints for the Morningstar 
			API on the RapidAPI platform. THe link is  
			<a href="https://rapidapi.com/apidojo/api/morning-star" target='_blank'> here</a>.
			<About />	
		</div>
    </div>
  );
}

export default App;
