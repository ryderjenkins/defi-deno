import { Request } from 'https://deno.land/x/request@1.3.0/request.ts'


export class EthereumService {

    public static async getGasPriceInfo(): Promise<any> {
        const gasPriceInfo = await Request.get('https://ethgasstation.info/json/ethgasAPI.json')

        return gasPriceInfo
    }
}

