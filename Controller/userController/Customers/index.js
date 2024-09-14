const { executeQuery } = require("../../../DB/index")

const CustomersController = async (req, res) => {
    try 
    {
        const {id} = req.params;

        const query = "SELECT * FROM customers WHERE invited = ?"
        const data = await executeQuery(query, [id])

        if(data.length === 0)
            {
                return res.status(403).json({
                    success:false,
                    data: null,
                    message: "Амжилтгүй"
                })
            }
            return res.status(200).json(
                {
                    success: true,
                    data:data,
                    message: "Амжилттай"
                }
            )

    }
    catch(err)
    {
        return res.status(500).json(
            {
                success:false,
                data: null,
                message: "Серверийн алдаа та дахин оролдоно уу",
                error: err
            }
        )
    }
}

module.exports = CustomersController
