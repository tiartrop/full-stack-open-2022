import React from "react";

const Header = ({ header }) => <h2>{header}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((value) => (
    <Part key={value.id} name={value.name} exercises={value.exercises} />
  ));

const Total = ({ parts }) => (
  <b>
    Total of {parts.reduce((total, num) => total + num.exercises, 0)} exercises
  </b>
);

const Course = ({ course }) => (
  <>
    <Header header={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </>
);

export default Course;
