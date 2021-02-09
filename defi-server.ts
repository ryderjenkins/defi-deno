import { opine } from "https://deno.land/x/opine@0.27.0/mod.ts";
import { Persistence } from "https://deno.land/x/persistence@1.1.0/persistence.ts"
import { DeFiService } from "./defi.service.ts";

const app = opine();

const projectPathForData = `${Deno.cwd()}`
const pathToFile = `${projectPathForData}/favorite-crypto-price-data.json`

DeFiService.startCoinmarketCapInterval()

// http://localhost:3024/getPrices
app.get("/getPrices", async function (req, res) {

    const localFileContent = await Persistence.readFromLocalFile(pathToFile)

    res.send({pricesWithoutWarranty: JSON.parse(localFileContent)})
});

const port = 3024
app.listen(port)
console.log(`opine server is listening on http://localhost:${port}`)

