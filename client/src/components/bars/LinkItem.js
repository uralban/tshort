import React from 'react';
import { Link } from 'react-router-dom';

const LinkItem = ({ children, classNameLi, classNameA, href }) => {
  return (
    <li className={classNameLi}>
      <Link to={href} className={classNameA}>
        {children}
      </Link>
    </li>
  );
};

export default LinkItem;