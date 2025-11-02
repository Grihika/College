
import React, { useState } from "react";
import { base44 } from "@/api/base44Client"; // Updated import to use base44 client
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export default function RequestMentorModal({ open, mentor, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    meeting_preference: "flexible"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || !mentor) return;

    setIsSubmitting(true);
    try {
      // Modified API call to use base44.entities.MentorshipRequest
      await base44.entities.MentorshipRequest.create({
        mentor_id: mentor.id,
        ...formData
      });
      
      // Reset form
      setFormData({
        subject: "",
        message: "",
        meeting_preference: "flexible"
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error creating mentorship request:", error);
    }
    setIsSubmitting(false);
  };

  if (!mentor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Request Mentorship</DialogTitle>
        </DialogHeader>
        
        {/* Mentor Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              {mentor.avatar_url ? (
                <img 
                  src={mentor.avatar_url} 
                  alt={mentor.full_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{mentor.full_name}</h3>
              <p className="text-sm text-gray-600">{mentor.major} • {mentor.year}</p>
              <div className="flex gap-2 mt-1">
                {mentor.skills?.slice(0, 2).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <div>
            <Label htmlFor="subject">What would you like help with? *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="e.g., Math tutoring, Career advice, Study strategies"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Meeting Preference */}
          <div>
            <Label htmlFor="meeting_preference">Meeting Preference</Label>
            <Select 
              value={formData.meeting_preference} 
              onValueChange={(value) => handleInputChange('meeting_preference', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online Only</SelectItem>
                <SelectItem value="in_person">In Person</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Introduce yourself and explain what you're looking for *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell your potential mentor about yourself, your goals, and how they can help you..."
              rows={4}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
