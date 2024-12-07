"use client";

import { getCookie, setCookie } from "cookies-next/client";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  top? : boolean;
}

export function ToggleThemeComponent({ top } : Props) {
  const themes = ["light", "dark", "synthwave", "sunset", "night", "dim"];
  const [currentTheme, setCurrentTheme] = useState("light");
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    setCurrentTheme(getCookie("theme") || "light");
  });

  const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.currentTarget.value;
    if (!themes.includes(theme)) return;
    setCookie("theme", theme, { maxAge: 9999999 });
    router.refresh();
  };

  if(pathname === "/test") top = true

  if(pathname !== "/chat")
  return (
    <div className={`dropdown absolute ${!top ? "dropdown-top dropdown-end bottom-0" : "top-0 dropdown-end"} right-0 md:m-5 mx-5 my-2 dropdown-hover`}>
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
