"use client";
import useBookmarkAddMutation from "@/bookmarks/mutations/use-bookmark-add-mutation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BookmarkAddFormProps {
  collectionId: string;
}

const bookmarkFormSchema = z.object({
  bookmarkUrl: z.string().url(),
});

export default function BookmarkAddForm({
  collectionId,
}: BookmarkAddFormProps) {
  const addBookmarkMutation = useBookmarkAddMutation();
  const form = useForm<z.infer<typeof bookmarkFormSchema>>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues: {
      bookmarkUrl: "",
    },
  });
  function onSubmit(values: z.infer<typeof bookmarkFormSchema>) {
    const url = values.bookmarkUrl;

    addBookmarkMutation.mutate(
      { url, collectionId },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }
  return (
    <div>
      <div>
        <CardTitle>Save Bookmark</CardTitle>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bookmarkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. https://www.youtube.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Save Bookmark
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
