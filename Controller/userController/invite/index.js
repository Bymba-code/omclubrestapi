
const { executeQuery } = require("../../../DB/index")

const Invite = async (req, res) => 
    {
        try 
        {
            const {id, too, cod, create_date, orsonDate, username, afterNegtgelOff, today} = req.body;


            if(!id)
                {
                    return res.status(403).json(
                        {
                            success:false,
                            data: null,
                            message: "ID хоосон байна"
                        }
                    )
                }

            const checkQuery = "SELECT * FROM customers WHERE cod = ? and Date(create_date) = today"
            const checkdata = await executeQuery(checkQuery, [cod, today])
            
            if(checkdata.length > 0)
            {
                return res.status(403).json(
                    {
                        success:false,
                        data: null,
                        message: "Бүртгэлтэй код байна"
                    }
                )
            }

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
       
            const isOrson = 0;
            const isAsuudal = 0;
            const date = null;

            const values = [
                id,
                too,
                cod,
                isOrson,
                isAsuudal,
                create_date,
                date,
                username,
                afterNegtgelOff
            ]

            const query = "INSERT INTO customers (invited,too,cod,isOrson,isAsuudal,create_date, orsonDate,username, afterNegtgelOff) VALUES (?)"
            
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

module.exports = Invite
