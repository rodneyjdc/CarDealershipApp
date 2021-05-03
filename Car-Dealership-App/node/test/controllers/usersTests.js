// setting node environment variable to 'test'
process.env.NODE_ENV = 'test';

// bring in assertion library
const expect = require('chai').expect;

// bring in server caller
const request = require('supertest');

// bring in app
const app = require('../../index.js');

// bring in db connection file
const dbConnect = require('../../data/dbConnect.js');

describe('Users API', () => {

    // a 'before' hook with a callback that connects to an in-memory database    
    before((done) => {
        dbConnect.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    // an 'after' hook with a callback that disconnects to an in-memory database
    after((done) => {
        dbConnect.disconnect()
            .then(() => done())
            .catch((err) => done(err));
    })

    // Test the POST route
    describe('POST routes', () => {
        it('should POST new users', (done) => {
            const sampleUser = {
                _id: "608a568f9f602830f897954b",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                username: "johndoe123",
                password: "Password1!",
                role: "user"
            };

            const sampleUser2 = {
                _id: "608a568f9f602830f897965c",
                firstName: "Bobby",
                lastName: "Joe",
                email: "bobbyjoe@gmail.com",
                username: "bobbyjoe345",
                password: "Password1!",
                role: "user"
            };

            request(app).post('/mongo/api/users')
                .send(sampleUser)
                .then(() => {
                    request(app).post('/mongo/api/users')
                        .send(sampleUser2)
                        .then((res) => {
                            const body = res.body;
                            expect(res).to.contain.property('status', 201);
                            expect(body).to.be.a('object');
                            expect(body).to.contain.property('_id').eq('608a568f9f602830f897965c');
                            expect(body).to.contain.property('firstName').eq('Bobby');
                            expect(body).to.contain.property('lastName').eq('Joe');
                            expect(body).to.contain.property('email').eq('bobbyjoe@gmail.com');
                            expect(body).to.contain.property('username').eq('bobbyjoe345');
                            expect(body).to.contain.property('password').eq('Password1!');
                            expect(body).to.contain.property('role').eq('user');
                            done();
                        })
                })
                .catch((err) => done(err))

        })

        it('should NOT POST a new user with an incorrect url', (done) => {
            const sampleUser = {
                _id: "608a568f9f602830f897954b",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                username: "johndoe123",
                password: "Password1!",
                role: "user"
            };
            request(app).post('/some/wrong/URL')
                .send(sampleUser)
                .then((res) => {
                    expect(res).to.contain.property('status', 404);
                    done();
                })
                .catch((err) => done(err))
        })

        it('should NOT POST a new user with a missing property', (done) => {
            // this user is missing the username property
            const sampleUser = {
                _id: "608a568f9f602830f897954b",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                password: "Password1!",
                role: "user"
            };

            request(app).post('/mongo/api/users')
                .send(sampleUser)
                .then((res) => {
                    expect(res).to.contain.property('status', 400);
                    expect(res.body).to.be.a('string');
                    expect(res.body).to.eq('Users validation failed: username: Username is required');
                    done();
                })
                .catch((err) => done(err))
        })
    })

    // Test the GET route
    describe('GET routes', () => {
        it('should GET all existing users', (done) => {
            request(app).get('/mongo/api/users')
                .then((res) => {
                    expect(res).to.contain.property('status', 200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eq(2);
                    done();
                })
                .catch((err) => done(err))

        })

        it('should GET usernames of all existing users', (done) => {
            request(app).get('/mongo/api/usernames')
                .then((res) => {
                    expect(res).to.contain.property('status', 200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eq(2);
                    expect(res.body[0]).to.be.a('string');
                    expect(res.body[1]).to.be.a('string');
                    done();
                })
                .catch((err) => done(err))

        })

        it('should GET an existing user with existing id', (done) => {
            const userId = '608a568f9f602830f897954b';
            request(app).get(`/mongo/api/user/${userId}`)
                .then((res) => {
                    const body = res.body;
                    expect(res).to.contain.property('status', 200);
                    expect(body).to.be.a('array');
                    expect(body.length).to.be.eq(1);

                    const userData = body[0];
                    expect(userData).to.contain.property('firstName').eq('John');
                    expect(userData).to.contain.property('lastName').eq('Doe');
                    expect(userData).to.contain.property('email').eq('johndoe@gmail.com');
                    expect(userData).to.contain.property('username').eq('johndoe123');
                    expect(userData).to.contain.property('password').eq('Password1!');
                    expect(userData).to.contain.property('role').eq('user');
                    done();
                })
                .catch((err) => done(err))

        })

        it('should NOT GET any user with an incorrect url', (done) => {
            request(app).get('/some/wrong/URL')
                .then((res) => {
                    expect(res).to.contain.property('status', 404);
                    done();
                })
                .catch((err) => done(err))
        })

    })

    // Test the PUT route
    describe('PUT routes', () => {
        it('should PUT an existing user with existing id', (done) => {
            const existingUserId = "608a568f9f602830f897954b"
            const updatedUser = {
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                username: "johndoeChanged",
                password: "Password1!Changed",
                role: "user"
            };
            
            request(app).put(`/mongo/api/users/${existingUserId}`)
                .send(updatedUser)
                .then((res) => {
                    const body = res.body;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.a('object');
                    expect(body).to.have.property('n', 1);
                    expect(body).to.have.property('nModified', 1);
                    expect(body).to.have.property('ok', 1);
                    done();
                })
                .catch((err) => done(err));
        })

        it('should NOT PUT an existing user with an incorrect url', (done) => {
            const updatedUser = {
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                username: "johndoeChanged",
                password: "Password1!Changed",
                role: "user"
            };
            request(app).post('/some/wrong/URL')
                .send(updatedUser)
                .then((res) => {
                    expect(res).to.contain.property('status', 404);
                    done();
                })
                .catch((err) => done(err))
        })

        it('should NOT PUT an existing user with an invalid property', (done) => {
            // password property is invalid, lacking a symbol and a number
            const updatedUser = {
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                username: "johndoeChanged",
                password: "PasswordChanged",
                role: "user"
            };

            request(app).post('/mongo/api/users')
                .send(updatedUser)
                .then((res) => {
                    expect(res).to.contain.property('status', 400);
                    expect(res.body).to.be.a('string');
                    expect(res.body).to.eq('Users validation failed: password: Password must at least be 8 chars long, at least have 1 lowercase, at least have 1 uppercase, at least have 1 number, at least have 1 symbol');
                    done();
                })
                .catch((err) => done(err))
        })
    })

    // Test the DELETE route
    describe('DELETE routes', () => {
        it('should DELETE an existing user with existing id', (done) => {
            const existingUserId = "608a568f9f602830f897954b"
            
            request(app).delete(`/mongo/api/users/${existingUserId}`)
                .then((res) => {
                    const body = res.body;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.a('object');
                    expect(body).to.have.property('n', 1);
                    expect(body).to.have.property('deletedCount', 1);
                    expect(body).to.have.property('ok', 1);
                    done();
                })
                .catch((err) => done(err));
        })

        it('should NOT DELETE an existing user with an incorrect url', (done) => {
            request(app).delete('/some/wrong/URL')
                .then((res) => {
                    expect(res).to.contain.property('status', 404);
                    done();
                })
                .catch((err) => done(err))
        })

        it('should NOT DELETE an existing user with a nonexisting id', (done) => {
            const fakeUserId = "608a568f9f602830f897989d"
            request(app).delete(`/mongo/api/users/${fakeUserId}`)
                .then((res) => {
                    expect(res).to.contain.property('status', 200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('n', 0);
                    expect(res.body).to.have.property('deletedCount', 0);
                    expect(res.body).to.have.property('ok', 1);
                    done();
                })
                .catch((err) => done(err))
        })
    })

})

