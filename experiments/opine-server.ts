import { opine } from "https://deno.land/x/opine@0.27.0/mod.ts";
import { Persistence } from "https://deno.land/x/persistence@1.1.0/persistence.ts"
import { startStorePriceDataInterval } from "./store-price-data.ts";

const app = opine();

const projectPathForData = `${Deno.cwd()}`
const pathToFile = `${projectPathForData}/favorite-crypto-price-data.json`

startStorePriceDataInterval()
// http://openforce.de:3024/getFavoriteCryptoPriceHistory
app.get("/getFavoriteCryptoPriceHistory", async function (req, res) {

    const localFileContent = await Persistence.readFromLocalFile(pathToFile)

    res.send(localFileContent)
});

const port = 3024
app.listen(port)
console.log(`opine server is listening on http://localhost:${port}`)
