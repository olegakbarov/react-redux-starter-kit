
import s from './styles.css';
import React from 'react';

export default () => {
  return (
    <div className={s.spinner}>
      <div className={s.bounce1}></div>
      <div className={s.bounce2}></div>
      <div className={s.bounce3}></div>
    </div>
  );
};
