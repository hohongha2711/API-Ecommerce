const {default: mongoose} = require("mongoose")

const dbConnect = () =>{
     try{ 
        const con = mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected success")
     } catch(error){ 
            console.log("Database error")
     }
}

module.exports = dbConnect;