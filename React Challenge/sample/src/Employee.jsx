import React from "react";

function Employee(props) {
  return (
    <div>
      <h1>
        name:{props.name},Age:{props.age}
      </h1>
    </div>
  );
}

export default Employee;
