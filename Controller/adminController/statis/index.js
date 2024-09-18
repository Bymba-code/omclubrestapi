const { executeQuery } = require("../../../DB/index")

const dataDashboard = async (req, res) => {
    try 
    {

    const query = `SELECT
    -- Sum of 'too' for this year
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        THEN too
        ELSE 0
    END) AS sum_too_this_year,

    -- Sum of 'too' for this month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        THEN too
        ELSE 0
    END) AS sum_too_this_month,

    -- Sum of 'too' for previous month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        THEN too
        ELSE 0
    END) AS sum_too_prev_month,

    -- Difference between current month and previous month
    (SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        THEN too
        ELSE 0
    END) -
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        THEN too
        ELSE 0
    END)) AS difference_too_current_vs_prev_month,

    -- Sum of 'too' for today
    SUM(CASE 
        WHEN DATE(create_date) = CURDATE()
        THEN too
        ELSE 0
    END) AS sum_too_today,

    -- Sum of 'too' for this week
    SUM(CASE 
        WHEN create_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        THEN too
        ELSE 0
    END) AS sum_too_this_week,

    -- Sum of 'too' where isAsuudal = 1 for this year
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND isAsuudal = 1
        THEN too
        ELSE 0
    END) AS sum_too_isAsuudal_1_this_year,

    -- Sum of 'too' where isAsuudal = 1 for this month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isAsuudal = 1
        THEN too
        ELSE 0
    END) AS sum_too_isAsuudal_1_this_month,

    -- Sum of 'too' where isAsuudal = 1 for previous month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isAsuudal = 1
        THEN too
        ELSE 0
    END) AS sum_too_isAsuudal_1_prev_month,

    -- Difference between current month and previous month for isAsuudal = 1
    (SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isAsuudal = 1
        THEN too
        ELSE 0
    END) -
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isAsuudal = 1
        THEN too
        ELSE 0
    END)) AS difference_isAsuudal_1_current_vs_prev_month,

    -- Sum of 'too' where isOrson = 1 for this year
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND isOrson = 1
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_1_this_year,

    -- Sum of 'too' where isOrson = 1 for this month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isOrson = 1
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_1_this_month,

    -- Sum of 'too' where isOrson = 1 for previous month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isOrson = 1
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_1_prev_month,

    -- Difference between current month and previous month for isOrson = 1
    (SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isOrson = 1
        THEN too
        ELSE 0
    END) -
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isOrson = 1
        THEN too
        ELSE 0
    END)) AS difference_isOrson_1_current_vs_prev_month,

    -- Sum of 'too' where isOrson = 0 for this year
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND isOrson = 0
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_0_this_year,

    -- Sum of 'too' where isOrson = 0 for this month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isOrson = 0
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_0_this_month,

    -- Sum of 'too' where isOrson = 0 for previous month
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isOrson = 0
        THEN too
        ELSE 0
    END) AS sum_too_isOrson_0_prev_month,

    -- Difference between current month and previous month for isOrson = 0
    (SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE())
        AND isOrson = 0
        THEN too
        ELSE 0
    END) -
    SUM(CASE 
        WHEN YEAR(create_date) = YEAR(CURDATE())
        AND MONTH(create_date) = MONTH(CURDATE()) - 1
        AND isOrson = 0
        THEN too
        ELSE 0
    END)) AS difference_isOrson_0_current_vs_prev_month

FROM
    clubApp.customers
WHERE
    invited = 37; -- Adjust this as needed
`;

      const data = await executeQuery(query)
      return res.status(200).json({
        success:true,
        data: data,
        message: "amjilttai"
      })
      
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

module.exports =  dataDashboard
