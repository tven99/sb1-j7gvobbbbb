"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HelpCircle, X } from 'lucide-react';

interface ChatConnectionsProps {
  businessId: string;
}

interface ChatPlatform {
  name: string;
  icon: string;
  connected: boolean;
  apiKey: string;
  customName: string;
}

const platforms = [
  { name: 'WhatsApp', icon: '📱' },
  { name: 'Instagram', icon: '📷' },
  { name: 'Facebook Messenger', icon: '💬' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'Other', icon: '➕' },
];

export default function ChatConnections({ businessId }: ChatConnectionsProps) {
  const [connections, setConnections] = useState<ChatPlatform[]>(
    platforms.map(p => ({ ...p, connected: false, apiKey: '', customName: '' }))
  );

  const handleToggle = (index: number) => {
    setConnections(prev => prev.map((conn, i) => 
      i === index ? { ...conn, connected: !conn.connected } : conn
    ));
  };

  const handleApiKeyChange = (index: number, value: string) => {
    setConnections(prev => prev.map((conn, i) => 
      i === index ? { ...conn, apiKey: value } : conn
    ));
  };

  const handleCustomNameChange = (index: number, value: string) => {
    setConnections(prev => prev.map((conn, i) => 
      i === index ? { ...conn, customName: value } : conn
    ));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the connections
      console.log('Saving chat connections for business:', businessId, connections);
    } catch (error) {
      console.error('Error saving connections:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Chat Platform Connections
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon"><HelpCircle className="h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-semibold mb-2">How to Connect:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Select the platform you want to connect.</li>
                <li>Toggle the switch to enable the connection.</li>
                <li>Enter the API key provided by the platform.</li>
                <li>For custom platforms, enter a name and API key.</li>
                <li>Click "Save Connections" to apply changes.</li>
              </ol>
              <p className="mt-2 text-sm text-muted-foreground">Note: Ensure you have the necessary permissions and API access from each platform before connecting.</p>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.map((platform, index) => (
            <div key={platform.name} className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor={`${platform.name}-toggle`} className="flex items-center space-x-2">
                  <span>{platform.icon}</span>
                  <span>{platform.name === 'Other' && platform.connected ? platform.customName || 'Custom Platform' : platform.name}</span>
                </Label>
              </div>
              <div className="flex items-center gap-4">
                {platform.connected && (
                  <>
                    {platform.name === 'Other' && (
                      <Input
                        placeholder="Platform Name"
                        value={platform.customName}
                        onChange={(e) => handleCustomNameChange(index, e.target.value)}
                        className="w-[200px]"
                      />
                    )}
                    <Input
                      type="password"
                      placeholder="API Key"
                      value={platform.apiKey}
                      onChange={(e) => handleApiKeyChange(index, e.target.value)}
                      className="w-[200px]"
                    />
                  </>
                )}
                <Switch
                  id={`${platform.name}-toggle`}
                  checked={platform.connected}
                  onCheckedChange={() => handleToggle(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="mt-4">Save Connections</Button>
      </CardContent>
    </Card>
  );
}