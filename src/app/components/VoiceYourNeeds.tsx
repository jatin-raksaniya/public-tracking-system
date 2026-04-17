import { useState } from 'react';
import { Sparkles, Send, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

const aiSuggestedTags = [
  'Infrastructure', 'Safety', 'Roads', 'Environment', 
  'Recreation', 'Technology', 'Health', 'Education',
  'Waste Management', 'Water Supply', 'Electricity', 'Transportation'
];

export function VoiceYourNeeds() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    
    // Simulate AI tag suggestions based on content
    if (value.length > 20) {
      const suggestions: string[] = [];
      const lowerValue = value.toLowerCase();
      
      if (lowerValue.includes('road') || lowerValue.includes('street')) {
        suggestions.push('Roads', 'Infrastructure');
      }
      if (lowerValue.includes('light') || lowerValue.includes('lamp')) {
        suggestions.push('Safety', 'Infrastructure');
      }
      if (lowerValue.includes('park') || lowerValue.includes('garden')) {
        suggestions.push('Recreation', 'Environment');
      }
      if (lowerValue.includes('waste') || lowerValue.includes('garbage')) {
        suggestions.push('Waste Management', 'Environment');
      }
      if (lowerValue.includes('water') || lowerValue.includes('drain')) {
        suggestions.push('Water Supply', 'Infrastructure');
      }
      if (lowerValue.includes('safe') || lowerValue.includes('security')) {
        suggestions.push('Safety');
      }
      
      setAiSuggestions([...new Set(suggestions)]);
    } else {
      setAiSuggestions([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (title && description) {
      setSubmitted(true);
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setSelectedTags([]);
        setAiSuggestions([]);
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Voice Your Needs</h1>
        <p className="text-gray-600">
          Share your ideas for improving our community. Every suggestion matters.
        </p>
      </div>

      {submitted ? (
        <Card className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Proposal Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your proposal has been submitted to the community wishlist. Citizens can now vote on it.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Proposal
          </Button>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                placeholder="e.g., Install streetlights in Sector 4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your proposal in detail. What problem does it solve? Who will benefit?"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="mt-2 min-h-32"
              />
              {description.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {description.length} characters
                </p>
              )}
            </div>

            {/* AI Tag Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-900">AI-Suggested Tags</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* All Tags */}
            <div>
              <Label>Categories & Tags</Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Select relevant categories to help organize your proposal
              </p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <p className="text-sm text-gray-600 mt-3">
                  Selected: {selectedTags.join(', ')}
                </p>
              )}
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={handleSubmit}
                disabled={!title || !description}
                className="w-full"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>What happens next?</strong><br />
                Your proposal will be reviewed by AI for categorization and then published to the 
                Community Wishlist where citizens can vote. Proposals with the most votes will be 
                prioritized for implementation.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
