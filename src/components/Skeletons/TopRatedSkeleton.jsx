import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSkeletonContext } from "../../context/SkeletonContext";

const TopRatedSkeleton = () => {
   const { baseColor, highlightColor } = useSkeletonContext();
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 mt-8 mb-2">
         {Array(5)
            .fill(0)
            .map((_, idx) => {
               return (
                  <div key={idx}>
                     <Skeleton
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        className="aspect-video object-cover rounded-md"
                     />
                     <Skeleton baseColor={baseColor} highlightColor={highlightColor} />
                     <Skeleton
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        width={40}
                        height={20}
                     />
                  </div>
               );
            })}
      </div>
   );
};

export default TopRatedSkeleton;
