import React, { useState } from "react";
import "./CurrencyInput.css";
import TokenSelector from "./TokenSelector";

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
    const [isSelectorOpen, setSelectorOpen] = useState(false);

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
                <button className="token-button" onClick={() => setSelectorOpen(true)}>
                    {token && token !== "Select a Token" && (
                        <img
                            src={`/token-icons-main/tokens/${token.toUpperCase()}.svg`}
                            alt={token}
                            className="token-icon"
                        />
                    )}
                    {token}
                    <span className="caret">▼</span>
                </button>
            </div>

            {isSelectorOpen && (
                <TokenSelector
                    tokens={currencies}
                    onSelect={(selectedToken) => {
                        onCurrencyChange(selectedToken);
                        setSelectorOpen(false);
                    }}
                    onClose={() => setSelectorOpen(false)}
                />
            )}
        </div>
    );
};

export default CurrencyInput;
