import { useState, useRef } from 'react';
import { Lock, CheckCircle, Send, Hash, Shield, Upload, File as FileIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAppContext } from '../context/AppContext';

export function BiddingDashboard() {
  const { tenders, submitBid } = useAppContext();
  
  const openTenders = tenders.filter(t => t.status === 'open');
  const [selectedTender, setSelectedTender] = useState(openTenders[0]?.id || '');
  
  const [bidData, setBidData] = useState({
    cost: '',
    timeline: '',
    materials: '',
    companyName: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const [encrypted, setEncrypted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verificationHash, setVerificationHash] = useState('');

  const selectedTenderData = tenders.find(t => t.id === selectedTender);

  const handleEncrypt = () => {
    setEncrypted(true);
    // Simulate encryption process
    setTimeout(() => {
      const hash = '0x' + Math.random().toString(16).substr(2, 64);
      setVerificationHash(hash);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    if (encrypted && verificationHash) {
      // Fire global context save action
      submitBid(selectedTender, {
        contractorName: bidData.companyName,
        cost: Number(bidData.cost),
        timeline: Number(bidData.timeline),
        materials: bidData.materials + (uploadedFileName ? ` [Attached Report: ${uploadedFileName}]` : ''),
        encrypted: true,
        verificationHash
      });
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setBidData({
      cost: '',
      timeline: '',
      materials: '',
      companyName: ''
    });
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setEncrypted(false);
    setSubmitted(false);
    setVerificationHash('');
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Bid Successfully Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your encrypted bid has been recorded on the blockchain and will remain sealed until the deadline.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-gray-600" />
              <p className="text-sm text-gray-900">Verification Hash</p>
            </div>
            <code className="text-xs text-gray-600 break-all block bg-white p-3 rounded border">
              {verificationHash}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Save this hash as proof of submission. It can be used to verify your bid later.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mb-6 text-left max-w-md mx-auto">
            <p><strong>Tender:</strong> {selectedTenderData?.title}</p>
            <p><strong>Your Bid:</strong> ₹{Number(bidData.cost).toLocaleString()}</p>
            <p><strong>Timeline:</strong> {bidData.timeline} days</p>
            {uploadedFileName && <p><strong>Report:</strong> {uploadedFileName}</p>}
            <p><strong>Status:</strong> <Badge className="bg-blue-100 text-blue-800">Encrypted & Sealed</Badge></p>
          </div>

          <Button onClick={resetForm}>
            Submit Another Bid
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Submit Bid</h1>
        <p className="text-gray-600">
          Submit your bid securely. All bids are encrypted and sealed until the deadline.
        </p>
      </div>

      {/* Tender Selection */}
      <Card className="p-6">
        <Label htmlFor="tender-select">Select Tender</Label>
        {openTenders.length === 0 ? (
          <div className="mt-2 text-sm text-red-500 bg-red-50 p-3 rounded">
            There are currently no open tenders available to bid on.
          </div>
        ) : (
          <select
            id="tender-select"
            value={selectedTender}
            onChange={(e) => setSelectedTender(e.target.value)}
            className="w-full mt-2 px-3 py-2 border rounded-md"
          >
            {openTenders.map((tender) => (
              <option key={tender.id} value={tender.id}>
                {tender.title} - Max Budget: ₹{tender.maxBudget.toLocaleString()}
              </option>
            ))}
          </select>
        )}

        {selectedTenderData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-900 mb-2">{selectedTenderData.description}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Deadline: {new Date(selectedTenderData.deadline).toLocaleDateString()}</span>
              <span>•</span>
              <span>Max Budget: ₹{selectedTenderData.maxBudget.toLocaleString()}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Bid Form */}
      {selectedTenderData && (
        <Card className="p-6">
          <h2 className="text-gray-900 mb-6">Bid Details</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={bidData.companyName}
                onChange={(e) => setBidData({ ...bidData, companyName: e.target.value })}
                className="mt-2"
                disabled={encrypted}
              />
            </div>

            <div>
              <Label htmlFor="cost">Bid Amount (₹)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="Enter your bid amount"
                value={bidData.cost}
                onChange={(e) => setBidData({ ...bidData, cost: e.target.value })}
                className="mt-2"
                disabled={encrypted}
              />
              {bidData.cost && Number(bidData.cost) > selectedTenderData.maxBudget && (
                <p className="text-sm text-red-600 mt-1">
                  Warning: Your bid exceeds the maximum budget.
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="timeline">Project Timeline (Days)</Label>
              <Input
                id="timeline"
                type="number"
                placeholder="Number of days to complete"
                value={bidData.timeline}
                onChange={(e) => setBidData({ ...bidData, timeline: e.target.value })}
                className="mt-2"
                disabled={encrypted}
              />
            </div>

            <div>
              <Label htmlFor="materials">Materials & Approach</Label>
              <Textarea
                id="materials"
                placeholder="Describe the materials you will use and your approach to the project"
                value={bidData.materials}
                onChange={(e) => setBidData({ ...bidData, materials: e.target.value })}
                className="mt-2 min-h-32"
                disabled={encrypted}
              />
            </div>
            
            <div className="pt-4 border-t">
              <Label className="mb-2 block">Upload Evaluation Report (Required)</Label>
              <p className="text-xs text-gray-500 mb-3">Please upload a detailed report spanning cost, sourcing, and timelines for evaluation.</p>
              
              <div className="flex items-center gap-3">
                <Input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx"
                  disabled={encrypted}
                />
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={encrypted}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                {uploadedFileName ? (
                  <span className="text-sm text-green-600 flex items-center">
                    <FileIcon className="h-4 w-4 mr-1" />
                    {uploadedFileName} attached
                  </span>
                ) : (
                  <span className="text-sm text-gray-400 italic">No file chosen</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Encryption Status */}
      {selectedTenderData && (
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
              encrypted ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Lock className={`h-6 w-6 ${encrypted ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <h3 className="text-gray-900">Bid Encryption</h3>
              <p className="text-sm text-gray-600">
                {encrypted 
                  ? 'Your bid is encrypted and ready to submit' 
                  : 'Encrypt your bid before submission'}
              </p>
            </div>
          </div>

          {!encrypted ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 mb-2">
                      <strong>How Encryption Works:</strong>
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Your bid will be encrypted using blockchain technology</li>
                      <li>• No one (including admins) can see your bid until the deadline</li>
                      <li>• You'll receive a verification hash as proof of submission</li>
                      <li>• All bids are revealed simultaneously after the deadline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleEncrypt}
                disabled={!bidData.cost || !bidData.timeline || !bidData.materials || !bidData.companyName || !uploadedFileName}
                className="w-full"
              >
                <Lock className="h-4 w-4 mr-2" />
                Encrypt Bid
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-900">Bid Successfully Encrypted</p>
                </div>
                <p className="text-sm text-green-800">
                  Your bid is now sealed and ready for submission. The encryption ensures complete transparency and fairness.
                </p>
              </div>

              {verificationHash && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-900">Preliminary Hash</p>
                  </div>
                  <code className="text-xs text-gray-600 break-all block bg-white p-2 rounded">
                    {verificationHash}
                  </code>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEncrypted(false);
                    setVerificationHash('');
                  }}
                  className="flex-1"
                >
                  Edit Bid
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Encrypted Bid
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-gray-900 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Bids cannot be modified after encryption</li>
          <li>• All bids are automatically revealed after the deadline</li>
          <li>• The lowest qualified bid typically wins the contract</li>
          <li>• You can track bid evaluation in the admin dashboard</li>
          <li>• Payment terms are defined in the smart contract</li>
        </ul>
      </div>
    </div>
  );
}
