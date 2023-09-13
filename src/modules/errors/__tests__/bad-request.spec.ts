const { badRequest } = require("../controllers");
import { Request, Response, NextFunction } from "express";
import * as boom from "@hapi/boom";

describe("badRequest middleware", () => {
  it("should call next with a badRequest error if email is missing", () => {
    const mockReq = {
      body: {
        name: "John",
      },
    } as Request;

    const mockRes = {} as Response;

    const mockNext = jest.fn();

    badRequest(mockReq, mockRes, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledWith(boom.badRequest());
  });

  it("should call next with a badRequest error if name is missing", () => {
    const mockReq = {
      body: {
        email: "john@example.com",
      },
    } as Request;

    const mockRes = {} as Response;

    const mockNext = jest.fn();

    badRequest(mockReq, mockRes, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledWith(boom.badRequest());
  });
});
