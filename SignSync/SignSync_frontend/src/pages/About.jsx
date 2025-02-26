import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Brain, Globe, Clock, HandMetal, Mic, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutSection = ({ title, description, icon: Icon }) => (
  <Card className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
    <div className="rounded-full bg-purple-500/10 p-3 mb-4">
      <Icon className="h-6 w-6 text-purple-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </Card>
);

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Real-Time Translation",
      description: "Instantly converts spoken language to sign language with minimal latency for seamless communication."
    },
    {
      icon: HandMetal,
      title: "Dynamic Visualization",
      description: "Clear, fluid animations that accurately represent sign language gestures and expressions."
    },
    {
      icon: Mic,
      title: "Advanced Speech Recognition",
      description: "Precise audio processing that accurately captures natural language nuances and context."
    },
    {
      icon: Globe,
      title: "Multiple Sign Languages",
      description: "Supports various sign languages including ASL (American Sign Language) and IS (International Sign)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            About Our Mission
          </h1>
          <p className="text-lg text-purple-100 max-w-3xl mx-auto mb-8">
            Transforming spoken language into real-time sign language, creating a more 
            inclusive world where everyone can communicate freely and naturally.
          </p>
          <Button 
            onClick={() => navigate('/dictphone')}
            className="bg-purple-500 hover:bg-purple-400 text-white flex items-center gap-2 mx-auto"
          >
            Try It Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-slate-600 text-center text-lg leading-relaxed">
              We're dedicated to eliminating communication barriers faced by the Deaf and 
              Hard of Hearing community. Through innovative AI technology, we're creating 
              a bridge between spoken and sign languages, enabling real-time, natural 
              communication that preserves the richness and nuance of both language forms.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Advanced Translation Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AboutSection key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Powered by Advanced Technology
        </h2>
        <Card>
          <CardContent className="p-8">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Our system combines cutting-edge speech recognition, natural language 
              processing, and computer vision technologies to create fluid, accurate 
              sign language translations. We work closely with the Deaf community to 
              ensure our translations maintain the grammatical structure and cultural 
              nuances of sign languages.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/features')}
              className="flex items-center gap-2 mx-auto text-purple-500 border-purple-500 hover:bg-purple-50"
            >
              Learn More About Our Technology <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-purple-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Start Breaking Barriers Today
            </h2>
            <p className="text-purple-100 mb-8">
              Join our community and help make communication accessible for everyone.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dictphone')}
                className="bg-white text-purple-500 hover:bg-purple-50"
              >
                Try Demo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="border-white text-white hover:bg-purple-400"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;