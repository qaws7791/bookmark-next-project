"use client";
import useCreateCollectionMutation from "@/collections/mutations/use-create-collection-mutation";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCollectionSchema } from "../../../server/collections/collections.schemas";
import { createClient } from "../../../supabase/client";

interface CollectionFormProps {
  collectionId?: string;
  onSuccess?: () => void;
}

function getRandomColorCode() {
  return "#" + Math.floor(Math.random() * 16_777_215).toString(16);
}

export default function CollectionForm({
  collectionId,
  onSuccess,
}: CollectionFormProps) {
  const createCollection = useCreateCollectionMutation();
  const supabase = createClient();
  const userQuery = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        throw new Error("User not found");
      }
      return data.user;
    },
  });
  const form = useForm<z.infer<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: "",
      description: "",
      colorCode: getRandomColorCode(),
    },
  });
  function onSubmit(values: z.infer<typeof createCollectionSchema>) {
    if (!userQuery.data?.id) {
      return alert("User not found");
    }

    createCollection.mutate(
      {
        name: values.name,
        description: values.description,
        colorCode: values.colorCode,
      },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      },
    );
  }
  return (
    <div>
      <div>
        <CardTitle> {collectionId ? "Edit" : "Create"} Collection</CardTitle>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
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
                    <Textarea
                      placeholder="Enter Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Code</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={createCollection.isPending}
              className="w-full"
            >
              {createCollection.isPending && (
                <LoaderCircle className="animate-spin" />
              )}
              {createCollection.isPending
                ? "Loading..."
                : collectionId
                  ? "Update Collection"
                  : "Create Collection"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
