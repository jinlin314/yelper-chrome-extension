import React, { Component } from 'react';

// exporting the constructor function (dumb component).
// what is the parameter coming in here?
export default function AnimalSelect (props) {
    //console.log(">>>>AS props>>>>>", props);
    return (
            <form>
                <label>Select an Animal: </label>
                <select onChange={(event)=>props.submitAnimal(event.target.value)}>
                    {
                        props.animals && props.animals.map(animal => <option key={animal}> {animal} </option>)
                    }
                </select>
            </form>
    )

};

