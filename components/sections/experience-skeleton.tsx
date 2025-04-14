import { memo } from "react"

interface ExperienceSkeletonProps {
  count: number
  isMobile: boolean
}

export const ExperienceSkeleton = memo(function ExperienceSkeleton({ 
  count, 
  isMobile 
}: ExperienceSkeletonProps) {
  return (
    <div className="relative">
      {/* Timeline line skeleton */}
      <div 
        className={`
          absolute top-0 bottom-0 w-px 
          ${isMobile ? 'left-4' : 'left-1/2'}
          bg-gray-800
        `} 
      />

      <div className="space-y-12 md:space-y-24">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`
              relative flex items-start 
              ${isMobile 
                ? 'pl-12' 
                : `${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`
              }
            `}
          >
            {/* Timeline node skeleton */}
            <div 
              className={`
                absolute w-4 h-4 rounded-full bg-gray-700 animate-pulse
                ${isMobile 
                  ? 'left-4 top-0' 
                  : 'left-1/2 top-6'
                } 
                -translate-x-1/2 z-10
              `} 
            />

            {/* Card skeleton */}
            <div className={isMobile ? 'w-full' : 'w-[calc(50%-2rem)]'}>
              <div className="bg-gray-900/80 p-6 rounded-lg border border-gray-800">
                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse mb-4" />
                
                {/* Company info skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-gray-700 animate-pulse" />
                  <div className="w-32 h-4 bg-gray-700 rounded animate-pulse" />
                </div>
                
                {/* Date info skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full bg-gray-700 animate-pulse" />
                  <div className="w-16 h-4 bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Highlights skeleton */}
                <div className="space-y-2 mb-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1.5 min-w-1 min-h-1 w-1 h-1 rounded-full bg-gray-700 shrink-0" />
                      <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                    </div>
                  ))}
                </div>

                {/* Skills skeleton */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-6 bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})