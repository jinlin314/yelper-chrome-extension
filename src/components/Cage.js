import React from 'react';

const animalBackground = (animal) => ({ backgroundImage: `url(./src/img/${animal}.gif`, height: '200px' });

// exporting the constructor function (dumb component)
	// using destructuring to name individual variables from the first parameter objectt (props)
export default ({ selectedAnimal }) => {
	return (
		<div style={animalBackground(selectedAnimal)}></div>
	)
};