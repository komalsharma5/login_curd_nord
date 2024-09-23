const { userModel } = require("../Model")



//create register account
const create_register_S = (data) =>{
    return userModel.create(data)
}

//get all register account
const get_all_register_S = () =>{
    return userModel.find()
}

//create login
const create_login_S = (data) =>{
    return userModel.create(data)
}

// Service to fetch a user by email
const findByEmail = (Email) => {
    return userModel.findOne({Email});
   
}

// const find_email_pass = (Email,Password) =>{
//     return userModel.findOne({Email,Password})
// }
//get all register account
const get_all_login_S = () =>{
    return userModel.find()
}

//update register account
const update_register_S = (id, data) =>{
    return userModel.findByIdAndUpdate(id, data,{ new: true })
}

//delete register account
const delete_register_S = (id) =>{
    return userModel.findByIdAndDelete(id)
 }
//single user block
const block_user_S = (Email) =>{
    return userModel.findByEmail(Email)
}
module.exports = {
    create_register_S,
    get_all_register_S,
    create_login_S,
    findByEmail,
    get_all_login_S,
    update_register_S,
    delete_register_S,
    block_user_S
    // find_email_pass
    
}