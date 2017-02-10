import React from 'react';

const animalBackground = (animal) => ({ backgroundImage: `url(../images/${animal}.gif` });

export default ({ animal }) => (
    <div className="cage" style={animalBackground(animal)}></div>
);