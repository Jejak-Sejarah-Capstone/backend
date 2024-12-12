import express, { Express } from "express";
import { router } from "./routes/index.routes";
import cors from "cors";
import { loadModel } from "./utils/loadModel";

const app: Express = express();
const PORT: number = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function initializeApp() {
    await loadModel(); 
}

router(app);

function main(): void {
    initializeApp().then(() => {
        app.listen(PORT, "0.0.0.0", (): void => {
            console.log(`⚡️ [SERVER]: Server running at localhost:${PORT}`);
        });
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}

main();
