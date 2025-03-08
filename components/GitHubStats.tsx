"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Code, GitFork } from 'lucide-react';

interface GitHubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: string[];
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching GitHub stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-6">GitHub Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-background rounded-lg">
          <Users className="w-6 h-6 mb-2 text-primary" />
          <span className="text-2xl font-bold">{stats.followers}</span>
          <span className="text-sm text-muted-foreground">Followers</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-background rounded-lg">
          <Code className="w-6 h-6 mb-2 text-primary" />
          <span className="text-2xl font-bold">{stats.publicRepos}</span>
          <span className="text-sm text-muted-foreground">Repositories</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-background rounded-lg">
          <Star className="w-6 h-6 mb-2 text-primary" />
          <span className="text-2xl font-bold">{stats.totalStars}</span>
          <span className="text-sm text-muted-foreground">Total Stars</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-background rounded-lg">
          <GitFork className="w-6 h-6 mb-2 text-primary" />
          <span className="text-2xl font-bold">{stats.topLanguages.length}</span>
          <span className="text-sm text-muted-foreground">Languages</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Top Languages</h3>
        <div className="flex flex-wrap gap-2">
          {stats.topLanguages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-primary/10 rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}