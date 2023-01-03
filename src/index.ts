import express from 'express';
import { routes } from './routes/index.routes';

const app = express();
const PORT: number = Number(process.env.PORT) | 3000;

app.use(express.json())
app.use(routes);

app.listen(PORT, () => {
    console.log("listening to port... " + PORT);
})