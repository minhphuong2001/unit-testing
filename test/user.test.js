require('dotenv').config();
const baseUrl = 'https://sober-shop-production.up.railway.app/api/'
const supertest = require('supertest');
const request = supertest(baseUrl);
const USER_TOKEN = process.env.USER_ACCESS_TOKEN;

const userInput = {
    username: "phuongminh200121",
    email: "phuongminh200121@gmail.com",
    password: "phuongminh200121@",
    confirmPassword: "phuongminh200121@"
}

describe('ABOUT USER.', () => {
    describe('user register', () => {
        describe('given the username and password are valid', () => {
            it('should return a message create account success', async () => {
                const response = await request.post('auth/register').send(userInput);

                expect(response.body.message).toEqual("Account successfully created");
            })
        })

        describe('if email already exists', () => {
            it('should return a message email already exists', async() => {
                const response = await request.post('auth/register').send(userInput);

                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({ success: false, message: "Email is taken" });
            })
        })
        
    });

    describe('user login', () => {
        it('should return a 200 status and show login successful', async () => {
            const data = {
                username: "minhphuong2000",
                password: "phuong2000@"
            }

            const { body, statusCode } = await request.post('auth/login').send(data);

            expect(statusCode).toBe(200);

            expect(body.message).toEqual('Logged in successfully');
        })
    });

    describe('GET user', () => {
        it('should return a 200 status and user detail', async () => {
            const user = {
                username: "minhphuong2000",
            }
            const response = await request.get('auth').set('Authorization', `Bearer ${USER_TOKEN}`);
            // console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body?.user).toEqual(expect.objectContaining(user));
        })
    });

    describe('UPDATE info of user', () => {
        it('should return a 200 status and info has been updated', async () => {
            const data = {
                address: 'MD-HNNNN'
            }

            const response = await request.put('auth').set('Authorization', `Bearer ${USER_TOKEN}`).send(data);

            expect(response.statusCode).toBe(200);
            expect(response.body.user).toEqual(expect.objectContaining(data));
        })
    });
})
