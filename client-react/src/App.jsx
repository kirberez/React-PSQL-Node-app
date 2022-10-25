import React, { useState, useEffect } from 'react';
import AddForm from './components/AddForm.jsx';
import FilterForm from './components/FilterForm.jsx';
import Items from './components/Items.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import MyModal from './components/UI/modal/MyModal.jsx';
import './styles/App.css';

function App() {
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    column: '',
    condition: '',
    query: ''
  })

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('http://localhost:8080')
      .then(response => {
        return response.text();
      })
      .then(data => {
        data = JSON.parse(data);
        setRows(data);
      })
  }

  const addRow = (newRow) => {
    setRows([...rows, newRow])
    getData();
    setVisible(false);
  }



  return (
    <div className='container'>
      <FilterForm filter={filter} setFilter={setFilter} setRows={setRows} />
      <MyButton
        style={{marginTop: 15, marginBottom: 15}}
        onClick={() => setVisible(true)}
      >
        Добавить строку
      </MyButton>
      <MyModal visible={visible} setVisible={setVisible}>
        <AddForm addRow={addRow} />
      </MyModal>
      
      <Items rows={rows} />
    </div>
  );
}

export default App;
