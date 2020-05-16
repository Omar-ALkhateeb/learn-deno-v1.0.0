import {
  App,
  CorsBuilder,
} from "https://deno.land/x/alosaur/src/mod.ts";
import { DinoArea } from "./areas/dino.area.ts";

// Create alosaur application with my area
const app = new App({
  areas: [DinoArea],
});

// cors middleware
app.useCors(
  new CorsBuilder()
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader(),
);

app.listen();
