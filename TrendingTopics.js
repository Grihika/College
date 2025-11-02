import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function TrendingTopics({ posts, isLoading }) {
  const trendingPosts = posts.slice(0, 5);

  const getPostTypeColor = (type) => {
    const colors = {
      question: 'bg-blue-100 text-blue-700 border-blue-200',
      discussion: 'bg-green-100 text-green-700 border-green-200',
      announcement: 'bg-purple-100 text-purple-700 border-purple-200',
      study_group: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[type] || colors.question;
  };

  return (
    <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : trendingPosts.length > 0 ? (
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <h4 className="font-medium text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  {post.title}
                </h4>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="secondary" 
                    className={getPostTypeColor(post.type)}
                  >
                    {post.type?.replace('_', ' ')}
                  </Badge>
                  {post.subject && (
                    <Badge variant="outline" className="text-xs">
                      {post.subject}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      0 replies
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {post.upvotes || 0}
                    </span>
                  </div>
                  <span>{formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No trending topics yet</p>
            <p className="text-xs text-gray-400 mt-1">Be the first to start a discussion</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}