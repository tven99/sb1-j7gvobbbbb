"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HelpCircle, X } from 'lucide-react';

interface CRMConnectionsProps {
  businessId: string;
}

interface CRMSystem {
  name: string;
  icon: string;
  connected: boolean;
  apiKey: string;
  customName: string;
}

const crmSystems = [
  { name: 'Salesforce', icon: '☁️' },
  { name: 'HubSpot', icon: '🧲' },
  { name: 'Zoho', icon: '📊' },
  { name: 'Pipedrive', icon: '🚀' },
  { name: 'Other', icon: '➕' },
];

export default function CRMConnections({ businessId }: CRMConnectionsProps) {
  const [connections, setConnections] = useState<CRMSystem[]>(
    crmSystems.map(crm => ({ ...crm, connected: false, apiKey: '', customName: '' }))
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
      console.log('Saving CRM connections for business:', businessId, connections);
    } catch (error) {
      console.error('Error saving connections:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          CRM Connections
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon"><HelpCircle className="h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-semibold mb-2">How to Connect CRM:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Select your CRM from the list</li>
                <li>Toggle the switch to enable the connection</li>
                <li>Enter the API key provided by your CRM</li>
                <li>For custom CRMs, enter a name and API key</li>
                <li>Click "Save Connections" to apply changes</li>
              </ol>
              <p className="mt-2 text-sm text-muted-foreground">Note: Ensure you have the necessary API credentials from your CRM provider before connecting.</p>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.map((crm, index) => (
            <div key={crm.name} className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor={`${crm.name}-toggle`} className="flex items-center space-x-2">
                  <span>{crm.icon}</span>
                  <span>{crm.name === 'Other' && crm.connected ? crm.customName || 'Custom CRM' : crm.name}</span>
                </Label>
              </div>
              <div className="flex items-center gap-4">
                {crm.connected && (
                  <>
                    {crm.name === 'Other' && (
                      <Input
                        placeholder="CRM Name"
                        value={crm.customName}
                        onChange={(e) => handleCustomNameChange(index, e.target.value)}
                        className="w-[200px]"
                      />
                    )}
                    <Input
                      type="password"
                      placeholder="API Key"
                      value={crm.apiKey}
                      onChange={(e) => handleApiKeyChange(index, e.target.value)}
                      className="w-[200px]"
                    />
                  </>
                )}
                <Switch
                  id={`${crm.name}-toggle`}
                  checked={crm.connected}
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