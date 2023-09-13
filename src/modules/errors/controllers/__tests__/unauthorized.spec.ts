import { Request, Response } from "express";
import * as boom from "@hapi/boom";
import { unauthorized } from "../unauthorized";

describe("unAuthorized middleware", () => {
  it("should call next with unauthorized error if token is invalid", () => {
    const mockReq = {
      headers: {
        authorization: "Bearer invalid-token",
      },
    } as unknown as Request;

    const mockRes = {} as Response;
    const mockNext = jest.fn();

    unauthorized(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(boom.unauthorized());
  });
});
