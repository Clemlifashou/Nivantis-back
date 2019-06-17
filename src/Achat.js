const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('C:\\sqlite\\Databases\\Nivantis.db');

const insererAchat = function(data, res){
    if(data.officine && data.produit && data.quantite){
        db.run('INSERT INTO achat(officine, produit, quantite) VALUES (?,?,?)',data.officine,data.produit, data.quantite,function(err){
            if(err){
                res.status(400).json('Achat not created');
            }else{
                res.status(201).json("Achat created");
                console.log(`A row has been inserted with id ${this.lastID}`);
            }

        })
    }else{
        res.status(400).json('Product not created');
    }
};

exports.insererAchat = insererAchat;