import CourseNav from "../components/CourseList";

import * as React from "react";
import { Outlet } from "react-router-dom";
import "../components/courselist.css";
import CourseGrid from "../components/CourseGrid";

export default function ColumnView() {
  return (
    <main className="sticky-top">
      <div id="main-view" className="row mx-auto">
        <aside className="col col-3">
          <div className="sticky-top ">
            <CourseGrid />
          </div>
        </aside>

        <div className="col col-3">
          <CourseNav />
        </div>
        <div className="col col-6">
          <div className="sticky-top">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
