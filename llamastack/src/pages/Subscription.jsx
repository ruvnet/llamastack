import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Check } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Subscription = () => {
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);

  const plans = [
    {
      name: 'Basic',
      price: '$9.99/month',
      features: ['Up to 100 posts per month', 'Basic analytics', 'Standard support'],
      color: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      features: ['Unlimited posts', 'Advanced analytics', 'Priority support', 'Custom themes'],
      color: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      name: 'Enterprise',
      price: '$49.99/month',
      features: ['All Pro features', 'Dedicated account manager', 'API access', 'Custom integrations'],
      color: 'bg-green-100 dark:bg-green-900',
    },
  ];

  const handleSubscribe = (planName) => {
    // Here you would typically integrate with a payment provider
    // and update the user's subscription in your database
    alert(`Subscribing to ${planName} plan. Implement payment integration here.`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
      {profile && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Current Plan: <span className="font-semibold">{profile.subscription_plan || 'Free'}</span></p>
            <p>Next billing date: {profile.next_billing_date || 'N/A'}</p>
            <div className="mt-4">
              <Switch id="auto-renew" />
              <Label htmlFor="auto-renew" className="ml-2">Auto-renew subscription</Label>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={`${plan.color} border-0`}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={profile && profile.subscription_plan === plan.name ? "outline" : "default"}
                onClick={() => handleSubscribe(plan.name)}
              >
                {profile && profile.subscription_plan === plan.name ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscription;