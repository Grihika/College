import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, MessageSquare, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickStats({ stats, isLoading }) {
  const statsData = [
    {
      title: "Active Listings",
      value: stats.listings,
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      glowColor: "shadow-blue-500/20"
    },
    {
      title: "Forum Posts",
      value: stats.forumPosts,
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      glowColor: "shadow-green-500/20"
    },
    {
      title: "Mentorship Requests",
      value: stats.mentorshipRequests,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      glowColor: "shadow-purple-500/20"
    },
    {
      title: "Weekly Growth",
      value: "+24%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      glowColor: "shadow-orange-500/20"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ 
            y: -8,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className={`relative overflow-hidden shadow-xl hover:shadow-2xl ${stat.glowColor} transition-all duration-500 bg-white/80 backdrop-blur-xl border border-white/50`}>
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-60`}></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-20">
              <div className={`w-full h-full rounded-full bg-gradient-to-r ${stat.color} animate-pulse`}></div>
            </div>
            
            <CardHeader className="relative z-10 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-700 tracking-wide">
                  {stat.title}
                </CardTitle>
                <motion.div 
                  className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {isLoading ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <motion.div 
                  className="text-4xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
              )}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} animate-pulse`}></div>
                <p className="text-sm text-gray-600 font-medium">This week</p>
              </div>
            </CardContent>

            {/* Interactive Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-xl`}></div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
