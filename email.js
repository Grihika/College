import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, GraduationCap, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailDomainValidator({ children }) {
  const [user, setUser] = useState(null);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidDomain, setIsValidDomain] = useState(false);

  useEffect(() => {
    validateUserDomain();
  }, []);

  const validateUserDomain = async () => {
    setIsValidating(true);
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      // Check if email ends with srmist.edu.in
      const isValid = currentUser.email.toLowerCase().endsWith('@srmist.edu.in');
      setIsValidDomain(isValid);
    } catch (error) {
      console.error("Error validating user:", error);
      // If user is not logged in, allow access (they'll be redirected to login by base44)
      setIsValidDomain(true);
    }
    setIsValidating(false);
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Validating access...</p>
        </div>
      </div>
    );
  }

  // If domain is invalid, show restriction message
  if (!isValidDomain && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="border-red-200 shadow-2xl">
            <CardContent className="p-8">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-gray-900 mb-4"
              >
                Access Restricted
              </motion.h1>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-6 h-6 text-red-600" />
                  <h2 className="font-bold text-red-900 text-lg">Only for SRM Students</h2>
                </div>
                <p className="text-red-800 mb-4">
                  This platform is exclusively available for <strong>SRM Institute of Science and Technology</strong> students.
                </p>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Your email:</strong> {user.email}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Required domain:</strong> @srmist.edu.in
                  </p>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
              >
                <h3 className="font-bold text-blue-900 mb-2">📧 How to Access:</h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Log out from your current account</li>
                  <li>Sign in using your official SRM email address</li>
                  <li>Your email must end with <strong>@srmist.edu.in</strong></li>
                </ol>
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-lg text-lg py-6"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout & Sign In with SRM Email
                </Button>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center text-sm text-gray-500 mt-6"
              >
                Need help? Contact your campus IT support
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // If domain is valid or user is not logged in, render the app
  return <>{children}</>;
}