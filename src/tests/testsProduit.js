var supertest = require('supertest');
var server = supertest.agent("http://localhost:80");

var express = require('express');
var app = express();

describe('GET products', function(){
    it('respond with json containing a list of all products', function (done) {
        server
            .get('/produits')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/*
describe('POST product', function(){
    let data = {
        nom: "doliprane",
        prix: 10
    };
    it('Respond with 201 created', function(done){
        server
            .post('/produit')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
*/

describe('GET product', function(){
   it('respond with a product', function(done){
      server
          .get("/produit/2")
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
   });
});
