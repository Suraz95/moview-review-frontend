import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import RatingStar from "./RatingStar";

const MovieList = ({ label, movies = [] }) => {
   if (!movies.length) return null;
   return (
      <>
         <h1 className="text-xl font-semibold mt-8 mb-2 px-2">{label}</h1>
         <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
            {movies?.map((movie, idx) => {
               return <ListItem key={movie._id} movie={movie} />;
            })}
         </section>
      </>
   );
};

const ListItem = ({ movie }) => {
   const trimTitle = (title) => {
      if (title.length < 20) return title;
      return title.slice(0, 20) + "..";
   };
   return (
      <Link to={`/movie/${movie._id}`}>
         <img
            src={movie.poster}
            alt={movie.title}
            className="aspect-video object-cover rounded-md"
         />

         <h1 className="font-semibold">{trimTitle(movie.title)}</h1>
         <RatingStar rating={movie.reviews?.ratingAvg} />
      </Link>
   );
};

export default MovieList;
