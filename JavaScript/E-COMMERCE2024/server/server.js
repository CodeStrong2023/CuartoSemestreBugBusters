import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: "", //agregar el token
});

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Soy el server");
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
        success: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        failure: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        pending: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
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
