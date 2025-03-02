import React, { useState } from "react";
import "./ExpiryDropdown.css";
import CustomExpiryModal from "./CustomExpiryModal";

const expiryOptions = ["1 Minute", "10 Minutes", "1 Hour", "1 Day", "3 Days", "7 Days", "Custom"];

interface ExpiryDropdownProps {
  onSelectExpiry: (value: string) => void;
}

const ExpiryDropdown: React.FC<ExpiryDropdownProps> = ({ onSelectExpiry }) => {
  const [selectedExpiry, setSelectedExpiry] = useState("7 Days");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (value === "Custom") {
      setIsCustomModalOpen(true);
    } else {
      setSelectedExpiry(value);
      onSelectExpiry(value);
    }
  };

  return (
    <div className="expiry-dropdown">
      <div className="expiry-selector" onClick={() => setIsCustomModalOpen(!isCustomModalOpen)}>
        <span>Expires in:</span>
        <strong>{selectedExpiry}</strong>
      </div>
      <div className="dropdown-content">
        {expiryOptions.map((option) => (
          <div key={option} className="dropdown-item" onClick={() => handleSelect(option)}>
            {option}
          </div>
        ))}
      </div>
      {isCustomModalOpen && (
        <CustomExpiryModal
          onClose={() => setIsCustomModalOpen(false)}
          onSetCustomExpiry={(customValue) => {
            setSelectedExpiry(customValue);
            onSelectExpiry(customValue);
            setIsCustomModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ExpiryDropdown;
