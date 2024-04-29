const { createHotel } = require('../controllers/hotels');
const Hotel = require("../models/Hotel");


// Mock the Hotel model
jest.mock("../models/Hotel");

describe('Create Hotel', () => {
    let mockReq, mockRes, mockNext;


    beforeEach(() => {
        mockReq = { body: { name: "Test Hotel", location: "Test Location" } };
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });-


    it('Create Hotel valid', async () => {
        Hotel.create.mockResolvedValue(mockReq.body);
        
        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: mockReq.body
        });
    });

});
