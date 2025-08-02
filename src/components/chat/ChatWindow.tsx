import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  contactId?: string;
  contactName?: string;
  isOnline?: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How are you doing?",
    timestamp: "10:30 AM",
    isOwn: false,
    status: "read"
  },
  {
    id: "2",
    text: "I'm doing great, thanks for asking! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
    status: "read"
  },
  {
    id: "3",
    text: "I'm good too! Working on some exciting projects lately.",
    timestamp: "10:33 AM",
    isOwn: false,
    status: "read"
  },
  {
    id: "4",
    text: "That sounds amazing! Would love to hear more about them.",
    timestamp: "10:35 AM",
    isOwn: true,
    status: "delivered"
  },
  {
    id: "5",
    text: "Sure! Let's catch up over coffee sometime this week?",
    timestamp: "10:36 AM",
    isOwn: false,
    status: "sent"
  }
];

export const ChatWindow = ({ contactId, contactName = "Alice Johnson", isOnline = true }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        status: "sending"
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: "sent" } : msg
        ));
      }, 500);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: "delivered" } : msg
        ));
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!contactId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Welcome to ChatApp
          </h3>
          <p className="text-muted-foreground">
            Select a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {contactName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online rounded-full border-2 border-background" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{contactName}</h3>
              <p className="text-sm text-muted-foreground">
                {isOnline ? "Online" : "Last seen 2 hours ago"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"} animate-message-in`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-message ${
                  message.isOwn
                    ? "bg-gradient-message text-primary-foreground"
                    : "bg-chat-bubble-received text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className={`text-xs ${
                    message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp}
                  </span>
                  {message.isOwn && (
                    <div className="flex">
                      <div className={`w-3 h-3 ${
                        message.status === "read" ? "text-primary-foreground" :
                        message.status === "delivered" ? "text-primary-foreground/70" :
                        message.status === "sent" ? "text-primary-foreground/50" :
                        "text-primary-foreground/30"
                      }`}>
                        ✓{message.status === "read" || message.status === "delivered" ? "✓" : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card/30">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 bg-background"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};