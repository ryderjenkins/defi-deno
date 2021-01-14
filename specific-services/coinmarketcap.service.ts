import { Request } from 'https://deno.land/x/request@1.3.0/request.ts'
import { defaultOptions as options } from 'https://deno.land/x/request@1.3.0/interfaces-and-constants.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

export class CoinMarketCapService {


    public static async getPriceDataWithTimeStamp(): Promise<any> {

        CoinMarketCapService.checkEnvironmentIsConfiguredProperly()

        options.headers = {
             'X-CMC_PRO_API_KEY': env.COINMARKETCAP_API_KEY 
        }
        
        const result = await Request.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', options)

        return { coinmarketcapResult: result }

    }


    private static checkEnvironmentIsConfiguredProperly() {

        if (env.COINMARKETCAP_API_KEY === undefined) {
            throw new Error('Copy the .env.template file to .env and ensure there is a valid value for COINMARKETCAP_API_KEY')
        }

    }

}