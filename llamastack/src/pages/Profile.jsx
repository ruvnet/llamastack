import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/integrations/supabase';
import Dashboard from '@/agentic-dashboard/Dashboard';

const Profile = () => {
  const { session } = useSupabaseAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
};

export default Profile;