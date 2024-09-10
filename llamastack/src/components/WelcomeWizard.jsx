import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { encryptAndStoreApiKey, checkForStoredApiKey } from '../utils/apiKeyStorage';

const WelcomeWizard = ({ onComplete }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const checkApiKey = async () => {
      const hasStoredKey = await checkForStoredApiKey();
      if (!hasStoredKey) {
        setOpen(true);
      }
    };
    checkApiKey();
  }, []);

  const handleApiKeySubmit = async () => {
    if (apiKey) {
      const success = await encryptAndStoreApiKey(apiKey);
      if (success) {
        setStep(step + 1);
      } else {
        alert('Failed to save API key. Please try again.');
      }
    }
  };

  const handleFinish = () => {
    setOpen(false);
    onComplete();
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <DialogTitle>Welcome to LlamaStack Advanced Management Dashboard</DialogTitle>
            <DialogContent>
              <p>This wizard will guide you through the initial setup process.</p>
              <Button onClick={() => setStep(2)}>Get Started</Button>
            </DialogContent>
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle>LlamaStack Account Verification</DialogTitle>
            <DialogContent>
              <p>Do you have a LlamaStack account?</p>
              <Button onClick={() => setStep(3)}>Yes, I have an account</Button>
              <Button onClick={() => window.open('https://llamastack.example.com/sign-up', '_blank')}>
                No, I need to create one
              </Button>
            </DialogContent>
          </>
        );
      case 3:
        return (
          <>
            <DialogTitle>API Key Setup</DialogTitle>
            <DialogContent>
              <p>Please enter your LlamaStack API key. You can find this in your LlamaStack dashboard under &apos;My Profile&apos; &gt; &apos;API Tokens&apos;.</p>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
              <Button onClick={handleApiKeySubmit}>Verify and Save Key</Button>
            </DialogContent>
          </>
        );
      case 4:
        return (
          <>
            <DialogTitle>Setup Complete</DialogTitle>
            <DialogContent>
              <p>Great! Your LlamaStack API key has been securely stored.</p>
              <Button onClick={handleFinish}>Go to Dashboard</Button>
            </DialogContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderStepContent()}
    </Dialog>
  );
};

export default WelcomeWizard;