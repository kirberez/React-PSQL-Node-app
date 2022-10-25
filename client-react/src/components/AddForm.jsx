import React from 'react';
import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const AddForm = ({addRow}) => {
  const [newRow, setNewRow] = useState({
    date: '',
    title: '',
    quantity: '',
    price: ''
  })

  function createData(e) {
    e.preventDefault();
    if (newRow.date && 
        newRow.title && 
        newRow.quantity && 
        newRow.price == false) {
          alert('At least one of inputs is empty!')
          return;
        }
    fetch('http://localhost:8080/add', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log('data fetch: ', data);
        addRow(newRow)
        setNewRow({
          date: '',
          title: '',
          quantity: '',
          price: ''
        })
      });
  };

  return (
    <form>
      <MyInput 
        value={newRow.date}
        onChange={e => setNewRow({...newRow, date: e.target.value})}
        type="text"
        placeholder="Введите дату в формате (YYYY-MM-DD)"
      />
      <MyInput 
        value={newRow.title}
        onChange={e => setNewRow({...newRow, title: e.target.value})}
        type="text"
        placeholder="Введите название"
      />
      <MyInput 
        value={newRow.quantity}
        onChange={e => setNewRow({...newRow, quantity: e.target.value})}
        type="text"
        placeholder="Введите количество"
      />
      <MyInput 
        value={newRow.price}
        onChange={e => setNewRow({...newRow, price: e.target.value})}
        type=""
        placeholder="Введите цену"
      />
      <MyButton onClick={createData}>Добавить</MyButton>
    </form>
  );
};

export default AddForm;