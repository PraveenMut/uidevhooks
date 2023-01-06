import React from "react"
import ReactDOM from "react-dom/client"

import "./styles.css"

/*
  Instructions:
    You're given a `useWindowDimensions` custom Hook. Your
    job is to finish implementing it. It should return
    an object with a `width` property that represents the current
    width of the window and a `height` property which represents
    the current height.

    To get those values, you can use teh `window.addEventListener`
    API.https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
*/

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  React.useEffect(() => {
    const resizeListener = window.addEventListener("resize", (event) => {
      setWindowDimensions({
        width: event.target.innerWidth,
        height: event.target.innerHeight
      })
    });
    return () => window.removeEventListener("resize", resizeListener)
  }, [])
  return windowDimensions
}


function App() {
  const { width, height } = useWindowDimensions()

  return (
    <div className="App">
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  )
}

const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
