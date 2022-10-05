import React from "react";

export default function NavBar({ Pages }) {
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
              <li key={Page.Title}>
                <a href={Page.URL}>{Page.Title}</a>
              </li>
            );
          }
        )
      }
    </ul>
  );
}