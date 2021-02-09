import { CoinMarketCapService } from "./specific-services/coinmarketcap.service.ts"
import { EthereumService } from "./specific-services/ethereum.service.ts"
import { Persistence } from "https://deno.land/x/persistence@1.1.0/persistence.ts"

export class DeFiService {

    public static async getGasPriceInfo(): Promise<any> {
        return EthereumService.getGasPriceInfo()
    }

    public static async getPriceDataWithTimeStamp(): Promise<any> {
        return CoinMarketCapService.getPriceDataWithTimeStamp()
    }


    public static startCoinmarketCapInterval(eachXMinutes: number = 1) {

        setInterval(async () => {

            const raw = await CoinMarketCapService.getPriceDataWithTimeStamp()
        
            let resultFiltered = {
                timeStamp: raw.coinmarketcapResult.status.timestamp,
                BTCPrice: raw.coinmarketcapResult.data.filter((e:any) => e.symbol === 'BTC')[0].quote.USD.price,
                ETHPrice: raw.coinmarketcapResult.data.filter((e:any) => e.symbol === 'ETH')[0].quote.USD.price,
                BATPrice: raw.coinmarketcapResult.data.filter((e:any) => e.symbol === 'BAT')[0].quote.USD.price,
                LINKPrice: raw.coinmarketcapResult.data.filter((e:any) => e.symbol === 'LINK')[0].quote.USD.price,
            }
    
            const pathToFile = `${Deno.cwd()}/favorite-crypto-price-data.json`
            let localFileContent
            try {
                localFileContent = JSON.parse(await Persistence.readFromLocalFile(pathToFile))
                localFileContent.push(resultFiltered)
            } catch (error) {
                console.log('probably there was no price data file yet')
                localFileContent = [resultFiltered]
            }
        
            localFileContent.resultWithoutWarranty
        
            await Persistence.saveToLocalFile(pathToFile, JSON.stringify(localFileContent))
        
        }, 1000 * 60 * eachXMinutes) 
    }
    
}