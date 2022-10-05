import React from "react";
import './NavBar.css';

export default function NavBar({ Pages }) {
  return (
    <ul>
      {
        Pages.map((Page) => {return (
          <li key={Page.Title}>
            <a href={Page.URL}>{Page.Title}</a>
            {Page.Pages?(<NavBar Pages={Page.Pages} />):(<></>)}
          </li>
        );})
      }
    </ul>
  );
}