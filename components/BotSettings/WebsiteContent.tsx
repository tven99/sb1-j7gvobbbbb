"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function WebsiteContent({ businessId }: { businessId: string }) {
  const [url, setUrl] = useState('');
  const [paths, setPaths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddPath = () => {
    setPaths([...paths, '']);
  };

  const handlePathChange = (index: number, value: string) => {
    const newPaths = [...paths];
    newPaths[index] = value;
    setPaths(newPaths);
  };

  const handleRemovePath = (index: number) => {
    setPaths(paths.filter((_, i) => i !== index));
  };

  const handleScan = async () => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Here you would typically make an API call to scan the website
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSuccess(true);
    } catch (err) {
      setError('Failed to scan website. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Content Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="website-url">Main Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="website-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-website.com"
                className="flex-grow"
              />
              <Button onClick={handleScan} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning
                  </>
                ) : (
                  'Scan'
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Paths to Scan</Label>
            {paths.map((path, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={path}
                  onChange={(e) => handlePathChange(index, e.target.value)}
                  placeholder="/about, /products, etc."
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemovePath(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddPath}>
              Add Path
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>Website content successfully scanned and processed!</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}