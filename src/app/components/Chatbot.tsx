import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  // General Platform Questions
  'what is golden thread': 'Civic Chain is a civic engagement platform that tracks public funds through the complete lifecycle from citizen participation to project completion. It follows a "Vote → Bid → Build" process to ensure transparency and accountability.',
  'what is civic chain': 'Civic Chain is a civic engagement platform that tracks public funds through the complete lifecycle from citizen participation to project completion. It follows a "Vote → Bid → Build" process to ensure transparency and accountability.',
  'how does it work': 'The platform works in three phases: 1) Citizens vote on proposals, 2) Contractors bid on approved projects, 3) Projects are built with milestone tracking and verification. Everything is transparent and trackable.',
  'who can use': 'There are three user types: Citizens (no login required) can submit proposals and vote, Contractors (login required) can bid on projects, and Admins (login required) can manage projects and approve milestones.',
  
  // Citizen Portal
  'submit proposal': 'Go to "Voice Your Needs" in the Citizen Portal. Fill out the form with your project idea, add tags, and submit. Our AI will suggest relevant tags to help categorize your proposal.',
  'how to vote': 'Visit the "Community Wishlist" to see all active proposals. Click the thumbs up or thumbs down button to vote. You can also leave comments with your feedback.',
  'citizen access': 'Citizens have full access without any login! You can submit proposals, vote on ideas, track project status, and explore all active projects on the map.',
  
  // Contractor Portal
  'contractor login': 'To access contractor features, click on the role selector in the header and choose "Contractor". Use username "123" and password "123" to login. After login, you can submit bids and track your projects.',
  'submit bid': 'After logging in as a contractor, go to "Submit Bid" or view "Open Tenders". Select a project, enter your bid amount, timeline, and credentials, then submit. Admins will review all bids.',
  'track projects': 'In the "My Projects" section (contractor login required), you can see all your active projects, upload milestone photos, and update progress.',
  'upload photos': 'In your project dashboard, go to the milestone section and click "Upload Photo". You can upload progress photos from your mobile device at the job site.',
  
  // Admin Portal
  'admin login': 'Click on the role selector and choose "Admin". Use username "123" and password "123" to login. Admins can add projects, review bids, approve milestones, and access governance tools.',
  'add project': 'After admin login, click the "Add New Project" button in the Admin Dashboard. Fill in the project details including title, description, budget, category, and location.',
  'approve bids': 'In the Admin Dashboard, go to the "Bid Review" tab. You can see all submitted bids with AI-powered scoring. Review and approve the best bid for each project.',
  'review milestones': 'Go to the "Approvals" tab in Admin Dashboard. Review submitted milestone photos (with AI verification) and approve or request revisions.',
  
  // Technical Features
  'ai features': 'Civic Chain uses AI for: 1) Tag suggestions for proposals, 2) Sentiment analysis of community feedback, 3) Automated bid scoring, 4) Computer vision verification of milestone photos.',
  'blockchain': 'We use blockchain-style verification to ensure transparency. All transactions, votes, and milestones are recorded immutably for public audit.',
  'map view': 'The Project Explorer includes an interactive map showing all projects by location. Click on markers to see project details and status.',
  
  // Payment & Budget
  'payment system': 'We use an escrow payment system. Funds are released to contractors upon milestone completion and admin approval. This ensures quality and accountability.',
  'budget tracking': 'All project budgets are transparent and trackable. You can see allocated vs. spent amounts in real-time on the Project Status Dashboard.',
  
  // Default credentials
  'login credentials': 'For demo purposes, both Contractor and Admin logins use: Username: "123", Password: "123"',
  'password': 'The demo password for both contractor and admin accounts is "123"',
  'username': 'The demo username for both contractor and admin accounts is "123"',
};

const QUICK_QUESTIONS = [
  'How does it work?',
  'How to submit a proposal?',
  'How to login as contractor?',
  'How to add a project?',
  'What are AI features?',
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Civic Chain assistant. I can help you with questions about using the platform, submitting proposals, bidding on projects, and more. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Find exact or partial matches
    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    // Check for specific keywords
    if (lowerQuestion.includes('login') || lowerQuestion.includes('sign in')) {
      return 'To login: Select either "Contractor" or "Admin" from the role selector in the header. Use username "123" and password "123". Citizens don\'t need to login!';
    }
    
    if (lowerQuestion.includes('vote') || lowerQuestion.includes('voting')) {
      return 'Visit the "Community Wishlist" to vote on proposals. Click thumbs up to support or thumbs down if you have concerns. Your voice matters!';
    }
    
    if (lowerQuestion.includes('bid') || lowerQuestion.includes('tender')) {
      return 'Contractors can view open tenders and submit bids after logging in. Go to "Submit Bid" in the Contractor Portal to see available projects.';
    }

    if (lowerQuestion.includes('project') || lowerQuestion.includes('track')) {
      return 'You can track all projects in the "Project Status Dashboard" or view them on the interactive map in "Project Explorer". No login required!';
    }

    if (lowerQuestion.includes('citizen')) {
      return 'Citizens can submit proposals in "Voice Your Needs" and vote in "Community Wishlist" without any login. Your participation drives community development!';
    }

    if (lowerQuestion.includes('admin')) {
      return 'Admins can login (username: 123, password: 123) to access the Admin Dashboard where they can add projects, review bids, and approve milestones.';
    }

    if (lowerQuestion.includes('contractor')) {
      return 'Contractors need to login (username: 123, password: 123) to submit bids and manage their active projects. Visit "My Projects" after login.';
    }

    // Default response
    return 'I\'m not sure about that specific question. Here are some topics I can help with:\n\n• How to submit proposals\n• Voting on community ideas\n• Contractor login and bidding\n• Admin project management\n• AI features\n• Payment and budget tracking\n\nTry asking about any of these topics!';
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Civic Chain Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-medium">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((question) => (
                    <Badge
                      key={question}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1"
              />
              <Button onClick={() => handleSend()} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
          </>
        )}
      </Button>
    </>
  );
}