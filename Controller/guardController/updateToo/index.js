const { executeQuery } = require("../../../DB/index");

const updateToo = async (req, res) => {
    try {
        const {itemId, too} = req.body;

        if(!itemId)
        {
            return res.status(403).json(
                {
                    success:false,
                    data: null,
                    message: "кодийг явуулна уу"
                }
            )
        }
        

       
        const updateQuery = `UPDATE customers SET too = ? WHERE id = ?`;
        await executeQuery(updateQuery, [too, itemId]);

        return res.status(200).json({
            success: true,
            data: null,
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

module.exports = updateToo;
