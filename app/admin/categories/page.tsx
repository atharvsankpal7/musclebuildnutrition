"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface CategorySection {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice?: number;
  displayImage: string;
  categoryFiles: string[];
  isFeatured: boolean;
  isActive: boolean;
  sections: CategorySection[];
}

const CategorySkeleton = () => (
  <Card className="flex flex-col h-full">
    <CardContent className="p-4 flex flex-col flex-grow">
      <div className="relative aspect-square mb-4 group overflow-hidden rounded-lg bg-gray-100">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
      </div>
    </CardContent>
  </Card>
);

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Categories (Fixed)</h1>
          <p className="text-sm text-gray-500">These 8 categories are fixed and cannot be added or removed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Card key={category.id} className="flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="relative aspect-square mb-4 group overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={category.displayImage}
                      alt={category.title}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2 space-x-1">
                      {category.isFeatured && (
                        <Badge className="bg-yellow-500">Featured</Badge>
                      )}
                      {!category.isActive && (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500">
                No categories found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
