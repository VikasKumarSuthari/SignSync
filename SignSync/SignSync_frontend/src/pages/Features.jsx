import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Brain,
  Languages,
  HandMetal,
  Clock,
  Shield,
  Layout,
  Globe,
  ScanFace
} from 'lucide-react';
import avatarImage from '../assets/image2.png';

const mainFeatures = [
  {
    icon: Brain,
    title: "Real-Time Speech to Sign Conversion",
    description: "Instantly converts spoken words into accurate sign language."
  },
  {
    icon: ScanFace, 
    title: "Interactive 3D Learning",
    description: "Engage in immersive learning experiences with 3D avatars that demonstrate sign language gestures dynamically."
  },
  {
    icon: HandMetal,
    title: "3D Sign Avatar",
    description: "Engaging and realistic avatars for clear sign communication."
  },
  {
    icon: Shield,
    title: "User Accessibility",
    description: "Customizable settings to enhance user experience and interaction."
  }
];

const technicalFeatures = [
  {
    icon: Mic,
    title: "Speech Processing & NLP",
    description: "High-accuracy speech recognition and natural language understanding."
  },
  {
    icon: Clock,
    title: "Real-Time Processing",
    description: "Seamless sign translation with minimal delay."
  },
  {
    icon: Layout,
    title: "Advanced 3D Animation",
    description: "Smooth and expressive 3D avatar animations for clear communication."
  },
  {
    icon: Globe,
    title: "AI-Driven Gesture Recognition",
    description: "Intelligently interprets gestures to enhance sign accuracy."
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-purple-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Breaking Barriers with Sign Language Technology
          </h1>
          <p className="mt-6 text-lg leading-8 text-purple-100 max-w-3xl mx-auto">
            Experience seamless communication with real-time speech-to-sign translation.
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-purple-500/10 flex items-center justify-center rounded-lg">
                  <feature.icon className="h-7 w-7 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Features Grid with Image */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
            <img src={avatarImage} alt="3D Avatar Demo" className="rounded-xl shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Cutting-Edge Technology</h2>
            <p className="mt-4 text-lg text-slate-600">Empowered by speech processing, NLP, and advanced 3D animations.</p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mt-12">
              {technicalFeatures.map((feature, index) => (
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
    </div>
  );
};

export default Features;
