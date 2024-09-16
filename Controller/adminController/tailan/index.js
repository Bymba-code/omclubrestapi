const express = require('express');
const ExcelJS = require('exceljs');
const { executeQuery } = require('../../../DB/index');

const app = express();
const port = 3000;

app.get('/tailan', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Both startDate and endDate are required.'
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        worksheet.addRow(['Ажилтан', 'Оруулсан', 'Ороогүй', 'Асуудал']);

        const getData = `
            SELECT 
                username, 
                COUNT(CASE WHEN isOrson = 1 THEN 1 END) AS orson_count_1,
                COUNT(CASE WHEN isOrson = 0 THEN 1 END) AS orson_count_0,
                COUNT(CASE WHEN isAsuudal = 1 THEN 1 END) AS asuudal_count_1
            FROM 
                customers 
            WHERE
                create_date BETWEEN ? AND ?
            GROUP BY 
                username;
        `;

        const data = await executeQuery(getData, [startDate, endDate]);

        data.forEach(record => {
            worksheet.addRow([
                record.username, 
                record.orson_count_1, 
                record.orson_count_0, 
                record.asuudal_count_1
            ]);
        });

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
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
