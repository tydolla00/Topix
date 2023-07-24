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
    <>
      <li
        className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => toggleDarkMode(!darkSide)}
      >
        {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)} Mode
        {darkSide ? (
          <MdOutlineLightMode className="text-xl inline-block" />
        ) : (
          <MdOutlineDarkMode className="text-xl inline-block" />
        )}
      </li>
    </>
  );
}
