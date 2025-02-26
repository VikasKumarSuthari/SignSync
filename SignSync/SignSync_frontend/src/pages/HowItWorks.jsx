import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Brain, 
  HandMetal, 
  Languages,
  Zap,
  Lock,
  ChevronRight,
  VideoIcon,
  Globe,
  Settings,
  Users
} from 'lucide-react';
import prototypeImage from '../assets/image1.png';

const idea = [
  {
    icon: Brain,
    title: "Innovative Sign Language Solution",
    description: "A real-time system that converts spoken language into sign language using AI-powered recognition and 3D avatar technology."
  },
  {
    icon: HandMetal,
    title: "Seamless Communication",
    description: "Breaking language barriers by enabling fluid and natural sign language interpretation."
  }
];

const prototype = [
  {
    icon: VideoIcon,
    title: "Live 3D Avatar",
    description: "A realistic 3D sign language avatar that visually translates spoken words."
  },
  {
    icon: Settings,
    title: "Interactive Features",
    description: "Customizable gestures, hand movements, and facial expressions for a lifelike experience."
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Our Vision & Prototype
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Transforming speech into sign language through AI and 3D avatar animation.
            </p>
          </div>
        </div>
      </section>

      {/* Idea Section with Image on Left */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={prototypeImage} alt="Prototype Demo" className="rounded-xl shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Idea</h2>
            <p className="mt-4 text-lg text-slate-600">An AI-powered real-time speech-to-sign language translator using a 3D avatar.</p>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 mt-12">
              {idea.map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-500/10 flex items-center justify-center rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Prototype Features
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore the core functionalities of our system that bring our idea to life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {prototype.map((feature, index) => (
              <div key={index} className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
