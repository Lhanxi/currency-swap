import { useState } from "react";
import { ethers } from "ethers";
import "./ConnectWallet.css";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const ConnectWallet = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setWalletAddress(accounts[0]);
            } else {
                alert("MetaMask or a compatible wallet is required to connect.");
            }
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    return (
        <button onClick={connectWallet} className="connect-wallet-button">
            {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>
    );
};

export default ConnectWallet;
