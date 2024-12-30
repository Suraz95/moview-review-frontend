import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSkeletonContext } from "../../context/SkeletonContext";

const HeroSliderSkeleton = () => {
   const { baseColor, highlightColor } = useSkeletonContext();

   return (
      <main className="w-full flex flex-col md:flex-row mt-2">
         <section className="md:w-4/5 aspect-video relative overflow-hidden rounded-l-lg">
            <Skeleton
               baseColor={baseColor}
               highlightColor={highlightColor}
               className="w-full h-full "
            />
         </section>
         <section className="md:w-1/5 flex flex-col rounded-r-lg bg-base-200">
            <h1 className="font-semibold text-md  mb-1 md:text-2xl px-3 md:pb-3">
               <Skeleton baseColor={baseColor} highlightColor={highlightColor} />
            </h1>
            <div className="md:space-y-3 px-3 flex items-baseline space-x-2 md:space-x-0 overflow-hidden md:block">
               <Skeleton
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  className="object-cover h-20 md:h-40 aspect-video rounded-md"
               />
               <Skeleton
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  className="object-cover h-20 md:h-40 aspect-video rounded-md"
               />
               <Skeleton
                  baseColor={baseColor}
                  highlightColor={highlightColor}
                  className="object-cover h-20 md:h-40 aspect-video rounded-md"
               />
            </div>
         </section>
      </main>
   );
};

export default HeroSliderSkeleton;
