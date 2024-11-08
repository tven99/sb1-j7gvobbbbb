export async function fetchBusinessInfo(businessId: string) {
  const response = await fetch(`/api/business/${businessId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch business info');
  }
  return response.json();
}

export async function updateBusinessInfo(businessId: string, data: any) {
  const response = await fetch(`/api/business/${businessId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update business info');
  }
  
  return response.json();
}