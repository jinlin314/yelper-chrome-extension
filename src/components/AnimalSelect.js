import React, { Component } from 'react';

// exporting the constructor function (dumb component)
export default ({animals, submitAnimal}) => {
  return (
    <form>
      <label>Select an Animal: </label>
      <select onChange={(e)=> submitAnimal(e.target.value)}> 
      {
        animals.map(animal => <option key={animal}>{animal}</option>) 
      }
      </select>
    </form>
  )
};

