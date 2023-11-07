import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Button, Card, Label, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from "../providers/AuthProvider";

const AddBlog = () => {
    const [longDescription, setLongDescription] = useState('');
    const [shortDescription, setshortDescription] = useState('');
    const { user } = useContext(AuthContext);
    const author = user.displayName;
    const authorEmail = user.email;

    const handleLongDescriptionChange = (value) => {
        setLongDescription(value);
    };

    const handleShortDescriptionChange = (value) => {
        setshortDescription(value);
    };

    const handalAddBlog = (e) => {
        e.preventDefault();
        const form = e.target;
        const postTitle = form.postTitle;
        const postImage = form.postImage.value;
        const postCategory = form.postCategory.value;
        const SortDescription = shortDescription;
        const LongDescription = longDescription;
        const currentDate = new Date(); // Get current date and time
        const options = { timeZone: 'Asia/Dhaka', timeZoneName: 'short' };
        const publishDate = currentDate.toLocaleString('en-US', options); // Convert to Dhaka timezone
        const blogPost = { author, authorEmail, postTitle, postImage, postCategory, SortDescription, LongDescription, publishDate };
        console.log('blogPost Data:', blogPost);
    }

    return (
        <Card className="max-w-4xl mx-auto mt-10 mb-10">
            <form className="flex flex-col gap-4" onSubmit={handalAddBlog}>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="title" value="Post Title" />
                    </div>
                    <TextInput id="postTitle" name="postTitle" type="text" placeholder="Add Title" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="image" value="image URL" />
                    </div>
                    <TextInput id="postImage" name="postImage" type="text" placeholder="Image URL" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="postCategory" value="category" />
                        <select
                            id="postCategory"
                            name="postCategory"
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Sony">Sony</option>
                            <option value="Google">Google</option>
                            <option value="Intel">Intel</option>
                            <option value="OPPO">OPPO</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="shortdescription" value="Short Description" />
                    </div>
                    <div className='bg-gray-100 border-none outline-none'>
                        <ReactQuill value={shortDescription} onChange={handleShortDescriptionChange} style={{ height: "200px", width: "100%", }} />
                    </div>
                </div>

                <div>
                    <div className="mb-2 block">
                        <div className=" ">
                            <Label className="text-lg " htmlFor="LongDescription" value="Long Description:" />
                        </div>

                    </div>
                    <div>
                        <div className='bg-gray-100'>
                            <ReactQuill value={longDescription} onChange={handleLongDescriptionChange} style={{ height: "200px", width: "100%" }} />
                        </div>
                    </div>
                </div>


                <Button type="submit">Public Post</Button>
            </form>
        </Card>
    );
};

export default AddBlog;