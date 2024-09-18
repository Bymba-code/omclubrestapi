
const { executeQuery } = require("../../../DB/index")

const DetailProfile = async (req, res) => 
    {
        try 
        {
        const {id} = req.params;
            
        const detailQUERY = "SELECT * FROM Users WHERE id = ?"
        const statQuery = `SELECT
    username,

    -- Count of records where isOrson = 1 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_first_15,

    -- Count of records where isOrson = 1 AND isAsuudal = 1 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 1
             AND isAsuudal = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_and_isAsuudal_1_first_15,

    -- Count of records where isAsuudal = 0 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isAsuudal = 0
        THEN 1 
        ELSE 0 
    END) AS count_isAsuudal_0_first_15,

    -- Count of records where isOrson = 1 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_last_15,

    -- Count of records where isOrson = 1 AND isAsuudal = 1 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 1
             AND isAsuudal = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_and_isAsuudal_1_last_15,

    -- Count of records where isAsuudal = 0 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isAsuudal = 0
        THEN 1 
        ELSE 0 
    END) AS count_isAsuudal_0_last_15

FROM
    clubApp.customers
WHERE
    YEAR(create_date) = YEAR(CURDATE())
    AND MONTH(create_date) = MONTH(CURDATE())
    AND invited = ?
GROUP BY
    username;
`
            
          const data1 = await executeQuery(detailQuery, [id])
          const data2 = await executeQuery(statQuery, [id])

          if(data1.length === 0)
          {
            return res.status(404).json({
              success:false,
              data: null,
              message:"Хэрэглэгч олдсонгүй"
            })
          }

          return res.status(200).json({
            success:true,
            data1: data1,
            data2: data2 
          })
          

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

module.exports = DetailProfile
