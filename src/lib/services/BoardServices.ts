import { supabase } from '../supabase';

const applySemesterFilter = (query: any, semesterKey?: string) => {
  if (!semesterKey) return query;
  return query.or(`semester_key.eq.${semesterKey},semester_key.is.null`);
};

const getAuthenticatedUserId = async () => {
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user?.id ?? null;
};

/**
 * Service to handle all dashboard data operations through Supabase.
 * Each function checks if the Supabase client is initialized.
 */

export const getProfiles = async (semesterKey?: string) => {
  if (!supabase) return [];
  const query = applySemesterFilter(
    supabase
      .from('semester_profiles')
      .select('*')
      .order('created_at', { ascending: false }),
    semesterKey
  );
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
};

export const createProfile = async (profileData: any) => {
  if (!supabase) {
    console.warn('Cannot create profile: Supabase is not configured.');
    return null;
  }

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('semester_profiles')
    .upsert(
      [
        {
          ...profileData,
          user_id: userId,
        },
      ],
      { onConflict: 'user_id,semester_key' }
    )
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getRecruitmentPosts = async (semesterKey?: string) => {
  if (!supabase) return [];
  const query = applySemesterFilter(
    supabase
      .from('recruitment_posts')
      .select('*, author:profiles(full_name)')
      .order('created_at', { ascending: false }),
    semesterKey
  );
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
};

export const createRecruitmentPost = async (postData: any) => {
  if (!supabase) {
    console.warn('Cannot create recruitment post: Supabase is not configured.');
    return null;
  }
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }
  const { data, error } = await supabase
    .from('recruitment_posts')
    .insert([{ ...postData, author_id: postData.author_id ?? userId }])
    .select('*, author:profiles(full_name)');
  
  if (error) throw error;
  return data?.[0];
};

export const getRecruitmentPostComments = async (postId: string) => {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('recruitment_post_comments')
    .select('*, author:profiles(full_name)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createRecruitmentPostComment = async ({
  postId,
  postAuthorId,
  postTitle,
  content,
}: {
  postId: string;
  postAuthorId: string;
  postTitle: string;
  content: string;
}) => {
  if (!supabase) {
    console.warn('Cannot create recruitment post comment: Supabase is not configured.');
    return null;
  }

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }

  const trimmedContent = content.trim();
  if (!trimmedContent) {
    throw new Error('댓글 내용을 입력해주세요.');
  }

  const { data: commentData, error: commentError } = await supabase
    .from('recruitment_post_comments')
    .insert([
      {
        post_id: postId,
        author_id: userId,
        content: trimmedContent,
      },
    ])
    .select('*, author:profiles(full_name)')
    .single();

  if (commentError) throw commentError;

  if (postAuthorId && postAuthorId !== userId) {
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([
        {
          recipient_id: postAuthorId,
          actor_id: userId,
          type: 'NEW_COMMENT',
          post_id: postId,
          comment_id: commentData.id,
          content: trimmedContent,
        },
      ]);

    if (notificationError) throw notificationError;
  }

  return {
    ...commentData,
    post_title: postTitle,
  };
};

export const getNotifications = async () => {
  if (!supabase) return [];

  const userId = await getAuthenticatedUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*, actor:profiles!notifications_actor_id_fkey(full_name), post:recruitment_posts(title)')
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const markNotificationsAsRead = async (notificationIds: string[]) => {
  if (!supabase || notificationIds.length === 0) return;

  const userId = await getAuthenticatedUserId();
  if (!userId) return;

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_id', userId)
    .in('id', notificationIds);

  if (error) throw error;
};

export const getTeamRegistrations = async (semesterKey?: string) => {
  if (!supabase) return [];
  const query = applySemesterFilter(
    supabase
      .from('team_registrations')
      .select('*, leader:profiles(full_name, email)')
      .order('created_at', { ascending: false }),
    semesterKey
  );
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
};

export const registerTeam = async (teamData: any) => {
  if (!supabase) {
    console.warn('Cannot register team: Supabase is not configured.');
    return null;
  }
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }
  const { data, error } = await supabase
    .from('team_registrations')
    .insert([{ ...teamData, leader_id: teamData.leader_id ?? userId }])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getCorporateProposals = async (semesterKey?: string) => {
  if (!supabase) return [];
  const query = applySemesterFilter(
    supabase
      .from('corporate_proposals')
      .select('*')
      .order('created_at', { ascending: false }),
    semesterKey
  );
  const { data, error } = await query;
  
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
