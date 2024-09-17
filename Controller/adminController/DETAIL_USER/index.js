const { executeQuery } = require("../../../DB/index");
const bcrypt = require("bcrypt");

const getDetail = async (req, res) => {
    try {
        const { username,newPassword } = req.body; 

        if (!username || !newPassword) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Ажилтаны нэр, болон шинэ нууц үг шаардлагатай"
            });
        }

        const selectQuery = "SELECT * FROM Users WHERE username = ?";
        const records = await executeQuery(selectQuery, [username]);

        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Ажилтаны нэр байхгүй байна"
            });
        }

        const user = records[0];

        const newHashedPassword = bcrypt.hashSync(newPassword, 10);

        const updateQuery = "UPDATE Users SET password = ? WHERE username = ?";
        await executeQuery(updateQuery, [newHashedPassword, username]);

        return res.status(200).json({
            success: true,
            data: null,
            message: "Нууц үг амжилттай солигдсон"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа, та дахин оролдоно уу"
        });
    }
};

module.exports = {
    getDetail
};
