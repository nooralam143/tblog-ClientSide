import RecentPost from "../Pages/RecentPost";
import Review from "../Pages/Review";
import { Carousel } from 'flowbite-react';
import Slidder from "../Pages/Slidder";
import PopularPost from "../Pages/PopularPost";

const Home = () => {

    return (
        <div>
            <Slidder></Slidder>
            <RecentPost></RecentPost>
            <div>
            <h1 className="font-bold">Popular Post</h1>
            <PopularPost></PopularPost>
            </div>
            <div>
                
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
               
                    <Carousel>
                        <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                            <Review></Review>
                        </div>
                        <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                            <Review></Review>
                        </div>
                        <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                            <Review></Review>
                        </div>
                    </Carousel>
                </div>

            </div>
            
        </div>
    );
};

export default Home;