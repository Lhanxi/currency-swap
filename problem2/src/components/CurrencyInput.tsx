import React from "react";
import "./CurrencyInput.css";
import CurrencyList from "./CurrencyList";

interface CurrencyInputProps {
    label: string;
    token: string;
    amount: string;
    currencies: string[];
    disabled?: boolean;
    onAmountChange: (value: string) => void;
    onCurrencyChange: (currency: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    label,
    token,
    amount,
    currencies,
    disabled = false,
    onAmountChange,
    onCurrencyChange
}) => {
    return (
        <div className={`currency-input ${label.toLowerCase() === "sell" ? "sell-bg" : ""}`}>
            <div className="input-container">
                <div className="left-input">
                    <div className="label-inside">{label}</div>
                    <input
                        type="text"
                        className="amount-input"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        placeholder="0"
                        disabled={disabled}
                    />
                </div>
                <CurrencyList currencies={currencies} selectedCurrency={token} onSelectCurrency={onCurrencyChange} />
            </div>
        </div>
    );
};

export default CurrencyInput;
