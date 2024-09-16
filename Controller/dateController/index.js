const { executeQuery } = require("../../DB/index");

const getDate = async (req, res) => {
  try {
    const query = "SELECT * FROM date_negtgel";
    const data = await executeQuery(query);
    
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Алдаа гарлаа" // "Error occurred"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: data,
      message: "Амжилттай татлаа" 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа та дахин оролдоно уу", 
      error: err
    });
  }
};

const insertDate = async (req, res) => {
  try {
    const { date, changeTime } = req.body;

    // Check if a date record exists
    const checkQuery = "SELECT * FROM date_negtgel LIMIT 1";
    const existingData = await executeQuery(checkQuery);

    if (existingData.length > 0) {
      // Update existing date record
      const updateQuery = "UPDATE date_negtgel SET date = ? , change_date = ? WHERE id = 1"; // Assuming ID 1, adjust as needed
      await executeQuery(updateQuery, [date, changeTime]);
      return res.status(200).json({
        success: true,
        data: null,
        message: "Амжилттай шинэчиллээ" // "Successfully updated"
      });
    } else {
      // Insert new date record
      const insertQuery = "INSERT INTO date_negtgel (date) VALUES (?)"; // Adjust column name
      await executeQuery(insertQuery, [date]);
      return res.status(201).json({
        success: true,
        data: null,
        message: "Амжилттай нэмлээ" // "Successfully inserted"
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа та дахин оролдоно уу", // "Server error, please try again"
      error: err
    });
  }
};

module.exports = {
  getDate,
  insertDate
};
