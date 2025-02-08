"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import { MealListItem } from "../MealListItem";

export const MealsList = () => {
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [meals] = api.meals.getAll.useSuspenseQuery();

  const handleEdit = (id: string | null) => {
    setIsEditingId(id);
  };

  return (
    <div className="grid gap-3">
      {meals.map((meal) => (
        <MealListItem
          key={meal.id}
          meal={meal}
          isEditingId={isEditingId}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
