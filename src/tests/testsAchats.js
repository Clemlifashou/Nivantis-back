var supertest = require('supertest');
var server = supertest.agent("http://localhost:8080");

var express = require('express');
var app = express();

/*
describe('POST achat', function(){

    let data = {
        officine: 1,
        produit: 2,
        quantite: 2
    };
    it('Respond with 201 created', function(done){
        server
            .post('/achat')
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
