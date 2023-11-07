import React from 'react';

const HomePage = (props) => {
  return (
    <div>
      <h1>Summary</h1>
      <h4>Classes:{props.classesNumber}</h4>
      <h4>Students:{props.studentsNumber}</h4>
    </div>
  );
}

export default HomePage;
