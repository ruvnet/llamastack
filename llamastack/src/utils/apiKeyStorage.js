import { supabase } from '@/lib/supabase';

export const encryptAndStoreApiEndpoint = async (apiEndpoint, apiKey = '') => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ 
        user_id: supabase.auth.user().id, 
        llamastack_api_endpoint: apiEndpoint,
        llamastack_api_key: apiKey
      }, { onConflict: 'user_id' });

    if (error) throw error;
    
    localStorage.setItem('hasLlamaStackApiEndpoint', 'true');
    return true;
  } catch (error) {
    console.error('Error storing API endpoint:', error);
    return false;
  }
};

export const checkForStoredApiEndpoint = async () => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('llamastack_api_endpoint')
      .eq('user_id', supabase.auth.user().id)
      .single();

    if (error) throw error;

    return !!data?.llamastack_api_endpoint;
  } catch (error) {
    console.error('Error checking for stored API endpoint:', error);
    return false;
  }
};

export const getStoredApiEndpoint = async () => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('llamastack_api_endpoint')
      .eq('user_id', supabase.auth.user().id)
      .single();

    if (error) throw error;

    return data?.llamastack_api_endpoint || null;
  } catch (error) {
    console.error('Error retrieving stored API endpoint:', error);
    return null;
  }
};

export const getStoredApiKey = async () => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('llamastack_api_key')
      .eq('user_id', supabase.auth.user().id)
      .single();

    if (error) throw error;

    return data?.llamastack_api_key || null;
  } catch (error) {
    console.error('Error retrieving stored API key:', error);
    return null;
  }
};

export const checkForStoredApiKey = async () => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('llamastack_api_key')
      .eq('user_id', supabase.auth.user().id)
      .single();

    if (error) throw error;

    return !!data?.llamastack_api_key;
  } catch (error) {
    console.error('Error checking for stored API key:', error);
    return false;
  }
};

export const encryptAndStoreApiKey = async (apiKey) => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ 
        user_id: supabase.auth.user().id, 
        llamastack_api_key: apiKey
      }, { onConflict: 'user_id' });

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error storing API key:', error);
    return false;
  }
};