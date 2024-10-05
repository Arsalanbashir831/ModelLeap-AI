import React, { useState } from "react";
import "./NightModeToggle.css"; 
import { useTheme } from "../../../Themes/ThemeContext";


const NightModeToggleBtn = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();



  return (
    <label className="ui-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default NightModeToggleBtn;
