import { supabase } from '../supabase';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'post' | 'profile' | 'proposal';
  url: string;
}

/**
 * Service to handle global search across multiple tables.
 */
export const globalSearch = async (query: string): Promise<SearchResult[]> => {
  if (!supabase || !query) return [];

  const results: SearchResult[] = [];
  const searchTerm = `%${query}%`;

  // 1. Search recruitment_posts
  const { data: posts } = await supabase
    .from('recruitment_posts')
    .select('id, title, content')
    .or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
    .limit(5);

  if (posts) {
    posts.forEach(p => results.push({
      id: p.id,
      title: p.title,
      description: p.content.substring(0, 100) + '...',
      type: 'post',
      url: `/community` // Could be more specific if there were detail pages
    }));
  }

  // 2. Search semester-scoped self introductions
  const { data: profiles } = await supabase
    .from('semester_profiles')
    .select('id, full_name, bio, role, semester_key')
    .or(`full_name.ilike.${searchTerm},bio.ilike.${searchTerm}`)
    .limit(5);

  if (profiles) {
    profiles.forEach(p => results.push({
      id: p.id,
      title: p.full_name,
      description: `${p.role} | ${p.bio?.substring(0, 60)}...`,
      type: 'profile',
      url: `/dashboard`
    }));
  }

  // 3. Search corporate_proposals
  const { data: proposals } = await supabase
    .from('corporate_proposals')
    .select('id, title, content, company_name')
    .or(`title.ilike.${searchTerm},content.ilike.${searchTerm},company_name.ilike.${searchTerm}`)
    .limit(5);

  if (proposals) {
    proposals.forEach(p => results.push({
      id: p.id,
      title: p.title,
      description: `${p.company_name} | ${p.content.substring(0, 80)}...`,
      type: 'proposal',
      url: `/proposals`
    }));
  }

  return results;
};
