import React from "react";
import "./CurrencyList.css";

interface CurrencyListProps {
    currencies: string[];
    selectedCurrency: string;
    onSelectCurrency: (currency: string) => void;
}

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies, selectedCurrency, onSelectCurrency }) => {
    return (
        <select
            className="currency-list"
            value={selectedCurrency}
            onChange={(e) => onSelectCurrency(e.target.value)}
        >
            <option value="" disabled>Select a token</option>
            {currencies.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
};

export default CurrencyList;
