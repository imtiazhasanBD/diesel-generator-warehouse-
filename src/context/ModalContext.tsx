"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "@/components/QuoteModal";
import SearchModal from "@/components/SearchModal";

interface ModalContextType {
  openQuote: (subject?: string, kva?: number) => void;
  closeQuote: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");
  const [quoteKva, setQuoteKva] = useState(100);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openQuote = (subject = "", kva = 100) => {
    setQuoteSubject(subject);
    setQuoteKva(kva);
    setIsQuoteOpen(true);
  };

  const closeQuote = () => setIsQuoteOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <ModalContext.Provider value={{ openQuote, closeQuote, openSearch, closeSearch }}>
      {children}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={closeQuote}
        defaultGeneratorName={quoteSubject}
        defaultKva={quoteKva}
      />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    return {
      openQuote: () => {},
      closeQuote: () => {},
      openSearch: () => {},
      closeSearch: () => {},
    };
  }
  return context;
}

