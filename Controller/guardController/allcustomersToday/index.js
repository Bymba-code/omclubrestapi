const { executeQuery } = require("../../../DB/index");

const customerControllerGuard = async (req, res) => {
    try {
        // Define the query to get records for the next day
        const query = "SELECT * FROM customers ";
        
        // Execute the query
        const data = await executeQuery(query);
        
        // Check if any records are found
        if (data.length === 0) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Өгөгдөл байхгүй" // "No data available" in Mongolian
            });
        }
        
        // Respond with the data if records are found
        return res.status(200).json({
            success: true,
            data: data,
            message: "Амжилттай" // "Success" in Mongolian
        });
    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error executing query:', err); // Log error for debugging
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа та дахин оролдоно уу", // "Server error, please try again" in Mongolian
            error: err.message // Include error message for debugging purposes
        });
    }
}

module.exports = customerControllerGuard;
