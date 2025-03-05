interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

// implementation of Datasource to async fetch 
class Datasource {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getPrices(): Promise<Record<string, number>> {
        try {
            const response = await fetch(this.url);
            return response.json();
        } catch (error) {
            console.error("Failed to fetch prices:", error);
            return {};
        }
    }
}

interface Props extends BoxProps {

}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    // refactored
    useEffect(() => {
        const datasource = new Datasource("https://interview.switcheo.com/prices.json");
        datasource.getPrices().then(setPrices).catch(console.error);
    }, []);

    // created a map to store the priority value of the blockchain instead of using a switch statement
    const PRIORITIES: Record<string, number> = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
    };

    const getPriority = (blockchain: string): number => PRIORITIES[blockchain] ?? -99;

    // Separate filtering logic from sorting logic
    const filteredBalances = balances.filter((balance: WalletBalance) => {
        const priority = getPriority(balance.currency);
        return priority > -99 && balance.amount > 0;
    });

    const sortedBalances = useMemo(() => {
        return [...filteredBalances].sort((lhs, rhs) => {
            return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });
    }, [filteredBalances, prices]);

    const formattedBalances = sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
    }));

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}

