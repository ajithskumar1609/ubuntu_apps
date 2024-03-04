import React, { useState, useEffect } from "react";

function TimeOut() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);

  return (
    <div>
      Count:{count}
      <button onClick={() => setCount(count + 1)}>+</button>
      calculation:{calculation}
    </div>
  );
}

export default TimeOut;
