import { createContext, useContext, useState } from "react";
import BillingCard from "../Components/Dashboard/BillingCard";


const lightTheme = {
  background: "linear-gradient(300deg, hsl(298deg 62% 85%) 0%, hsl(298deg 62% 87%) 3%, hsl(298deg 62% 90%) 9%, hsl(299deg 62% 92%) 20%, hsl(299deg 62% 95%) 41%, hsl(299deg 62% 97%) 77%, hsl(0deg 0% 100%) 100%)",
  textColor: "#000",
  iconColor: "#000",
  backgroundAilab : "linear-gradient(45deg,hsl(240deg 3% 93%) 0%,hsl(263deg 2% 88%) 8%,hsl(291deg 2% 83%) 17%,hsl(319deg 2% 78%) 25%,hsl(336deg 2% 74%) 33%,hsl(349deg 3% 69%) 42%,hsl(0deg 3% 64%) 50%,hsl(10deg 3% 60%) 58%,hsl(17deg 3% 55%) 67%,hsl(25deg 3% 50%) 75%,hsl(33deg 3% 46%) 83%,hsl(43deg 3% 41%) 92%,hsl(60deg 3% 37%) 100%)",
  sideBarIconColor : "#E2E8F0",
  sideBarDividerColor : "#515152",
  AiChatbg : "white",
  AiChatUserBorderColor :  "gray.200",
  AiChatBorder: "none",
  AiChatBoxHeading : "black",
  AiChatBoxInnerBoxbg: "gray.50",
  AiChatBoxInnerBoxBorderColor : "none",
  modelSelectionBorder : "none",
  modelSelectionSelectBg : "white",
  modelSelectionSelectBorder : "gray.200",
  keyGenerateBg : "white",
  keyGenerateBorder : "none",
  integrationBoxBg : "white", 
  integrationBoxBorder : "none",
  integrationBoxDivider : "gray.200",
  billingCardBorder : "none",
  billingCardText : "gray.700",
  passwordChangeBoxBg : "white",
  passwordChangeBoxBorder : "none",
  supportFormBg : "white",
UserchatBubbleColor:'white',
aiChatBubbleColor:'#73048b',
historySelectedButton:'#73048b',
historySelectedTextColor:'white',
chatTextColor:'black',
};

const darkTheme = {
  historySelectedButton:'#ff914d',
  historySelectedTextColor:'white',
  chatTextColor:'white',
  backgroundAilab : "linear-gradient(215deg,hsl(293deg 34% 24%) 0%,hsl(287deg 33% 24%) 6%,hsl(281deg 32% 24%) 12%,hsl(275deg 31% 24%) 20%,hsl(269deg 30% 24%) 28%,hsl(263deg 30% 24%) 36%,hsl(257deg 29% 24%) 45%,hsl(251deg 28% 24%) 54%,hsl(245deg 27% 24%) 64%,hsl(239deg 26% 23%) 73%,hsl(234deg 28% 22%) 82%,hsl(230deg 30% 22%) 91%,hsl(226deg 32% 21%) 100%)", 
  background: "linear-gradient(215deg,hsl(293deg 34% 24%) 0%,hsl(287deg 33% 24%) 6%,hsl(281deg 32% 24%) 12%,hsl(275deg 31% 24%) 20%,hsl(269deg 30% 24%) 28%,hsl(263deg 30% 24%) 36%,hsl(257deg 29% 24%) 45%,hsl(251deg 28% 24%) 54%,hsl(245deg 27% 24%) 64%,hsl(239deg 26% 23%) 73%,hsl(234deg 28% 22%) 82%,hsl(230deg 30% 22%) 91%,hsl(226deg 32% 21%) 100%)",
  textColor: "#E2E8F0",
  iconColor: "#E2E8F0",
  sideBarIconColor : "#E2E8F0",
  AiChatbg :"rgba(255, 255, 255, 0.1)",
  AiChatBorder : "1px solid #ff914d",
  sideBarDividerColor : "#ff914d",
  AiChatBoxHeading : "white",
  AiChatUserBorderColor :  "#ff914d",
  AiChatBoxInnerBoxbg: "transparent",
  AiChatBoxInnerBoxBorderColor : "1px solid #ff914d",
  modelSelectionBorder: "1px solid #ff914d",
  modelSelectionSelectBg : "transparent",
  modelSelectionSelectBorder : "#ff914d",
  keyGenerateBg : "blur(10px)",
  keyGenerateBorder : "1px solid #ff914d",
  keyGenerateTextColor : "#ff914d",
  integrationBoxBg : "transparent",
  integrationBoxBorder : "1px solid #ff914d",
  integrationBoxDivider : "#ff914d",
  billingCardBorder : "#ba2cc1",
  billingCardText : "#9c9ca1",
  passwordChangeBoxBg : "transparent",
  passwordChangeBoxBorder : "1px solid #ff914d",
  supportFormBg : "transparent",
};


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
