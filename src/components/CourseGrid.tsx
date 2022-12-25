import React, { Component } from "react";
import "./coursegrid.css";
import ShowFilter from "./ShowFilter";

export default class CourseGrid extends Component {
  render() {
    const openDays = ["MON", "TUE", "WED", "THU", "FRI"];
    return (
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <div>CourseGrid</div>
        <ShowFilter />

        {/* <div className="courseGrid border ">
          <div className="d-grid gap-2">
            {openDays.map((day) => (
              <div
                className="card d-md"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
              
                <button className="btn btn-primary btn-sm" type="button">
                  {day}
                </button>
              
                <div className="">
                  <div className="card">
                    {openDays.map((day) => (
                      <button
                        className="btn btn-outline-primary "
                        type="button"
                      >
                        Add +
                      </button>
                    ))}
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div
          className="courseGrid border rounded-3"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${openDays.length}, 1fr)`,
          }}
        >
          {openDays.map((day) => (
            <div>
              <p>{day}</p>
            </div>
          ))}

          {[...Array(openDays.length * 8)].map((_, i) => (
            <button className="btn m-0 mb-1 p-1 rounded-0">
              {/* <div className="card d-block"> */}
              <div className="card p-0 d-block btn btn-outline-primary btn-disabled btn-sm btn-smm bg-primary-subtle border border-primary-subtle rounded-1 ">
                <small
                  className="p-0 card-body stretched-link"
                  style={{
                    zIndex: 100,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    console.log("clicked btn" + `${i}`);
                  }}
                >
                  基礎物理化学（クラスA）基礎物理化学（クラスA）基礎物理化学（クラスA）基礎物理化学（クラスA）
                </small>
              </div>

              {/* </div> */}
              {/* <button
                className="btn btn-outline-primary btn-sm btn-smm"
                onClick={() => {
                  console.log("clicked btn" + `${i}`);
                }}
                style={{ zIndex: 10000 }}
              >
                {"+"}
              </button> */}
            </button>
          ))}
        </div>
      </aside>
    );
  }
}
