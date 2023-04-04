import React, { Component } from "react";

export default class Calculator extends Component {
  equation = {
    left: "0",
    op: "",
    right: "0",
    result: "0",
  };
  step = "left";
  isRealNum = false;
  calc = () => {
    switch (this.equation.op) {
      case "+":
        return +this.equation.left + +this.equation.right;
      case "-":
        return +this.equation.left - +this.equation.right;
      case "*":
        return +this.equation.left * +this.equation.right;
      default:
        return +this.equation.left / +this.equation.right;
    }
  };
  process = (data) => {
    switch (this.step) {
      case "left":
        if (this.isRealNum) this.equation.left += data;
        else this.equation.left = +(this.equation.left + data).toString();
        this.equation.result = this.equation.left;
        break;
      case "op":
        this.equation.op = data;
        this.equation.result = this.equation.left + " " + this.equation.op;
        this.equation.right = this.equation.left;
        break;
      case "right":
        if (this.isRealNum) this.equation.right += data;
        else this.equation.right = +(this.equation.right + data).toString();
        this.equation.result =
          this.equation.left +
          " " +
          this.equation.op +
          " " +
          this.equation.right;
        break;
      default:
        if (this.equation.op === "/" && this.equation.right === "0") {
          this.equation.result = "Cannot divide by 0";
          this.equation.left = "0";
          this.equation.op = "";
          this.step = "left";
        } else {
          let result = this.calc().toString();
          this.equation.result =
            this.equation.left +
            " " +
            this.equation.op +
            " " +
            this.equation.right +
            " = " +
            result;
          this.equation.left = result;
        }
    }
  };
  click = (type, data) => {
    if (type === "clean") {
      if (this.step === "left") this.equation.left = "0";
      else if (this.step === "equal") type = "clear";
      else {
        this.equation.right = "0";
        this.step = "right";
      }
      this.process(data);
    }
    if (type === "clear") {
      this.equation = {
        left: "0",
        op: "",
        right: "0",
        result: "0",
      };
      this.step = "left";
    } else if (type === "num") {
      if (data === ".") this.isRealNum = true;
      else if (this.step === "op") {
        this.step = "right";
        this.equation.right = "0";
      } else if (this.step === "equal") {
        this.step = "left";
        this.equation = {
          left: "0",
          op: "",
          right: "0",
          result: "0",
        };
      }
      this.process(data);
    } else if (type === "op") {
      this.isRealNum = false;
      if (this.step === "left") this.step = "op";
      else if (this.step === "right") {
        this.step = "equal";
        this.process(data);
        this.step = "op";
      } else if (this.step === "equal") this.step = "op";
      this.process(data);
    } else if (type === "equal") {
      this.isRealNum = false;
      if (this.step === "left") {
        this.step = "left";
        this.equation.result = this.equation.left + " = " + this.equation.left;
        this.equation.left = "0";
        this.equation.op = "";
        this.setState(this.equation);
      } else {
        this.step = "equal";
        this.process(data);
      }
    }

    this.setState(this.equation);
  };
  renderInterface = () => {
    return (
      <div
        style={{
          width: "30%",
          height: "500px",
          margin: "auto",
        }}
      >
        <div
          style={{ paddingLeft: "95px" }}
          className="container bg-secondary bg-opacity-10 text-center py-5 border border-primary h-100"
        >
          <div className="row">
            <div className="col-10 bg-white border border-dark text-end">
              {this.equation.result}
            </div>
          </div>
          <div style={{ height: "20%" }} className="row">
            <button
              onClick={() => {
                this.click("num", "7");
              }}
              className="col-2 border bg-light"
            >
              7
            </button>
            <button
              onClick={() => {
                this.click("num", "8");
              }}
              className="col-2 border bg-light"
            >
              8
            </button>
            <button
              onClick={() => {
                this.click("num", "9");
              }}
              className="col-2 border bg-light"
            >
              9
            </button>
            <button
              onClick={() => {
                this.click("op", "/");
              }}
              className="col-2 border bg-light"
            >
              /
            </button>
            <button
              onClick={() => {
                this.click("clean", "");
              }}
              className="col-2 border bg-light"
            >
              CE
            </button>
          </div>
          <div style={{ height: "20%" }} className="row">
            <button
              onClick={() => {
                this.click("num", "4");
              }}
              className="col-2 border bg-light"
            >
              4
            </button>
            <button
              onClick={() => {
                this.click("num", "5");
              }}
              className="col-2 border bg-light"
            >
              5
            </button>
            <button
              onClick={() => {
                this.click("num", "6");
              }}
              className="col-2 border bg-light"
            >
              6
            </button>
            <button
              onClick={() => {
                this.click("op", "*");
              }}
              className="col-2 border bg-light"
            >
              *
            </button>
            <button
              onClick={() => {
                this.click("clear", "");
              }}
              className="col-2 border bg-light"
            >
              C
            </button>
          </div>
          <div style={{ height: "40%" }} className="row">
            <div className="col-8">
              <div style={{ height: "50%" }} className="row">
                <button
                  onClick={() => {
                    this.click("num", "1");
                  }}
                  className="col border bg-light"
                >
                  1
                </button>
                <button
                  onClick={() => {
                    this.click("num", "2");
                  }}
                  className="col border bg-light"
                >
                  2
                </button>
                <button
                  onClick={() => {
                    this.click("num", "3");
                  }}
                  className="col border bg-light"
                >
                  3
                </button>
                <button
                  onClick={() => {
                    this.click("op", "-");
                  }}
                  className="col border bg-light"
                >
                  -
                </button>
              </div>
              <div style={{ height: "50%" }} className="row">
                <button
                  onClick={() => {
                    this.click("num", "0");
                  }}
                  className="col-6 border bg-light"
                >
                  0
                </button>
                <button
                  onClick={() => {
                    this.click("num", ".");
                  }}
                  className="col border bg-light"
                >
                  .
                </button>
                <button
                  onClick={() => {
                    this.click("op", "+");
                  }}
                  className="col border bg-light"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                this.click("equal", "=");
              }}
              className="col-2 border bg-light pt-3"
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <h1 className="text-center">Calculator</h1>
        {this.renderInterface()};
      </div>
    );
  }
}
