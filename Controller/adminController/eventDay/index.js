const { executeQuery } = require("../../../DB/index")

const startEvent = async (req, res) => {
    try  
    {

        const query = `UPDATE story SET isStart = 1 WHERE id = 1`;

        const data = await executeQuery(query)

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
                message: "Серверийн алдаа та дахин оролдоно уу"
            }
        )
    }
}

const endEvent = async (req, res) => {
    try  
    {

        const query = `UPDATE story SET isStart = 0 WHERE id = 1`;

        const data = await executeQuery(query)

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
                message: "Серверийн алдаа та дахин оролдоно уу"
            }
        )
    }
}

module.exports = {startEvent,endEvent }
