
const { deleteDiscount } = require("../fake_controllers/discounts");
const Discount = require("../fake_models/Discount");

jest.mock("../fake_models/Discount");

describe("Delete Discount Tests", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            params: {
                id: "some-discount-id"
            }
        };
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should delete a discount successfully", async () => {
        Discount.findById.mockResolvedValue({
            deleteOne: jest.fn().mockResolvedValue({})
        });

        await deleteDiscount(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: {}
        });
    });

    it("should return 404 if discount not found", async () => {
        Discount.findById.mockResolvedValue(null);

        await deleteDiscount(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: `discount not found with id of ${mockReq.params.id}`
        });
    });

    it("should handle errors during deletion", async () => {
        const error = new Error("Failed to delete discount");
        Discount.findById.mockResolvedValue({
            deleteOne: jest.fn().mockRejectedValue(error)
        });

        await deleteDiscount(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            
        });
    });

    it("should handle database errors when finding the discount", async () => {
        const error = new Error("Database error");
        Discount.findById.mockRejectedValue(error);

        await deleteDiscount(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
           
        });
    });
})

;
