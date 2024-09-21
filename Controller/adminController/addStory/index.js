
const { executeQuery } = require("../../../DB/index")

const storyInvite = async (req, res) => 
    {
        try 
        {
            const {too, create_date, orsonDate, username, invited} = req.body;
     
            if(!too)
                {
                    return res.status(402).json(
                        {
                            success:false,
                            data: null,
                            message: "Хүний тоог бичнэ үү"
                        }
                    )
                }
       
            const isOrson = 1;
            const isAsuudal = 0;
            const date = orsonDate;
            const cod = "eventday"

            const values = [
                invited
                too,
                cod,
                isOrson,
                isAsuudal,
                create_date,
                date,
                username
            ]

            const query = "INSERT INTO customers (invited,too,cod,isOrson,isAsuudal,create_date, orsonDate,username) VALUES (?)"
            
            const data = await executeQuery(query, [values])

            if(data.affectedRows > 0)
            {
                return res.status(200).json(
                    {
                        success:true,
                        data: data,
                        message:"Урилга амжилттай илгээгдлээ"
                    })
            }
            else 
            {
                return res.status(404).json({
                    success:false,
                    data: null,
                    message: "Бүртгэхэд ямар нэгэн алдаа гарлаа"
                })
            }

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

module.exports = storyInvite
