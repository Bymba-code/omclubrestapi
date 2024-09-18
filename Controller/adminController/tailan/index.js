const ExcelJS = require('exceljs');
const { executeQuery } = require('../../../DB/index'); // Ensure this path is correct

const tailan = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Get startDate and endDate from query parameters

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Both startDate and endDate are required.'
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define headers
        const headers = ['Ажилтан','Нийт', 'Оруулсан', 'Ороогүй', 'Асуудал'];
        worksheet.addRow(headers);

        // Fetch data from the database with date range filter
        const getData = `
       SELECT 
    username,
    SUM(CASE WHEN isOrson = 1 THEN too ELSE 0 END) AS sum_too_isOrson_1,
    SUM(CASE WHEN isOrson = 0 THEN too ELSE 0 END) AS sum_too_isOrson_0,
    SUM(CASE WHEN isAsuudal = 1 THEN too ELSE 0 END) AS sum_too_isAsuudal_1,
    SUM(CASE WHEN isAsuudal = 0 THEN too ELSE 0 END) AS sum_too_isAsuudal_0,
    SUM(too) AS total_sum_too  -- Total sum of 'too'
FROM 
    clubApp.customers
WHERE 
    (
        (create_date >= '2024-09-18' AND create_date < DATE_ADD('2024-09-18', INTERVAL 1 DAY) AND create_date < DATE_ADD('2024-09-18', INTERVAL 4 HOUR))
        OR 
        (create_date >= DATE_SUB('2024-09-18', INTERVAL 1 DAY) AND create_date < '2024-09-18')
    )
GROUP BY 
    username
ORDER BY 
    sum_too_isOrson_1 DESC;
`;

        const data = await executeQuery(query, [startDate, endDate, endDate, startDate, endDate]);

        data.forEach(record => {
            worksheet.addRow([
                record.username, 
                record.total_sum_too,
                record.sum_too_isOrson_1,  // Sum of 'too' where isAsuudal = 1
                record.sum_too_isOrson_0,    // Sum of 'too' where isOrson = 0
                record.sum_too_isAsuudal_1    // Sum of 'too' where isAsuudal = 0
            ]);
        });

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Encode buffer as Base64
        const base64 = buffer.toString('base64');

        // Log Base64 length
        console.log('Base64 length:', base64.length);

        res.json({ 
            success: true, 
            file: base64, 
            fileName: 'report.xlsx'
        });
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate Excel file.',
            error: error.message
        });
    }
};

module.exports = tailan;
