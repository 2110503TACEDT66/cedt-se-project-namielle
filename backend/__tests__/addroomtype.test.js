const { addRoomType } = require('../fake_controllers/roomTypes');

const RoomType = require("../fake_models/RoomType");


// Mock the RoomType model
jest.mock("../fake_models/RoomType");


describe('addRoomType Controller Test', () => {
    let mockReq, mockRes, mockNext;


    beforeEach(() => {
        mockReq = {
            body: {
                name: "Delux room",
                personLimit: 3,
                price: 2000,
                roomLimit: 10,
                hotel: "0A Hotel"
            }
        };
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });


    it('should create a room type successfully', async () => {
        RoomType.create.mockResolvedValue(mockReq.body);
        
        await addRoomType(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: mockReq.body
        });
    });


    it('should handle errors when creating a room type', async () => {
        const error = new Error("Failed to create room type");
        RoomType.create.mockRejectedValue(error); // Simulate an error during creation

        await addRoomType(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });


    it(' blank fields name', async () => {
        const invalidReq = { body: { name: "", personLimit: 1, price: 1, roomLimit: 1, hotel: "0A Hotel" } }; 
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });

    it(' false type fields name', async () => {
        const invalidReq = { body: { name: 2, personLimit: 1, price: 1, roomLimit: 1, hotel: "0A Hotel" } }; 
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });


    it(' negative fields personLimit', async () => {
        const invalidReq = { body: { name: "Delux room", personLimit: -1, price: 1, roomLimit: 1, hotel: "0A Hotel" } };
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });

    it(' false type fields personLimit', async () => {
        const invalidReq = { body: { name: 2, personLimit: " ghjkl", price: 1, roomLimit: 1, hotel: "0A Hotel" } }; 
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });


    it(' negative fields price', async () => {
        const invalidReq = { body: { name: "Delux room", personLimit: 1, price: -1, roomLimit: 1, hotel: "0A Hotel" } };
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });


    it(' false type fields  price', async () => {
        const invalidReq = { body: { name: 2, personLimit: 1, price: "gthjk", roomLimit: 1, hotel: "0A Hotel" } }; 
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });


    it(' negative fields roomLimit', async () => {
        const invalidReq = { body: { name: "Delux room", personLimit: 1, price: 1, roomLimit: -1, hotel: "0A Hotel" } };
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });

    it(' false type fields  roomLimit', async () => {
        const invalidReq = { body: { name: 2, personLimit: 1, price: 1, roomLimit: "uio", hotel: "0A Hotel" } }; 
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });

    it(' blank fields hotel', async () => {
        const invalidReq = { body: { name: "Delux room", personLimit: 1, price: 1, roomLimit: 1, hotel: "" } };
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });
    
    
    
    it(' blank and negative fields ', async () => {
        const invalidReq = { body: { name: "", personLimit: -1, price: -1, roomLimit: -1, hotel: "" } };
        RoomType.create.mockResolvedValue(mockReq.body);
        await addRoomType(invalidReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Please provide all the required fields with valid values, including 'hotel'"

        });

    });
    
});
