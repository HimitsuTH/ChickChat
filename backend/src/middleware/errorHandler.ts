import { Request, Response, NextFunction } from "express";
type errorData = {
  statusCode: number;
  message: string;
  field?:string;
  validation?: object[];
};

export default (err: errorData,req: Request,res: Response,next: NextFunction
) => {
  const statusCode = err.statusCode || 500;



  res.status(statusCode).json({
    statusCode: statusCode,
    field: err.field,
    message: err.message,
    validation: err.validation,
  });
};
