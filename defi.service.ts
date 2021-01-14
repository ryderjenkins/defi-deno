import { CoinMarketCapService } from "./specific-services/coinmarketcap.service.ts"
import { EthereumService } from "./specific-services/ethereum.service.ts"


export class DeFiService {

    public static async getGasPriceInfo(): Promise<any> {
        return EthereumService.getGasPriceInfo()
    }

    public static async getPriceDataWithTimeStamp(): Promise<any> {
        return CoinMarketCapService.getPriceDataWithTimeStamp()
    }
    
}