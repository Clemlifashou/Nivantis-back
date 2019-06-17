var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var cors = require('cors');

var myRouter = express.Router();

var produits = require('./src/Produit');
var achat = require('./src/Achat');
var ville = require('./src/Ville');
var officine = require('./src/Officine');

myRouter.route('/').all(function(req,res){
	res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
});

myRouter.route('/produits')
	.get(function(req,res){
		produits.getProduits(req,function(response, status){
			if(status === 200){
				res.status(200).json({produits : response});
			}else{
				res.status(400).json(response);
			}
		});
	});

myRouter.route('/produit')
	.post(function(req,res){
		produits.inserProduit(req.body, res);
	});

myRouter.route('/produit/:id')
	.get(function (req, res) {
		var id = req.params.id;
		produits.getProduit(id,function(response, status){
			if(status === 200){
				res.status(200).json({produit : response});
			}else{
				res.status(400).json(response);
			}
		});
	});

myRouter.route('/achat')
	.post(function(req, res){
		achat.insererAchat(req.body, res);
	});

myRouter.route('/ville')
	.post(function(req, res){
		ville.insererVille(req.body, function(response, status){
			if(status === 201){
				res.status(201).json(response);
			}else{
				res.status(400).json(response);
			}
		});
	});

myRouter.route('/ville/:nom')
	.get(function(req, res){
		ville.getVille(req.params.nom,function(response, status){
			if(status === 200){
				res.status(200).json(response);
			}else{
				res.status(400).json(response);
			}
		});
	});

myRouter.route('/officine')
	.post(function(req, res){
		officine.insererOfficine(req.body, function(response, status){
			if(status === 201){
				res.status(201).json(response);
			}else{
				res.status(400).json(response);
			}
		});
	});

myRouter.route('/officine/:id&:nom')
	.get(function(req, res){
		var data = {
			id: (req.params.id === "null"? null: req.params.id),
			nom: (req.params.nom === "null"? null: req.params.nom)
		};
		officine.getOfficine(data, function(response, status){
			if(status === 200){
				res.status(200).json(response);
			}else{
				res.status(400).json(response);
			}
		})
	});

app.use(cors());
app.use(bodyParser.json());
app.use(myRouter);
/*
app.listen(80, () => {
	console.log("HTTP server listening on port 80");
});
*/

io.on('connection', (socketServer) => {
	socketServer.on('npmStop', () => {
		process.exit(0);
	});
});
server.listen(80);
