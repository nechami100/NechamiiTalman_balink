import './App.css'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { addNewUser } from './api'
import $ from 'jquery'
import { BiHomeHeart } from 'react-icons/bi';

function Add() {
    const navigate = useNavigate()

    function saveNewUser(e) {
        e.preventDefault()
        const name_input = e.target[0].value
        const lastname_input = e.target[1].value
        const phone_input = e.target[2].value
        const age_input = e.target[3].value


        addNewUser({
            id: '0',
            firstName: name_input,
            lastName: lastname_input,
            phone: phone_input,
            age: age_input
        })
            .then(response => {
                if (response.status === 201) {
                    navigate('/')
                }
            })
            .catch(err => {
                alert('Details are corrupted please try again')
                console.log(err)
            })
    }
    useEffect(function () {
        $('#edit_title').html('Add New User')

    })
    let form_label = {
        width: '100%',
        textAlign: 'center',
        padding: '8px'
    }
    let form_input = {
        width: '100%',
        padding: '12px'
    }
    let form_submit = {
        padding: '16px',
        backgroundColor: '#007FFF',
        color: 'black',
        border: '.5px solid white',
        borderRadius: '8px',
        margin: '16px',
        fontWeight: 'bold'
    }
    let form_back = {
        padding: '10px',
        backgroundColor: '#007FFF',
        color: 'black',
        border: '.5px solid white',
        borderRadius: '6px',
        margin: '10px',
        fontWeight: 'bold'
    }
    let form = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
    return (<div className="App-header">
        <h2 id='edit_title'></h2>

        <form onSubmit={(event) => { saveNewUser(event) }} style={form}>

            <label style={form_label}>First Name</label>
            <input style={form_input} placeholder='enter first name'></input>
            <label style={form_label}>Last Name</label>
            <input style={form_input} placeholder='enter last Name'></input>
            <label style={form_label}>Phone</label>
            <input style={form_input} placeholder='enter phone'></input>
            <label style={form_label}>Age</label>
            <input style={form_input} placeholder='ente age'></input>
            <button style={form_submit} type='submit'>Save New User</button>
            <button onClick={() => { navigate('/') }} style={form_back}>Home page <BiHomeHeart /></button>

        </form>
    </div>
    )
}
export default Add