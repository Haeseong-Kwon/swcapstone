import { supabase } from '../supabase';

/**
 * Service to handle all dashboard data operations through Supabase.
 * Each function checks if the Supabase client is initialized.
 */

export const getProfiles = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createProfile = async (profileData: any) => {
  if (!supabase) {
    console.warn('Cannot create profile: Supabase is not configured.');
    return null;
  }
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getRecruitmentPosts = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('recruitment_posts')
    .select('*, author:profiles(full_name)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createRecruitmentPost = async (postData: any) => {
  if (!supabase) {
    console.warn('Cannot create recruitment post: Supabase is not configured.');
    return null;
  }
  const { data, error } = await supabase
    .from('recruitment_posts')
    .insert([postData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getTeamRegistrations = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('team_registrations')
    .select('*, leader:profiles(full_name, email)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const registerTeam = async (teamData: any) => {
  if (!supabase) {
    console.warn('Cannot register team: Supabase is not configured.');
    return null;
  }
  const { data, error } = await supabase
    .from('team_registrations')
    .insert([teamData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getCorporateProposals = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('corporate_proposals')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getVideos = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getProfileByUserId = async (userId: string) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "No rows found"
  return data || null;
};
