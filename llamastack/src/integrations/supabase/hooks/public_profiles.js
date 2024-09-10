import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

/*
### public_profiles

| name       | type | format | required |
|------------|------|--------|----------|
| id         | uuid | uuid   | true     |
| first_name | text | string | false    |
| last_name  | text | string | false    |
| avatar_url | text | string | false    |

*/

const getPublicProfiles = async () => {
  const { data, error } = await supabase.from('public_profiles').select('*');
  if (error) throw error;
  return data;
};

const getPublicProfileById = async (id) => {
  const { data, error } = await supabase.from('public_profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

const createPublicProfile = async (profile) => {
  const { data, error } = await supabase.from('public_profiles').insert(profile).select().single();
  if (error) throw error;
  return data;
};

const updatePublicProfile = async ({ id, ...profile }) => {
  const { data, error } = await supabase.from('public_profiles').update(profile).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deletePublicProfile = async (id) => {
  const { error } = await supabase.from('public_profiles').delete().eq('id', id);
  if (error) throw error;
};

export const usePublicProfiles = () => useQuery({ queryKey: ['public_profiles'], queryFn: getPublicProfiles });

export const usePublicProfile = (id) => useQuery({ 
  queryKey: ['public_profiles', id], 
  queryFn: () => getPublicProfileById(id),
  enabled: !!id
});

export const useCreatePublicProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPublicProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public_profiles'] });
    },
  });
};

export const useUpdatePublicProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePublicProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['public_profiles'] });
      queryClient.invalidateQueries({ queryKey: ['public_profiles', data.id] });
    },
  });
};

export const useDeletePublicProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePublicProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public_profiles'] });
    },
  });
};