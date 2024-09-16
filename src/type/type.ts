export interface Rates {
    [key: string]: number;
}
export interface CurrencyState {
    currencies: string[];
    rates: Rates;
    baseCurrency: string;
    amount: number;
    convertedAmount: number;
    targetCurrency: string;
    oneamount:number,
}
export interface FetchRatesResponse {
    base: string;
    date: string;
    rates: Rates;
  }
export interface RootState {
    currency: CurrencyState;
}