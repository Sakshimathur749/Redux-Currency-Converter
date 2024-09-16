import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  CurrencyState, FetchRatesResponse, Rates } from '../../type/type'
import axios from "axios";


const initialState: CurrencyState = {
    currencies: [],
    rates: {},
    baseCurrency: 'USD',
    amount: 1,
    convertedAmount: 0,
    targetCurrency:'USD',
    oneamount:0,
}
export const fetchCurrencies = createAsyncThunk<string[]>(
    'currencies/fetchCurrencies', 
    async () => {
        try {
            const response = await axios.get('https://api.frankfurter.app/currencies');
            return response.data
        } catch (error) {
            console.log('An error occurred');
            return [];
        }
    });     
export const fetchRates = createAsyncThunk<any, { baseCurrency: string, targetCurrency: string }>(
    'currency/fetchRates',
    async ({ baseCurrency, targetCurrency })=> {
        const response = await axios.get<FetchRatesResponse>(`https://api.frankfurter.app/latest?amount=1&from=${baseCurrency}&to=${targetCurrency}`);
       return response.data.rates;
    }
);
const currencyslice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setBaseCurrency(state, action: PayloadAction<string>) {
            state.baseCurrency = action.payload;
        },
        setAmount(state, action: PayloadAction<number>) {
            state.amount = action.payload;
        },
        setTargetCurrency(state, action: PayloadAction<string>) {
            state.targetCurrency = action.payload;
        },
        setconvertAmount(state) {
            const rate = state.rates[state.targetCurrency];
            if (rate) {
                state.convertedAmount = state.amount * rate  ;
            } else {
                state.convertedAmount = 0;
            }
        },
        swapCurrencies(state){
            const swap = state.baseCurrency;
            state.baseCurrency = state.targetCurrency,
            state.targetCurrency = swap;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.fulfilled, (state, action: PayloadAction<string    []>) => {
                state.currencies = action.payload;
            })
            .addCase(fetchRates.fulfilled, (state, action: PayloadAction<Rates>) => {
                state.rates  = action.payload;  
                state.convertedAmount = state.amount * (state.rates[state.targetCurrency] || 0);
                state.oneamount = (state.rates[state.targetCurrency]*1)
            });
    }
})
export const { setBaseCurrency, setAmount,swapCurrencies, setconvertAmount, setTargetCurrency } = currencyslice.actions
export default currencyslice.reducer