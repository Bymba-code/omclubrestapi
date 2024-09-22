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
        const headers = ['Ажилтан', 'Оруулсан', 'Ороогүй', 'Асуудал'];
        worksheet.addRow(headers);

        const getData = `
   SELECT 
    username,
    SUM(CASE WHEN isOrson = 1 AND isAsuudal = 0 THEN too ELSE 0 END) AS sum_too_isOrson_1,
    SUM(CASE WHEN isOrson = 0 AND isAsuudal = 0 THEN too ELSE 0 END) AS sum_too_isOrson_0,
    SUM(CASE WHEN isAsuudal = 1 AND isOrson = 1 THEN too ELSE 0 END) AS sum_too_isAsuudal_1
FROM 
    customers
WHERE 
    DATE(create_date) BETWEEN ? AND ?
    AND afterNegtgelOff = 0
GROUP BY 
    username
ORDER BY 
    sum_too_isOrson_1 DESC
`;

// Execute query with parameters
const data = await executeQuery(getData, [startDate, endDate]);

        // Log fetched data
        console.log('Fetched data:', data);

        // Add data rows to the worksheet
        data.forEach(record => {
            worksheet.addRow([
                record.username, 
                record.sum_too_isOrson_1, 
                record.sum_too_isOrson_0, 
                record.sum_too_isAsuudal_1
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
