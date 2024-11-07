"use client";

import React, { useEffect } from "react";
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
import UploadComponent from "@/components/image-upload"; // Assuming you have a separate upload component
import { orderSchema, type OrderSchema } from "@/lib/order/zod";

import ImageUploader from './ImageUploader';

// OrderFormProps interface defines the structure for the props passed into the component
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
  // useForm hook to handle form state and validation using Zod schema
  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema), // Zod validation schema
    defaultValues,
  });

  // State for storing the uploaded image URL
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  // Log imageUrl whenever it changes
  useEffect(() => {
    if (imageUrl) {
      form.setValue("image", imageUrl); // Update form's "image" field with imageUrl
    }
  }, [imageUrl, form]);


  // Callback to handle image URL change from ImageUploader
  const handleImageUrlChange = (url: string) => {
    console.log("ImageUploader provided URL:", url); // Log to ensure the URL is being passed
    setImageUrl(url);
  };


  // Submit handler that processes form data before submission
  const OnSubmit = async (data: OrderSchema) => {
    if (!imageUrl) {
      console.error("No image uploaded");
    }
    console.log('Submitting order data:');
    console.log(form.getValues());

    await onSubmit( {
      ...data,
      image: imageUrl || '', // Ensure the image field is set, even if empty
    });
    

  };

  // Log the updated imageUrl whenever it changes
  
  return (
    <div className="h-96 overflow-y-auto">
      {/* Form component that takes care of field validation and state */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
          {/* Name input field */}
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

          {/* Product ID input field */}
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Product ID..."
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Group ID input field */}
          <FormField
            control={form.control}
            name="orderGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Group ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Order Group ID..."
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity input field */}
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

          {/* Status select field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select {...field} className="select">
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image upload field */}
          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader onImageUrlChange={handleImageUrlChange} />
          </FormItem>

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

          {/* Submit button */}
          <Button disabled={!imageUrl || isSubmitting} className="w-full" type="submit">
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
