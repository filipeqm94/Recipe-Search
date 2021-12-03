import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <Link to='/'>
        <h1>Recipe Search</h1>
      </Link>
    </nav>
  );
}
