"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { productSchema, type ProductSchema } from "@/lib/product/zod";

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
  const [barres, setBarres] = React.useState<string[]>(defaultValues.barre || []);
  const [bases, setBases] = React.useState<{ image: string; name: string; price: number }[]>(
    defaultValues.bases || []
  );
  const [tailles, setTailles] = React.useState<{ image:string; name: string; price: number }[]>(
    defaultValues.tailles || []
  );

  // Add a new base
  const handleAddBase = () => {
    setBases((prev) => [...prev, { image: "", name: "", price: 0 }]);
  };

  // Remove a base
  const handleRemoveBase = (index: number) => {
    setBases((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a base
  const handleBaseChange = (index: number, key: "image" | "name" | "price", value: string | number) => {
    setBases((prev) =>
      prev.map((base, i) => (i === index ? { ...base, [key]: value } : base))
    );
  };

  // Add a new taille
  const handleAddTaille = () => {
    setTailles((prev) => [...prev, { image: "",name: "", price: 0 }]);
  };

  // Remove a taille
  const handleRemoveTaille = (index: number) => {
    setTailles((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a taille
  const handleTailleChange = (index: number, key: "image" | "name" | "price", value: string | number) => {
    setTailles((prev) =>
      prev.map((taille, i) => (i === index ? { ...taille, [key]: value } : taille))
    );
  };

  // Submit handler that includes dynamic fields
  const handleSubmit = async (data: ProductSchema) => {
    await onSubmit({
      ...data,
      type: types,
      bases: bases,
      tailles: tailles,
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

          {/* Dynamic Fields for Types */}
          <div>
            <FormLabel>Types</FormLabel>
            {types.map((type, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <FormControl className="flex-grow">
                  <Input
                    value={type}
                    onChange={(e) =>
                      setTypes((prev) => prev.map((t, i) => (i === index ? e.target.value : t)))
                    }
                    placeholder="Enter type"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => setTypes((prev) => prev.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => setTypes((prev) => [...prev, ""])} className="mt-2">
              Add Type
            </Button>
          </div>

          {/* Dynamic Fields for Bases */}
          <div>
            <FormLabel>Bases</FormLabel>
            {bases.map((base, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex space-x-2">
                  <Input
                    value={base.image}
                    onChange={(e) => handleBaseChange(index, "image", e.target.value)}
                    placeholder="Base Image URL"
                  />
                  <Input
                    value={base.name}
                    onChange={(e) => handleBaseChange(index, "name", e.target.value)}
                    placeholder="Base Name"
                  />
                  <Input
                    type="number"
                    value={base.price}
                    onChange={(e) => handleBaseChange(index, "price", parseFloat(e.target.value))}
                    placeholder="Base Price"
                  />
                  <Button type="button" onClick={() => handleRemoveBase(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={handleAddBase} className="mt-2">
              Add Base
            </Button>
          </div>

          {/* Dynamic Fields for Tailles */}
          <div>
            <FormLabel>Tailles</FormLabel>
            {tailles.map((taille, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex space-x-2">
                <Input
                    value={taille.image}
                    onChange={(e) => handleBaseChange(index, "image", e.target.value)}
                    placeholder="taille Image URL"
                  />
                  <Input
                    value={taille.name}
                    onChange={(e) => handleTailleChange(index, "name", e.target.value)}
                    placeholder="Taille Name"
                  />
                  <Input
                    type="number"
                    value={taille.price}
                    onChange={(e) => handleTailleChange(index, "price", parseFloat(e.target.value))}
                    placeholder="Taille Price"
                  />
                  <Button type="button" onClick={() => handleRemoveTaille(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={handleAddTaille} className="mt-2">
              Add Taille
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
