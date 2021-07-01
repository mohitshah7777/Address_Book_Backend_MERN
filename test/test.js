const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const contactData= require('./data.json')
chai.should ()
chai.use(chaiHttp)

describe('Tests api', () => {
    /* 
    POST API test for login
    */
    describe('POST /login', () => {
        it("It should post login details", (done) => {
            const loginData = contactData.login
            chai.request(server)
                .post("/login")
                .send(loginData)
                .end((error, res) => {
                    // console.log(res);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully Logged In")
                    res.body.should.have.property("token");
                done()
            })
        }) 
    })
    
    /* 
    POST API negative test for login
    */
    it("It should not post login details", (done) => {
        const loginDataNegative = contactData.loginNegative
        chai.request(server)
            .post("/login")
            .send(loginDataNegative)
            .end((error, res) => {
                // console.log(res);
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("success").eql(false);
                res.body.should.have.property("message").eql("Invalid Credentials")
                res.body.should.have.property("token").eql(null)
            done()
        })
    }) 
    
    /* 
    POST API test for registeration
    */
    describe('POST /add', () => {
        it("It should post contact details", (done) => {
            const registerData = contactData.register
            chai.request(server)
                .post("/add")
                .send(registerData)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee has been successfully registered")
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
        
        /* 
        POST API negative test for registeration
        */
        it("It should not post contact details", (done) => {
            const registerDataNegative = contactData.registerNegative
            chai.request(server)
                .post("/add")
                .send(registerDataNegative)
                .end((error, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Email already exists")
                    res.body.should.have.property("data").eql(null);    
                done()
            })
        })

        it("Given valid details except fullname It should not post contact details", (done) => {
            const registerDataWithoutFullName = contactData.registerWithoutFullName
            chai.request(server)
                .post("/add")
                .send(registerDataWithoutFullName)
                .end((error, res) => {
                    // console.log(res)
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty")
                done()
            })
        })

        it("Given same email It should not post register details", (done) => {
            const registerDataWithSameEmail = contactData.registerWithSameEmail
            chai.request(server)
                .post("/register")
                .send(registerDataWithSameEmail)
                .end((error, res) => {
                    // console.log(res)
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Email already exists")
                    res.body.should.have.property("data").eql(null);
                done()
            })
        }) 
    })

    /* 
    GET API test for read
    */
    describe('GET /read', () => {
        it("It should get contact details", (done) => {
            chai.request(server)
                .get("/read")
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("All contact details fetched")
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
      
        /* 
        GET API negative test for read
        */
        it("It should not get contact details", (done) => {
            chai.request(server)
                .get("/rea")
                .end((error, res) => {
                    res.should.have.status(404)    
                done()
            })
        }) 
    })

    /* 
    GET API test for read by Id
    */
    describe('GET /read/:_id', () => {
        it("It should get contact details by ID", (done) => {
            const readId = contactData.personId
            chai.request(server)
                .get("/read/"+readId)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(200)
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Particular contact details fetched")        
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
        
        /* 
        GET API negative test for read by Id
        */
        it("It should not get contact details by ID", (done) => {
            const readId = contactData.personIdNegative
            chai.request(server)
                .get("/read/"+readId)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(404)
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Error! Not Found")        
                    res.body.should.have.property("data").eql(null)    
                done()
            })
        }) 
    })
    
    /* 
    PUT API test for update by Id
    */
    describe('PUT /update/:_id', () => {
        it("It should update contact details by ID", (done) => {
            const updateId = contactData.personIdUpdate
            const updateDetails = contactData.updateData
            chai.request(server)
                .put("/update/"+updateId)
                .send(updateDetails)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(200)
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Contact details updated successfully")        
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
        
        /* 
        PUT API negative test for update by Id
        */
        it("It should not update employee details by ID", (done) => {
            const updateId = contactData.personIdUpdateNegative
            const updateDetails = contactData.updateDataNegative
            chai.request(server)
                .put("/update/"+updateId)
                .send(updateDetails)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(404)
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Error! Not Found")        
                    res.body.should.have.property("data").eql(null)    
                done()
            })
        }) 
    })

    /* 
    DELETE API test for delete by Id
    */
    describe('Delete /delete/:_id', () => {
        it("It should delete contact details by ID", (done) => {
            const deleteId = contactData.personIdDelete
            chai.request(server)
                .delete("/delete/"+deleteId)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(200)
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Contact details deleted successfully!")        
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        })
        
        /* 
        DELETE API negative test for delete by Id
        */
        it("It should not delete employee details by ID", (done) => {
            const deleteId = contactData.personIdDeleteNegative
            chai.request(server)
                .delete("/delete/"+deleteId)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.should.have.status(404)
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Contact not found")        
                    res.body.should.have.property("data").eql(null);    
                done()
            })
        })    
    })
})