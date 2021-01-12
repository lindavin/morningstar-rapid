import './App.css';
import Main from './components';
import React from 'react';

function App() {
  return (
    <div className="App">
		<br />
		<div>
			This is a GUI wrapper for useful AOU endpoints for the Morningstar 
			API on the RapidAPI platform. THe link is  
			<a rel="noreferrer" href="https://rapidapi.com/apidojo/api/morning-star" target='_blank'> here</a>.
		</div>
		<br />
		<Main />
    </div>
  );
}

export default App;
