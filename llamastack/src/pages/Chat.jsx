import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Send, Mic, PaperclipIcon, MoreVertical, Settings, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/lib/supabase';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const messagesEndRef = useRef(null);
  const [savedChats, setSavedChats] = useState([]);
  const [llmSettings, setLlmSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSavedChats();
    }
  }, [session?.user?.id]);

  const fetchSavedChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedChats(data);
    } catch (error) {
      console.error('Error fetching saved chats:', error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput('');
      
      // Simulate AI response
      setTimeout(async () => {
        const aiResponse = { text: generateAIResponse(input), sender: 'ai', timestamp: new Date().toISOString() };
        const finalMessages = [...updatedMessages, aiResponse];
        setMessages(finalMessages);
        
        // Save the updated chat to Supabase
        await saveChat(finalMessages);
      }, 1000);
    }
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      `I understood your message: "${userInput}". How can I assist you further?`,
      `You said: "${userInput}". That's interesting! Can you tell me more?`,
      `I see you mentioned "${userInput}". Let's explore that topic together.`,
      `"${userInput}" - That's a great point! What else would you like to discuss?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveChat = async (chatMessages) => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert({
          user_id: session.user.id,
          name: `Chat ${savedChats.length + 1}`,
          messages: chatMessages,
        })
        .select();

      if (error) throw error;
      
      // Refresh the list of saved chats
      await fetchSavedChats();
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

  const removeChat = async (chatId) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;
      
      // Refresh the list of saved chats
      await fetchSavedChats();
    } catch (error) {
      console.error('Error removing chat:', error);
    }
  };

  const startEditingChat = (chatId, chatName) => {
    setEditingChatId(chatId);
    setEditingChatName(chatName);
  };

  const saveEditedChatName = async () => {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ name: editingChatName })
        .eq('id', editingChatId);

      if (error) throw error;
      
      // Refresh the list of saved chats
      await fetchSavedChats();
      setEditingChatId(null);
      setEditingChatName('');
    } catch (error) {
      console.error('Error updating chat name:', error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('messages')
        .eq('id', chatId)
        .single();

      if (error) throw error;
      
      setMessages(data.messages);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Chats</h2>
        </div>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search chats..."
            className="w-full"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {savedChats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              {editingChatId === chat.id ? (
                <Input
                  value={editingChatName}
                  onChange={(e) => setEditingChatName(e.target.value)}
                  onBlur={saveEditedChatName}
                  onKeyPress={(e) => e.key === 'Enter' && saveEditedChatName()}
                  className="w-full"
                />
              ) : (
                <>
                  <span onClick={() => loadChat(chat.id)} className="cursor-pointer">{chat.name}</span>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => startEditingChat(chat.id, chat.name)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeChat(chat.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                LLM Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>LLM Configuration</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="model" className="text-right">
                    Model
                  </Label>
                  <Select
                    value={llmSettings.model}
                    onValueChange={(value) => setLlmSettings({ ...llmSettings, model: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="temperature" className="text-right">
                    Temperature
                  </Label>
                  <div className="col-span-3">
                    <Slider
                      id="temperature"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[llmSettings.temperature]}
                      onValueChange={([value]) => setLlmSettings({ ...llmSettings, temperature: value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxTokens" className="text-right">
                    Max Tokens
                  </Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={llmSettings.maxTokens}
                    onChange={(e) => setLlmSettings({ ...llmSettings, maxTokens: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <MoreVertical className="h-6 w-6" />
            </Button>
            <Avatar>
              <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
              <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{profile?.first_name} {profile?.last_name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => saveChat(messages)}>
              Save Chat
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8">
                  {message.sender === 'user' ? (
                    <>
                      <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
                      <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/ai-avatar.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <Card className={`${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <CardContent className="p-3">
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;