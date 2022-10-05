import React from "react";
// import { Pages } from "./Pages";
// import "./NavBar.css" 

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      Pages: [
        {
            Title: "Home",
            URL: "#",
            Classes: "NavBar-Page"
        },
        {
            Title: "Coding",
            URL: "#",
            Classes: "NavBar-Page",
            Subpages: [
              {
                Title: "Python",
                URL: "#",
                Classes: "NavBar-Subpage",
                Subsubpages: [
                  {
                    Title: "Tensorflow",
                    URL: "#",
                    Classes: "NavBar-Subsubpage"
                  },
                  {
                    Title: "PyTorch",
                    URL: "#",
                    Classes: "NavBar-Subsubpage"
                  }
                ]
              },
              {
                Title: "React",
                URL: "#",
                Classes: "NavBar-Subpage"
              },
              {
                Title: "Shell",
                URL: "#",
                Classes: "NavBar-Subpage"
              }
            ]
        },
        {
            Title: "Computers",
            URL: "#",
            Classes: "NavBar-Page",
            Subpages: [
              {
                Title: "Git",
                URL: "#",
                Classes: "NavBar-Subpage"
              },
              {
                Title: "Virtual Machines",
                URL: "#",
                Classes: "NavBar-Subpage"
              }
            ]
        },
        {
            Title: "Networking",
            URL: "#",
            Classes: "NavBar-Page",
            Subpages: [
              {
                Title: "SSH",
                URL: "#",
                Classes: "NavBar-Subpage"
              }
            ]
        }
      ]
    }
  }
  render() {
    const items = this.state.Pages.map((Page, i) => {
      if (Page.Subpages !== undefined){
        return (
          <li key={i} className={Page.Classes}>
            <a href={Page.URL}>{Page.Title}</a>
            <ul>
              {Page.Subpages.map((Subpage, j) => {
                return (
                  <li key={i*100+j} className={Subpage.Classes}>
                    <a href={Subpage.URL}>{Subpage.Title}</a>
                  </li>
                )})}
            </ul>
          </li>
        )
      }
      return (
        <li className={Page.Classes}>
          <a href={Page.URL}>{Page.Title}</a>
        </li>
      )
    });
    
    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
};