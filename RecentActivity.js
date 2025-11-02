import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, BookOpen, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function RecentActivity({
  listings = [],
  posts = [],
  isLoading = false,
}) {
  const getActivityIcon = (type) => {
    switch (type) {
      case "listing":
        return BookOpen;
      case "post":
        return HelpCircle;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "listing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "post":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const activities = [
    ...listings.map((listing) => ({
      ...listing,
      type: "listing",
      time: listing.created_date || new Date().toISOString(),
    })),
    ...posts.map((post) => ({
      ...post,
      type: "post",
      time: post.created_date || new Date().toISOString(),
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 6);

  return (
    <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <Badge variant="outline" className="text-indigo-600 border-indigo-200">
            Live Updates
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={`${activity.type}-${activity.id || index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {activity.title || "Untitled Activity"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description ||
                        activity.content?.slice(0, 100) ||
                        "No description available"}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary" className={getActivityColor(activity.type)}>
                        {activity.type === "listing" ? activity.category : activity.subject}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(activity.time || Date.now()), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-1">
              Start exploring to see updates here
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Link to="/marketplace">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              Browse All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/forum">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              View Forum <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}