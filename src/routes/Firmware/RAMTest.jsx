import React from "react";

export default class RAMTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Filters : {
        "OS":{
          "Mac OS": ["Monterey", "Big Sur"],
          "Windows": ["Windows 10"],
          "Linux": ["Mint", "Ubuntu"],
        },
        "IDE":{"Simplicity Studio":["V5"]},
        "SDK":{"Gecko SDK":["4.0.2"]},
        "MCU":["EFR32BG24B210F1024IM48"],
      }
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.Filters.OS["Mac OS"]}</h1>
      </div>
    );
  }
  };