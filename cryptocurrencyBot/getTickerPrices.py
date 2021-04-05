import os
import sys
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root + '/python')

import ccxt  # noqa: E402


def print_exchanges():
    print('Supported exchanges:', ', '.join(ccxt.exchanges))


def print_usage():
    print("Usage: python", sys.argv[0], 'id')
    print("python", sys.argv[0], 'kraken')
    print("python", sys.argv[0], 'coinbasepro')
    print_exchanges()

while 1:
    try:
    
        id = "poloniex"  # SPECIFY EXCHANGE (POLONIEX, COINBASE, KRAKEN, ETC)
    
        # check if the exchange is supported by ccxt
        exchange_found = id in ccxt.exchanges
    
        if exchange_found:
    
            print('Instantiating', id)
    
            # instantiate the exchange by id
            exchange = getattr(ccxt, id)({
                'enableRateLimit': True,  # https://github.com/ccxt/ccxt/wiki/Manual#rate-limit
            })
    
            if exchange.has['fetchTickers'] != True:
                raise ccxt.NotSupported ('Exchange ' + exchange.id + ' does not have the endpoint to fetch all tickers from the API.')
    
            # load all markets from the exchange
            markets = exchange.load_markets()
    
            try:
    
                tickers = exchange.fetch_tickers()
                for symbol, ticker in tickers.items():
                    #if symbol == "ZRX/ETH": #TO ISOLATE ONE OR MORE CRYPTOCURRENCIES
                        print(
                            symbol,
                            ticker['datetime'],
                            'high: ' + str(ticker['high']),
                            'low: ' + str(ticker['low']),
                            'bid: ' + str(ticker['bid']),
                            'ask: ' + str(ticker['ask']),
                            'volume: ' + str(ticker['quoteVolume'] or ticker['baseVolume'])
                        )
    
            except ccxt.DDoSProtection as e:
                print(type(e).__name__, e.args, 'DDoS Protection (ignoring)')
            except ccxt.RequestTimeout as e:
                print(type(e).__name__, e.args, 'Request Timeout (ignoring)')
            except ccxt.ExchangeNotAvailable as e:
                print(type(e).__name__, e.args, 'Exchange Not Available due to downtime or maintenance (ignoring)')
            except ccxt.AuthenticationError as e:
                print(type(e).__name__, e.args, 'Authentication Error (missing API keys, ignoring)')
        else:
            print('Exchange', id, 'not found')
            print_usage()
    
    except Exception as e:
    
        print(type(e).__name__, e.args, str(e))
        print_usage()