import React from 'react';
import {Route, Link} from 'react-router-dom';

const DivisionLink = ({label, to, id, forceActive}) => (
  <Route path={to} children={({match}) => (
    <Link className={'list-group-item' + (match || forceActive ? ' active' : '')} to={to} id={id}>{label}</Link>
  )}/>
);

const DivisionMenu = ({divisions, path, isRoot}) => (
  <div className="list-group hidden-xs">
    {divisions.map(division => (
      <DivisionLink to={path + division.id}
                    id={division.id}
                    key={division.id}
                    label={division.name}
                    forceActive={isRoot && division.id === 'heavyweight'}
      />
    ))}
  </div>
);

export default DivisionMenu;