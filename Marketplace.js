
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
  BookOpen, 
  Laptop, 
  FlaskConical,
  PenTool,
  Smartphone,
  Package
} from "lucide-react";
import { motion } from "framer-motion";

import SearchFilters from "../components/marketplace/SearchFilters";
import ResourceCard from "../components/marketplace/ResourceCard";
import CreateListingModal from "../components/marketplace/CreateListingModal";

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    type: "all",
    condition: "all",
    priceRange: "all"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.ResourceListing.list('-created_date');
      setListings(data);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
    setIsLoading(false);
  };

  const filterListings = useCallback(() => {
    let filtered = [...listings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (activeFilters.category !== "all") {
      filtered = filtered.filter(listing => listing.category === activeFilters.category);
    }

    // Type filter
    if (activeFilters.type !== "all") {
      filtered = filtered.filter(listing => listing.type === activeFilters.type);
    }

    // Condition filter
    if (activeFilters.condition !== "all") {
      filtered = filtered.filter(listing => listing.condition === activeFilters.condition);
    }

    // Price range filter
    if (activeFilters.priceRange !== "all") {
      const [min, max] = activeFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(listing => {
        const price = listing.price;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, activeFilters]);

  useEffect(() => {
    filterListings();
  }, [filterListings]);

  const categoryIcons = {
    textbook: BookOpen,
    lab_equipment: FlaskConical,
    notes: PenTool,
    electronics: Laptop,
    supplies: Package,
    other: Smartphone
  };

  const categories = Object.keys(categoryIcons);

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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Resource Marketplace</h1>
            <p className="text-gray-600">Find textbooks, equipment, and notes from your fellow students</p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Listing
          </Button>
        </motion.div>

        {/* Search and Category Quick Filters */}
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
              placeholder="Search resources, courses, or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-indigo-400 rounded-xl"
            />
          </div>

          {/* Category Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant={activeFilters.category === "all" ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 ${
                activeFilters.category === "all" 
                  ? "bg-indigo-600 text-white" 
                  : "hover:bg-indigo-50"
              }`}
              onClick={() => setActiveFilters(prev => ({ ...prev, category: "all" }))}
            >
              All Categories
            </Badge>
            {categories.map(category => {
              const Icon = categoryIcons[category];
              return (
                <Badge 
                  key={category}
                  variant={activeFilters.category === category ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 flex items-center gap-2 ${
                    activeFilters.category === category 
                      ? "bg-indigo-600 text-white" 
                      : "hover:bg-indigo-50"
                  }`}
                  onClick={() => setActiveFilters(prev => ({ ...prev, category }))}
                >
                  <Icon className="w-4 h-4" />
                  {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Results */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <SearchFilters 
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              resultCount={filteredListings.length}
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
                {filteredListings.length} Resources Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                Sort by: Latest
              </div>
            </motion.div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-12"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <ResourceCard 
                    key={listing.id} 
                    listing={listing} 
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Be the First to List
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Create Listing Modal */}
        <CreateListingModal 
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadListings();
          }}
        />
      </div>
    </div>
  );
}