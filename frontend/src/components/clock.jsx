import { styled } from "styled-components";
import React, { useState, useEffect } from "react";

const P = styled.p`
  font-family: "Quantico", sans-serif;
  color: white;
  font-size: xx-large;
  display: flex;
  justify-content: center;
`;

export default function Clock() {
  const [count, setCount] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <P>{count}</P>;
}
