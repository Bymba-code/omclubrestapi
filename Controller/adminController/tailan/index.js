const ExcelJS = require('exceljs');
const { executeQuery } = require('../../../DB/index'); // Ensure this path is correct

const tailan = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define headers
        const headers = ['Username', 'Orson Count (1)', 'Orson Count (0)', 'Asuudal Count (1)', 'Asuudal Count (0)'];
        worksheet.addRow(headers);

        // Fetch data from the database
        const getData = `
            SELECT 
                username, 
                COUNT(CASE WHEN isOrson = 1 THEN 1 END) AS orson_count_1,
                COUNT(CASE WHEN isOrson = 0 THEN 1 END) AS orson_count_0,
                COUNT(CASE WHEN isAsuudal = 1 THEN 1 END) AS asuudal_count_1,
                COUNT(CASE WHEN isAsuudal = 0 THEN 1 END) AS asuudal_count_0
            FROM 
                customers
            GROUP BY 
                username;
        `;
        const data = await executeQuery(getData);

        // Add data rows to the worksheet
        data.forEach(record => {
            worksheet.addRow([record.username, record.orson_count_1, record.orson_count_0, record.asuudal_count_1, record.asuudal_count_0]);
        });

        // Generate buffer and set response headers
        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
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
