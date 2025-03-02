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
    };

    return (
        <div className="custom-expiry-modal">
            <div className="modal-content">
                <h3>Set up custom period</h3>
                <div className="input-group">
                    <input type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    <span>Hours</span>
                    <input type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
                    <span>Minutes</span>
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
