import React, { useState } from "react";
import "./RateInput.css";
import TokenSelector from "./TokenSelector";

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
    const [isSellSelectorOpen, setSellSelectorOpen] = useState(false);
    const [isBuySelectorOpen, setBuySelectorOpen] = useState(false);

    const handleRateChange = (value: string) => {
        setRate(value);
        onRateChange(value);
    };

    return (
        <div className="rate-input-container">
            <div className="rate-label">
                <span>When 1</span>

                <button className="token-button" onClick={() => setSellSelectorOpen(true)}>
                    <img
                        src={`${process.env.PUBLIC_URL}/token-icons-main/tokens/${sellToken.toUpperCase()}.svg`}
                        alt={sellToken}
                        className="token-icon"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    {sellToken}
                    <span className="caret">▼</span>
                </button>

                {isSellSelectorOpen && (
                    <TokenSelector
                        tokens={availableCurrencies}
                        onSelect={(selectedToken) => {
                            onSellTokenChange(selectedToken);
                            setSellSelectorOpen(false);
                        }}
                        onClose={() => setSellSelectorOpen(false)}
                    />
                )}

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

                <button className="token-button" onClick={() => setBuySelectorOpen(true)}>
                    <img
                        src={`${process.env.PUBLIC_URL}/token-icons-main/tokens/${buyToken.toUpperCase()}.svg`}
                        alt={buyToken}
                        className="token-icon"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    {buyToken}
                    <span className="caret">▼</span>
                </button>

                {isBuySelectorOpen && (
                    <TokenSelector
                        tokens={availableCurrencies}
                        onSelect={(selectedToken) => {
                            onBuyTokenChange(selectedToken);
                            setBuySelectorOpen(false);
                        }}
                        onClose={() => setBuySelectorOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default RateInput;
