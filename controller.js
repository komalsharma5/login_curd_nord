const userModel = require("../Model/model")
const { User_service } = require("../Service")
const bcrypt = require("bcrypt")
const saltRounds = 10
const salt = "$2b$10$t7oxiwchWGHa/B9w0AzrYO"


const create_register_controller = async(req,res) =>{
    try {
        const Password = await bcrypt.hash(req.body.Password, salt)
        
        const data = {...req.body,Password}
      
     
        const new_password = await bcrypt.hash(Password,10)
        if(!new_password){
            throw new Error("password not match")
        }
        const searched_result = await User_service.findByEmail(data.Email,Password)
        // console.log("======>>>>" , searched_result)

        if(searched_result){
            throw new Error(`Email by this name ${data.Email} already exist`)
        }
       
          // service
        const new_series = await User_service.create_register_S(data)
           // success response
        res.status(200).json({
            success: true,
            message: "Email created successfully",
            data: new_series
        })
    } catch (error) {
       
        res.status(400).json({
            success:"false",
            message:error.message
        })
    }
}
//get all register account list
const get_register_controller = async(req,res) =>{
  
    try {
        const get_register = await User_service.get_all_register_S()

        if(!get_register){
            throw new Error("register account data not found");  
        }
        res.status(200).json({
            success:true,
            message:"Register_Account retrieved successfully",
            data:get_register
        })
    } catch (error) {
        res.status(400).json({
            success:"false",
            message:"Error retrieving Register_Account"
        })
    }
}

//update register account
const update_register_C = async(req,res) =>{
    try {
          
        const id = req.params.id
        const data = req.body

        const updateData = await User_service.update_register_S(id,data)
        // console.log(updateData);
        
        if(!updateData){
            throw new Error("update register account data not found");
            }
            
        res.status(200).json({
            message:"update account successfully",
            success:true,
            data:updateData
        })
    } catch (error) {
        res.status(400).json({
            message:message.error,
            success:false
        })
    }
}

//delete register account
const delete_register_c = async(req,res) =>{
    try {
        const id = req.params.id
        const data_delete = await User_service.delete_register_S(id)
        if(!data_delete){
            throw new Error("delete register account data not found");
        }
        res.status(200).json({
            message:"delete account successfully",
            success:true,
            data:data_delete
        })
    } catch (error) {
        res.status(400).json({
            message:message.error,
            success:false
        })
    }
}

//create login
const create_login_C = async (req, res) => {
    try {
        const { Email,Password } = req.body
        //here validating email
        const login_user = await userModel.findOne({Email})
        // console.log("login_user",login_user);
        if (!login_user) {
          return res.status(422).json({
            message: "User not found",
            success:false,
          })
        } 
        
        else {
            
            // here is validating password
            const isPasswordValid = await bcrypt.compare(Password, login_user.Password);
            if(!isPasswordValid){
                return res.status(422).json({
                    message: "Login not successful",
                    success:false,
                  })
            }        
            
          return res.status(200).json({
            message: "Login successful",
            success:true,
            data:login_user,
          })
       
        }
      
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
};
const block_user_c = async (req, res) => {
    try {
        const { Email } = req.body;
       
        // Find the user by email and update the isBlocked field to true
        const blockedUser = await userModel.findOneAndUpdate(
            { Email: Email },
            { $set: { isBlocked: true } },
            { new: true }
        );

        if (!blockedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User account has been blocked",
            data: blockedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to block user",
            error: error.message
        });
    }
}



const get_login_controller = async(req,res) =>{
  
    try {
        const get_login = await User_service.get_all_login_S()

        if(!get_login){
            throw new Error("register account data not found");  
        }
        res.status(200).json({
            success:"true",
            message:"LOgin data retrieved successfully",
            data:get_login
        })
    } catch (error) {
        res.status(400).json({
            success:"false",
            message:"Error retrieving Register_Account"
        })
    }
}

// get details of a single user by email
const single_login_user = async (req,res) => {
   try {
   
        const user = await userModel.findOne({Email:req.params.Email})
        
        if(!user){
            throw new Error ('user not found')
        }     
        return  res.status(200).json({
                    message: "User found",
                    success:true,
                    data:user
                })
   } catch (error) {
    res.status(400).json({
        success:"false",
        message:"Error retrieving login Account"
    })
   }
}


module.exports = {
    create_register_controller,
    get_register_controller,
    create_login_C,
    get_login_controller,
    single_login_user,
    update_register_C,
    delete_register_c,
    block_user_c
}



