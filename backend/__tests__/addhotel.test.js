
const { createHotel } = require("../controllers/hotels");
const Hotel = require("../models/Hotel");

jest.mock("../models/Hotel");

describe("Create Hotel Tests", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: {}
        };
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    it("should create a hotel with valid inputs", async () => {
        mockReq.body = {
            name: "cu hotel",
            city: "pathumwan",
            tel: "099-987-9879",
            address: "Bangkok",
            file: "cuhotel.png",
            capacity: 8
        };
        Hotel.create.mockResolvedValue(mockReq.body);

        await createHotel(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: mockReq.body
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
