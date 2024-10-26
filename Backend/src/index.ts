import express, { Request, Response } from 'express';
import cors from 'cors';
import { Usuario } from './models/Usuario';
import { usuarios } from './data/usuarios'; // Importamos los usuarios harcodeados

const app = express();
const PORT = 3001;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola, TypeScript  jejeje con Express!');
  });


// Ruta del findAll
  app.get('/usuarios', (req: Request, res: Response) => {
    res.json(usuarios);
  });
  



// Ruta para obtener un usuario por nombre
app.get('/usuario/:nombre', (req: Request, res: Response) => {
    const { nombre } = req.params;
  
    const usuariosEncontrados = usuarios.filter(
      (u) => u.nombre.toLowerCase() === nombre.toLowerCase()
    );
  
    if (usuariosEncontrados.length > 0) {
      // Crear un array para almacenar los mensajes
      const mensajes = usuariosEncontrados.map((u) => `${u.nombre} ${u.apellido}`);
     // Unir todos los mensajes en un solo string
      res.send(mensajes.join(", "));
    } else {
      res.status(404).send(`Usuario con nombre "${nombre}" no encontrado.`);
    }
  });
  
});
