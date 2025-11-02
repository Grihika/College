import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ThumbsUp, 
  Clock,
  CheckCircle,
  HelpCircle,
  Users,
  Megaphone,
  Eye
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function PostCard({ post, index }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'question': return HelpCircle;
      case 'discussion': return MessageSquare;
      case 'announcement': return Megaphone;
      case 'study_group': return Users;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      question: 'bg-blue-100 text-blue-700 border-blue-200',
      discussion: 'bg-green-100 text-green-700 border-green-200',
      announcement: 'bg-purple-100 text-purple-700 border-purple-200',
      study_group: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[type] || colors.discussion;
  };

  const TypeIcon = getTypeIcon(post.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-indigo-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getTypeColor(post.type)}>
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {post.type?.replace('_', ' ')}
                </Badge>
                {post.is_resolved && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </Badge>
                )}
                {post.subject && (
                  <Badge variant="outline" className="text-xs">
                    {post.subject}
                  </Badge>
                )}
                {post.course_code && (
                  <Badge variant="outline" className="text-xs">
                    {post.course_code}
                  </Badge>
                )}
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200 cursor-pointer">
                {post.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                0 replies
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {post.upvotes || 0}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Reply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
