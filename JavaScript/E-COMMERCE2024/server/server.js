import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import { MercadoPagoConfig, Preference } from "mercadopago";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-4339958248082570-091115-8e15d6ecf9a628b46035cca81cd53997-1988060350", //agregar el token
});

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client', '../client')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/media", "index.html")); // Renderiza el archivo HTML
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:8080",
        failure: "http://localhost:8080",
        pending: "http://localhost:8080",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

app.listen(port, () => {
	console.log(`The server is now running on Port ${port}`);
});
