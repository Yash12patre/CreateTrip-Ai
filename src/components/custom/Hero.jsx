import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, MapPin, Calendar, Plane, Star, Globe } from 'lucide-react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGetStarted = () => {
    console.log('Navigate to create trip page')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Gradient Orbs */}
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
            right: '10%',
            bottom: '20%',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <div className={`inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-4 h-4 text-cyan-400/50" />
            </div>
          </div>
          <span className="text-sm font-medium text-white/90 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            AI-Powered Trip Planning
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Animated Headline with Typewriter Effect */}
        <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-8xl leading-tight mb-8 text-white">
            <span className="inline-block animate-gradient-x bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent bg-300% animate-shimmer">
              Discover incredible
            </span>
            <br />
            <span className="relative inline-block mt-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                adventures
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-expand"></div>
            </span>
            <br />
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              without breaking the bank.
            </span>
          </h1>
        </div>

        {/* Subtitle with Stagger Animation */}
        <p className={`text-xl md:text-2xl text-slate-300 font-medium max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          Your perfect trip, planned to perfection. Select your dates, and let us handle the rest. 
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            From flight bookings to hotel reservations, we craft your ideal itinerary.
          </span>
        </p>

        {/* Enhanced CTA Button */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={handleGetStarted}
            className="group relative px-10 py-5 text-lg font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white border-0 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-pulse-border"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Link to='/createtrip'>
              Get Started - It's Free
              </Link>
              <div className="relative">
                <Plane className="w-6 h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:rotate-12" />
                <div className="absolute inset-0 blur-sm">
                  <Plane className="w-6 h-6 text-cyan-300 opacity-50" />
                </div>
              </div>
            </span>
            
            {/* Button Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </button>
        </div>

        {/* Enhanced Feature Cards */}
        <div className={`flex flex-wrap justify-center items-center gap-8 transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {[
            { icon: Calendar, text: 'Smart Scheduling', color: 'from-cyan-400 to-blue-500' },
            { icon: MapPin, text: 'Local Insights', color: 'from-blue-400 to-purple-500' },
            { icon: Globe, text: 'Best Deals', color: 'from-purple-400 to-pink-500' }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <item.icon className={`w-6 h-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-75">
                  <item.icon className={`w-6 h-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <span className="font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                {item.text}
              </span>
              
              {/* Card Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient with Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent animate-fade-in-up"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes expand {
          0% { width: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 100%; opacity: 0.8; }
        }
        
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-shimmer { 
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-expand { animation: expand 2s ease-out 1s both; }
        .animate-pulse-border { animation: pulse-border 2s infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .bg-300% { background-size: 300% 300%; }
        
        .bg-grid-white\/\[0\.02\] {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}

export default Hero