import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';
import MyButton from './UI/button/MyButton';

const FilterForm = ({setRows}) => {
  const [filter, setFilter] = useState({
    column: '',
    condition: '',
    query: ''
  })

  const getFilterData = (e) => {
    e.preventDefault();
    if (filter.column && filter.condition && filter.query) {
      fetch(`http://localhost:8080/filter?column=${filter.column}&value=${filter.query}&oper=${filter.condition}`)
      .then(response => {        
        return response.text()
      })
      .then(data => {
        data = JSON.parse(data);
        setRows(data)
      });
    }
  }
  return (
    <form>
      <h3>Фильтр</h3>
      <MySelect 
        value={filter.column}
        onChange={val => setFilter({...filter, column: val})}
        defaultValue='Колонка'
        options={[
          {value: "quantity", name: "Количество"},
          {value: "price", name: "Цена"},
        ]}
      />
      <MySelect 
        defaultValue='Условие'
        value={filter.condition}
        options={[
          {value: " > ", name: "Больше"},
          {value: " >= ", name: "Больше либо равно"},
          {value: " = ", name: "Равно"},
          {value: " <= ", name: "Меньше либо равно"},
          {value: " < ", name: "Меньше"},
        ]}
        onChange={val => setFilter({...filter, condition: val})}
      />
      <MyInput 
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        type="text"
        placeholder="Введите значение"
      />
      <MyButton 
        onClick={getFilterData}
      >
        Применить фильтр
      </MyButton>
    </form>
  );
};

export default FilterForm;