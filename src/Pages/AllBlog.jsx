import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PostCard from './PostCard';
import Skeleton from 'react-loading-skeleton';
import { Button, Spinner } from 'flowbite-react';
import { serverURL } from '../config';


const AllBlog = () => {
  
  const fetchData = async () => {
    const response = await axios.get(`${serverURL}/post`); // Replace with your API endpoint
  
    return response.data;
  };
    
  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
    config: {
      refetchInterval: 5000,
      cacheTime: 60000,
    },
  });

  if (isLoading) {
    return (
      <div className='max-w-4xl mx-auto'>
        <h1>Posts</h1>
        <ul>
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <div className="max-w-3xl mx-auto my-2">
                <div className="flex justify-center flex-row gap-3">
                  <Button>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </Button>
                </div>
                <Skeleton count={5} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        <div>Total Post: {data.length}</div>
        <PostCard data={data}></PostCard>
      </ul>
    </div>
  );
};

export default AllBlog;
