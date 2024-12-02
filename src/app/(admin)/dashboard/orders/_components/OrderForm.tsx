"use client";

import React, { useEffect, useState } from "react";
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
import ImageUploader from "./ImageUploader";
import { orderSchema, type OrderSchema } from "@/lib/order/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFormProps {
  defaultValues: OrderSchema;
  onSubmit: (data: OrderSchema) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
}

export default function OrderForm({
  defaultValues,
  onSubmit,
  submitButtonText,
  isSubmitting,
}: OrderFormProps) {
  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues,
  });

  const [productNames, setProductNames] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch product names from the API
    async function fetchProductNames() {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product names");
        }

        const products = await response.json();
        const names = products.map((product: { nom: string }) => product.nom); // Adjust based on your API's data structure
        setProductNames(names);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    }

    fetchProductNames();
  }, []);

  useEffect(() => {
    if (imageUrl) {
      form.setValue("image", imageUrl);
    }
  }, [imageUrl, form]);

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
  };

  const OnSubmit = async (data: OrderSchema) => {
    if (!imageUrl) {
      console.error("No image uploaded");
    }
    await onSubmit({
      ...data,
      image: imageUrl || "",
    });
  };

  return (
    <div className="h-96 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Customer Name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Customer Email..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productNom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Nom</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)} // Update form value on select change
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productNames.map((product, index) => (
                        <SelectItem key={index} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Quantity..."
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="select"
                    onChange={(e) =>
                      field.onChange(e.target.value as "attente" | "livree")
                    }
                    value={field.value ?? "attente"}
                  >
                    <option value="attente">attente</option>
                    <option value="livree">livree</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Type input field */}
          <FormField
            control={form.control}
            name="selectedType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Select Type" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Base input field */}
          <FormField
            control={form.control}
            name="selectedBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Select Base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baseQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>base Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Quantity..."
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Taille input field */}
          <FormField
            control={form.control}
            name="selectedTaille"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taille</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Select Taille" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tailleQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>taille Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Quantity..."
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Barre input field */}
          <FormField
            control={form.control}
            name="selectedBarre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Select Barre" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader onImageUrlChange={handleImageUrlChange} />
          </FormItem>

          <Button
            disabled={!imageUrl || isSubmitting}
            className="w-full"
            type="submit"
          >
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
