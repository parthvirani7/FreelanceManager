const Project = require('../models/projectModel');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');
const fs = require('fs');


const exportProjectsToCSV = async (res) => {
  const projects = await Project.find();
  const fields = ['name', 'description', 'status'];
  const parser = new Parser({ fields });
  const csv = parser.parse(projects);
  res.header('Content-Type', 'text/csv');
  res.attachment('projects.csv');
  res.send(csv);
};

const importProjectsFromCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const projects = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => projects.push(row))
      .on('end', async () => {
        await Project.insertMany(projects);
        resolve();
      })
      .on('error', (error) => reject(error));
  });
};

module.exports = { exportProjectsToCSV, importProjectsFromCSV };
