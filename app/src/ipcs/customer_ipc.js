const electron = require('electron');
const ipcMain = electron.ipcMain;
const app     = electron.app;
const csv     = require('fast-csv');
const shortid = require('shortid');
const _       = require('lodash');
var csvPath   = __dirname + '/../../../customers.csv';
var customers = [];

ipcMain.on('customers.list.request', function(event, arg) {
  customers = [];

  csv
    .fromPath(csvPath, { headers: true, ignoreEmpty: true, trim: true })
    .on('data', function(row) {
      customers.push(row);
    })
    .on('end', function() {
      event.sender.send('customers.list.response', customers);
    });
});

ipcMain.on('customers.find.request', function(event, id) {
  customers = [];

  csv
    .fromPath(csvPath, { headers: true, ignoreEmpty: true, trim: true })
    .on('data', function(row) {
      customers.push(row);
    })
    .on('end', function() {
      var customer = customers.find(function(customer) { return customer.id == id });
      event.sender.send('customers.find.response', customer);
    });
});

ipcMain.on('customers.create.request', function(event, customer) {
  customer.id = shortid.generate();
  customers.push(customer);

  csv
    .writeToPath(csvPath, customers, { headers: true, quoteColumns: true })
    .on('finish', function() {
      event.sender.send('customers.create.response', customer);
   });
});

ipcMain.on('customers.update.request', function(event, customer) {
  var index = _.findIndex(customers, function(eachCustomer) { return eachCustomer.id == customer.id; });
  customers[index] = customer;

  csv
    .writeToPath(csvPath, customers, { headers: true, quoteColumns: true })
    .on('finish', function() {
      event.sender.send('customers.update.response', customer);
   });
});

ipcMain.on('customers.destroy.request', function(event, customer) {
  _.remove(customers, function(eachCustomer) {
    return eachCustomer.id == customer.id;
  });

  csv
    .writeToPath(csvPath, customers, { headers: true, quoteColumns: true })
    .on('finish', function() {
      event.sender.send('customers.destroy.response', { success: true });
   });
});