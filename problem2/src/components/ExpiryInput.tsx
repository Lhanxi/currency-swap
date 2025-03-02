import React, { useState } from "react";
import "./ExpiryInput.css";
import ExpiryDropdown from "./ExpiryDropdown";

const ExpiryInput: React.FC = () => {
    const [expiry, setExpiry] = useState("1 Day");

    return (
        <div className="expiry-date-container">
            <div className="expiry-label">
                <span>Expires in</span>
            </div>
            <ExpiryDropdown onSelectExpiry={setExpiry} />
        </div>
    );
};

export default ExpiryInput;
