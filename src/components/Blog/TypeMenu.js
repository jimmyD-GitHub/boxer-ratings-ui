import React from 'react';
import {Route, Link} from 'react-router-dom';

const TypeLink = ({label, to, id}) => (
  <Route path={to} children={({match}) => (
    <Link className={'list-group-item' + (match ? ' active' : '')} to={to} id={id}>{label}</Link>
  )}/>
);

const TypeMenu = ({types}) => (
  <div className="list-group hidden-xs">
    {types.map(type => (
      <TypeLink to={type.path}
                id={type.id}
                key={type.id}
                label={type.name}
      />
    ))}
  </div>
);

export default TypeMenu;