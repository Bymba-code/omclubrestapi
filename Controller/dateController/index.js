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
      message: "Амжилттай татлаа" // "Successfully retrieved"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа, та дахин оролдоно уу", // "Server error, please try again"
      error: err
    });
  }
};

const insertDate = async (req, res) => {
  try {
    const { date, changeTime } = req.body;

    const query = `UPDATE date_negtgel SET date = ?, change_date = ? WHERE id = 1`;
    await executeQuery(query, [date, changeTime]);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Амжилттай шинэчиллээ" // "Successfully updated"
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа, та дахин оролдоно уу", // "Server error, please try again"
      error: err
    });
  }
};

const negtgelNeeh = async (req, res) => {
  try {
    const query = 'UPDATE date_negtgel SET isNegtgelOff = 0 WHERE id = 1';
    await executeQuery(query);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Амжилттай шинэчиллээ" // "Successfully updated"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа, та дахин оролдоно уу", // "Server error, please try again"
      error: err
    });
  }
};

const negtgelHaah = async (req, res) => {
  try {
    const query = 'UPDATE date_negtgel SET isNegtgelOff = 1 WHERE id = 1';
    await executeQuery(query);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Амжилттай шинэчиллээ" // "Successfully updated"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Серверийн алдаа, та дахин оролдоно уу", // "Server error, please try again"
      error: err
    });
  }
};

module.exports = {
  getDate,
  insertDate,
  negtgelNeeh,
  negtgelHaah
};
