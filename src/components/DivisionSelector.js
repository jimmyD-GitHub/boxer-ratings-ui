import React from 'react';
import divisions from '../data/Divisions';

const DivisionSelector = () => (
  <div className="form-group visible-xs-block"> {/* Selector for mobile version only */}
    <select className="form-control" id="divisions">
      {divisions.map(division => (
        <option id={division.id} key={division.id}>{division.name}</option>
      ))}
    </select>
  </div>
);

export default DivisionSelector;