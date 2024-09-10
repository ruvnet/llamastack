import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';

const FAQ = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    { 
      question: 'What is rUv?', 
      answer: 'rUv is a cutting-edge social media platform designed to help users capture and share their most memorable moments through images and connect with others who share similar interests.'
    },
    { 
      question: 'How do I create an account?', 
      answer: 'To create an account, click on the "Sign Up" button on the homepage. You\'ll be asked to provide your email address, create a password, and fill in some basic profile information. Once you\'ve completed these steps, you\'ll receive a confirmation email to verify your account.'
    },
    { 
      question: 'Is rUv free to use?', 
      answer: 'rUv offers both free and paid subscription plans. The basic features, including posting images and connecting with friends, are free. Advanced features such as analytics, custom themes, and priority support are available with our paid subscription plans.'
    },
    { 
      question: 'How can I reset my password?', 
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter the email address associated with your account, and we\'ll send you instructions on how to create a new password. For security reasons, password reset links are only valid for a limited time.'
    },
    { 
      question: 'Can I delete my account?', 
      answer: 'Yes, you can delete your account by going to the Settings page and selecting the "Delete Account" option. Please note that this action is irreversible and will permanently remove all your data from our servers. We recommend downloading any content you wish to keep before deleting your account.'
    },
  ];

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    setSubmittedQuestion(userQuestion);
    setUserQuestion('');
  };

  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {filteredFAQs.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Card>
        <CardHeader>
          <CardTitle>Can't find what you're looking for?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Input 
              name="question" 
              placeholder="Type your question here" 
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              required 
            />
            <Button type="submit">Submit Question</Button>
          </form>
        </CardContent>
      </Card>
      {submittedQuestion && (
        <Card>
          <CardHeader>
            <CardTitle>Your Submitted Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{submittedQuestion}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thank you for your question. Our support team will get back to you within 24-48 hours.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FAQ;