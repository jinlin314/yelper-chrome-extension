import React from 'react';

const animalBackground = (animal) => ({ backgroundImage: `url(./src/img/${animal}.gif`, height: '200px' });

// exporting the constructor function (dumb component)
	// using destructuring to name individual variables from the first parameter object (props)
	// {selectedAnimal} is equivalent tofunction Cage(props) { const selectedAnimal = props.selectedAnimal; }
export default function Cage ({ selectedAnimal }) {};