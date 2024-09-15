const { executeQuery } = require("../../../DB/index");

const customerControllerGuard = async (req, res) => {
    try {
        const query = "SELECT * FROM customers";
        const data = await executeQuery(query);
        
        if (data.length === 0) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Өгөгдөл байхгүй" 
            });
        }
        
        return res.status(200).json({
            success: true,
            data: data,
            message: "Амжилттай" 
        });
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа та дахин оролдоно уу", 
            error: err.message 
        });
    }
}

module.exports = customerControllerGuard;
