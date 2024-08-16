import { useEffect, useRef, useState } from "react";
import { AddPost, getAllPosts, deletePostById } from "../../../helpers/api";
import { IPost } from "../../../helpers/types";
import { MDBCardImage } from "mdb-react-ui-kit";
import { Base, def } from "../../../helpers/default";

export const Photos = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const photo = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response.payload as unknown as IPost[]);
    });
  }, []);

  const handlePostAdd = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("photo", file);
      form.append("content", text);
      AddPost(form).then((response) => {
        setPosts([...posts, response.payload as unknown as IPost]);
        setText("");
        if (photo.current) {
          photo.current.value = "";
        }
      });
    }
  };

  const handlePostDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostById(id).then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      });
    }
  };

  return (
    <>
      <h2>Photos</h2>
      <h1>Add Photo</h1>
      <input type="file" ref={photo} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button onClick={handlePostAdd}>Upload</button>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              {post.picture ? (
                <MDBCardImage
                  src={post.picture ? Base + post.picture : def}
                  alt="Generic placeholder image"
                  className="mt-4 mb-2 img-thumbnail"
                  fluid
                  style={{ width: "150px", zIndex: "1" }}
                />
              ) : (
                <p>No image available</p>
              )}
              <p>{post.title}</p>
              <button onClick={() => handlePostDelete(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
