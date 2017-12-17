import React from 'react';
import {Route, Link} from 'react-router-dom';

const DivisionLink = ({ label, to, id }) => (
  <Route path={to} children={({ match }) => (
    <Link className={'list-group-item' + (match ? ' active' : '')} to={to} id={id}>{label}</Link>
  )}/>
);

const DivisionMenu = ({ divisions, path }) => (
  <div className="list-group hidden-xs">
    {divisions.map(division => (
      <DivisionLink to={path + division.id}
        id={division.id}
        key={division.id}
        label={division.name}
      />
    ))}
  </div>
);

export default DivisionMenu;