import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Copy, 
  Check, 
  Link, 
  Facebook, 
  Twitter, 
  Send, 
  Mail,
  MessageCircle,
  X,
  QrCode,
  Download
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic: {
    id: string;
    title: string;
    type?: string;
  };
  onShareComplete?: (platform: string) => void;
}

export const ShareDialog = ({ open, onOpenChange, topic, onShareComplete }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}/community/topic/${topic.id}`;
  const shareText = `Verifică acest topic interesant: "${topic.title}"`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      toast({
        title: "Link copiat!",
        description: "Link-ul a fost copiat în clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
      onShareComplete?.('clipboard');
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut copia link-ul.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: topic.title,
          text: shareText,
          url: shareUrl,
        });
        onShareComplete?.('native');
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast({
            title: "Eroare",
            description: "Nu s-a putut partaja.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const shareOptions = [
    {
      id: 'native',
      name: 'Partajează',
      icon: Share2,
      onClick: handleNativeShare,
      available: !!navigator.share,
      color: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400',
    },
    {
      id: 'copy',
      name: copied ? 'Copiat!' : 'Copiază Link',
      icon: copied ? Check : Copy,
      onClick: handleCopyLink,
      available: true,
      color: copied 
        ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400' 
        : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        onShareComplete?.('facebook');
      },
      available: true,
      color: 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-300',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      onClick: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        onShareComplete?.('twitter');
      },
      available: true,
      color: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-400',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: Send,
      onClick: () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
        onShareComplete?.('telegram');
      },
      available: true,
      color: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank', 'width=600,height=400');
        onShareComplete?.('whatsapp');
      },
      available: true,
      color: 'bg-green-600/10 hover:bg-green-600/20 text-green-400',
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      onClick: () => {
        const subject = encodeURIComponent(`Topicul: ${topic.title}`);
        const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
        const url = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = url;
        onShareComplete?.('email');
      },
      available: true,
      color: 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400',
    },
  ];

  const availableOptions = shareOptions.filter(option => option.available);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900/95 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Partajează Topicul
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Topic Preview */}
          <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
            <h4 className="font-medium text-white mb-1">{topic.title}</h4>
            <p className="text-sm text-gray-400">
              {topic.type && (
                <span className="capitalize">{topic.type} • </span>
              )}
              Comunitate
            </p>
          </div>

          {/* URL Display */}
          <div className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <Link className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-300 truncate flex-1">{shareUrl}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyLink}
              className="h-8 w-8 p-0 hover:bg-purple-500/20"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {availableOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    onClick={option.onClick}
                    variant="ghost"
                    className={cn(
                      "w-full h-16 flex flex-col gap-1 border border-gray-700/50 transition-all duration-200",
                      option.color
                    )}
                  >
                    <option.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{option.name}</span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Analytics Note */}
          <p className="text-xs text-gray-500 text-center">
            Partajările sunt monitorizate pentru statistici.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};