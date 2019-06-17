var supertest = require('supertest');
var server = supertest.agent("http://localhost:80");

var express = require('express');
var app = express();


describe('POST ville', function(){
    let data = {
        nom: "Montpellier",
        cp: "34000"
    };
    it('Respond with 201 created', function(done){
        server
            .post('/ville')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET ville', function(){
    it('respond with a city', function(done){
        server
            .get("/ville/Montpellier")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
