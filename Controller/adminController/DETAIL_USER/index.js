const { executeQuery } = require("../../../DB/index");
const bcrypt = require("bcrypt");

const getDetail = async (req, res) => {
    try {
        const { username, password } = req.body; // Assume plain-text password is sent in request body

        if (!username || !password) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Ажилтаны ажиллаж буй нэр болон нууц үг шаардлагатай"
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
        const hashedPassword = user.password; // Assume hashed password is stored in 'password' field

        // Compare the provided plain-text password with the stored hashed password
        const passwordMatch = bcrypt.compareSync(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Нууц үг буруу байна"
            });
        }

        return res.status(200).json({
            success: true,
            data: records,
            message: "Амжилттай"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа, та дахин оролдоно уу"
        });
    }
};

module.exports = getDetail;
