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

const steps = [
  {
    icon: Mic,
    title: "Speak Naturally",
    description: "Simply speak into your device. Our system captures clear audio in various environments.",
    details: [
      "Advanced noise reduction",
      "Multiple speaker recognition",
      "Voice pattern analysis"
    ]
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Our AI instantly analyzes speech patterns and converts them to sign language structures.",
    details: [
      "Context understanding",
      "Grammar adaptation",
      "Cultural context preservation"
    ]
  },
  {
    icon: HandMetal,
    title: "Sign Generation",
    description: "Watch as natural, fluid sign language gestures are generated in real-time.",
    details: [
      "Accurate hand movements",
      "Facial expressions",
      "Natural transitions"
    ]
  },
  {
    icon: Users,
    title: "Bridge Communication",
    description: "Enable seamless communication between speaking and signing individuals.",
    details: [
      "Two-way communication",
      "Group conversation support",
      "Real-time feedback"
    ]
  }
];

const capabilities = [
  {
    icon: Languages,
    title: "Multiple Sign Languages",
    description: "Support for ASL, IS, and other regional sign languages with dialect variations."
  },
  {
    icon: Globe,
    title: "Offline Mode",
    description: "Core functionality works without internet for reliable communication anywhere."
  },
  {
    icon: VideoIcon,
    title: "Visual Learning",
    description: "Built-in tutorials and practice modes for learning sign language basics."
  },
  {
    icon: Settings,
    title: "Customization",
    description: "Adjust speed, size, and viewing angles to match your preferences."
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
              How It Works ..
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Our innovative system translates spoken language to sign language in real-time. 
              Learn how our technology bridges communication gaps effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-sm font-medium text-slate-900">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-slate-600">
                      {step.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600">
                          <ChevronRight className="h-4 w-4 text-purple-500" />
                          {detail}
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

      {/* Capabilities Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              System Capabilities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore the features that make our translation system powerful and accessible
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <capability.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-slate-600">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-6 w-6 text-purple-500" />
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Privacy & Accessibility
                </h2>
              </div>
              <p className="text-lg text-slate-600 mb-8">
                We prioritize user privacy while ensuring maximum accessibility for all users.
                Our system is designed to be both secure and inclusive.
              </p>
              <ul className="space-y-4">
                {[
                  "Secure processing of all conversations",
                  "HIPAA-compliant for medical settings",
                  "Accessibility standards compliance",
                  "Regular system updates for accuracy"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-square rounded-2xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/500/500" 
                  alt="Privacy and accessibility illustration" 
                  className="rounded-2xl"
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
              Ready to experience seamless communication?
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Try our sign language translation system today.
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
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;