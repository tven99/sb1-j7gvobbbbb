"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Business = {
  id: string;
  name: string;
  info: {
    description: string;
    products: string;
    services: string;
  };
};

type BusinessContextType = {
  businesses: Business[];
  selectedBusinessId: string;
  addBusiness: (name: string) => string;
  selectBusiness: (id: string) => void;
  updateBusinessInfo: (id: string, info: Business['info']) => void;
  updateBusinessName: (id: string, name: string) => void;
  removeBusiness: (id: string) => void;
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('businesses');
      return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Business 1', info: { description: '', products: '', services: '' } }
      ];
    }
    return [{ id: '1', name: 'Business 1', info: { description: '', products: '', services: '' } }];
  });
  const [selectedBusinessId, setSelectedBusinessId] = useState(businesses[0].id);

  useEffect(() => {
    localStorage.setItem('businesses', JSON.stringify(businesses));
  }, [businesses]);

  const addBusiness = (name: string) => {
    const newBusiness: Business = {
      id: (businesses.length + 1).toString(),
      name,
      info: { description: '', products: '', services: '' }
    };
    setBusinesses([...businesses, newBusiness]);
    setSelectedBusinessId(newBusiness.id);
    return newBusiness.id;
  };

  const selectBusiness = (id: string) => {
    setSelectedBusinessId(id);
  };

  const updateBusinessInfo = (id: string, info: Business['info']) => {
    setBusinesses(businesses.map(business => 
      business.id === id ? { ...business, info } : business
    ));
  };

  const updateBusinessName = (id: string, name: string) => {
    setBusinesses(businesses.map(business =>
      business.id === id ? { ...business, name } : business
    ));
  };

  const removeBusiness = (id: string) => {
    const newBusinesses = businesses.filter(business => business.id !== id);
    setBusinesses(newBusinesses);
    
    // If we're removing the currently selected business, select another one
    if (id === selectedBusinessId && newBusinesses.length > 0) {
      setSelectedBusinessId(newBusinesses[0].id);
    }
  };

  return (
    <BusinessContext.Provider value={{ 
      businesses, 
      selectedBusinessId, 
      addBusiness, 
      selectBusiness, 
      updateBusinessInfo,
      updateBusinessName,
      removeBusiness
    }}>
      {children}
    </BusinessContext.Provider>
  );
}