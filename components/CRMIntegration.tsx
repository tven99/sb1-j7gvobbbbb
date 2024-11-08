"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CRMIntegration() {
  const [crmConfig, setCrmConfig] = useState({
    provider: '',
    apiKey: '',
  });

  const handleChange = (name: string, value: string) => {
    setCrmConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('CRM configuration submitted:', crmConfig);
    // You could also test the CRM connection here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium mb-1">CRM Provider</label>
            <Select onValueChange={(value) => handleChange('provider', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select CRM provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salesforce">Salesforce</SelectItem>
                <SelectItem value="hubspot">HubSpot</SelectItem>
                <SelectItem value="zoho">Zoho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">API Key</label>
            <Input 
              id="apiKey" 
              name="apiKey" 
              type="password" 
              value={crmConfig.apiKey} 
              onChange={(e) => handleChange('apiKey', e.target.value)} 
              required 
            />
          </div>
          <Button type="submit">Connect CRM</Button>
        </form>
      </CardContent>
    </Card>
  );
}