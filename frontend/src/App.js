import './App.css';
import { deleteUser, fetchUsers } from './api.js'
import { useState, useEffect } from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';

function App() {
  const [sortType, setSortType] = useState('id');
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  useEffect(function () {
    $('tr:first').css({ backgroundColor: '#00308F', color: 'white' })
    $('tr:nth-child(2n)').css({ backgroundColor: 'white', color: 'black' })
    refreshTable()


  })
  function refreshTable() {
    fetchUsers()
      .then(response => {
        setUsers(response.data)

      })
  }
  const userRowClicked = (event, user) => {
    if ($(event.target).hasClass('delete')) {
      deleteUser(user.id)
        .then(response => {
          if (response.status === 200) {
            refreshTable()
          }
        })

      return
    }
    navigate('/edit', { state: user })
  }
  const createTableRow = (user) => {
    return (<tr onClick={(event) => { userRowClicked(event, user) }} style={table_row}>
      <td className='delete' style={{ color: 'black', fontWeight: 'normal', padding: '8px' }}><FaTrash /></td>
      <td style={table_column}>{user.firstName}</td>
      <td style={table_column}>{user.lastName}</td>
      <td style={table_column} >{user.age}</td>
      <td style={table_column}>{user.phone}</td>
    </tr>)
  }

  let table = {
    backgroundColor: 'white',
    display: 'flex',
    width: '80%',
    minWidth: '500px',
    maxWidth: '600px',
    flexDirection: 'column'
  }
  let table_column = {

    padding: '8px',
    paddingLeft: '16px',
    width: '25%',
    paddingRight: '16px',
    fontSize: '18px'
  }
  let add_button = {
    padding: '16px',
    backgroundColor: '#007FFF',
    color: 'black',
    border: '.5px solid white',
    borderRadius: '8px',
    margin: '16px',
    fontWeight: 'bold'
  }
  let table_row = {
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    color: 'black'
  }

  useEffect(() => {
    const sortArray = type => {
      const types = {
        firstName: 'firstName',
        lastName: 'lastName',
        age: 'age',
        phone: 'phone',
      };
      const sortProperty = types[type];
      const sorted = [...users].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setUsers(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="App">
      <div className="App-header">
        
        <h1>Users</h1>
        <div>
          <select onChange={(e) => setSortType(e.target.value)} style={add_button}>

            <option value="firstName">Name</option>
            <option value="lastName">Last Name</option>
            <option value="age">Age</option>
            <option value="Phone">phone</option>
          </select>
        </div>
        <table style={table}>
          <tr style={table_row}>

            <td style={table_column}>Name</td>
            <td style={table_column}>Last Name</td>
            <td style={table_column} >Age</td>
            <td style={table_column}>Phone</td>
          </tr>

          {users.map(createTableRow)}
        </table>
        <button onClick={() => { navigate('/add') }} style={add_button}>Add New User <AiOutlineUserAdd /></button>

      </div>
    </div>
  );
}

export default App;
