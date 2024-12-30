import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSkeletonContext } from "../../context/SkeletonContext";

const ReviewsSkeleton = () => {
   const { baseColor, highlightColor } = useSkeletonContext();

   return (
      <main className="max-w-screen-xl mx-auto">
         <div className="px-2 py-4 flex items-center justify-between">
            <Skeleton
               baseColor={baseColor}
               highlightColor={highlightColor}
               width={200}
               height={30}
            />
            <Skeleton
               baseColor={baseColor}
               highlightColor={highlightColor}
               width={200}
               height={30}
            />
         </div>
         {Array(3)
            .fill(0)
            .map((_, idx) => {
               return (
                  <div className="m-2 p-2 mt-6 " key={idx}>
                     <div className="flex space-x-3">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-2xl">
                           <Skeleton
                              baseColor={baseColor}
                              highlightColor={highlightColor}
                              width={80}
                              height={80}
                              circle
                           />
                        </div>
                        <div className="w-4/5">
                           <h1 className="text-xl">
                              <Skeleton
                                 baseColor={baseColor}
                                 highlightColor={highlightColor}
                                 width={300}
                              />
                           </h1>

                           <div className="flex items-center gap-x-2">
                              <Skeleton
                                 baseColor={baseColor}
                                 highlightColor={highlightColor}
                                 width={300}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
      </main>
   );
};

export default ReviewsSkeleton;
