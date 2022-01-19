import './App.css'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { editUser } from './api'
import $ from 'jquery'
import { BiHomeHeart } from 'react-icons/bi';
function Edit() {
    const location = useLocation()
    const navigate = useNavigate()

    function saveChanges(e) {
        e.preventDefault()
        const name_input = e.target[0].value
        const lastname_input = e.target[1].value
        const phone_input = e.target[2].value
        const age_input = e.target[3].value


        editUser(location.state.id, {
            id: location.state.id,
            firstName: name_input,
            lastName: lastname_input,
            phone: phone_input,
            age: age_input
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/')
                }
            })
            .catch(err => {
                alert('Details are corrupted please try again')
                console.log(err)
            })
    }
    useEffect(function () {
        if (location.state === null) {
            navigate('/')
            return
        }

        $('#edit_title').html('Editing User: ' + location.state.firstName)

        $.each($('input'), (index, element) => {
            switch (index) {
                case 0:
                    $(element).attr('placeholder', location.state.firstName)
                    break;
                case 1:
                    $(element).attr('placeholder', location.state.lastName)
                    break;
                case 2:
                    $(element).attr('placeholder', location.state.phone)
                    break;
                case 3:
                    $(element).attr('placeholder', location.state.age)
                    break;
            }
        })
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
        color: 'white',
        border: '.5px solid white',
        borderRadius: '8px',
        margin: '16px',
        fontWeight: 'bold'
    }
    let form = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
    return (<div className="App-header">
        <h2 id='edit_title'></h2>
        <form onSubmit={(event) => { saveChanges(event) }} style={form}>

            <label style={form_label}>First Name</label>
            <input style={form_input} placeholder='enter first name'></input>
            <label style={form_label}>Last Name</label>
            <input style={form_input} placeholder='enter last Name'></input>
            <label style={form_label}>Phone</label>
            <input style={form_input} placeholder='enter phone'></input>
            <label style={form_label}>Age</label>
            <input style={form_input} placeholder='ente age'></input>
            <button style={form_submit} type='submit'>Save changes</button>
            <button onClick={() => { navigate('/') }} style={form_submit}>Home page <BiHomeHeart /></button>


        </form>
    </div>
    )
}
export default Edit