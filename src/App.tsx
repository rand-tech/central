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

import Accordion from "react-bootstrap/Accordion";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import VirtualList from "react-tiny-virtual-list";
import Fuse from "fuse.js";

import type { Syllabus, General, Description } from "./Syllabus";
// import SyllabusAccordion from './components/Syllabus';
import CourseView from "./components/CourseView";

export default function App() {
  return (
    <div>
      {/* FIXME: add top menu? */}
      {/* <h1 className='h1'>シラバスもどき</h1>
      <p>
      </p> */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<CourseGrid />}>
            {/*FIXME: This routes to /course/:id when the user clicks on a card. This is not a feature (lol) */}
            <Route path="course/:id" element={<CourseView />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

interface CategoryLinkProps extends Omit<LinkProps, "to"> {
  category: string;
}

interface DepartmentLinkProps extends Omit<LinkProps, "to"> {
  department: string;
}

function CategoryLink({
  category: category,
  children,
  ...props
}: CategoryLinkProps) {
  let [searchParams] = useSearchParams();
  let isActive = searchParams.get("category") === category;

  return (
    <Link
      to={`/?category=${category}`}
      {...props}
      style={{
        ...props.style,
        color: isActive ? "red" : "black",
      }}
    >
      {children}
    </Link>
  );
}

function DepartmentLink({
  department,
  children,
  ...props
}: DepartmentLinkProps) {
  let [searchParams] = useSearchParams();
  let isActive = searchParams.get("department") === department;

  return (
    <Link
      to={`/?department=${department}`}
      {...props}
      style={{
        ...props.style,
        color: isActive ? "red" : "black",
      }}
    >
      {children}
    </Link>
  );
}

function Layout() {
  return (
    <div id="layout-main">
      {/* FIXME: Add sidebar */}
      {/* <nav id='sidebar'>
        <h1>A random Syllabus Viewer</h1>
        <div>
          <h3>Filter by category</h3>
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <CategoryLink category={category}>{category}</CategoryLink>
              </li>
            ))}
          </ul>
        </div>
      </nav> */}

      <div id="detail">
        <Outlet />
      </div>
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
      <>
        <div className="card hover">
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
      </>
    );
  }
}

function CourseGrid() {
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
    threshold: 0.4,
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
              id="floatingSearch"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <p>Showing {newResult.length} results</p>
          <div className="border">
            <VirtualList
              height={900}
              itemCount={newResult.length}
              itemSize={100}
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
        </div>
        <div className="col">
          <div className="sticky-top">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
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
