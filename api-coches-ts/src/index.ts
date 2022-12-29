import express from 'express';
import { json } from 'body-parser';
import cors from 'cors'
import cocheRepository from './cocheRepository';
import respond from './respond';
import coche from './coche';

const app = express();

app.use(json());
app.use(cors());

app.get('/coches', (req, res) => {
  const cocheRepo = new cocheRepository();

  const people = cocheRepo.list();

  respond(res, 200, people);
});

app.get('/coches/:id', (req, res) => {
  const id = req.params.id;

  const cocheRepo = new cocheRepository();

  const person = cocheRepo.get(id);

  if (!person) {
    respond(res, 400);

    return;
  }

  respond(res, 200, person);
});

app.post('/coches', (req, res) => {
  const Coche = new coche(req.body.id, req.body.marca, req.body.modelo, req.body.color, req.body.matricula, req.body.kilometros_Recorridos);

  const cocheRepo = new cocheRepository();
  cocheRepo.add(Coche);

  respond(res, 200, Coche);
});

app.put('/coches', (req, res) => {
  const Coche = new coche(req.body.id, req.body.marca, req.body.modelo, req.body.color, req.body.matricula, req.body.kilometros_Recorridos);

  const cocheRepo = new cocheRepository();
  cocheRepo.update(Coche);

  respond(res, 200, Coche);
});

app.delete('/coches/:id', (req, res) => {
  const id = req.params.id;

  const cocheRepo = new cocheRepository();
  cocheRepo.delete(id);

  respond(res, 200);
});

app.listen(3005 , () => {
  console.log('App started on port 3005');
});
