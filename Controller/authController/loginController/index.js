const { executeQuery } = require("../../../DB/index")
const bcrypt = require("bcrypt")

// const loginController = async (req, res) => 
// {
//     try 
//     {
//         const {username, password} = req.body

//         if(!username)
//         {
//             return res.status(403).json(
//                 {
//                     success: false,
//                     data: null,
//                     message: "Хэрэглэгчийн нэр хоосон байна"
//                 }
//             )
//         }
//         if(!password)
//         {
//             return res.status(403).json({
//                 success:false,
//                 data: null,
//                 message: "Нууц үг хоосон байна"
//             })
//         }

//         const query = "SELECT * FROM Users WHERE username = ?"
        
//         const data = await executeQuery(query, [username])

//         if(data.length === 0)
//         {
//             return res.status(403).json(
//                 {
//                     success: false,
//                     data: null,
//                     message: "Хэрэглэгч олдсонгүй"
//                 }
//             )
//         }
//         const user = data[0]
//         const hashedPassword = user.password
//         const passwordMatch = bcrypt.compareSync(password, hashedPassword)

//         if(!passwordMatch)
//         {
//             return res.status(401).json(
//                 {
//                     success:false,
//                     data : null,
//                     message:"Хэрэглэгчийн нууц үг буруу байна"
//                 }
//             )
//         }

//         return res.status(200).json(
//             {
//                 success:true,
//                 data: user,
//                 message: "Амжилттай нэвтэрлээ"
//             }
//         )
//     }
//     catch(err)
//     {
//         return res.status(500).json(
//             {
//                 success:false,
//                 data: null,
//                 message: "Серверийн алдаа та дахин оролдоно уу"
//             }
//         )
//     }
// }

const loginController = async(req, res) => {
    const query = "SELECT * FROM Users";
    const data = await executeQuery(query)
    return res.status(200).json({
        user:"amilttai",
        data: data
    })

} 
module.exports = loginController
