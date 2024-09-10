import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from 'next-themes';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile, useUpdateProfile } from '@/integrations/supabase/hooks/profiles';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { checkForStoredApiKey, encryptAndStoreApiKey, getStoredApiKey } from '@/utils/apiKeyStorage';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState({
    email: '',
    notifications: true,
  });

  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [showNewKeyValue, setShowNewKeyValue] = useState(false);
  const [hasCloudflareApiKey, setHasCloudflareApiKey] = useState(false);
  const [cloudflareApiKey, setCloudflareApiKey] = useState('');

  useEffect(() => {
    setMounted(true);
    if (profile) {
      setFormData({
        email: profile.email || '',
        notifications: profile.notifications !== undefined ? profile.notifications : true,
      });
    }
    // Load API keys from local storage
    const storedKeys = JSON.parse(localStorage.getItem('apiKeys') || '[]');
    setApiKeys(storedKeys);

    // Check for Cloudflare API key
    const checkApiKey = async () => {
      const hasStoredKey = await checkForStoredApiKey();
      setHasCloudflareApiKey(hasStoredKey);
      if (hasStoredKey) {
        const storedKey = await getStoredApiKey();
        setCloudflareApiKey(storedKey);
      }
    };
    checkApiKey();
  }, [profile]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        id: session.user.id,
        ...formData,
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleAddApiKey = () => {
    if (newKeyName && newKeyValue) {
      const newKey = { name: newKeyName, value: newKeyValue };
      const updatedKeys = [...apiKeys, newKey];
      setApiKeys(updatedKeys);
      localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
      setNewKeyName('');
      setNewKeyValue('');
      setShowNewKeyValue(false);
    }
  };

  const handleDeleteApiKey = (index) => {
    const updatedKeys = apiKeys.filter((_, i) => i !== index);
    setApiKeys(updatedKeys);
    localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
  };

  const handleUpdateCloudflareApiKey = async () => {
    if (newKeyValue) {
      const success = await encryptAndStoreApiKey(newKeyValue);
      if (success) {
        setHasCloudflareApiKey(true);
        setCloudflareApiKey(newKeyValue);
        setNewKeyValue('');
        alert('Cloudflare API key updated successfully!');
      } else {
        alert('Failed to update Cloudflare API key. Please try again.');
      }
    }
  };

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSave}>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button type="submit">Save Account Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
                <Button type="submit">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                  />
                </div>
                <Button type="submit">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Cloudflare API Key</h3>
                {hasCloudflareApiKey ? (
                  <p>Cloudflare API key is set. To update, enter a new key below.</p>
                ) : (
                  <p>No Cloudflare API key set. Please enter your API key below.</p>
                )}
                <div className="flex space-x-2">
                  <Input
                    type={showNewKeyValue ? 'text' : 'password'}
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                    placeholder="Enter Cloudflare API key"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNewKeyValue(!showNewKeyValue)}
                  >
                    {showNewKeyValue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button onClick={handleUpdateCloudflareApiKey}>
                  {hasCloudflareApiKey ? 'Update' : 'Save'} Cloudflare API Key
                </Button>
                {cloudflareApiKey && (
                  <p className="mt-2">Current Cloudflare API Key: {cloudflareApiKey.substring(0, 5)}...</p>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Other API Keys</h3>
                {apiKeys.map((key, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{key.name}</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteApiKey(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New API Key</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newKeyName">Key Name</Label>
                      <Input
                        id="newKeyName"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="Enter key name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newKeyValue">API Key</Label>
                      <div className="relative">
                        <Input
                          id="newKeyValue"
                          type={showNewKeyValue ? 'text' : 'password'}
                          value={newKeyValue}
                          onChange={(e) => setNewKeyValue(e.target.value)}
                          placeholder="Enter API key"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowNewKeyValue(!showNewKeyValue)}
                        >
                          {showNewKeyValue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handleAddApiKey}>Add Key</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" onClick={() => alert('Account deletion functionality to be implemented')}>
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;