import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const getProfiles = async () => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data;
};

const getProfileById = async (id) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

const createProfile = async (profile) => {
  const { data, error } = await supabase.from('profiles').insert(profile).select().single();
  if (error) throw error;
  return data;
};

const updateProfile = async ({ id, ...profile }) => {
  const { data, error } = await supabase.rpc('update_profile', {
    user_id: id,
    new_first_name: profile.first_name,
    new_last_name: profile.last_name,
    new_avatar_url: profile.avatar_url,
    new_email: profile.email
  });
  if (error) throw error;
  return data;
};

const deleteProfile = async (id) => {
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
};

export const useProfiles = () => useQuery({ queryKey: ['profiles'], queryFn: getProfiles });

export const useProfile = (id) => useQuery({ 
  queryKey: ['profiles', id], 
  queryFn: () => getProfileById(id),
  enabled: !!id
});

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profiles', variables.id] });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};