import * as React from "react";
import { Outlet, Link, useSearchParams } from "react-router-dom";

import {
  categories,
  departments,
  filterByCategory as filterByCategory,
  filterByDepartment,
  getCourseById,
  SYLLABUSES,
} from "./../Syllabus";

import "./courselist.css";

import VirtualList from "react-tiny-virtual-list";
import Fuse from "fuse.js";

import type { Syllabus, General, Description } from "./../Syllabus";
function CourseList() {
  // useState of search
  const [search, setSearch] = React.useState("");
  let [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  let department = searchParams.get("department");

  const courses = React.useMemo(() => {
    // FIXME: this sucks really bad
    // please fix me
    if (department) return filterByDepartment(department);
    else if (category) {
      return filterByCategory(category);
    }
    return SYLLABUSES;
  }, [category]);

  const options = {
    shouldSort: true,
    threshold: 0.2,
    tokenize: true,

    keys: [
      "course.department",
      "course.category",
      "course.semester",
      "general.course_code",
      "general.course_title_japanese",
      "general.course_title_english",
      "id",
    ],
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
  };
  const myIndex = Fuse.createIndex(options.keys, courses);
  const fuse = new Fuse(courses, options, myIndex);
  const newResult = fuse.search<Syllabus>(search);

  return (
    <main className="sticky-top">
      <div id="main-view" className="row mx-auto">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          className="col col-4"
        >
          <h2>Courses</h2>
          <div className="mb-3">
            <input
              autoFocus
              type="text"
              className="form-control"
              placeholder="e$"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <p>Showing {newResult.length} results</p>
          {newFunction(newResult)}
        </div>
              <div className="col"
                  style={{
                //   maxHeight: "100vh",
              }}>
          <div className="sticky-top">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseList;
function newFunction(newResult: Fuse.FuseResult<Syllabus>[]) {
  return (
    <div className="border">
      <VirtualList
        height={500}
        itemCount={newResult.length}
        itemSize={80}
        className="virt-list"
        renderItem={({ index, style }) => {
          const course = newResult[index].item;
          let name = `${course.general.course_title_japanese}`;
          return (
            <div key={course.id} style={style}>
              <CourseLink key={course.id} course={course} name={name} />
            </div>
          );
        }}
      />
    </div>
  );
}

class CourseLink extends React.Component<{ course: Syllabus; name: string }> {
  render() {
    const course = this.props.course.general;
    const show_info = [course.department, course.category, course.course_code];
    // use name from params
    // TODO: switch the name for i18n (En/Ja)
    const name = this.props.name;

    return (
        <div className="card course-hover">
          <div className="card-body  text-truncate">
            <h6 className="card-title">
              <Link
                className="stretched-link"
                to={`course/${this.props.course.id}`}
              ></Link>
              {name}
            </h6>
            <h6 className="visually-hidden">{name}</h6>
            <ul className="list-inline">
              {show_info.map((items, index) => {
                return (
                  <li className="list-inline-item">
                    <span className="badge rounded-pill text-bg-secondary">
                      {" "}
                      {items}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
    );
  }
}
