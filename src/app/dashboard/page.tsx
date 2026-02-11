'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'backlog' | 'this_week' | 'in_progress' | 'done';
  category: 'product' | 'content' | 'marketing' | 'admin' | 'general';
  priority: number;
  created_at: string;
  completed_at: string | null;
  due_date: string | null;
}

interface Activity {
  id: string;
  action: string;
  details: Record<string, unknown> | null;
  source: string;
  created_at: string;
}

interface Metrics {
  waitlist_count: number;
  tweets_this_week: number;
  blogs_published: number;
  tasks_done_this_week: number;
}

const COLUMNS = [
  { id: 'backlog', label: '📋 Backlog', color: 'border-gray-500' },
  { id: 'this_week', label: '🎯 This Week', color: 'border-yellow-500' },
  { id: 'in_progress', label: '🔥 In Progress', color: 'border-blue-500' },
  { id: 'done', label: '✅ Done', color: 'border-green-500' },
];

const CATEGORIES = {
  product: { label: '🛠 Product', color: 'bg-purple-500/20 text-purple-300' },
  content: { label: '📝 Content', color: 'bg-pink-500/20 text-pink-300' },
  marketing: { label: '📣 Marketing', color: 'bg-orange-500/20 text-orange-300' },
  admin: { label: '⚙️ Admin', color: 'bg-gray-500/20 text-gray-300' },
  general: { label: '📌 General', color: 'bg-blue-500/20 text-blue-300' },
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({ title: '', category: 'general' as Task['category'] });
  const [showNewTask, setShowNewTask] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [tasksRes, activitiesRes, metricsRes] = await Promise.all([
        fetch('/api/dashboard/tasks'),
        fetch('/api/dashboard/activities'),
        fetch('/api/dashboard/metrics'),
      ]);

      if (tasksRes.ok) setTasks(await tasksRes.json());
      if (activitiesRes.ok) setActivities(await activitiesRes.json());
      if (metricsRes.ok) setMetrics(await metricsRes.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/dashboard/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      sessionStorage.setItem('dashboard_auth', 'true');
    } else {
      setError('Wrong password');
    }
  };

  const moveTask = async (taskId: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: newStatus, completed_at: newStatus === 'done' ? new Date().toISOString() : null }
        : t
    ));

    await fetch('/api/dashboard/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    });
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const res = await fetch('/api/dashboard/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTask, status: 'backlog' }),
    });

    if (res.ok) {
      const task = await res.json();
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', category: 'general' });
      setShowNewTask(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await fetch('/api/dashboard/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen star-bg flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white/5 border border-purple-500/20 rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Dashboard</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen star-bg flex items-center justify-center">
        <div className="text-purple-300">Loading...</div>
      </main>
    );
  }

  const tasksByStatus = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter(t => t.status === col.id).sort((a, b) => a.priority - b.priority);
    return acc;
  }, {} as Record<string, Task[]>);

  const thisWeekDone = tasks.filter(t => {
    if (t.status !== 'done' || !t.completed_at) return false;
    const completed = new Date(t.completed_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return completed > weekAgo;
  }).length;

  return (
    <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold gradient-text">
              North Star Astro
            </Link>
            <span className="text-purple-300/50 ml-3">/ Dashboard</span>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('dashboard_auth'); setIsAuthenticated(false); }}
            className="text-purple-300/60 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{metrics?.waitlist_count || 0}</div>
            <div className="text-purple-300/60 text-sm">Waitlist Signups</div>
          </div>
          <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{metrics?.tweets_this_week || 0}</div>
            <div className="text-purple-300/60 text-sm">Tweets This Week</div>
          </div>
          <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{metrics?.blogs_published || 0}</div>
            <div className="text-purple-300/60 text-sm">Blog Posts</div>
          </div>
          <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{thisWeekDone}</div>
            <div className="text-purple-300/60 text-sm">Tasks Done This Week</div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          {showNewTask ? (
            <form onSubmit={addTask} className="bg-white/5 border border-purple-500/20 rounded-xl p-4 flex gap-3">
              <input
                type="text"
                placeholder="Task title..."
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="flex-1 px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none"
                autoFocus
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value as Task['category'] }))}
                className="px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none"
              >
                {Object.entries(CATEGORIES).map(([key, { label }]) => (
                  <option key={key} value={key} className="bg-slate-900">{label}</option>
                ))}
              </select>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add</button>
              <button type="button" onClick={() => setShowNewTask(false)} className="px-4 py-2 text-purple-300/60">Cancel</button>
            </form>
          ) : (
            <button
              onClick={() => setShowNewTask(true)}
              className="px-4 py-2 bg-white/5 border border-purple-500/20 rounded-lg text-purple-300 hover:bg-white/10 transition"
            >
              + Add Task
            </button>
          )}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {COLUMNS.map(column => (
            <div key={column.id} className={`bg-white/5 rounded-xl border-t-4 ${column.color} p-4`}>
              <h3 className="font-semibold text-white mb-4 flex justify-between items-center">
                {column.label}
                <span className="text-purple-300/50 text-sm">{tasksByStatus[column.id]?.length || 0}</span>
              </h3>
              <div className="space-y-3">
                {tasksByStatus[column.id]?.map(task => (
                  <div
                    key={task.id}
                    className="bg-white/5 border border-purple-500/10 rounded-lg p-3 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORIES[task.category].color}`}>
                        {CATEGORIES[task.category].label}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-white text-sm mb-2">{task.title}</p>
                    {task.description && (
                      <p className="text-purple-300/50 text-xs mb-2">{task.description}</p>
                    )}
                    <div className="flex gap-1 flex-wrap">
                      {COLUMNS.filter(c => c.id !== column.id).map(c => (
                        <button
                          key={c.id}
                          onClick={() => moveTask(task.id, c.id as Task['status'])}
                          className="text-xs text-purple-300/50 hover:text-purple-300 px-2 py-1 bg-white/5 rounded transition"
                        >
                          → {c.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="bg-white/5 border border-purple-500/20 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">📜 Recent Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-purple-300/50 text-sm">No activity yet</p>
            ) : (
              activities.slice(0, 20).map(activity => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <span className="text-purple-300/50 whitespace-nowrap">
                    {new Date(activity.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    activity.source === 'jarvis' ? 'bg-blue-500/20 text-blue-300' :
                    activity.source === 'cron' ? 'bg-green-500/20 text-green-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {activity.source}
                  </span>
                  <span className="text-purple-200/80">{activity.action}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
