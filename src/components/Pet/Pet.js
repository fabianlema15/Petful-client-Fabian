import React from 'react';
//import logo from './logo.svg';
import './Pet.css';

function Animal(props) {
  return (
    <div>
      <div className='image'>
        <img src={props.pet.imageURL} alt={props.pet.imageDescription} />
      </div>
      <div>
        <div>Name: <span></span>{props.pet.name}</div>
        <div>Genre: <span></span>{props.pet.sex}</div>
        <div>Age: <span></span>{props.pet.age}</div>
        <div>Breed: <span></span>{props.pet.breed}</div>
        <div>{props.pet.name} story: <span></span>{props.pet.story}</div>
      </div>
    </div>
  );
}

export default Animal;
