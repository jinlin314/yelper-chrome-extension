import React from 'react';

const animalBackground = (animal) => ({ backgroundImage: `url(./src/img/${animal}.gif` });

export default ({ animal }) => (
    <div className="cage" style={animalBackground(animal)}></div>
);