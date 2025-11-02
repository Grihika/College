
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react"; // DollarSign removed as it's replaced by a symbol
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function FeaturedResources({ listings, isLoading }) {
  const featuredListings = listings.slice(0, 3);

  const getCategoryColor = (category) => {
    const colors = {
      textbook: 'bg-blue-100 text-blue-700 border-blue-200',
      lab_equipment: 'bg-green-100 text-green-700 border-green-200', 
      notes: 'bg-purple-100 text-purple-700 border-purple-200',
      electronics: 'bg-orange-100 text-orange-700 border-orange-200',
      supplies: 'bg-pink-100 text-pink-700 border-pink-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || colors.other;
  };

  const getConditionColor = (condition) => {
    const colors = {
      excellent: 'bg-green-100 text-green-700',
      good: 'bg-yellow-100 text-yellow-700', 
      fair: 'bg-orange-100 text-orange-700',
      poor: 'bg-red-100 text-red-700'
    };
    return colors[condition] || colors.good;
  };

  return (
    <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Featured Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : featuredListings.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 truncate">{listing.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getCategoryColor(listing.category)}>
                    {listing.category?.replace('_', ' ')}
                  </Badge>
                  <Badge variant="secondary" className={getConditionColor(listing.condition)}>
                    {listing.condition}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {/* Changed from DollarSign icon to Rupee symbol */}
                    <span className="font-bold text-green-600">₹{listing.price}</span>
                  </div>
                  <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                    {listing.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No featured resources available</p>
            <p className="text-sm text-gray-400 mt-1">Check back later for new listings</p>
          </div>
        )}
        
        <Button className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
          View All Resources
        </Button>
      </CardContent>
    </Card>
  );
}
