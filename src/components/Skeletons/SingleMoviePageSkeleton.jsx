import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSkeletonContext } from "../../context/SkeletonContext";

const SingleMoviePageSkeleton = () => {
   const { baseColor, highlightColor } = useSkeletonContext();

   return (
      <main className="max-w-screen-xl mx-auto p-2">
         <div className="w-full h-[200px] md:h-[500px]">
            <Skeleton
               baseColor={baseColor}
               highlightColor={highlightColor}
               className="w-full h-full "
            />
         </div>

         <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h1 className="text-2xl md:text-4xl font-semibold text-primary py-3 mt-4">
               {" "}
               <Skeleton
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  width={300}
                  height={30}
               />
            </h1>
            <div className=" md:items-end">
               <Skeleton
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  width={100}
                  height={20}
               />
            </div>
         </div>
         <div className="spaxe-y-3">
            {Array(3)
               .fill(0)
               .map((_, idx) => {
                  return (
                     <Skeleton
                        key={idx}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        width={500}
                        height={20}
                        className="my-3"
                     />
                  );
               })}
         </div>

         <div className="flex gap-20">
            {Array(3)
               .fill(0)
               .map((_, idx) => {
                  return (
                     <Skeleton
                        key={idx}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        width={100}
                        height={100}
                        circle
                     />
                  );
               })}
         </div>
      </main>
   );
};

export default SingleMoviePageSkeleton;
