"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, X } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
}

interface CategorySelectorProps {
  selectedCategoryIds: string[];
  onSelectionChange: (categoryIds: string[]) => void;
  maxCategories?: number;
}

export function CategorySelector({
  selectedCategoryIds,
  onSelectionChange,
  maxCategories = 8,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategoryIds.includes(categoryId);
    
    if (isSelected) {
      // Remove category
      onSelectionChange(selectedCategoryIds.filter(id => id !== categoryId));
    } else {
      // Add category (if under limit)
      if (selectedCategoryIds.length < maxCategories) {
        onSelectionChange([...selectedCategoryIds, categoryId]);
      }
    }
  };

  const removeCategory = (categoryId: string) => {
    onSelectionChange(selectedCategoryIds.filter(id => id !== categoryId));
  };

  const selectedCategories = categories.filter(cat => 
    selectedCategoryIds.includes(cat.id)
  );

  const availableCategories = categories.filter(cat => 
    !selectedCategoryIds.includes(cat.id)
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Categories</label>
        <span className="text-xs text-gray-500">
          {selectedCategoryIds.length}/{maxCategories} selected
        </span>
      </div>

      {/* Selected Categories Display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {category.title}
              <button
                type="button"
                onClick={() => removeCategory(category.id)}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Category Selector */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            disabled={loading || selectedCategoryIds.length >= maxCategories}
          >
            {loading ? (
              "Loading categories..."
            ) : selectedCategoryIds.length >= maxCategories ? (
              "Maximum categories reached"
            ) : (
              <>
                Select Categories
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <ScrollArea className="h-60">
            <div className="p-4 space-y-2">
              {availableCategories.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No more categories available
                </p>
              ) : (
                availableCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <Checkbox
                      checked={selectedCategoryIds.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{category.title}</p>
                      {category.description && (
                        <p className="text-xs text-gray-500 truncate">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Select up to {maxCategories} categories for this product
      </p>
    </div>
  );
}
