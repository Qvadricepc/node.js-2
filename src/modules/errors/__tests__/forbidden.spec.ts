const { forbidden } = require("../controllers");
import { Request, Response, NextFunction } from "express";
import * as boom from "@hapi/boom";

describe("forbidden middleware", () => {
  it("should always call next with a forbidden error", () => {
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn();

    forbidden(mockReq, mockRes, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledWith(boom.forbidden());
  });
});
