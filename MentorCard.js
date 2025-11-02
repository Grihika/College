import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User,
  GraduationCap,
  Star,
  MessageSquare,
  Award,
  Clock,
  Heart,
  Zap,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

export default function MentorCard({ mentor, index, onRequestMentorship }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getYearColor = (year) => {
    const colors = {
      sophomore: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      junior: 'bg-gradient-to-r from-green-400 to-emerald-600 text-white',
      senior: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
      graduate: 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
    };
    return colors[year] || 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
  };

  const getGradientBackground = (index) => {
    const gradients = [
      'from-purple-400 via-pink-500 to-red-500',
      'from-blue-400 via-purple-500 to-indigo-600',
      'from-green-400 via-blue-500 to-purple-600',
      'from-yellow-400 via-orange-500 to-red-500',
      'from-pink-400 via-purple-500 to-indigo-500',
      'from-indigo-400 via-purple-500 to-pink-500'
    ];
    return gradients[index % gradients.length];
  };

  const mockRating = mentor.mentor_rating || (4.2 + (index * 0.1));
  const mockSessions = mentor.mentor_sessions || (5 + index * 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBackground(index)} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/20 text-gray-600 hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          <div className="p-2 bg-green-500 rounded-full shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        <CardContent className="relative p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${getGradientBackground(index)} rounded-2xl flex items-center justify-center shadow-2xl`}>
                {mentor.avatar_url ? (
                  <img 
                    src={mentor.avatar_url} 
                    alt={mentor.full_name}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              
              {/* Status Ring */}
              <motion.div 
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : {}}
                transition={{ duration: 0.8 }}
              >
                <Star className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="font-bold text-xl text-gray-900 truncate mb-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                {mentor.full_name || `Mentor ${index + 1}`}
              </motion.h3>
              <p className="text-sm text-gray-600 mb-3 font-medium">{mentor.major || 'Computer Science'}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getYearColor(mentor.year || 'senior')}>
                  <GraduationCap className="w-3 h-3 mr-1" />
                  <span>{mentor.year || 'Senior'}</span>
                </Badge>
                <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-bold text-gray-900">{mockRating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-600">Rating</p>
            </motion.div>
            <motion.div 
              className="text-center border-x border-blue-200"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center mb-1">
                <MessageSquare className="w-4 h-4 text-blue-500 mr-1" />
                <span className="font-bold text-gray-900">{mockSessions}</span>
              </div>
              <p className="text-xs text-gray-600">Sessions</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="font-bold text-gray-900">98%</span>
              </div>
              <p className="text-xs text-gray-600">Success</p>
            </motion.div>
          </div>

          {/* Bio with Animation */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {mentor.bio || `Experienced ${mentor.major || 'Computer Science'} student passionate about helping others succeed. Specializing in academic guidance, career mentorship, and study strategies. Let's achieve your goals together! 🚀`}
            </p>
          </motion.div>

          {/* Enhanced Skills */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              Expertise Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {(mentor.skills || ['Programming', 'Career Guidance', 'Study Skills', 'Project Management']).slice(0, 4).map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`text-xs bg-gradient-to-r ${getGradientBackground(skillIndex)} text-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300`}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="mb-6 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-orange-700">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Avg. Response</span>
              </div>
              <span className="font-bold text-orange-800">~2 hours</span>
            </div>
          </div>

          {/* Enhanced Actions */}
          <div className="flex gap-3">
            <motion.div className="flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </Button>
            </motion.div>
            <motion.div className="flex-1">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl font-semibold transition-all duration-300"
                onClick={() => onRequestMentorship(mentor)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Connect Now
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
