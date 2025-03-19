"use client";

import { api } from "@/trpc/react";
import { ItemHeader } from "./components/ItemHeader";
import Link from "next/link";
import { type ItemProps } from "./Item.types";

export const Item = ({ id }: ItemProps) => {
  const [item] = api.items.getById.useSuspenseQuery({
    id,
  });

  const meals = item?.mealItems.map((mealItem) => mealItem.meal);

  return (
    <div className="grid gap-12">
      <ItemHeader item={item} />

      <div className="grid gap-3">
        <h3 className="text-lg font-medium">Used in these meals</h3>
        <div className="grid gap-3">
          {meals?.map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.id}`}>
              {meal.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
