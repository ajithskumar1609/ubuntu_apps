import React, { useState, useEffect } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Mounting.......");
    console.log("Updating....." + count);
    return () => {
      console.log("Clean UP" + count);
    };
  }, [count]);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <h1>This is the Component:{count}</h1>
    </div>
  );
}

export default Counter;
