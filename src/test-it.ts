// import { DeFiService } from "https://deno.land/x/defi/defi.service.ts"
import { DeFiService } from "./defi.service.ts"

const gasPriceInfo = await DeFiService.getGasPriceInfo()

console.log(gasPriceInfo)