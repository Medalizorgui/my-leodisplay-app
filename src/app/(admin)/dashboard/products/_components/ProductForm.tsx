"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the schema for product validation
import { productSchema, type ProductSchema } from "@/lib/zod";

interface ProductFormProps {
  defaultValues: ProductSchema;
  onSubmit: (data: ProductSchema) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  submitButtonText,
  isSubmitting,
}: ProductFormProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  // State for dynamic fields
  const [types, setTypes] = React.useState<string[]>(defaultValues.type || []);
  const [bases, setBases] = React.useState<string[]>(defaultValues.base || []);
  const [tailles, setTailles] = React.useState<string[]>(defaultValues.taille || []);
  const [barres, setBarres] = React.useState<string[]>(defaultValues.barre || []);

  // General handler functions for adding, removing, and changing dynamic fields
  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Submit handler that includes dynamic fields
  const handleSubmit = async (data: ProductSchema) => {
    await onSubmit({
      ...data,
      type: types,
      base: bases,
      taille: tailles,
      barre: barres,
    });
  };

  return (
    <div className="h-96 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Product Name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Product Description..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Product image URL..." />
                </FormControl>
                {field.value ? (
                  <img src={field.value} alt="Product Image" />
                ) : (
                  <p>No image available</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Product Price..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dynamic Fields */}
          <div>
            <FormLabel>Type</FormLabel>
            {types.map((type, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <FormControl className="flex-grow">
                  <Input
                    value={type}
                    onChange={(e) => handleFieldChange(setTypes, index, e.target.value)}
                    placeholder="Enter type"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => handleRemoveField(setTypes, index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => handleAddField(setTypes)} className="mt-2">
              Add Type
            </Button>
          </div>

          {/* Base Field */}
          <div>
            <FormLabel>Base</FormLabel>
            {bases.map((base, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <FormControl className="flex-grow">
                  <Input
                    value={base}
                    onChange={(e) => handleFieldChange(setBases, index, e.target.value)}
                    placeholder="Enter base"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => handleRemoveField(setBases, index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => handleAddField(setBases)} className="mt-2">
              Add Base
            </Button>
          </div>

          {/* Taille Field */}
          <div>
            <FormLabel>Taille</FormLabel>
            {tailles.map((taille, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <FormControl className="flex-grow">
                  <Input
                    value={taille}
                    onChange={(e) => handleFieldChange(setTailles, index, e.target.value)}
                    placeholder="Enter taille"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => handleRemoveField(setTailles, index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => handleAddField(setTailles)} className="mt-2">
              Add Taille
            </Button>
          </div>

          {/* Barre Field */}
          <div>
            <FormLabel>Barre</FormLabel>
            {barres.map((barre, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <FormControl className="flex-grow">
                  <Input
                    value={barre}
                    onChange={(e) => handleFieldChange(setBarres, index, e.target.value)}
                    placeholder="Enter barre"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => handleRemoveField(setBarres, index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => handleAddField(setBarres)} className="mt-2">
              Add Barre
            </Button>
          </div>

          {/* Submit Button */}
          <Button disabled={isSubmitting} className="w-full relative" type="submit">
            {isSubmitting ? (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/50 rounded-md">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
