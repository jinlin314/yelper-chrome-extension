import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';

export default ({setAnimal, animal}) => (
    <div>
        <AnimalSelect submitAnimal={setAnimal}/>
        <Cage animal={animal}/>
    </div>
);