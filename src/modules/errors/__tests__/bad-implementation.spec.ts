import { Request, Response } from "express";

describe("GET /ping", () => {
  it('should respond with "pong"', async () => {
    const mockRequest = {} as Request;

    const mockResponse: Partial<Response> = {
      json: jest.fn(),
    };

    const pingHandler = async (req: Request, res: Response) => {
      return res.json({ message: "pong" });
    };

    await pingHandler(mockRequest, mockResponse as Response);

    expect(mockResponse.json).toBeCalledWith({ message: "pong" });
  });
});
