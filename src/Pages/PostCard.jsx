import { Card } from 'flowbite-react';
import { serverURL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PostCard = ({ data }) => {
  const { user } = useContext(AuthContext);
const {email:userEmail} = user

  if (data.length === 0) {
    return <div>No posts available</div>;
  }
  const handleclick = (post) => {
    // eslint-disable-next-line react/prop-types, no-undef
    const {author, authorEmail, postTitle, postImage, SortDescription, LongDescription, postCategory, PostTag, publishDate} = post;
    const myWishlist = {userEmail, author, authorEmail, postTitle, postImage, SortDescription, LongDescription, postCategory, PostTag, publishDate };
    console.log(myWishlist);
   
    fetch(`${serverURL}/wishlist`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(myWishlist),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        // eslint-disable-next-line react/prop-types
        if (data.insertedId) {
          toast.success('post added in your wishlist', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
 

console.log(data);
    return (
      <div className='max-w-4xl mx-auto'>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post._id}>
            <Card className="max-w-3xl mx-auto my-2" imgAlt={post.postTitle} imgSrc={post.postImage}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.postTitle}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: post.SortDescription }}></div>
              </p>
              <div  className='text-center'>
                <div>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleclick(post)}>
                Wishlist</button>
                </div>
                <div>
                <Link to={`/post/${post?._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button></Link>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <div>
                  <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </div>
    </div>
    
  );
};
export default PostCard;