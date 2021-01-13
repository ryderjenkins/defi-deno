import { EthereumService } from "./ethereum.service.ts"


export class DeFiService {

    public static async getGasPriceInfo(): Promise<any> {
        return EthereumService.getGasPriceInfo()
    }
    
}