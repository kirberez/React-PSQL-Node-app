import React from 'react';
import classes from './MyButton.module.css';

// children - спец пропс, содержащий все вложенные элементы
const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};

export default MyButton;