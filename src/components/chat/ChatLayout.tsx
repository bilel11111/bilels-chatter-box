import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";

const mockContactData = {
  "1": { name: "Alice Johnson", isOnline: true },
  "2": { name: "Bob Smith", isOnline: true },
  "3": { name: "Carol Davis", isOnline: false },
  "4": { name: "David Wilson", isOnline: false }
};

export const ChatLayout = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>();

  const selectedContact = selectedContactId ? mockContactData[selectedContactId as keyof typeof mockContactData] : null;

  return (
    <div className="h-screen flex bg-gradient-chat">
      <ChatSidebar
        selectedContactId={selectedContactId}
        onContactSelect={setSelectedContactId}
      />
      <ChatWindow
        contactId={selectedContactId}
        contactName={selectedContact?.name}
        isOnline={selectedContact?.isOnline}
      />
    </div>
  );
};