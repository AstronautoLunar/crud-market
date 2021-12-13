import Express from "express";

const app = Express();
const PORT = 4444;

app.listen(PORT, () => console.log(`O servidor está iniciando na porta localhost:${PORT}`));