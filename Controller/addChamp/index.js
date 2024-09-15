const { executeQuery } = require("../../../DB/index")
const bcrypt = require("bcrypt")

const insertChamp= async (req, res) => 
    {
        try 
        {
            const {title, shortDesc , name , zorilgo, shagnal, startDate, endDate} = req.body;

            if(!title)
                {
                    return res.status(403).json(
                        {
                            success:false,
                            data: null,
                            message: "Уралдааны гарчигийг оруулна уу"
                        }
                    )
                }

            if(!shortDesc)
                {
                    return res.status(402).json(
                        {
                            success:false,
                            data: null,
                            message: "Богино тайлбар"
                        }
                    )
                }
            if(!name)
                {
                    return res.status(403).json(
                        {
                            success:false,
                            data: null,
                            message: "Уралдааны нэрийг оруулна уу "
                        }
                    )
                }
            if(!zorilgo)
                {
                    return res.status(403).json(
                        {
                            success:false,
                            data: null,
                            message: "Уралдааны зорилгыг оруулна уу "
                        }
                    )
                }
            if(!shagnal)
                {
                    return res.status(403).json(
                        {
                            success:false,
                            data: null,
                            message: "Шагнал"
                        }
                    )
                }
            if(!startDate)
            {
                return res.status(403).json({
                    success:false,
                    data: null,
                    message:"Эхлэх хугацааг оруулна уу"                })
            }
            if(!endDate)
                {
                    return res.status(403).json({
                        success:false,
                        data: null,
                        message:"Дуусах хугацааг оруулна уу"                })
                }
            

            const values = [
                title,
                shortDesc,
                name,
                zorilgo,
                shagnal,
                startDate,
                endDate,
            ]

            const query = "INSERT INTO champion (title,shortDesc,name,zorilgo,shagnal,startDate, endDate) VALUES (?)"
            
            const data = await executeQuery(query, [values])

            if(data.affectedRows > 0)
            {
                return res.status(200).json(
                    {
                        success:true,
                        data: data,
                        message:"Уралдаан зарлалаа"
                    })
            }
            else 
            {
                return res.status(404).json({
                    success:false,
                    data: null,
                    message: "Алдаа гарлаа"
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

module.exports = insertChamp
