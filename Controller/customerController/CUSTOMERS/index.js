const { executeQuery } = require("../../../DB/index")


const userItem = async (req, res) => {
    try 
    {
        const {id} = req.params

        const query = "SELECT * FROM customers WHERE invited = ?"

        const data = await executeQuery(query, [id])

        if(data.length === 0)
            {
                return res.status(403).json({
                    success:false,
                    data: null,
                    message: "Өгөгдөл байхгүй"
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
        console.log(err)
    }
}

module.exports = userItem
