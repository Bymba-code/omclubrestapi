const { executeQuery } = require("../../../DB/index");

const customerControllerGuard = async (req, res) => {
    try {
      res.status(200).json({data:"ho"})
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
