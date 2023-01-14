import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

/*
  Instructions:
    Implement the `useFetch` function.
*/


const useFetch = (url) => {

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  })

  const fetchPost = async (url) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      setState({
        ...state,
        loading: false,
        error: res.message
      })
      throw new Error(res.message);
    }

    setState({
      ...state,
      loading: false,
      data: res,
    })
  }

  useEffect(() => {
    fetchPost(url)
  }, [url])

  return state
}

const postIds = [1,2,3,4,5,6,7,8]

const App = () => {
  const [index, setIndex] = React.useState(0)

  const { loading, data: post, error }= useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )

  const incrementIndex = () => {
    setIndex((i) =>
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {index === postIds.length - 1
        ? <p>No more posts</p>
        : <button onClick={incrementIndex}>
            Next Post
          </button>}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

