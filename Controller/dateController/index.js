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

const insertDate = (req, res) => {
  try 
  {
    const {date, changeTime} = req.body;

    const query = `UPDATE date_negtgel SET date = ?, change_date = ? WHERE id = ?`;

    const result = await executeQuery(query, [date, changeTime]);
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
  getDate,

};
