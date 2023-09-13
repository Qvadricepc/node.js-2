const errorHandler = require("../index");
import { Request, Response, NextFunction } from "express";
import * as Boom from "@hapi/boom";

describe("errorHandler middleware", () => {
  it("should handle Boom errors and send the appropriate response", () => {
    const mockError = Boom.badRequest("Bad Request Error"); // Or any other Boom error
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    errorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      error: "Bad Request",
      message: "Bad Request Error",
      statusCode: 400,
    });
  });

  it("should handle non-Boom errors and send a 500 response", () => {
    const mockError = new Error("Some non-boom error");
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    errorHandler(mockError as any, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("Internal Server Error");
  });

  it("should call the next function", () => {
    const mockError = Boom.badRequest("Bad Request Error");
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    errorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });
});
