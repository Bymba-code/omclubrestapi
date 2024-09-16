const { executeQuery } = require("../../../DB/index");

const Delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "ID байхгүй байна"
            });
        }

        const selectQuery = "SELECT * FROM Users WHERE id = ?";
        const records = await executeQuery(selectQuery, [id]);

        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Хайсан мөр байхгүй байна"
            });
        }

        const deleteUserQuery = "DELETE FROM Users WHERE id = ?";
        await executeQuery(deleteUserQuery, [id]);

        const deleteCustomerQuery = "DELETE FROM customers WHERE invited = ?";
        await executeQuery(deleteCustomerQuery, [id]);

        await executeQuery('COMMIT');
        
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

module.exports = Delete;
