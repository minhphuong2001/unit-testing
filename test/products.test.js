require('dotenv').config();
const baseUrl = 'https://sober-shop-production.up.railway.app/api/'
const supertest = require('supertest');
const request = supertest(baseUrl);
const ADMIN_TOKEN = process.env.ADMIN_ACCESS_TOKEN;

describe('ABOUT PRODUCTS.', () => {

    describe('given the product does not exists', () => {
        it('should return 404', async () => {
            const productId = '12345678910';

            await request.get(`product/${productId}`).expect(404);
        })
    });
    
    describe('GET product by id', () => {
        it('should return a 200 status and the product', async () => {
            let productId = '60afed8d8841df28fc60331c';
            if (productId) {
                await request
                    .get(`product/${productId}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body.data).toEqual(expect.objectContaining({ _id: productId }));
                    })
            } else {
                throw new Error(`productId is invalid - ${productId}`)
            }
        });
    });

    describe('CREATE a product', () => {
        // describe('if not admin', () => {
        //     it('should return a status: 401 Unauthorized', async () => {
        //         const response = await request.post('product');
        //         expect(response.statusCode).toBe(401);
        //     })
        // });
        
        describe('if admin', () => {
            it('should return a 200 status and create the product', async () => {
                const data = {
                    thumb: [
                        "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-29.jpg",
                        "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/3-19.jpg"
                    ],
                    discount: 5,
                    evaluation: 3,
                    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    sold: 13,
                    "name": "abcdefgh",
                    listImage: [
                        
                        "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-29.jpg",
                        "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/3-19.jpg",
                        "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-29.jpg"
                    ],
                    price: 360,
                    category: "60afe44c8841df28fc603318"
                };

                const { body, statusCode } = await request.post('product').set('Authorization', `Bearer ${ADMIN_TOKEN}`).send(data);
                // console.log(body);
                
                expect(statusCode).toBe(200);

                expect(body?.data).toEqual(expect.objectContaining(data));
            })
        })
    });
    
    describe('DELETE product by id', () => {
        // describe('if not admin', () => {
        //     it('should return a status: 401 Unauthorized', async () => {
        //         const response = await request.post('product');
        //         expect(response.statusCode).toBe(401);
        //     })
        // });

        describe('if admin', () => {
            it('should return a message delete product successfully', async () => {
                const productId = '61d5be3d4b730a001aea442b';
                const response = await request.delete(`product/${productId}`).set('Authorization', `Bearer ${ADMIN_TOKEN}`);
                
                if (productId) {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.message).toEqual('Delete successfully.')
                } else {
                    expect(response.statusCode).toBe(404);
                }
            })
        })
        
    });
    
})
