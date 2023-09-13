const { unAuthorized } = require("../controllers");
import { Request, Response } from "express";
import * as boom from "@hapi/boom";

describe("unAuthorized middleware", () => {
  it("should call next with unauthorized error if token is invalid", () => {
    const mockReq = {
      headers: {
        authorization: "Bearer invalid-token",
      },
    } as unknown as Request;

    const mockRes = {} as Response;
    const mockNext = jest.fn();

    unAuthorized(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(boom.unauthorized());
  });
});
