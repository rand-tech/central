import * as React from "react";
import { useParams } from "react-router-dom";

import {
  filterByCategory as filterByCategory,
  getCourseById,
} from "./../Syllabus";

import type { Syllabus, General, Description } from "./../Syllabus";
import Accordion from "react-bootstrap/Accordion";

import "./../App.css";
import "../scss/styles.scss";

import "./courselist.css";
import "./courseview.css"
import NoMatch from "./../ui/NoMatch";

function CourseView() {
  // return images
  let { id } = useParams<"id">();

  if (!id) {
    return <NoMatch />;
  }

  let syllabus = getCourseById(id);

  if (!syllabus) {
    return <NoMatch />;
  }

  let teacher_info: string[] = [
    syllabus.general.lecturer,
    syllabus.general.email,
    syllabus.general.office,
  ];

  let description = Object.fromEntries(
    Object.entries(syllabus.general).filter(
      ([key, value]) => !key.startsWith("course_")
    )
  );
  const general: General = syllabus.general;
  return (
    <section
      className="card border "
      key={id}
      style={{
        maxHeight: "100vh",
      }}
    >
      <div className="card-header">
        <h4 className="card-title">{syllabus.general.course_title_japanese}</h4>
        <h5 className="card-subtitle mb-2 text-muted">
          {syllabus.general.course_title_english}
        </h5>
      </div>

      <div
        className="barm"
        style={{
          // height: "90vh",
          position: "relative",
          whiteSpace: "pre-wrap",
        }}
      >
        <div>
          <ul className="list-inline">
            {teacher_info.map((items, index) => {
              if (!items) {
                return null;
              }
              return (
                <li className="list-inline-item">
                  <span className="badge rounded-0 text-bg-secondary">
                    {" "}
                    {items}
                  </span>
                </li>
              );
            })}
          </ul>
          <ul className="list-inline">
            {Object.keys(description).map((items: string, index) => {
              return (
                <>
                  {general[items] && (
                    <li className="list-inline-item">
                      <code>{items}</code>
                      <span className="badge rounded-0 text-bg-secondary">
                        {" "}
                        {general[items]}
                      </span>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
        <dl className="row">
          <dt className="col-sm-3">Course grade</dt>
          <dd className="col-sm-9">{syllabus.general.grade}</dd>
          <dt className="col-sm-3">Course Code</dt>
          <dd className="col-sm-9">{syllabus.general.course_code}</dd>
          <dt className="col-sm-3">Semester</dt>
          <dd className="col-sm-9">{syllabus.general.semester}</dd>
          <dt className="col-sm-3">Credit</dt>
          <dd className="col-sm-9">{syllabus.general.credit}</dd>
        </dl>
        <Accordion
          defaultActiveKey={["3", "4", "5", "6", "7", "8", "9", "10"]}
          alwaysOpen
          flush
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Course Goals</Accordion.Header>
            <Accordion.Body>{syllabus.description.course_goals}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Course Outline</Accordion.Header>
            <Accordion.Body>
              {syllabus.description.course_outline}
            </Accordion.Body>
          </Accordion.Item>

          {syllabus.description.remote_details && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Remote Details</Accordion.Header>
              <Accordion.Body>
                {syllabus.description.remote_details}
              </Accordion.Body>
            </Accordion.Item>
          )}

          <Accordion.Item eventKey="3">
            <Accordion.Header>Others</Accordion.Header>
            <Accordion.Body>{syllabus.description.others}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Evaluation Standards</Accordion.Header>

            <Accordion.Body>
              {syllabus.description.evaluation_standards}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>Course Prequistes</Accordion.Header>
            <Accordion.Body>
              {syllabus.description.prerequisites}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>Course Material</Accordion.Header>
            <Accordion.Body>
              {syllabus.description.course_materials}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Course Work</Accordion.Header>
            <Accordion.Body>
              {syllabus.description.extra_class_work}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>Office hours</Accordion.Header>
            <Accordion.Body>{syllabus.description.office_hours}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>Messages</Accordion.Header>
            <Accordion.Body>{syllabus.description.messages}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="10">
            <Accordion.Header>Keywords</Accordion.Header>
            <Accordion.Body>{syllabus.description.keywords}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* FIXME: choose accordion or normal text */}
        {/* <div>
                    <h3>Course Goals</h3>
                    <p className="overflow-auto">{syllabus.description.course_goals}</p>

                    <h3>Course Outline</h3>
                    <p className="overflow-auto">{syllabus.description.course_outline}</p>

                    <h3>Remote Details </h3>
                    <p className="overflow-auto">{syllabus.description.remote_details}</p>

                    <h3>Others</h3>
                    <p className="overflow-auto">{syllabus.description.others}</p>

                    <h3>Evaluation Standards</h3>
                    <p className="overflow-auto">{syllabus.description.evaluation_standards}</p>

                    <h3>Course Prequistes</h3>
                    <p className="overflow-auto">{syllabus.description.prerequisites}</p>

                    <h3>Course Material</h3>
                    <p className="overflow-auto">{syllabus.description.course_materials}</p>

                    <h3>Course Work</h3>
                    <p className="overflow-auto">{syllabus.description.extra_class_work}</p>

                    <h3>Office hours</h3>
                    <p className="overflow-auto">{syllabus.description.office_hours}</p>

                    <h3>Messages</h3>
                    <p className="overflow-auto">{syllabus.description.messages}</p>

                    <h3>Keywords</h3>
                    <p className="overflow-auto">{syllabus.description.keywords}</p>
                </div> */}
      </div>
    </section>
  );
}

export default CourseView;
