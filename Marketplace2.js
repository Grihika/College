import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import { motion } from "framer-motion";

import MentorCard from "../components/mentorship/MentorCard";
import MentorshipFilters from "../components/mentorship/MentorshipFilters";
import RequestMentorModal from "../components/mentorship/RequestMentorModal";

export default function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    year: "all",
    major: "all",
    skills: "all",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Load mentors (simulated API)
  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    setIsLoading(true);
    try {
      const sampleMentors = [
        {
          id: 1,
          full_name: "Alice Johnson",
          major: "Computer Science",
          year: "3rd Year",
          bio: "Passionate about AI and data science. Loves mentoring juniors in coding.",
          skills: ["Java", "Python", "Machine Learning"],
        },
        {
          id: 2,
          full_name: "Bob Williams",
          major: "Electronics and Communication",
          year: "4th Year",
          bio: "Hardware enthusiast and embedded systems expert.",
          skills: ["Arduino", "IoT", "C++"],
        },
        {
          id: 3,
          full_name: "Carol Singh",
          major: "Information Technology",
          year: "2nd Year",
          bio: "Interested in full-stack development and UI/UX design.",
          skills: ["React", "Node.js", "CSS"],
        },
      ];

      setMentors(sampleMentors);
      setFilteredMentors(sampleMentors);
    } catch (error) {
      console.error("Error loading mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering logic
  const filterMentors = useCallback(() => {
    let filtered = [...mentors];

    if (searchTerm) {
      filtered = filtered.filter((mentor) =>
        [
          mentor.full_name,
          mentor.major,
          mentor.bio,
          ...(mentor.skills || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.year !== "all") {
      filtered = filtered.filter((m) => m.year === activeFilters.year);
    }

    if (activeFilters.major !== "all") {
      filtered = filtered.filter((m) =>
        m.major.toLowerCase().includes(activeFilters.major.toLowerCase())
      );
    }

    if (activeFilters.skills !== "all") {
      filtered = filtered.filter((m) =>
        m.skills.some((s) =>
          s.toLowerCase().includes(activeFilters.skills.toLowerCase())
        )
      );
    }

    setFilteredMentors(filtered);
  }, [mentors, searchTerm, activeFilters]);

  useEffect(() => {
    filterMentors();
  }, [filterMentors]);

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          Find Your Mentor
        </motion.h1>
        <p className="text-gray-600 mt-2">
          Connect with experienced mentors from your campus
        </p>
      </div>

      {/* Filters and Results */}
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <MentorshipFilters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            resultCount={filteredMentors.length}
            mentors={mentors}
          />
        </div>
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6 h-48 bg-gray-100 rounded-lg" />
                  </Card>
                ))}
            </div>
          ) : filteredMentors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <MentorCard
                  key={mentor.id || index}
                  mentor={mentor}
                  index={index}
                  onRequestMentorship={handleRequestMentorship}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No mentors found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Become the First Mentor
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Request Mentor Modal */}
      <RequestMentorModal
        open={showRequestModal}
        mentor={selectedMentor}
        onClose={() => {
          setShowRequestModal(false);
          setSelectedMentor(null);
        }}
        onSuccess={() => {
          setShowRequestModal(false);
          setSelectedMentor(null);
        }}
      />
    </div>
  );
}
