import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useProfiles, useProfile, useCreateProfile, useUpdateProfile, useDeleteProfile } from './hooks/profiles';
import { useChats, useChat, useCreateChat, useUpdateChat, useDeleteChat } from './hooks/chats';
import { usePublicProfiles, usePublicProfile, useCreatePublicProfile, useUpdatePublicProfile, useDeletePublicProfile } from './hooks/public_profiles';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useProfiles,
  useProfile,
  useCreateProfile,
  useUpdateProfile,
  useDeleteProfile,
  useChats,
  useChat,
  useCreateChat,
  useUpdateChat,
  useDeleteChat,
  usePublicProfiles,
  usePublicProfile,
  useCreatePublicProfile,
  useUpdatePublicProfile,
  useDeletePublicProfile,
};