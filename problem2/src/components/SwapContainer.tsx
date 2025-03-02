import React, { useState, useEffect } from "react";
import "./SwapContainer.css";
import ExpiryInput from "./ExpiryInput";
import CurrencyInput from "./CurrencyInput";
import RateInput from "./RateInput";

interface PriceData {
    currency: string;
    price: number;
}

interface SwapContainerProps {
    prices: PriceData[];
}

const SwapContainer: React.FC<SwapContainerProps> = ({ prices }) => {
    const [payAmount, setPayAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [selectedPayToken, setSelectedPayToken] = useState("ETH");
    const [selectedReceiveToken, setSelectedReceiveToken] = useState("");
    const [lastUpdated, setLastUpdated] = useState<"pay" | "receive">("pay");
    const [activeTab, setActiveTab] = useState("Swap");
    const [rate, setRate] = useState("");

    // ✅ Ensure the availableCurrencies list is updated correctly
    const availableCurrencies = Array.from(new Set(prices.map((p) => p.currency)));

    useEffect(() => {
        if (!payAmount && lastUpdated === "pay") {
            setReceiveAmount("");
            return;
        }
        if (!receiveAmount && lastUpdated === "receive") {
            setPayAmount("");
            return;
        }

        const payPrice = prices.find((p) => p.currency === selectedPayToken)?.price || 1;
        const receivePrice = prices.find((p) => p.currency === selectedReceiveToken)?.price || 1;

        if (lastUpdated === "pay" && payAmount) {
            const convertedAmount = (parseFloat(payAmount) * payPrice) / receivePrice;
            setReceiveAmount(isNaN(convertedAmount) ? "" : convertedAmount.toFixed(6));
        }

        if (lastUpdated === "receive" && receiveAmount) {
            const convertedAmount = (parseFloat(receiveAmount) * receivePrice) / payPrice;
            setPayAmount(isNaN(convertedAmount) ? "" : convertedAmount.toFixed(6));
        }
    }, [payAmount, receiveAmount, selectedPayToken, selectedReceiveToken, prices, lastUpdated]);

    return (
        <div className="exchange-container">
            <h2>Exchange Currency</h2>

            <div className="swap-container">
                <div className="tab-container">
                    <p className={activeTab === "Swap" ? "tab active" : "tab"} onClick={() => setActiveTab("Swap")}>
                        Swap
                    </p>
                    <p className={activeTab === "Limit" ? "tab active" : "tab"} onClick={() => setActiveTab("Limit")}>
                        Limit
                    </p>
                </div>

                <CurrencyInput
                    label="Sell"
                    token={selectedPayToken || "Select a token"}
                    amount={payAmount}
                    currencies={availableCurrencies}
                    disabled={!selectedReceiveToken}
                    onAmountChange={(value) => {
                        setPayAmount(value);
                        setLastUpdated("pay");
                    }}
                    onCurrencyChange={(currency) => {
                        setSelectedPayToken(currency);
                        setLastUpdated("pay");
                    }}
                />
                <CurrencyInput
                    label="Buy"
                    token={selectedReceiveToken || "Select a token"}
                    amount={receiveAmount}
                    currencies={availableCurrencies}
                    onAmountChange={(value) => {
                        setReceiveAmount(value);
                        setLastUpdated("receive");
                    }}
                    onCurrencyChange={(currency) => {
                        setSelectedReceiveToken(currency);
                        setLastUpdated("receive");
                    }}
                />

                {activeTab === "Limit" && (
                    <div className="limit-order-section">
                        <RateInput
                            sellToken={selectedPayToken}
                            buyToken={selectedReceiveToken}
                            onRateChange={setRate}
                            onSellTokenChange={setSelectedPayToken}
                            onBuyTokenChange={setSelectedReceiveToken}
                            availableCurrencies={availableCurrencies}
                        />
                        <ExpiryInput />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SwapContainer;
