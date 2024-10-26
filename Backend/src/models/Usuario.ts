// src/models/Usuario.ts

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
  
    constructor(id: number, nombre: string, apellido: string) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
    }
  
    saludo(): string {
      return `¡Hola, ${this.nombre} ${this.apellido}!`;
    }
  
    infoCompleta(): string {
      return `ID: ${this.id}, Usuario: ${this.nombre} ${this.apellido}`;
    }
  }
  