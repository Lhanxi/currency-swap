import React, { useState } from "react";
import "./RateInput.css";
import CurrencyList from "./CurrencyList";

interface RateInputProps {
    sellToken: string;
    buyToken: string;
    onRateChange: (value: string) => void;
    onSellTokenChange: (currency: string) => void;
    onBuyTokenChange: (currency: string) => void;
    availableCurrencies: string[];
}

const RateInput: React.FC<RateInputProps> = ({
    sellToken,
    buyToken,
    onRateChange,
    onSellTokenChange,
    onBuyTokenChange,
    availableCurrencies,
}) => {
    const [rate, setRate] = useState("");

    const handleRateChange = (value: string) => {
        setRate(value);
        onRateChange(value);
    };

    return (
        <div className="rate-input-container">
            <div className="rate-label">
                <span>When 1</span>
                <CurrencyList currencies={availableCurrencies} selectedCurrency={sellToken} onSelectCurrency={onSellTokenChange} />
                <span>is worth</span>
            </div>

            <div className="rate-input-wrapper">
                <input
                    type="text"
                    className="rate-input"
                    value={rate}
                    onChange={(e) => handleRateChange(e.target.value)}
                    placeholder="0.0"
                    disabled={!sellToken || !buyToken}
                />
                <CurrencyList currencies={availableCurrencies} selectedCurrency={buyToken} onSelectCurrency={onBuyTokenChange} />
            </div>
        </div>
    );
};

export default RateInput;
