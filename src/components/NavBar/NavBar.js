import React, { useState } from "react";

export default function NavBar({ Pages }) {
  const [isVisible, setIsVisible] = useState(false);
  const expand = () => {
    setIsVisible(!isVisible);
  };
  return (
    <ul>
      {
        Pages.map(
          (Page) => {
            if (Page.Pages !== undefined){
              return (
                <li key={Page.Title}>
                  <a href={Page.URL}>{Page.Title}</a>
                  <NavBar Pages={Page.Pages} />
                </li>
              );
            }
            return (
              <li onClick={expand} key={Page.Title}>
                <a href={Page.URL}>{Page.Title}</a>
              </li>
            );
          }
        )
      }
    </ul>
  );
}