import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function App() {
  const [text, setText] = React.useState('');
  const [list, setList] = React.useState([])
  let id;
  const search = (e) => {
    const value = e.target.value;
    setText(value);
    if (id) clearTimeout(id);
    const fetchData = () => {
        fetch('http://localhost:3000/country.json')
        .then(response => response.json())
        .then(data => {
          setList(data.filter((item)=>item.Name.toLowerCase().startsWith(value.toLowerCase())));
        return;
      });
    }
    return new Promise((resolve) => {
      id = setTimeout(
        () => resolve(fetchData()),
        1000,
      );
    });
  }
  return (
    <Autocomplete
        freeSolo
        options={list.map((option) => option.Name)}
        renderInput={(params) => <TextField {...params} label="Country" autoFocus value={text} onChange={search}/>}
      />
  );
}

export default App;
