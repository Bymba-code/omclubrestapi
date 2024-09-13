const { executeQuery } = require("../../../DB/index");

const oruulahController = async (req, res) => {
    try {
        const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const orsonTsag = `${year}-${month}-${day} ${hours}:${minutes}`;
        const { persons, itemId} = req.body;

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

       
        const updateQuery = `UPDATE customers SET isOrson = 1, too = ? , orsonTsag = ? WHERE id = ?`;
        await executeQuery(updateQuery, [persons , orsonTsag,itemId]);

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
