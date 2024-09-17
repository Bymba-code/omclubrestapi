const { executeQuery } = require("../../../DB/index");

const getDifference = async (req, res) => {
    try {
        const query = `SELECT 
    current_month_count,
    previous_month_count,
    (current_month_count - previous_month_count) AS difference
FROM (
    SELECT 
        SUM(CASE WHEN YEAR(create_date) = YEAR(CURDATE()) AND MONTH(create_date) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS current_month_count,
        SUM(CASE WHEN create_date >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH) 
                      AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') THEN 1 ELSE 0 END) AS previous_month_count
    FROM clubApp.customers
) AS counts; `
        const data1 = await executeQuery(query)

        const queryTop = `-- Get top 3 users for the current month
SELECT
    username,
    record_count,
    'current_month' AS month
FROM (
    SELECT 
        username,
        COUNT(*) AS record_count
    FROM 
        clubApp.customers
    WHERE 
        YEAR(create_date) = YEAR(CURDATE()) 
        AND MONTH(create_date) = MONTH(CURDATE())
    GROUP BY 
        username
    ORDER BY 
        record_count DESC
    LIMIT 3
) AS current_month_users

UNION ALL

-- Get top 3 users for the previous month
SELECT
    username,
    record_count,
    'previous_month' AS month
FROM (
    SELECT 
        username,
        COUNT(*) AS record_count
    FROM 
        clubApp.customers
    WHERE 
        create_date >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH) 
        AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    GROUP BY 
        username
    ORDER BY 
        record_count DESC
    LIMIT 3
) AS previous_month_users

ORDER BY 
    month DESC, record_count DESC;
    `
    
    const data2 = await executeQuery(queryTop)

    return res.status(200).json({
        success:true,
        data1: data1,
        data2:data2,
        
    })
    
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа, та дахин оролдоно уу"
        });
    }
};

module.exports = getDifference;
