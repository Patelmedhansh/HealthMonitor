import React, { useState } from 'react';
import { Activity, ArrowRight, GitBranch, LineChart, Link2, PlayCircle, Twitter } from 'lucide-react';

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleConnectAPI = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('http://localhost:5000/connect-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiUrl: 'http://example.com/metrics', // This would typically come from a form input
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setConnectionStatus('success');
        // You might want to redirect to the dashboard or show a success message
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
      console.error('Failed to connect API:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOpenDashboard = () => {
    window.location.href = 'http://localhost:5000/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-sm" />
                <Activity className="relative h-8 w-8 text-emerald-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">HealthMonitor</span>
            </div>
            <button className="group relative overflow-hidden rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-emerald-400 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-6xl font-bold leading-tight tracking-tight">
                  Real-time Application
                  <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    Health Monitoring
                    <div className="absolute -bottom-2 left-0 h-1 w-3/4 bg-gradient-to-r from-emerald-400 to-transparent" />
                  </span>
                </h1>
                <p className="text-xl text-gray-400">
                  Connect your API and instantly get real-time performance insights with our advanced monitoring solution
                </p>
              </div>
              <button 
                onClick={handleConnectAPI}
                disabled={isConnecting}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center space-x-2">
                  <span>{isConnecting ? 'Connecting...' : 'Connect Your API'}</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              {connectionStatus === 'success' && (
                <p className="text-emerald-400">API connected successfully!</p>
              )}
              {connectionStatus === 'error' && (
                <p className="text-red-400">Failed to connect API. Please try again.</p>
              )}
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800"
                alt="Dashboard Analytics"
                className="relative rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* How it Works Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        <div className="container relative mx-auto px-6">
          <h2 className="mb-20 text-center text-4xl font-bold tracking-tight">
            How it Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Link2 className="h-12 w-12 text-emerald-400" />,
                title: 'Connect your API',
                description: 'Simple integration with any REST API endpoint. Set up in minutes, not hours.',
              },
              {
                icon: <LineChart className="h-12 w-12 text-emerald-400" />,
                title: 'We collect metrics',
                description: 'Powered by industry-standard Prometheus for reliable, scalable monitoring.',
              },
              {
                icon: <Activity className="h-12 w-12 text-emerald-400" />,
                title: 'Live health data',
                description: 'Beautiful Grafana dashboards provide real-time insights at your fingertips.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group relative rounded-xl bg-gray-800/50 p-8 transition-all duration-300 hover:bg-gray-700/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
              >
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gray-700/50 p-4 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-center text-xl font-semibold">{step.title}</h3>
                  <p className="text-center text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="mb-8 text-4xl font-bold tracking-tight">Live Demo</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-400">
            Experience how HealthMonitor can transform your application monitoring with our interactive demo
          </p>
          <button 
            onClick={handleOpenDashboard}
            className="group relative overflow-hidden rounded-full bg-emerald-500 px-10 py-5 font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
          >
            <div className="relative z-10 flex items-center space-x-3">
              <PlayCircle className="transition-transform duration-300 group-hover:scale-110" />
              <span>Open Dashboard</span>
            </div>
            <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-sm" />
                <Activity className="relative h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight">HealthMonitor</span>
            </div>
            <div className="flex space-x-8">
              <a
                href="#"
                className="group relative text-gray-400 transition-colors hover:text-emerald-400"
              >
                <div className="absolute -inset-2 rounded-lg bg-emerald-500/0 transition-all group-hover:bg-emerald-500/10" />
                <Twitter className="relative h-6 w-6" />
              </a>
              <a
                href="#"
                className="group relative text-gray-400 transition-colors hover:text-emerald-400"
              >
                <div className="absolute -inset-2 rounded-lg bg-emerald-500/0 transition-all group-hover:bg-emerald-500/10" />
                <GitBranch className="relative h-6 w-6" />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 HealthMonitor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;