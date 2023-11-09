
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { serverURL } from "../config";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";



const Wishlist = () => {
    const [blogPost, setblogPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  

  useEffect(() => {
    // Make an HTTP request to fetch blog data from the API
    fetch(`${serverURL}/wishlist/user?userEmail=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setblogPost(data); // Set the fetched blog data in the state
        setIsLoading(false); // Data loading is complete
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Handle errors and set isLoading to false
      });
  }, [user.email]);

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverURL}/wishlist/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your wishlist post has been deleted.',
                'success'
              )
              const remaining = blogPost.filter(post => post._id !== _id);
              setblogPost(remaining);
            }
          })
      }
    })
  }

  return (
    <div>
      <div className="flex">

        {/* Main content */}
        <div className="w-10/12 bg-white p-4 mx-auto shadow-md rounded-lg">
          {isLoading ? (
            <div className="text-center">
            <span className="loading loading-spinner text-center loading-xs"></span>
        </div>
          ) : blogPost.length === 0 ? (
            <p className="text-center font-extrabold text-3xl flex justify-center items-center h-full">Your Wishlist is empty.</p>
          ) : (
            <div className="flex flex-col gap-4">
  {blogPost.map((post) => (
    <div key={post?._id} className="post-card border">
      <div className="bg-white rounded-lg shadow-md flex flex-row overflow-hidden">
        <div className="post-image-container">
          <img src={post?.postImage} alt={post?.postTitle} className="w-full md:w-2/2 md:h-450 lg:w-2/3 lg:h-600 h-64  object-cover" />
        </div>
        <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
          <div>
            <h2 className="text-sm md:text-xl lg:text-2xl font-semibold mb-2">{post?.postTitle}</h2>
            <p className="font-bold text-blue-700">{post?.postCategory}</p>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.SortDescription }}></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
       <div>
       <Link to={`/post/${post?._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button></Link>
       </div>
        <div>
        <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleDelete(post?._id)}>Remove</button>
        </div>
        </div>
      </div>
    </div>
  ))}
</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Wishlist;