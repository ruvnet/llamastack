import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

/*
### chats

| name       | type                     | format  | required |
|------------|--------------------------|---------|----------|
| id         | uuid                     | uuid    | true     |
| user_id    | uuid                     | uuid    | false    |
| name       | text                     | string  | true     |
| messages   | jsonb                    | json    | true     |
| created_at | timestamp with time zone | string  | false    |
| updated_at | timestamp with time zone | string  | false    |

Foreign Key Relationships:
- user_id references profiles.id
*/

const getChats = async () => {
  const { data, error } = await supabase.from('chats').select('*');
  if (error) throw error;
  return data;
};

const getChatById = async (id) => {
  const { data, error } = await supabase.from('chats').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

const createChat = async (chat) => {
  const { data, error } = await supabase.from('chats').insert(chat).select().single();
  if (error) throw error;
  return data;
};

const updateChat = async ({ id, ...chat }) => {
  const { data, error } = await supabase.from('chats').update(chat).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deleteChat = async (id) => {
  const { error } = await supabase.from('chats').delete().eq('id', id);
  if (error) throw error;
};

export const useChats = () => useQuery({ queryKey: ['chats'], queryFn: getChats });

export const useChat = (id) => useQuery({ 
  queryKey: ['chats', id], 
  queryFn: () => getChatById(id),
  enabled: !!id
});

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};

export const useUpdateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['chats', data.id] });
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};