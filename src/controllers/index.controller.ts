import { Request, Response } from "express";

export const IndexController = {
	index(req: Request, res: Response): void {
		res.status(200).send({
			code: 200,
			message: "Hello world NIHH",
		});
	},

	fallback(req: Request, res: Response): void {
		res.status(404).send({
			code: 404,
			message: "route not found",
			error: {
				path: req.path,
				method: req.method,
				baseURL: req.baseUrl,
			},
		});
	},
};
