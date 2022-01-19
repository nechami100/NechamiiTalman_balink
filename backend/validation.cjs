function validateUser(user) {

    if(user!=undefined &&
        user.firstName != undefined
        && user.lastName != undefined
        && user.phone != undefined
        && user.age != undefined){

            return validatePhoneNumber(user.phone)
        }
        else {
            return false
        }
}

function validatePhoneNumber(phone) {
    let prefix = phone.substring(0,3) // 050,052..
    if(prefix.includes('050') 
    || prefix.includes('052')
    || prefix.includes('054')
    || prefix.includes('055')
    || prefix.includes('057')
    || prefix.includes('058')
    || prefix.includes('053'))
 {
     return true
 }
     return false
}

module.exports ={
    validateUser
}