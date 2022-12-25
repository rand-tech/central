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
function CourseNav() {
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

  // if key '/' or 's' is pressed, focus on search bar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" || event.key === "s" || event.key === "d") {
        // prevent first '/' from being typed
        // if not focuesed on input

        const input = document.querySelector("input");

        if (input) {
          input.focus();
        }
        // check if input is not being focused
        if (!(document.activeElement == input)) {
          event.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
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
      <div className="mb-3">
          <p>Showing {newResult.length} results</p>
      </div>
      {CourseLists(newResult)}
    </>
  );
}

export default CourseNav;
function CourseLists(newResult: Fuse.FuseResult<Syllabus>[]) {
  return (
    <div className="border">
      <VirtualList
        height={1700}
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
        <div className="card-body text-truncate">
          <h6 className="card-title text-truncate">
            <NavLink
              // className="stretched-link"
              className={({ isActive }) =>
                isActive ? "active stretched-link" : "stretched-link"
              }
              to={`course/${this.props.course.id}`}
            ></NavLink>
            {name}
          </h6>
          <ul className="list-inline text-break">
            {show_info.map((items, index) => {
              return (
                <>
                  {items && (
                    <li className="list-inline-item text-break">
                      {" "}
                      <small className="rounded-0 text-bg-secondary font-monospace">
                        {items}
                      </small>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
