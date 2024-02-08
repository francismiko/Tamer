import { Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
	const { method, originalUrl } = req;
	new Logger("Request").log(method + originalUrl);

	res.on("finish", () => {
		const { statusCode } = res;
		const logger = new Logger(`HTTP ${statusCode}`);

		if (statusCode >= 500) {
			logger.error(method + originalUrl);
		} else if (statusCode >= 400) {
			logger.warn(method + originalUrl);
		} else {
			logger.log(method + originalUrl);
		}
	});

	next();
}
