import { useRef, useEffect, useState } from 'react';

export default function Clicker({ increment, keyName, color }) {
  // const countState = useState(0);
  // const count = countState[0];
  // const setCount = countState[1];
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );

  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.style.backgroundColor = 'papayawhip';
    buttonRef.current.style.color = 'salmon';

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    // console.log('Button has been clicked');
    setCount(count + 1);
    // setCount((value) => value + 1);
    increment();
  };

  return (
    <div>
      <div style={{ color }}>Clicks count: {count}</div>
      <button ref={buttonRef} onClick={buttonClick}>
        Click me
      </button>
    </div>
  );
}
