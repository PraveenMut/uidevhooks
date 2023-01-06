import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

/*
  Instructions:
    Finish implementing the `useWait` custom Hook.
    `useWait` should return a boolean that changes from
    `false` to `true` after `delay` seconds.
*/

const useWait = (delay) => {
  const [displayed, useDisplayed] = React.useState(false)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      useDisplayed(true)
    }, delay)
  
    return () => window.clearTimeout(timer)
  }, [delay])

  return displayed
}

const Wait = ({ delay = 1000, placeholder, ui }) => {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

const App = () => {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

