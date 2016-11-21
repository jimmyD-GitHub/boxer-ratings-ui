import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from './Ratings';
import './index.css';

var DIVISIONS = [
    {id: 'heavyweight', name: 'Heavyweight', weightLimit: ''},
    {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: ''},
    {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: ''},
    {id: 'super-middleweight', name: 'Super Middleweight', weightLimit: ''},
    {id: 'middleweight', name: 'Middleweight', weightLimit: ''},
    {id: 'light-middleweight', name: 'Light Middleweight', weightLimit: ''},
    {id: 'welterweight', name: 'Welterweight', weightLimit: ''},
    {id: 'light-welterweight', name: 'Light Welterweight', weightLimit: ''},
    {id: 'lightweight', name: 'Lightweight', weightLimit: ''},
    {id: 'super-featherweight', name: 'Super Featherweight', weightLimit: ''},
    {id: 'featherweight', name: 'Featherweight', weightLimit: ''},
    {id: 'super-bantamweight', name: 'Super Bantamweight', weightLimit: ''},
    {id: 'bantamweight', name: 'Bantamweight', weightLimit: ''},
    {id: 'super-flyweight', name: 'Super Flyweight', weightLimit: ''},
    {id: 'flyweight', name: 'Flyweight', weightLimit: ''},
    {id: 'light-flyweight', name: 'Light Flyweight', weightLimit: ''},
    {id: 'minimumweight', name: 'Minimumweight', weightLimit: ''},
    {id: 'light-minimumweight', name: 'Light Minimumweight', weightLimit: ''}
];

ReactDOM.render(
  <Ratings divisions={DIVISIONS} />,
  document.getElementById('root')
);
