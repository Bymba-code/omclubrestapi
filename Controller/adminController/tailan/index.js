const ExcelJS = require('exceljs');
const { executeQuery } = require('../../../DB/index'); // Ensure this path is correct

const tailan = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define the header row
        worksheet.addRow(['Name', 'Age']);

        // Fetch data from the database
        const getData = "SELECT * FROM customers";
        const data = await executeQuery(getData);

        // Add data rows to the worksheet
        data.forEach(record => {
            // Adjust based on your actual data structure
            worksheet.addRow([record.username, record.too]); // Use actual field names
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
