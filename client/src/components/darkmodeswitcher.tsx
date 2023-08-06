import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function DarkModeSwitcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <li className="" onClick={() => toggleDarkMode(!darkSide)}>
      {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)} Mode
      {darkSide ? (
        <MdOutlineLightMode className="text-lg text-white z-30" />
      ) : (
        <MdOutlineDarkMode className="text-lg text-white z-30" />
      )}
    </li>
  );
}
