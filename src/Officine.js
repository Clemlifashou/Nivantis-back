const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\sqlite\\Databases\\Nivantis.db');

var villes = require('./Ville');

const insererOfficine = function(data, res) {
    setVille(data.ville, function (response, status) {
        if (status === 200) {
            db.run('INSERT INTO Officine(raison_sociale, ville, adresse, complement_adresse, mail, telephone, date_adhesion, nom_gerant) ' +
                'VALUES (?,?,?,?,?,?,?,?)',
                data.rs, response, data.adr, data.cpmadr, data.mail, data.tel, data.adh, data.nom, function (err) {
                    if (err) {
                        console.log(err);
                        res('Officine non creee', 400);
                    } else {
                        res('Officine creee', 201);
                    }
                });
        } else {
            res('Pas de ville', 400);
        }
    });
};

const getOfficine = function(data, res){
    if(data.id){
        console.log(data.id);
        db.get("SELECT * FROM officine WHERE id=?",data.id, function(err, row){
            if (err) {
                res('No officine found', 400);
            } else {
                res(row, 200);
            }
        });
    }else if(data.nom){
        console.log(data.nom);
        db.get("SELECT * FROM officine WHERE raison_sociale=?",data.nom, function(err, row){
            if (err) {
                res('No officine found', 400);
            } else {
                res(row, 200);
            }
        });
    } else{
        res('Aucune donnée valide', 400);
    }
};

var setVille = function(data, res){
    villes.getVille(data, function(response, status){
        if(status === 200){
            res(response.id, status);
        }else{
            villes.insererVille(data = {nom: data.ville, cp: "00000"}, function(response, status){
                if(status === 200){
                    res(response.id, status);
                }
                else{
                    res(null, status);
                }
            })
        }
    });
};

exports.insererOfficine = insererOfficine;
exports.getOfficine = getOfficine;