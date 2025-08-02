import { useState } from "react";
import { Search, Plus, Settings, Users, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2 min ago",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: "2", 
    name: "Bob Smith",
    avatar: "",
    lastMessage: "Thanks for the help earlier",
    timestamp: "1 hour ago",
    isOnline: true,
    unreadCount: 0
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "",
    lastMessage: "See you tomorrow!",
    timestamp: "3 hours ago", 
    isOnline: false,
    unreadCount: 1
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "",
    lastMessage: "The project looks great",
    timestamp: "1 day ago",
    isOnline: false,
    unreadCount: 0
  }
];

interface ChatSidebarProps {
  selectedContactId?: string;
  onContactSelect: (contactId: string) => void;
}

export const ChatSidebar = ({ selectedContactId, onContactSelect }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-chat-sidebar border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact.id)}
            className={`p-4 border-b border-border/50 cursor-pointer transition-colors hover:bg-accent/50 ${
              selectedContactId === contact.id ? "bg-accent" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {contact.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online rounded-full border-2 border-chat-sidebar animate-pulse-glow" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {contact.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground ml-2">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              You
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Your Name</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <div className="w-3 h-3 bg-online rounded-full animate-pulse-glow" />
        </div>
      </div>
    </div>
  );
};