const { executeQuery } = require("../../../DB/index");
const bcrypt = require("bcrypt")

const getDetail = async (req, res) => {
    try {
        const {username} = req.body;

        if(!username)
        {
            return res.status(403).json(
                {
                    success:false,
                    data: null,
                    message: "Ажилтаны ажиллаж буй нэрийг явуулна уу"
                }
            )
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

        const password = bcrypt.compareSync(user.password)

        return res.status(200).json({
            success: true,
            data: records,
            message: "Амжилттай",
            password:password
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
