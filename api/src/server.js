import express from "express";
import userRoute from'./modules/user/user.route.js'
const app = express();
app.use(express.json());

app.use('/user', userRoute);

app.get('/health', (_, res) => {
  return res.send('Sistema está operacional');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});