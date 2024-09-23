const express = require('express')
const { Register_account_C } = require('../../Controller')


const user_router = express.Router()
//regiser router
user_router.post('/register_account',
    Register_account_C.create_register_controller
)
//get all lisr of register account
user_router.get('/get_register_list',
    Register_account_C.get_register_controller
)

//update register account
user_router.put('/update_account/:id',
    Register_account_C.update_register_C
)

//delete register account
user_router.delete('/delete_account/:id',
    Register_account_C.delete_register_c
)

//block user
user_router.post('/block-user',
    Register_account_C.block_user_c
)

//login router
user_router.post('/login-account',
    Register_account_C.create_login_C
)

//get all login users
user_router.get('/get-login',
    Register_account_C.get_login_controller
)

//single user login details
user_router.post('/single-user/:Email',
    Register_account_C.single_login_user
)


module.exports = user_router