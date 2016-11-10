var fs = require('fs');
var path = require('path');
var dataPath = path.normalize(__dirname + '/..') + '/data';
var Data = {};


Data.getLogInfo = function(callback) {
	console.log(dataPath);
	var filePath = `${dataPath}/info.json`;
	var file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	callback(file);
};

Data.saveLogInfo = function(data, callback) {
	console.log(dataPath);
	var filePath = `${dataPath}/info.json`;
	fs.writeFileSync(filePath, data);
	callback(data);
};

Data.createLog = function(name, callback) {
	var json = `{\n\t\"name\":\"${name}\",\n\t\"logs\":[]\n}`;
	var filePath = `${dataPath}/logs/${name}.json`;
	fs.writeFileSync(filePath, json);
	callback(json);
};

Data.getLog = function(name, callback) {
	var filePath = `${dataPath}/logs/${name}.json`;
	var file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	callback(file);
};

Data.saveLog = function(name, data, callback) {
	data = JSON.stringify(data,null,4);
	var filePath = `${dataPath}/logs/${name}.json`;
	fs.writeFileSync(filePath, data);
	callback(data);
};

Data.deleteLog = function(name, callback) {
	var filePath = `${dataPath}/logs/${name}.json`;
	fs.unlink(filePath, function(err) {
		if (err) throw err;
		var num = Number(name.split('_')[1]);
		filePath = `${dataPath}/info.json`;
		var file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		file.logList.splice(file.logList.indexOf(num),1);
		console.log('info.json', file, num);
		file = JSON.stringify(file, null, 4);
		Data.saveLogInfo(file, function() {
			callback();
		});	
	});
	
};

module.exports = Data;