import React, { useState } from "react";
import "./CustomExpiryModal.css";

interface CustomExpiryModalProps {
    onClose: () => void;
    onSetCustomExpiry: (value: string) => void;
}

const CustomExpiryModal: React.FC<CustomExpiryModalProps> = ({ onClose, onSetCustomExpiry }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const handleSetExpiry = () => {
        const expiryText = `${hours} Hours ${minutes} Minutes`;
        onSetCustomExpiry(expiryText);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="custom-expiry-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Set up custom period</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <span className="custom-label">Custom period</span>
                <div className="input-group">
                    <div className="input-wrapper">
                        <input
                            type="number"
                            min="0"
                            placeholder="Hours"
                            value={hours === 0 ? "" : hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            placeholder="Minutes"
                            value={minutes === 0 ? "" : minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="set" onClick={handleSetExpiry}>Set</button>
                </div>
            </div>
        </div>
    );
};

export default CustomExpiryModal;
