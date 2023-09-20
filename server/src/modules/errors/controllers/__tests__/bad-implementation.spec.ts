import { Request, Response } from "express";
import * as Boom from "@hapi/boom";
import { badImplementation } from "../bad-implementation";

describe("badImplementation middleware", () => {
  it("should trigger a Boom badImplementation error", () => {
    const mockReq = {} as Request;
    const mockRes = {} as Response;

    const mockNext = jest.fn();

    badImplementation(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();

    const passedError = mockNext.mock.calls[0][0];
    expect(Boom.isBoom(passedError)).toBeTruthy();
    expect(passedError.output.statusCode).toBe(500);
    expect(passedError.output.payload.message).toBe(
      "An internal server error occurred",
    );
  });
});
