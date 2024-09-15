const { executeQuery } = require("../../../DB/index");

const oruulahController = async (req, res) => {
    try {
        const { persons, itemId, liveTime} = req.body;

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
        if(!persons){
            return res.status(403).json(
                {
                success:false,
                data: null,
                message: "Хүний тоог явуулна уу"
                }
            )
        }

        const selectQuery = "SELECT * FROM customers WHERE id = ?";
        const records = await executeQuery(selectQuery, [itemId]);

        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Хайсан мөр байхгүй байна"
            });
        }

       
        const updateQuery = `UPDATE customers SET isOrson = 1, too = ? , orsonDate = ? WHERE id = ?`;
        await executeQuery(updateQuery, [persons ,liveTime,itemId]);

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

module.exports = oruulahController;
