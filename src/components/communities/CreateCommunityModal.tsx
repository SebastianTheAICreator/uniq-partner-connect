
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Lock, 
  Globe, 
  Plus,
  Hash
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommunityCreated: (community: any) => void;
}

const COMMUNITY_CATEGORIES = [
  'Technology', 'Design', 'Business', 'Science', 'Art', 'Gaming',
  'Education', 'Health', 'Travel', 'Food', 'Music', 'Sports'
];

const CreateCommunityModal = ({ isOpen, onClose, onCommunityCreated }: CreateCommunityModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false,
    tags: [] as string[],
    rules: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [newRule, setNewRule] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newCommunity = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        avatar: '',
        coverImage: '',
        memberCount: 1,
        postCount: 0,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
        moderators: ['current-user'],
        settings: {
          allowPosts: true,
          allowComments: true,
          requireApproval: formData.isPrivate,
          allowInvites: true,
          autoModerationEnabled: false
        }
      };

      onCommunityCreated(newCommunity);
      
      toast({
        title: "Community created!",
        description: `${formData.name} has been created successfully.`
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        isPrivate: false,
        tags: [],
        rules: []
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create community. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const removeRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Community</DialogTitle>
          <DialogDescription className="text-gray-400">
            Build a space for people to connect around shared interests.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-200">Community Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter community name"
                className="bg-gray-800 border-gray-600 text-white"
                maxLength={50}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-200">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your community is about"
                className="bg-gray-800 border-gray-600 text-white resize-none"
                rows={3}
                maxLength={500}
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-200">Category *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {COMMUNITY_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={formData.category === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    className={formData.category === category 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-200">Privacy</Label>
                <p className="text-sm text-gray-400">
                  {formData.isPrivate ? 'Members need approval to join' : 'Anyone can join freely'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${!formData.isPrivate ? 'text-green-400' : 'text-gray-400'}`} />
                <Switch
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPrivate: checked }))}
                />
                <Lock className={`w-4 h-4 ${formData.isPrivate ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-gray-200">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-gray-800 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" className="border-gray-600">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-500/10 text-blue-300 border-blue-500/30"
                  >
                    <Hash className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-blue-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <Label className="text-gray-200">Community Rules</Label>
            <div className="flex gap-2">
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add a community rule"
                className="bg-gray-800 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRule())}
              />
              <Button type="button" onClick={addRule} variant="outline" className="border-gray-600">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.rules.length > 0 && (
              <div className="space-y-2">
                {formData.rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700"
                  >
                    <span className="text-sm text-gray-300">
                      {index + 1}. {rule}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Creating...' : 'Create Community'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
