import { Area } from "https://deno.land/x/alosaur/src/mod.ts";
import { DinoController } from "./dino.controller.ts";

// creating an area with the dino controller
@Area({
  controllers: [DinoController],
})
export class DinoArea {}
