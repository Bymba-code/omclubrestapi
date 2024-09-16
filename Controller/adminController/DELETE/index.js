const { executeQuery } = require("../../../DB/index");

const Delete = async (req, res) => {
    const connection = await executeQuery("START TRANSACTION"); // Start transaction
    try {
        const { id } = req.body;

        // Check if the ID is provided
        if (!id) {
            await executeQuery("ROLLBACK"); // Rollback if no ID provided
            return res.status(400).json({
                success: false,
                data: null,
                message: "ID байхгүй байна"
            });
        }

        // Check if the record exists
        const selectQuery = "SELECT * FROM Users WHERE id = ?";
        const records = await executeQuery(selectQuery, [id]);

        if (records.length === 0) {
            await executeQuery("ROLLBACK"); // Rollback if record not found
            return res.status(404).json({
                success: false,
                data: null,
                message: "Хайсан мөр байхгүй байна"
            });
        }

        // Delete the user record
        const deleteUserQuery = "DELETE FROM Users WHERE id = ?";
        await executeQuery(deleteUserQuery, [id]);

        // Delete related customer record
        const deleteCustomerQuery = "DELETE FROM customers WHERE invited = ?";
        await executeQuery(deleteCustomerQuery, [id]);

        // Commit transaction if all queries succeed
        await executeQuery("COMMIT");
        
        // Respond with success
        return res.status(200).json({
            success: true,
            data: null,
            message: "Амжилттай"
        });

    } catch (err) {
        // Rollback transaction if an error occurs
        await executeQuery("ROLLBACK");
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа, та дахин оролдоно уу",
            error: err.message // Include the error message for debugging
        });
    }
};

module.exports = Delete;
