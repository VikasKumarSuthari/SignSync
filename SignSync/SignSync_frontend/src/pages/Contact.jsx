import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Phone, Mail, Send, HandMetal, MessageSquare, Globe } from 'lucide-react';
import axios from "axios";

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
    console.log(formData);
    setStatus({ type: 'info', message: 'Sending message...' });

    // try {
    //   // Here you would typically make an API call to your backend
    //   // await api.post('/contact', formData);

    //   setStatus({
    //     type: 'success',
    //     message: 'Message sent successfully! We will get back to you soon.'
    //   });
    //   setFormData({ name: '', email: '', subject: '', message: '' });
    // } catch (error) {
    //   setStatus({
    //     type: 'error',
    //     message: 'Failed to send message. Please try again later.'
    //   });
    // }


    try {
      const response = await axios.post("http://localhost:3000/en/sendFeedbackEmail", formData);

      if (response.data.success) {
        setStatus({ type: "success", message: "Message sent successfully! We will get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Failed to send message. Please try again later." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }

  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Have questions about our sign language translation technology? We're here to help bridge the communication gap together.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <HandMetal className="h-8 w-8 text-purple-500" />
                  <h3 className="font-semibold">Sign Language Support</h3>
                  <p className="text-sm text-gray-600">
                    ASL and IS Support Available<br />
                    24/7 Video Chat Support
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <h3 className="font-semibold">Community Support</h3>
                  <p className="text-sm text-gray-600">
                    Join our Discord Community<br />
                    Connect with Users & Developers
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Globe className="h-8 w-8 text-purple-500" />
                  <h3 className="font-semibold">Global Accessibility</h3>
                  <p className="text-sm text-gray-600">
                    support@signbridge.ai<br />
                    Available in Multiple Regions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Whether you're a user, developer, or organization interested in our technology, we'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>

                {status.message && (
                  <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;