import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useSearchParams,
  useParams,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import {
  categories,
  departments,
  filterByCategory as filterByCategory,
  filterByDepartment,
  getCourseById,
  SYLLABUSES,
} from "./Syllabus";

import "./App.css";

import type { Syllabus, General, Description } from "./Syllabus";
// import SyllabusAccordion from './components/Syllabus';
import CourseView from "./components/CourseView";
import ColumnView from "./ui/ColumnView";

export default function App() {
  return (
    <>
      {/* FIXME: add top menu? */}
      {/* <h1 className='h1'>シラバスもどき</h1>
      <p>
      </p> */}

      <Routes >
        <Route path=""  element={<Layout />}>
          <Route path="" element={<ColumnView />}>
            {/*FIXME: This routes to /course/:id when the user clicks on a card. This is not a feature (lol) */}
            <Route path="course/:id" element={<CourseView />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div id="layout-main">
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
