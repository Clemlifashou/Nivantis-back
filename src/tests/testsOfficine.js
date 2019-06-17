var supertest = require('supertest');
var server = supertest.agent("http://localhost:80");

var express = require('express');
var app = express();

describe('POST officine', function(){
    let data = {
        rs: "osef",
        ville: "Montpellier",
        adr: "1 rue du test",
        cpmadr : "",
        mail: "osef@test.com",
        tel: "00 00 00 00 00",
        adh: null,
        nom: "Testeur"
    };
    it('Respond with 201 created', function(done){
        server
            .post('/officine')
            .send(data)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('GET officine with id', function(){
    it('respond with an officine', function(done){
        server
            .get("/officine/1&null")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET officine with name', function(){
    it('respond with an officine', function(done){
        server
            .get("/officine/null&Montpellier")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
