const {executeQuery} = require("../../../DB/index");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            register,
            phoneNumber,
            role,
            create_date
        } = req.body;
    
        }
        const checkQuery = "SELECT * FROM Users WHERE username = ?"
        const checkdata = await executeQuery(checkQuery, [username]);
        if (checkdata.length > 0) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтаны нэр бүртгэгдсэн байна"
            });
        }
      
        if (!firstName) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтний овог хоосон байна"
            });
        }
        if (!lastName) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтний нэр хоосон байна"
            });
        }
        if (!username) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтний нэвтрэх нэр хоосон байна"
            });
          if (!password) {
            return res.status(402).json({
                success: false,
                data: null,
                message: "Ажилтаны нууц үг хоосон байна"
            });
        }
           if (!register) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтний регистрийн дугаарыг оруулна уу"
            });
        }
        if (!role) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтний хандах эрхийг өгнө үү"
            });
        }
     
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = ` INSERT INTO Users (username, password, firstName, lastName, register, phoneNumber, role, create_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
        const values = [username, hashedPassword, firstName, lastName, register, phoneNumber, role, create_date];
        const result = await executeQuery(query, values);
        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                data: result,
                message: "Ажилтний бүртгэлийг амжилттай үүсгэлээ"
            });
        } else {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Бүртгэхэд ямар нэгэн алдаа гарлаа"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа та дахин оролдоно уу",
            error: err.message
        });
    }
};
module.exports = registerController
