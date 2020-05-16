import { Controller, Get, Post, Delete, Body, Put, QueryParam } from "https://deno.land/x/alosaur/src/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import * as yup from "https://cdn.pika.dev/yup@^0.28.1";


interface RequestError extends Error {
  status: number;
}

interface Dinosaur {
  id?: string;
  name: string;
  image: string;
}

const dinosaurSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  image: yup.string().trim().url().required(),
});

const DB = new Map<string, Dinosaur>();


// creating a controller with the dino routes
@Controller('/dinos')
export class DinoController {
  constructor() {}

  @Get('/')
  text() {
    return "Hello World! 🦕";
  }

  @Get('/all')
  all() {
    return [...DB.values()];;
  }

  @Post('/post')
  async post(@Body() body: any) {
    try {
      if (body.type !== "json") throw new Error("Invalid Body");
      const dinosaur = (await dinosaurSchema.validate(body.value) as Dinosaur);
      dinosaur.id = v4.generate();
      DB.set(dinosaur.id, dinosaur);
      DB.set(dinosaur.id, dinosaur);
      return dinosaur;
    }
    catch(err){
      return err;
    }
  }

  @Delete('/delete')
  delete(@Body() body: any, @QueryParam('id') id: string) {
    if (id && DB.has(id)) {
      DB.delete(id);
      return 'deleted';
    } else {
      const error = new Error('Not Found! 🦕') as RequestError;
      return error
    }
  }

}