const {executeQuery} = require("../../../DB/index");
const Temtseen = async (req, res) => {
    try {
        const query = "SELECT * FROM champion";
        const data = await executeQuery(query);
        return res.status(200).json({
            success: true,
            data: data,
            message: "Амжилттай"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа та дахин оролдоно уу"
        });
    }
};
module.exports = Temtseen;
