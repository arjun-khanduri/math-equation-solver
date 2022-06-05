import React, { Component } from "react";
import Evaluate from "./Evaluate";
import Output from "./Output";
import "bootstrap/dist/css/bootstrap.min.css";

class Operation extends Component {
  constructor() {
    super();
    this.state = {
      evaluate: false,
      equation: "",
      result: "",
    };
  }

  sendImgToServer = (image) => {
    console.log("req:", image);
    let img = image.replace("data:image/png;base64,", "");

    let data = {};
    data.image = img;

    fetch("http://127.0.0.1:5000/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        let data1 = JSON.parse(data);
        console.log("Success:", data1);
        this.setState({
          evaluate: false,
          equation: data1["equation"],
          result: data1["solution"],
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  onClear = () => {
    this.setState({
      evaluate: false,
      equation: "",
      result: "",
    });
  };

  onEval = () => {
    this.setState({
      evaluate: true,
      equation: "",
      result: "",
    });
  };

  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "5em", marginLeft: "5em" }}
      >
        <div className="row">
          <div className="offset-md-3">
            <Evaluate sendImgToServer={this.sendImgToServer} />
          </div>
        </div>
        <br /><br />
        <Output
          equation={this.state.equation}
          result={this.state.result}
        />
      </div>
    );
  }
}

export default Operation;
