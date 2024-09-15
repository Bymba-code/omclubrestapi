const {executeQuery} = require("../../DB/index")


const ChampionItem = async (req, res) => {
    try 
    {
        const {startDate, endDate} = req.body

        const query = "SELECT * FROM customers WHERE DATE(create_date) BETWEEN ? AND ?"

        const data = await executeQuery(query, [startDate, endDate])

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

module.exports =  ChampionItem 
