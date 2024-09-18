const { executeQuery } = require("../../../DB/index");

const DetailProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Query to get user details
        const detailQuery = "SELECT * FROM Users WHERE id = ?";
        
        // Query to get statistics for the specific user
        const statQuery = `SELECT
    username,

    -- Count of all records for the user
    COUNT(*) AS total_records,

    -- Total count of records where isOrson = 1
    SUM(CASE 
        WHEN isOrson = 1
        THEN 1 
        ELSE 0 
    END) AS total_orson,

    -- Total count of records where isAsuudal = 1
    SUM(CASE 
        WHEN isAsuudal = 1
        THEN 1 
        ELSE 0 
    END) AS total_asuudal,

    -- Total records for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
        THEN 1 
        ELSE 0 
    END) AS total_records_first_15,

    -- Count of records where isOrson = 1 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_first_15,

    -- Count of records where isAsuudal = 1 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isAsuudal = 1
        THEN 1 
        ELSE 0 
    END) AS count_isAsuudal_1_first_15,

    -- Count of records where isOrson = 0 for the first 15 days of the month
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 0
        THEN 1 
        ELSE 0 
    END) AS count_oroogvi_first_15,

    -- Total records for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
        THEN 1 
        ELSE 0 
    END) AS total_records_last_15,

    -- Count of records where isOrson = 1 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 1
        THEN 1 
        ELSE 0 
    END) AS count_isOrson_1_last_15,

    -- Count of records where isAsuudal = 1 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isAsuudal = 1
        THEN 1 
        ELSE 0 
    END) AS count_isAsuudal_1_last_15,

    -- Count of records where isOrson = 0 for the last 15 days of the month
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 0
        THEN 1 
        ELSE 0 
    END) AS count_oroogvi_last_15,

    -- Sum of 'too' for the first 15 days
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
        THEN too 
        ELSE 0 
    END) AS sum_too_first_15,

    -- Sum of 'too' for the last 15 days
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
        THEN too 
        ELSE 0 
    END) AS sum_too_last_15,

    -- Overall sum of 'too'
    SUM(too) AS sum_too_all_time,
     SUM(CASE 
        WHEN isAsuudal = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isAsuudal_1_all_time,

    -- Sum of 'too' where isOrson = 1 for all time
    SUM(CASE 
        WHEN isOrson = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_1_all_time,

    -- Overall sum of 'too' where isOrson = 1 and isAsuudal = 1
    SUM(CASE 
        WHEN isOrson = 1 AND isAsuudal = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_1_and_isAsuudal_1_all_time,

    -- New: Sum of 'too' where isOrson = 1 for the first 15 days
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_1_first_15,

    -- New: Sum of 'too' where isAsuudal = 1 for the first 15 days
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isAsuudal = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isAsuudal_1_first_15,

    -- New: Sum of 'too' where isOrson = 0 for the first 15 days
    SUM(CASE 
        WHEN create_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
             AND create_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') + INTERVAL 15 DAY
             AND isOrson = 0
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_0_first_15,

    -- New: Sum of 'too' where isOrson = 1 for the last 15 days
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_1_last_15,

    -- New: Sum of 'too' where isAsuudal = 1 for the last 15 days
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isAsuudal = 1
        THEN too 
        ELSE 0 
    END) AS sum_too_isAsuudal_1_last_15,

    -- New: Sum of 'too' where isOrson = 0 for the last 15 days
    SUM(CASE 
        WHEN create_date >= LAST_DAY(CURDATE()) - INTERVAL 14 DAY
             AND create_date <= LAST_DAY(CURDATE())
             AND isOrson = 0
        THEN too 
        ELSE 0 
    END) AS sum_too_isOrson_0_last_15

FROM
    clubApp.customers
WHERE
    YEAR(create_date) = YEAR(CURDATE())
    AND MONTH(create_date) = MONTH(CURDATE())
    AND invited = ? -- Replace with actual value or ensure parameter binding is correct
GROUP BY
    username;
`
        
        const data1 = await executeQuery(detailQuery, [id]);
        const data2 = await executeQuery(statQuery, [id]); // Assuming `username` is available from data1

        if (data1.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data1: data1,
            data2: data2 
        });

    } catch (err) {
        console.error("Error in DetailProfile:", err); // Log the error for debugging
        return res.status(500).json({
            success: false,
            data: null,
            message: "Server error, please try again later",
            error: err
        });
    }
};

module.exports = DetailProfile;
