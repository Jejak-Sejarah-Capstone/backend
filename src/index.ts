import express, { Express } from "express";
import { router } from "./routes/index.routes";
import cors from "cors";

const app: Express = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);

function main(): void {
	try {
		app.listen(PORT,"0.0.0.0", (): void => {
			console.log(`⚡️ [SERVER]: Server running at localhost:${PORT}`);
		});
	} catch (err: any) {
		console.error(err);
		process.exit(1);
	}
}

main();
