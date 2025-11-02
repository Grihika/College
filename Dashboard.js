import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  ArrowRight,
  Plus,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

import QuickStats from "../components/dashboard/QuickStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import FeaturedResources from "../components/dashboard/FeaturedResources";
import TrendingTopics from "../components/dashboard/TrendingTopics";

export default function Dashboard() {
  const [stats, setStats] = useState({
    listings: 0,
    forumPosts: 0,
    mentorshipRequests: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [listings, posts, requests] = await Promise.all([
        base44.entities.ResourceListing.list('-created_date', 5),
        base44.entities.ForumPost.list('-created_date', 5),
        base44.entities.MentorshipRequest.list('-created_date', 10)
      ]);

      setStats({
        listings: listings.length,
        forumPosts: posts.length,
        mentorshipRequests: requests.length
      });

      setRecentListings(listings);
      setRecentPosts(posts);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to College Compass</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your one-stop platform for campus resources, mentorship, and academic collaboration
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Marketplace")}>
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg px-8">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Browse Marketplace
              </Button>
            </Link>
            <Link to={createPageUrl("Forum")}>
              <Button size="lg" variant="outline" className="border-2 border-indigo-200 hover:bg-indigo-50 px-8">
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Discussion
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <QuickStats stats={stats} isLoading={isLoading} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Recent Activity - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <RecentActivity 
              listings={recentListings}
              posts={recentPosts}
              isLoading={isLoading}
            />
            
            <FeaturedResources listings={recentListings} isLoading={isLoading} />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-8">
            <TrendingTopics posts={recentPosts} isLoading={isLoading} />
            
            {/* Campus Highlights */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Campus Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-orange-800">Study Groups</p>
                    <p className="text-sm text-orange-700">5 active groups this week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-orange-800">Resource Exchange</p>
                    <p className="text-sm text-orange-700">15 successful trades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-orange-800">Mentor Connections</p>
                    <p className="text-sm text-orange-700">8 new mentorships</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Search */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-indigo-600" />
                  Quick Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Search Textbooks
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Find Mentors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Browse Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

