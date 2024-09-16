import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchRates, swapCurrencies, fetchCurrencies, setAmount, setBaseCurrency, setconvertAmount, setTargetCurrency } from '../store/slice/currencyslice'

const Currency = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { oneamount, currencies, targetCurrency, baseCurrency, amount, convertedAmount } = useSelector((state: RootState) => state.Currency);

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchRates({
      baseCurrency,
      targetCurrency: ''
    }));
  }, [dispatch, baseCurrency]);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      dispatch(fetchRates({
        baseCurrency,
        targetCurrency: ''
      }));
    }
  }, [dispatch, baseCurrency, targetCurrency]);

  useEffect(() => {
    dispatch(setconvertAmount());
  }, [dispatch, amount, targetCurrency]);

  const handleTargetCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetCurrency = e.target.value;
    dispatch(setTargetCurrency(newTargetCurrency));
    dispatch(setconvertAmount());
    dispatch(fetchRates({ baseCurrency, targetCurrency: newTargetCurrency }));
  };
  const handleBaseCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBaseCurrency = e.target.value;
    dispatch(setBaseCurrency(newBaseCurrency));
    dispatch(fetchRates({ baseCurrency: newBaseCurrency, targetCurrency }));
    dispatch(setconvertAmount());
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    dispatch(setAmount(newAmount));
    dispatch(setconvertAmount());
  };
  const handleswap = (e) => {
    e.preventDefault()
    dispatch(swapCurrencies());
    dispatch(fetchRates({ baseCurrency: targetCurrency, targetCurrency: baseCurrency }))
    dispatch(setconvertAmount())
  };

  return (
    <div className='m-auto mt-40 h-fit w-2/3   bg-blue-200'>
      <div className='text-center text-4xl font-bold p-10'>Currency-Converter</div>
      <form action="" className='p-10 flex flex-row '>
        <div className='flex flex-row gap-10 justify-between items-center mx-auto'>
          <div className='flex flex-col gap-1 '>
            <label htmlFor="" className='pl-4 font-medium text-lg w-60' >Amount:</label>
            <input type="number" value={amount} onChange={handleAmountChange} className='w-full m-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="" className='pl-4 font-medium text-lg w-40'>from Currency:-</label>
            <select value={baseCurrency} onChange={handleBaseCurrencyChange} className='w-full m-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
              {Object.keys(currencies).map((country) => (
                <option key={country} value={country}>
                  {currencies[country]}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-8 px-4'>
            <button onClick={handleswap} className='border border-slate-400 p-2 rounded-full' >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
              </svg>
            </button>
          </div>

          <div className='flex flex-col gap-2 pr-10  '>
            <label htmlFor="" className='pl-4 font-medium text-lg w-40'>To Currency:-</label>
            <select value={targetCurrency} onChange={handleTargetCurrencyChange} className='w-full m-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' >
              {Object.keys(currencies).map((country) => (
                <option key={country} value={country}>
                  {currencies[country]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      {/* <button className='mx-32 text-xl font-semibold px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Convert</button> */}

      {oneamount !== null && baseCurrency === targetCurrency ? (
        <div className='px-32 py-5 text-2xl'>
          1 {baseCurrency} = 1 {targetCurrency}
        </div>
      ) : (
        oneamount !== null && (
          <div className='px-32 py-5 text-2xl'>
            1 {baseCurrency} = {oneamount} {targetCurrency}
          </div>
        )
      )}
      <div className='px-32 py-5 text-lg'>Converted Amount:
        {convertedAmount !== null && baseCurrency === targetCurrency ? (
          <div >
            {amount} {baseCurrency} = {amount} {targetCurrency}
          </div>
        ) : (
          convertedAmount !== null && (
            <div >
              {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
            </div>
          )
        )} </div>
    </div>
  )
}

export default Currency