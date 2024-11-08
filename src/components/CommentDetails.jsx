import { useLoaderData } from "react-router-dom";

function CommentDetails() {
  const data = useLoaderData();

  return (
    data && (
      <div>
        <h1 className="color-bright mb-30">{data.name}</h1>
        <h3 className="mb-10">{data.email}</h3>
        <p>{data.body}</p>
      </div>
    )
  );
}

export async function loader({ params }) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/comments/" + params.commentId
  );
  const data = await res.json();
  return data;
}

export default CommentDetails;