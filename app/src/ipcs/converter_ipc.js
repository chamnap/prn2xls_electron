const ipcMain = require('electron').ipcMain;
const dialog  = require('electron').dialog;
const prn2xls = require('prn2xls');
const csv     = require('fast-csv');
const path    = require('path');
var csvPath   = path.join(__dirname, '/../../../customers.csv');

ipcMain.on('converter.choose_source_file.request', function(event, args) {
  var path = dialog.showOpenDialog({ properties: [ 'openFile' ], filters: [{ name: 'PRN File', extensions: ['PRN', 'prn'] }] });

  event.sender.send('converter.choose_source_file.response', path);
});

ipcMain.on('converter.choose_destination_directory.request', function(event, args) {
  var path = dialog.showOpenDialog({ properties: [ 'openDirectory' ]});

  event.sender.send('converter.choose_destination_directory.response', path);
});

ipcMain.on('converter.convert.request', function(event, sourceFile, destinationDirectory) {
  var customers = [];

  csv
    .fromPath(csvPath, { headers: true, ignoreEmpty: true, trim: true })
    .on('data', function(row) {
      customers.push(row);
    })
    .on('end', function() {
      var options = {
        customers: customers,
        unoconvPath: path.join(__dirname, '/../../../unoconv-0.7/unoconv')
      };

      prn2xls.pdf(sourceFile, destinationDirectory, options, function(error, path) {
        event.sender.send('converter.convert.response', { error: error, path: path});
      });
    });
});