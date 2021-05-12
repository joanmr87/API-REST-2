const express = require ("express");
const { PORT } = require("./API-REST-2/src/config");
const app = express();

app.use(express.json());



app.get("/api/users", (req, res) => {
    res.json(DB);
});

app.post("/api/users", (req, res) => {
    const user = {
        id: id++,
        name: req.body.name,
        age: req.body.age,
    };

    const userName = user.name.toLocaleLowerCase().trim();

    if (DB.some((item) => item.name.toLocaleLowerCase().trim() == userName )){
        res.status(409).json({
            messege: "'name' debe ser unico"
        });     
    } else {
        DB.push(user);

        res.json(user);
    }
   
    
});

app.get("/api/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = DB.filter((item) => item.id === userId)[0];

    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }        
});

app.delete("/api/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const userIndex = DB.findIndex((item) => item.id === userId);

    if (userIndex > -1) {
        DB.splice(userIndex, 1);
        res.json({
            messege: 'user deleted'
        });
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});