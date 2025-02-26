import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  StarHalf,
  Quote,
  Briefcase,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const testimonials = [
  {
    id: 1,
    name: "Emma Wilson",
    role: "Hearing-Impaired User",
    company: "Community Advocate",
    image: "/api/placeholder/150/150",
    rating: 5,
    category: "Accessibility",
    content: "SignSync has transformed how I communicate with my colleagues and friends. The real-time translation is seamless, making conversations effortless and inclusive.",
    date: "2024-03-10"
  },
  {
    id: 2,
    name: "James Carter",
    role: "Sign Language Interpreter",
    company: "Language Services Inc.",
    image: "/api/placeholder/150/150",
    rating: 4.5,
    category: "Translation",
    content: "As an interpreter, I find SignSync incredibly useful. It enhances communication accuracy and bridges gaps between sign and spoken languages.",
    date: "2024-03-05"
  },
  {
    id: 3,
    name: "Olivia Martinez",
    role: "Educator",
    company: "Deaf Education Institute",
    image: "/api/placeholder/150/150",
    rating: 5,
    category: "Education",
    content: "SignSync has been a fantastic tool for my students. It makes learning sign language interactive and engaging, especially with the 3D avatar feature.",
    date: "2024-02-28"
  },
  {
    id: 4,
    name: "Daniel Lee",
    role: "Business Owner",
    company: "Inclusive Solutions",
    image: "/api/placeholder/150/150",
    rating: 4.5,
    category: "Business",
    content: "Integrating SignSync into our workplace has improved accessibility for our deaf employees. It’s an essential tool for fostering an inclusive environment.",
    date: "2024-02-20"
  }
];

const Testimonials = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const testimonialsPerPage = 6;

  const categories = ["all", ...new Set(testimonials.map(t => t.category))];
  const filteredTestimonials = testimonials.filter(
    t => filter === "all" || t.category === filter
  );

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );
  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say About SignSync</h1>
        <p className="text-xl text-gray-600 mb-8">Hear from those who have benefited from our real-time sign language translation.</p>
      </div>
      <div className="max-w-7xl mx-auto mb-8 flex justify-end">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <span>{testimonial.role}</span>
                    <span>•</span>
                    <span>{testimonial.company}</span>
                  </div>
                </div>
              </div>
              <Quote className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(testimonial.date).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
      <div className="max-w-3xl mx-auto mt-16">
        <Card className="bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the SignSync Community</h2>
            <p className="text-gray-600 mb-6">Experience seamless sign language communication today.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/dictphone')}>Get Started</Button>
              <Button onClick={() => navigate('/features')} variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;