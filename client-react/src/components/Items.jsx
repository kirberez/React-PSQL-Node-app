import React from 'react';

const Items = function({rows}) {
  return (
    <>
      <div className="row">
        <h3>Дата</h3>
        <h3>Название</h3>
        <h3>Количество</h3>
        <h3>Расстояние</h3>
      </div>
      {
        rows 
          ? rows.map(row => 
            (
              <div key={row.id} className="row">
                <p>{row.date.slice(0, 10) || 0}</p>
                <p>{row.title || 0}</p>
                <p>{row.quantity || 0}</p>
                <p>{row.price || 0}</p>
              </div>
            )  
          )
          : <h1 style={{textAlign: 'center'}}>Информация отсутствует</h1>
      }
    </>
  )
};

export default Items;