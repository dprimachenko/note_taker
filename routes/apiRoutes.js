const fs = require("fs");
const util = require('util');
let notes;

//var noteData = require("../db/db");

fs.readFile('./db/db.json', "utf8", (err, res) => {
    console.log(res);
    res = JSON.parse(res);
    if (err) throw err;
    data = res;
    console.log(tableData);
});

module.exports = function(app) {
	app.get("/api/notes", function(req, res) {
		res.json(tableData);
	});
	app.post("/api/notes", function(req, res) {
		fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data){
    		if (err){
        		console.log(err);
    		} else {
			    obj = JSON.parse(data); //now its an object
			    obj.table.push(req.body); //add some data
			    json = JSON.stringify(obj); //convert it back to json
			    fs.writeFile('./db/db.json', json, 'utf8', callback); // write it back 
			}
		});
    	// let newNote = req.body;
    	// noteData.push(newNote);
    	res.json(true)
    });

    app.delete("/api/notes", function(req, res) {
    	noteData.length = noteData.length - 1;
    	noteData.filter((req) => { 
    		return noteData.title !== req; 
    	});
    	res.json({ ok: true });
    });
}