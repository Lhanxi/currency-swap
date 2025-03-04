import React, { useState, useRef, useEffect } from "react";
import "./TokenSelector.css";

interface TokenSelectorProps {
    tokens: string[];
    onSelect: (token: string) => void;
    onClose: () => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens, onSelect, onClose }) => {
    const [search, setSearch] = useState("");
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    const filteredTokens = tokens.filter((token) =>
        token.toLowerCase().includes(search.toLowerCase())
    );

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-header">
                    <h2>Select a Token</h2>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>

                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by token"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="token-list">
                    {filteredTokens.map((token) => (
                        <div
                            key={token}
                            className="token-item"
                            onClick={() => onSelect(token)}
                        >
                            <img src={`${process.env.PUBLIC_URL}/token-icons-main/tokens/${token.toUpperCase()}.svg`}
                                alt={token}
                                className="token-icon"
                                onError={(e) => (e.currentTarget.style.display = "none")} />
                            <div className="token-text">
                                <span className="token-name">{token}</span>
                                <span className="token-subtext">{token}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TokenSelector;