import { Request, Response } from "express";
import { TUser } from "../types";
import { db } from "../database/knex";


export const createUser =  async (req: Request, res: Response) => {
    try {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string 
    const password = req.body.password as string 
  
    if(typeof id !== "string"){
      res.status(400)
      throw new Error ("Id invalido. Id deve ser do tipo String")
    }
  
   
    if (email !== undefined) {
      if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i)) {
        res.status(400);
        throw new Error("email tem que o padrão exemplo@gmail.com");
      }
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("email tem que ser tipo string");
      }
      if (!email.length) {
        res.status(400);
        throw new Error("email precisa ter no mínimo 1 valor");
      }
    }

    if(typeof password !== "string"){
      res.status(400)
      throw new Error("Password invalido. Password deve ser do tipo String");
    }
  
   
    const newUser = {
      id,
      name,
      email,
      password,
    };
    // users.push(newUser);
    await db.raw(`INSERT INTO users (id, name, email, password)
      VALUES ("${newUser.id}","${newUser.name}","${newUser.email}","${newUser.password}");
    `)
  
    res.status(201).send("Cadastro realizado com sucesso.");
      
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro Inesperado.");
      }
    }
  };