import React from 'react';
import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MySelect from './UI/select/MySelect';

const SortForm = ({setRows}) => {
  const [sort, setSort] = useState({
    column: '',
    condition: ''
  });
  const getSortData = (e) => {
    e.preventDefault();
    if (sort.column && sort.condition) {
      fetch(`http://localhost:8080/sort?column=${sort.column}&condition=${sort.condition}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
          data = JSON.parse(data);
          setRows(data)
        });
    }
  }

  return (
    <form>
      <h3>Сортировка</h3>
      <MySelect 
        defaultValue='Колонка'
        value={sort.column}
        options={[
          {value: 'date', name: 'Дата'},
          {value: 'title', name: 'Название'},
          {value: 'quantity', name: 'Количество'},
          {value: 'price', name: 'Цена'},
        ]}
        onChange={val => setSort({...sort, column: val})}
      />
      <MySelect 
        defaultValue='Условие'
        value={sort.condition}
        options={[
          {value: ' ASC ', name: 'по возрастанию'},
          {value: ' DESC ', name: 'по убыванию'},
        ]}
        onChange={val => setSort({...sort, condition: val})}
      />
      <MyButton value='Применить' onClick={getSortData}>
        Применить
      </MyButton>
    </form>
  );
};

export default SortForm;