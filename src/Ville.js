const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Nivantis.db');

const insererVille = function(data, res){
    if(data.nom && data.cp){
        db.run('INSERT INTO ville(nom, code_postal) VALUES (?,?)',data.nom,data.cp, function(err){
            if(err){
                res('Ville not created', 400);
            }else{
                res(this.lastId, 201);
                console.log(`A row has been inserted with id ${this.lastID}`);
            }
        })
    }else{
        res.status(400).json('Product not created');
    }
};

const getVille = function(nom, res){
    if(nom){
        db.get("SELECT * FROM ville WHERE nom=?", nom, function(err, row){
            if (err) {
                res('no city found', 400);
            } else {
                res(row, 200);
            }
        });
    }
};

exports.insererVille = insererVille;
exports.getVille = getVille;
