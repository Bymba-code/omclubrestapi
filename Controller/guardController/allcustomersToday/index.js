const { executeQuery } = require("../../../DB/index");

const customerControllerGuard = async (req, res) => {
    try {
      res.status(200).json({data:"ho"})
    } catch (err) {
        console.error('Error executing query:', err);
           return res.json(error)
    }
}

module.exports = customerControllerGuard;
