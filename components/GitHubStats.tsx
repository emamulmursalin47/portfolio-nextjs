/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react';
import { Star, Users, Code, GitFork, Eye } from 'lucide-react';

export default function GitHubStats() {
  const [loading, setLoading] = useState(false);
  const username = 'emamulmursalin47';
  
  // Direct links to GitHub stats services
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true`;
  const languagesCardUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true`;
  const streakStatsUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=default&hide_border=true`;
  const activityGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-light&hide_border=true`;
  const profileViewsUrl = `https://komarev.com/ghpvc/?username=${username}&color=lightgrey`;

  return (
    <div className=" shadow-lg rounded-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">GitHub Statistics</h2>
      
   
      
      
      {/* Streak stats */}
      <div className="flex justify-center mb-6">
        <img 
          src={streakStatsUrl} 
          alt="GitHub Streak Stats" 
          className="h-44 md:h-48 w-auto object-contain"
        />
      </div>
      
      {/* Activity graph */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Recent Activity</h3>
        <img 
          src={activityGraphUrl} 
          alt="GitHub Activity Graph" 
          className="w-full h-auto object-contain"
        />
      </div>
      
      {/* Profile views counter */}
      <div className="flex justify-center">
        <img 
          src={profileViewsUrl} 
          alt="Profile Views" 
          className="h-6"
        />
      </div>
      
      {/* Additional stats boxes - these would need real data from an API
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-gray-600">Followers</span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
          <GitFork className="w-6 h-6 text-green-500 mb-2" />
          <span className="text-gray-600">Repositories</span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
          <Star className="w-6 h-6 text-yellow-500 mb-2" />
          <span className="text-gray-600">Stars</span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
          <Code className="w-6 h-6 text-purple-500 mb-2" />
          <span className="text-gray-600">Languages</span>
        </div>
      </div> */}
    </div>
  );
}