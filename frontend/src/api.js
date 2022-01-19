import axios from 'axios'

export async function fetchUsers() {
    return await axios.get('http://localhost:4001/users')
}
export async function editUser(userId,newUserData) {
    return await axios.put('http://localhost:4001/edit?userId='+userId,newUserData)
}
export async function deleteUser(userId) {
    return await axios.delete('http://localhost:4001/delete?userId='+userId)
}
export async function addNewUser(user) {
    return await axios.post('http://localhost:4001/adduser',user)
}