import { Button, Card } from "flowbite-react";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";


const CommentComponent = ({id}) => {
  const postID = id;
  const { user } = useContext(AuthContext);
  const commentOWner =user.displayName;
  const commentOWnerPhoto =user.photoURL;
  const handalAddComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    console.log(postID, commentOWner, commentOWnerPhoto, comment);
  }
    return (
      <Card className="max-w-7xl mx-auto mt-10 mb-10">
<form className="flex flex-col gap-4" onSubmit={handalAddComment}>
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="4"
          name="comment"
          placeholder="Write your comment here..."
        ></textarea>
        <Button type="submit">Submit Comment</Button>
        </form>
      </Card>
      
    );
  };
export default CommentComponent;