
const { createHotel } = require("../fake_controllers/hotels");
const Hotel = require("../fake_models/Hotel");

jest.mock("../fake_models/Hotel");

describe("Create Hotel Tests", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: {
                name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
            }
        };
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
   

    it("should create a hotel with valid inputs", async () => {
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: mockReq.body
        });
    });

    it('should handle errors when creating a hotel', async () => {
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when name field is blank", async () => {
        mockReq.body = {
            name: "",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when name field is false type", async () => {
        mockReq.body = {
            name: 1,
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when city field is blank", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when city field is false type", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: 1,
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when tel field is blank", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when city field is false type", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: 69,
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when address field is blank", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "",
            file: "cuhotel.png",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when address field is false type", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: 0.05,
            file: "cuhotel.png",
            capacity: 8
        };
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when file field is blank", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when address field is false type", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: 6,
            capacity: 8
        };
        const error = new Error("Failed to create hotel");
        Hotel.create.mockRejectedValue(error);

        await createHotel(mockReq, mockRes, mockNext);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: error.message
        });
    });

    it("should fail to create a hotel when capacity field is negative", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: -1
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    it("should fail to create a hotel when  all field blank and  capacity field is negative", async () => {
        mockReq.body = {
            name: "",
            city: "",
            tel: "",
            address: "",
            file: "",
            capacity: -1
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Invalid data" 
        });
    });

    

    
});
