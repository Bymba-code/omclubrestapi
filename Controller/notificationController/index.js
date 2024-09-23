const { executeQuery } = require("../../DB/index");

const getNotification = async (req, res) => {
  try {
    const query = "SELECT * FROM notification";
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

const insertNotification = async (req, res) => {
  try 
  {
    const {section} = req.body;

    const query = `UPDATE notification SET section = ? WHERE id = 1`;

    const result = await executeQuery(query, [section]);
    return res.status(200).json({
      success: true,
      data: null,
      message: "Амжилттай шинэчиллээ" // "Successfully updated"
    });
    
  }
  catch(err)
  {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа та дахин оролдоно уу", 
      error: err
    });
  }
}





module.exports = {
  getNotification,
  insertNotification,

};
