import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error(res.message);
  }
  return await res.json();
};

const Post = ({ postId }) => {
  const [state, setState] = React.useState({
    loading: true,
    response: {},
    error: null,
  });

  React.useEffect(() => {
    setState({
      ...state,
      loading: true,
    });

    const processResponse = async () => {
      try {
        const response = await fetchPost(postId);
        setState({
          ...state,
          loading: false,
          response: response,
        });
      } catch (e) {
        console.log("Error fetching error", e);
        setState({
          ...state,
          loading: false,
          error: e.message,
        });
      }
    };
    processResponse();
  }, [postId]);

  if (state.loading) {
    return <div>Loading Post...</div>;
  }

  if (state.error) {
    return (
      <div>
        <h2>An error has occured when fetching the post.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <h1>{state.response.title}</h1>
      <p>{state.response.body}</p>
    </>
  );
};

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [end, setEnd] = React.useState(false);

  const incrementIndex = (i) => {
    if (i >= postIds.length - 1) {
      setEnd(true);
    }
    setIndex((i) => i + 1);
  };

  if (end) {
    return (
      <div className="App">
        <h2>No more posts to show.</h2>
      </div>
    );
  }
  return (
    <div className="App">
      <>
        <Post postId={postIds[index]} />
        <button onClick={() => incrementIndex(index)}>Next Post</button>
      </>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
