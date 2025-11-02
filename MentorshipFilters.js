import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MentorshipFilters({ activeFilters, setActiveFilters, resultCount, mentors }) {
  const resetFilters = () => {
    setActiveFilters({
      year: "all",
      major: "all", 
      skills: "all"
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== "all");

  // Get unique majors and skills from mentors
  const majors = [...new Set(mentors.filter(mentor => mentor.major).map(mentor => mentor.major))];
  const allSkills = mentors.flatMap(mentor => mentor.skills || []);
  const skills = [...new Set(allSkills)];

  return (
    <Card className="sticky top-4 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-purple-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <Badge variant="outline" className="text-purple-600 border-purple-200 w-fit">
          {resultCount} mentors
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Academic Year */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Academic Year</Label>
          <Select
            value={activeFilters.year}
            onValueChange={(value) => setActiveFilters(prev => ({ ...prev, year: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="sophomore">Sophomore</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Major */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Major</Label>
          <Select
            value={activeFilters.major}
            onValueChange={(value) => setActiveFilters(prev => ({ ...prev, major: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All majors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Majors</SelectItem>
              {majors.map(major => (
                <SelectItem key={major} value={major}>{major}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Skills</Label>
          <Select
            value={activeFilters.skills}
            onValueChange={(value) => setActiveFilters(prev => ({ ...prev, skills: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {skills.slice(0, 10).map(skill => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
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
                    className="bg-purple-100 text-purple-700 border border-purple-200 cursor-pointer hover:bg-purple-200"
                    onClick={() => setActiveFilters(prev => ({ ...prev, [key]: "all" }))}
                  >
                    {key}: {value}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Popular Skills */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Popular Skills</Label>
          <div className="space-y-2">
            {["Programming", "Math Tutoring", "Career Advice", "Study Skills"].map((skill) => (
              <button
                key={skill}
                className="block w-full text-left text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded px-2 py-1 transition-colors duration-200"
                onClick={() => setActiveFilters(prev => ({ ...prev, skills: skill }))}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}