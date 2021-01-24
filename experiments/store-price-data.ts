import { DeFiService } from "../defi.service.ts"
import { Persistence } from "https://deno.land/x/persistence@1.1.0/persistence.ts"

export async function startStorePriceDataInterval() {
    
    setInterval(async () => {
        
        const symbols = ['BTC', 'ETH', 'LINK', 'BAT']
        const result = await DeFiService.getPriceDataFromOpenForce(symbols)
        
        const projectPathForData = `${Deno.cwd()}`
        const pathToFile = `${projectPathForData}/favorite-crypto-price-data.json`
        let localFileContent
        try {
            localFileContent = JSON.parse(await Persistence.readFromLocalFile(pathToFile))
            localFileContent.resultWithoutWarranty.push(result.resultWithoutWarranty[0])
        } catch(error) {
            console.log('probably there was no price data file yet')
            localFileContent = result
        }
        
        await Persistence.saveToLocalFile(pathToFile, JSON.stringify(localFileContent))
        
        // }, 1000 * 60 * 7) // every seven minutes
    }, 1000 * 60 * 0.1)
}

