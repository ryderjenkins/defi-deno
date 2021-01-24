import { Request } from 'https://deno.land/x/request@1.3.0/request.ts'


export class OpenForce {
    public static async getPrice(symbols?: string[]) {
        const result = await Request.get('https://openforce.de/getPrice')

        if (symbols == undefined) {
            return { resultWithoutWarranty: result.coinmarketcapResult }
        }

        const stripped = []
        for (const symbol of symbols) {
            const strip = {
                symbol,
                price: JSON.stringify(result.coinmarketcapResult.data.filter((e: any) => e.symbol === symbol)[0].quote['USD'].price)
            }
            stripped.push(strip)
        }
        return { resultWithoutWarranty: [{ timeStamp: result.coinmarketcapResult.status.timestamp, data: stripped }] }

    }
}