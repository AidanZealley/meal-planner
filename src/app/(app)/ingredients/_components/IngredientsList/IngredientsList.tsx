"use client";

import { api } from "@/trpc/react";
import { IngredientListItem } from "../IngredientListItem";
import { useState } from "react";

export const IngredientsList = () => {
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [ingredients] = api.ingredients.getAll.useSuspenseQuery();

  const handleEdit = (id: string | null) => {
    setIsEditingId(id);
  };

  return (
    <div className="grid gap-1 pl-3 pr-5">
      {ingredients.map((ingredient) => (
        <IngredientListItem
          key={ingredient.id}
          ingredient={ingredient}
          isEditingId={isEditingId}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
