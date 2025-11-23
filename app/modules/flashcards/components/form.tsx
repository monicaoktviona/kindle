import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { fetchDefinition } from "../queries/definition";
import type { WordDefinition } from "../type";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import i18n from "~/lib/i18n";
import type { VocabularyWord } from "~/modules/upload-dictionary/type";
import { useVocabStore } from "~/store/vocabStore";

const formSchema = z.object({
  word: z
    .string()
    .min(1, i18n.t("field_required", { field: i18n.t("newWord") })),
});

export function VocabForm({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setRows = useVocabStore((state) => state.setWords);
  const rows = useVocabStore((state) => state.words);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  });

  const definitionMutation = useMutation({
    mutationFn: (word: string) => fetchDefinition(word),
    onSuccess: (data: WordDefinition) => {
      const newWord: VocabularyWord = {
        id: "en:" + data[0].word,
        category: 0,
        lang: "en",
        profileId: "",
        stem: "",
        word: data[0].word,
        timestamp: Date.now(),
      };
      const updatedRows = rows ? [newWord, ...rows] : [newWord];
      setRows(updatedRows);
      setOpenModal(false);

      toast.success(`"${data[0].word}" added to your flashcards!`);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : i18n.t("invalidEnglishWord")
      );
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    definitionMutation.mutate(values.word);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i18n.t("newWord")}</FormLabel>
              <FormControl>
                <Input placeholder="hello" {...field} />
              </FormControl>
              <FormDescription>
                {i18n.t("addNewWordDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{i18n.t("save")}</Button>
      </form>
    </Form>
  );
}
