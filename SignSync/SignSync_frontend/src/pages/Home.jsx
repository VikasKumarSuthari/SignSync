import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Mic, 
  Globe, 
  Clock,
  ArrowRight,
  CheckCircle,
  Languages,
  HandMetal 
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: "Real-Time Translation",
    description: "Instantly converts spoken language to sign language with minimal latency for seamless communication."
  },
  {
    icon: Globe,
    title: "Multiple Sign Languages",
    description: "Supports various sign languages including ASL (American Sign Language) and IS (International Sign)."
  },
  {
    icon: Mic,
    title: "Advanced Speech Recognition",
    description: "Precise audio processing that accurately captures natural language nuances and context."
  },
  {
    icon: HandMetal,
    title: "Dynamic Visualization",
    description: "Clear, fluid animations that accurately represent sign language gestures and expressions."
  }
];

const benefits = [
  "Instant speech-to-sign conversion",
  "Support for multiple sign languages",
  "Accurate grammar adaptation",
  "Cultural context awareness",
  "Mobile and desktop compatible",
  "Offline functionality"
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Breaking Communication Barriers
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Revolutionary real-time system that converts spoken language into accurate, 
              culturally-aware sign language. Bridging the gap between spoken and sign 
              language communities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/try-now"
                className="rounded-md bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              >
                Try It Now
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-semibold leading-6 text-white flex items-center gap-1"
              >
                How it works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Advanced Translation Features
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              State-of-the-art technology for accurate and natural sign language generation
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Experience Real-Time Translation
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Our system provides instant, accurate translation from spoken language 
                to sign language, maintaining the nuances and cultural context of both 
                languages.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-video rounded-xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/600/400"
                  alt="Sign language translation demo" 
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Breaking Barriers Today
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Join our community and help make communication accessible for everyone.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-purple-500 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white inline-block"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;