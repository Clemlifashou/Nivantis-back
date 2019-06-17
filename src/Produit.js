const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\sqlite\\Databases\\Nivantis.db');

const getProduits = function(req, res){
    db.all("SELECT * FROM produit", function(err, row) {
        if (err) {
            res('No product found', 400);
        } else {
            res(row, 200);
        }
    });
};

const getProduit = function(id, res){
    db.get("SELECT * FROM produit WHERE id=?",id, function(err, row){
        if (err) {
            res('No product found', 400);
        } else {
            res(row, 200);
        }
    });
};

const insererProduit = function(data, res){
    if(data.nom && data.prix){
        db.run('INSERT INTO produit(nom,prix_achat_brut) VALUES (?,?)',data.nom,data.prix,function(err){
            if(err){
                res.status(400).json('Product not created');
            }else{
                res.status(201).json("Product created");
                console.log(`A row has been inserted with id ${this.lastID}`);
            }

        })
    }else{
        res.status(400).json('Product not created');
    }
};

exports.inserProduit = insererProduit;
exports.getProduits = getProduits;
exports.getProduit = getProduit;