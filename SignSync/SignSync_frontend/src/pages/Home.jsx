import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Globe, 
  Clock,
  CheckCircle,
  BrainCircuit,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import img1 from '../assets/image3.png'

const features = [
  {
    icon: Mic,
    title: "Speech-to-Text Conversion",
    description: "High-accuracy speech recognition for seamless text-based transcription."
  },
  {
    icon: Globe,
    title: "English-to-Sign Language Translator",
    description: "Instantly converts written or spoken English into clear, accurate sign language gestures."
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Sign Language Generation",
    description: "Real-time 3D avatar animations for accurate sign language representation."
  },
  {
    icon: PlayCircle,
    title: "Engaging Learning Animations for Kids",
    description: "Visually appealing animations designed to make learning fun and interactive."
  }
];

const benefits = [
  "Instant voice-to-sign translation",
  "High-accuracy NLP-based speech processing",
  "Interactive animations for better learning",
  "Optimized for mobile and desktop use",
  "Real-time 3D avatar rendering"
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            AI-Powered Sign Language Translator
          </h1>
          <p className="mt-6 text-lg text-purple-100">
            Convert speech or text into sign language instantly using cutting-edge AI and real-time 3D avatar animations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/dictphone" className="rounded-md bg-purple-500 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-400">
              Try It Now
            </Link>
            <Link to="/features" className="text-sm font-semibold leading-6 text-white flex items-center gap-1">
              How it works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Key Features
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Why Choose Our Translator?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Experience the power of AI-driven speech-to-sign translation with our innovative platform.
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
          <div className="lg:pl-12 flex items-center justify-center">
          <img src={img1} alt="Sign language demo" className="rounded-xl shadow-md w-full h-auto" />

          </div>
        </div>
      </section>
      <section className="py-16 bg-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Communicating Without Barriers
          </h2>
          <p className="mt-4 text-lg text-purple-100">
          Enable seamless communication with AI-powered speech-to-sign language translation and interactive learning tools.
          </p>
          <div className="mt-8">
            <Link to="/dictphone" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-purple-500 shadow-sm hover:bg-purple-50">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;