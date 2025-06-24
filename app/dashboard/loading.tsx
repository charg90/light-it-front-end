import { Card } from "../../components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded-lg w-80 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
          <div className="h-10 bg-purple-200 rounded-lg w-32 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} variant="white" className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Patient Name Skeleton */}
                <div className="flex-1 min-w-0">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Expand Button Skeleton */}
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
