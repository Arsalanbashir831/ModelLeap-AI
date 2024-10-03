import React, { useState } from "react";
import "./NightModeToggle.css"; 

const NightModeToggleBtn = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    if (!isNightMode) {
      document.body.classList.add("body.night-mode");
    } else {
      document.body.classList.remove("night-mode");
    }
  };

  return (
    <label className="ui-switch">
      <input type="checkbox" checked={isNightMode} onChange={toggleNightMode} />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default NightModeToggleBtn;
