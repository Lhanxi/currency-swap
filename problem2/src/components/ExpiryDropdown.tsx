import React, { useState, useRef, useEffect } from "react";
import "./ExpiryDropdown.css";
import CustomExpiryModal from "./CustomExpiryModal";

const expiryOptions = ["1 Minute", "10 Minutes", "1 Hour", "1 Day", "3 Days", "7 Days", "Custom"];

interface ExpiryDropdownProps {
  onSelectExpiry: (value: string) => void;
}

const ExpiryDropdown: React.FC<ExpiryDropdownProps> = ({ onSelectExpiry }) => {
  const [selectedExpiry, setSelectedExpiry] = useState("7 Days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSelect = (value: string) => {
    if (value === "Custom") {
      setIsCustomModalOpen(true);
    } else {
      setSelectedExpiry(value);
      onSelectExpiry(value);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className={`expiry-dropdown ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
      <div className="expiry-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <strong>{selectedExpiry}</strong>
        <span className="caret">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {expiryOptions.map((option) => (
            <div
              key={option}
              className={`dropdown-item ${option === "Custom" ? "custom" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
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
