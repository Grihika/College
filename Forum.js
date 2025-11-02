
import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  MessageSquare, 
  HelpCircle,
  Users,
  Megaphone,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

import ForumFilters from "../components/forum/ForumFilters";
import PostCard from "../components/forum/PostCard";
import CreatePostModal from "../components/forum/CreatePostModal";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    subject: "all",
    status: "all"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.ForumPost.list('-created_date');
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
    setIsLoading(false);
  };

  const filterPosts = useCallback(() => {
    let filtered = [...posts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (activeFilters.type !== "all") {
      filtered = filtered.filter(post => post.type === activeFilters.type);
    }

    // Subject filter
    if (activeFilters.subject !== "all") {
      filtered = filtered.filter(post => post.subject === activeFilters.subject);
    }

    // Status filter
    if (activeFilters.status !== "all") {
      if (activeFilters.status === "resolved") {
        filtered = filtered.filter(post => post.is_resolved);
      } else if (activeFilters.status === "unresolved") {
        filtered = filtered.filter(post => !post.is_resolved);
      }
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, activeFilters]); // Dependencies for useCallback

  useEffect(() => {
    filterPosts();
  }, [filterPosts]); // filterPosts is now a stable reference due to useCallback

  const typeIcons = {
    question: HelpCircle,
    discussion: MessageSquare,
    announcement: Megaphone,
    study_group: Users
  };

  const types = Object.keys(typeIcons);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Discussion Forum</h1>
            <p className="text-gray-600">Ask questions, share knowledge, and connect with your peers</p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </Button>
        </motion.div>

        {/* Search and Type Quick Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search posts, subjects, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-indigo-400 rounded-xl"
            />
          </div>

          {/* Type Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant={activeFilters.type === "all" ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 ${
                activeFilters.type === "all" 
                  ? "bg-indigo-600 text-white" 
                  : "hover:bg-indigo-50"
              }`}
              onClick={() => setActiveFilters(prev => ({ ...prev, type: "all" }))}
            >
              All Posts
            </Badge>
            {types.map(type => {
              const Icon = typeIcons[type];
              return (
                <Badge 
                  key={type}
                  variant={activeFilters.type === type ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 flex items-center gap-2 ${
                    activeFilters.type === type 
                      ? "bg-indigo-600 text-white" 
                      : "hover:bg-indigo-50"
                  }`}
                  onClick={() => setActiveFilters(prev => ({ ...prev, type }))}
                >
                  <Icon className="w-4 h-4" />
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Results */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ForumFilters 
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              resultCount={filteredPosts.length}
              posts={posts}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredPosts.length} Posts Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                Sort by: Latest
              </div>
            </motion.div>

            {isLoading ? (
              <div className="space-y-6">
                {Array(5).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Start the Discussion
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal 
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadPosts();
          }}
        />
      </div>
    </div>
  );
}
