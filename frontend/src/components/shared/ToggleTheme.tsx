"use client";

import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function ToggleThemeComponent() {
  const themes = ["light", "dark", "synthwave", "sunset", "night", "dim"];
  const [currentTheme, setCurrentTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    setCurrentTheme(getCookie("theme") || "light");
  });

  const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.currentTarget.value;
    if (!themes.includes(theme)) return;
    setCookie("theme", theme, { maxAge: 9999999 });
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-top dropdown-end absolute bottom-0 right-0 md:m-5 mx-5 my-2">
      <div tabIndex={0} role="button" className="btn m-1 btn-primary">
        {currentTheme.charAt(0).toUpperCase() + currentTheme.substring(1)}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {themes.map((val, idx) => {
          return (
            <li key={idx}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={val.charAt(0).toUpperCase() + val.substring(1)}
                value={val}
                onChange={changeTheme}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
