import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Clock, Phone, Send } from 'lucide-react';
import contactImage from '../assets/image4.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending message...' });
    
    try {
      setStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Reach out to us for any inquiries, support, or collaboration opportunities.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img src={contactImage} alt="Contact Us" className="rounded-xl shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">How to Reach Us</h2>
            <p className="mt-4 text-lg text-slate-600">
              Our team is available to assist you with any queries. Whether you need technical support, want to collaborate, or just have a question, feel free to reach out.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3 text-slate-700">
                <Mail className="h-5 w-5 text-purple-500" /> support@signbridge.ai
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Phone className="h-5 w-5 text-purple-500" /> +1 (234) 567-890
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Clock className="h-5 w-5 text-purple-500" /> Monday - Friday, 9 AM - 6 PM (EST)
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Mail className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-gray-600">
                  Get in touch with us via email for detailed inquiries and support.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Phone className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-sm text-gray-600">
                  Speak directly with our team for quick assistance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Clock className="h-8 w-8 text-purple-500" />
                <h3 className="font-semibold">Available Hours</h3>
                <p className="text-sm text-gray-600">
                  Our support team is available from 9 AM - 6 PM EST, Monday to Friday.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below, and our team will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What would you like to discuss?" required />
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows={5} required />
              {status.message && <Alert variant={status.type === 'error' ? 'destructive' : 'default'}><AlertDescription>{status.message}</AlertDescription></Alert>}
              <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-400 text-white">
                <Send className="mr-2 h-4 w-4" />Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
