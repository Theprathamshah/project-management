import express, { Response }from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (_, res: Response)=> {
    res.send('Hello World!!');
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})