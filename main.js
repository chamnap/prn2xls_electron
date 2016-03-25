'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 900, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

const ipcMain = require('electron').ipcMain;
const csv     = require('fast-csv');
const shortid = require('shortid');
const dialog = require('electron').dialog;
const _       = require('lodash');
var csvPath   = __dirname + '/customers.csv';
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

ipcMain.on('converter.choose_source_file.request', function(event, args) {
  var path = dialog.showOpenDialog({ properties: [ 'openFile' ], filters: [{ name: 'PRN File', extensions: ['PRN'] }] });

  event.sender.send('converter.choose_source_file.response', path);
});

ipcMain.on('converter.choose_destination_directory.request', function(event, args) {
  var path = dialog.showOpenDialog({ properties: [ 'openDirectory' ]});

  event.sender.send('converter.choose_destination_directory.response', path);
});