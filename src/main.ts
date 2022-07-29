import {App}  from "./app";
import {config as dotenv} from "dotenv";

const app = new App().app;

dotenv();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});