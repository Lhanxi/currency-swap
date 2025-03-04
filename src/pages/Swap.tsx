import React, { useEffect, useState } from "react";
import "./Swap.css";
import SwapContainer from "../components/SwapContainer";

interface PriceData {
    currency: string;
    price: number;
}

const Swap: React.FC = () => {
    const [prices, setPrices] = useState<PriceData[]>([]);

    useEffect(() => {
        fetch("https://interview.switcheo.com/prices.json")
            .then((res) => res.json())
            .then((data) => setPrices(data))
            .catch((error) => console.error("Error fetching prices:", error));
    }, []);

    return (
        <div className="swap-page-container">
            <SwapContainer prices={prices} />
        </div>
    );
};

export default Swap;
