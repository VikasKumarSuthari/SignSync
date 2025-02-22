import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Brain,
  Languages,
  HandMetal,
  Clock,
  Shield,
  Cloud,
  Share2,
  Layout,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Globe,
  VideoIcon
} from 'lucide-react';

const mainFeatures = [
  {
    icon: Brain,
    title: "Advanced AI Translation",
    description: "State-of-the-art AI models for accurate speech-to-sign language conversion",
    benefits: [
      "Natural language understanding",
      "Context-aware translation",
      "Grammatical structure adaptation",
      "Cultural nuance preservation"
    ]
  },
  {
    icon: Languages,
    title: "Multiple Sign Languages",
    description: "Support for various sign languages with regional variations and dialects",
    benefits: [
      "ASL (American Sign Language)",
      "International Sign (IS)",
      "Regional variations support",
      "Dialect recognition"
    ]
  },
  {
    icon: HandMetal,
    title: "Dynamic Gestures",
    description: "Fluid and accurate representation of sign language gestures and expressions",
    benefits: [
      "Natural hand movements",
      "Facial expression mapping",
      "Body language incorporation",
      "Smooth transitions"
    ]
  },
  {
    icon: Shield,
    title: "Accessibility Features",
    description: "Comprehensive accessibility options for various user needs",
    benefits: [
      "High-contrast visuals",
      "Customizable speed",
      "Alternative viewing angles",
      "Gesture size adjustment"
    ]
  }
];

const technicalFeatures = [
  {
    icon: Mic,
    title: "Speech Recognition",
    description: "Advanced audio processing for accurate speech capture in various environments."
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Instant translation with minimal latency for natural conversation flow."
  },
  {
    icon: Cloud,
    title: "Cloud Processing",
    description: "Powerful cloud infrastructure for consistent performance across devices."
  },
  {
    icon: Share2,
    title: "API Integration",
    description: "Easy integration with existing systems and applications."
  },
  {
    icon: Layout,
    title: "Customizable Interface",
    description: "Adaptable display options for different viewing preferences and needs."
  },
  {
    icon: Globe,
    title: "Offline Support",
    description: "Core functionality available without internet connection."
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-purple-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Revolutionary Sign Language Translation
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100 max-w-3xl mx-auto">
              Experience our comprehensive suite of features designed to break down 
              communication barriers between spoken and sign languages.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {feature.description}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600">
                          <ChevronRight className="h-4 w-4 text-purple-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Technical Capabilities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Powered by cutting-edge technology for reliable and accurate translation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technicalFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 mb-6">
                <VideoIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Live Demo</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                See It In Action
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Experience real-time sign language translation with our interactive demo.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Mic,
                    title: "Speak Naturally",
                    description: "Just speak normally - our system handles the rest"
                  },
                  {
                    icon: HandMetal,
                    title: "Watch Translation",
                    description: "See instant sign language conversion"
                  },
                  {
                    icon: Sparkles,
                    title: "Real-time Feedback",
                    description: "Get immediate visual feedback and adjustments"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-square rounded-2xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/500/500" 
                  alt="Sign language translation demo" 
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to try it yourself?
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Experience the power of real-time sign language translation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/try-demo"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-purple-500 shadow-sm hover:bg-purple-50"
              >
                Try Live Demo
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-purple-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;