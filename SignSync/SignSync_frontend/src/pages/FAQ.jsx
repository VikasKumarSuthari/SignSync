import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: "About the Technology",
      questions: [
        {
          q: "How does the sign language translation system work?",
          a: "Our system uses advanced AI technology to convert spoken language into sign language in real-time. It processes audio input through speech recognition, analyzes the linguistic structure, and generates accurate sign language animations that preserve both meaning and cultural context."
        },
        {
          q: "Which sign languages are supported?",
          a: "Currently, we support American Sign Language (ASL) and International Sign (IS). We're actively working on expanding our support to include more regional sign languages through collaboration with deaf communities worldwide."
        },
        {
          q: "How accurate is the translation?",
          a: "Our system achieves high accuracy by considering both linguistic and cultural aspects of sign languages. We continuously improve our translations through feedback from the deaf community and language experts. The system adapts to different contexts and maintains grammatical structures specific to sign languages."
        }
      ]
    },
    {
      category: "Usage & Applications",
      questions: [
        {
          q: "Where can this technology be used?",
          a: "Our technology can be implemented in various settings including educational institutions, healthcare facilities, public services, corporate environments, and personal communication. It's particularly valuable for making presentations, meetings, and everyday conversations more accessible."
        },
        {
          q: "Is there a mobile application available?",
          a: "Yes! Our mobile app is available for both iOS and Android devices, allowing users to access real-time translation wherever they go. The app includes offline capabilities for basic translations."
        },
        {
          q: "Can it be integrated into existing systems?",
          a: "Yes, we provide APIs and SDK for seamless integration into existing communication platforms, video conferencing tools, and educational software. Our development team can assist with custom integration needs."
        }
      ]
    },
    {
      category: "Accessibility & Support",
      questions: [
        {
          q: "Is the system available offline?",
          a: "While the full system works best with an internet connection, we offer a lightweight offline mode for basic translations. This ensures accessibility in areas with limited connectivity."
        },
        {
          q: "How do you ensure cultural accuracy?",
          a: "We work closely with deaf communities and sign language experts during development and continuously gather feedback. Our system respects and incorporates cultural nuances specific to different sign languages."
        },
        {
          q: "What kind of support is available?",
          a: "We offer 24/7 customer support through various channels including video chat with sign language support. Our team includes deaf and hard of hearing individuals to ensure effective communication."
        }
      ]
    },
    {
      category: "Technical Requirements",
      questions: [
        {
          q: "What are the system requirements?",
          a: "The system works on most modern devices with a camera and microphone. For optimal performance, we recommend a stable internet connection and updated browser or mobile OS."
        },
        {
          q: "How is privacy maintained?",
          a: "We prioritize user privacy and data security. All translations are processed in real-time and aren't stored unless explicitly requested. We use enterprise-grade encryption for all data transmission."
        },
        {
          q: "Can multiple people use it simultaneously?",
          a: "Yes, our system supports group conversations with multiple participants. It can handle multiple speakers and generate sign language translations for group settings like meetings or classrooms."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-800 py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Learn more about our sign language translation technology
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        {filteredFAQs.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((qa, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left">
                      {qa.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {qa.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Still Need Help Section */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <Card className="bg-purple-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our team is here to help, including sign language support.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/demo')}
                className="border-purple-500 text-purple-500 hover:bg-purple-50"
              >
                Try Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;