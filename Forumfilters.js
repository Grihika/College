import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForumFilters({ activeFilters, setActiveFilters, resultCount, posts }) {
  const resetFilters = () => {
    setActiveFilters({
      type: "all",
      subject: "all",
      status: "all"
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== "all");

  // Get unique subjects from posts
  const subjects = [...new Set(posts.filter(post => post.subject).map(post => post.subject))];

  return (
    <Card className="sticky top-4 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-indigo-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <Badge variant="outline" className="text-indigo-600 border-indigo-200 w-fit">
          {resultCount} results
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subject */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Subject</Label>
          <Select
            value={activeFilters.subject}
            onValueChange={(value) => setActiveFilters(prev => ({ ...prev, subject: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Status</Label>
          <Select
            value={activeFilters.status}
            onValueChange={(value) => setActiveFilters(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Status</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="unresolved">Unresolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters)
                .filter(([_, value]) => value !== "all")
                .map(([key, value]) => (
                  <Badge 
                    key={key}
                    variant="secondary" 
                    className="bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer hover:bg-indigo-200"
                    onClick={() => setActiveFilters(prev => ({ ...prev, [key]: "all" }))}
                  >
                    {key}: {value}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Popular Topics */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Popular Topics</Label>
          <div className="space-y-2">
            {["Mathematics", "Computer Science", "Chemistry", "Physics"].map((subject) => (
              <button
                key={subject}
                className="block w-full text-left text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded px-2 py-1 transition-colors duration-200"
                onClick={() => setActiveFilters(prev => ({ ...prev, subject }))}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
