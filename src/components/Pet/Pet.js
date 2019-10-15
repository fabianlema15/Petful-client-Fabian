import React from 'react';
//import logo from './logo.svg';
import './Pet.css';

function Animal(props) {
  return (
    <div>
      <div className='image'>
        <img src={props.pet.imageURL} alt={props.pet.imageDescription} />
      </div>
      <div className='desc'>
        <div><span>Name: </span>{props.pet.name}</div>
        <div><span>Genre: </span>{props.pet.sex}</div>
        <div><span>Age: </span>{props.pet.age}</div>
        <div><span>Breed: </span>{props.pet.breed}</div>
        <div><span>{props.pet.name} story: </span>{props.pet.story}</div>
      </div>
    </div>
  );
}

export default Animal;
