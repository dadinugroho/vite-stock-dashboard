export type StockData = {
  [timestamp: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

const fetchStockData = async (): Promise<StockData | undefined> => {
  const apiKey: string | undefined = import.meta.env.VITE_REACT_APP_API_KEY;;
  const symbol: string = 'IBM';
  const interval: string = '5min';
  const url: string = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    
    // Check if 'Time Series (5min)' exists in the result
    if ('Time Series (5min)' in result) {
      return result['Time Series (5min)'] as StockData;
    } else {
      console.error('Invalid API response format');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return undefined;
  }
};

export default fetchStockData;
