/*Load Required Modules and helper file*/
const fs = require('fs');
const readLine = require('readline');
const Main = require('./main.js');

/* ReadStream Interface to catch new line event */
const Reader = readLine.createInterface({
	input : fs.createReadStream('./input.txt'),
	terminal : false
});

/* Process each new line by the helper function */
Reader.on('line', function(line) {
	Main.Merchant(line.trim());
});

/* Log Uncaught Exceptions */
process.on('uncaughtException', function(err) {
	console.log(err);
});