// https://orm.drizzle.team/docs/sql-schema-declaration
import { PlannedMealStatusValues } from "@/lib/enums";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//https://orm.drizzle.team/docs/goodies#multi-project-schema
export const createTable = pgTableCreator((name) => `meal-planner_${name}`);

export const meals = createTable(
  "meals",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    deleted: boolean("deleted").default(false).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (meal) => ({
    nameIndex: index("meal_name_idx").on(meal.name),
    userIndex: index("meal_user_idx").on(meal.userId),
  }),
);

export const mealsRelations = relations(meals, ({ one, many }) => ({
  mealIngredients: many(mealIngredients),
  plannedMeals: many(plannedMeals),
  user: one(user, {
    fields: [meals.userId],
    references: [user.id],
  }),
}));

export const ingredients = createTable(
  "ingredients",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    inStock: boolean("inStock").default(true).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ingredient) => ({
    nameIndex: index("ingredient_name_idx").on(ingredient.name),
    userIndex: index("ingredient_user_idx").on(ingredient.userId),
  }),
);

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  mealIngredients: many(mealIngredients),
  user: one(user, {
    fields: [ingredients.userId],
    references: [user.id],
  }),
}));

export const mealIngredients = createTable(
  "meal_ingredients",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    mealId: uuid("meal_id")
      .notNull()
      .references(() => meals.id, { onDelete: "cascade" }),
    ingredientId: uuid("ingredient_id")
      .notNull()
      .references(() => ingredients.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (mealIngredient) => ({
    mealIndex: index("meal_ingredients_meal_idx").on(mealIngredient.mealId),
    ingredientIndex: index("meal_ingredients_ingredient_idx").on(
      mealIngredient.ingredientId,
    ),
    userIndex: index("meal_ingredients_user_idx").on(mealIngredient.userId),
  }),
);

export const mealIngredientsRelations = relations(
  mealIngredients,
  ({ one }) => ({
    meal: one(meals, {
      fields: [mealIngredients.mealId],
      references: [meals.id],
    }),
    ingredient: one(ingredients, {
      fields: [mealIngredients.ingredientId],
      references: [ingredients.id],
    }),
    user: one(user, {
      fields: [mealIngredients.userId],
      references: [user.id],
    }),
  }),
);

export const plannedMeals = createTable(
  "planned_meals",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    mealId: uuid("meal_id")
      .notNull()
      .references(() => meals.id, { onDelete: "cascade" }),
    status: varchar("status", {
      enum: PlannedMealStatusValues,
    })
      .default("planned")
      .notNull(),
    cookedAt: timestamp("cooked_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (plannedMeal) => ({
    mealIndex: index("planned_meals_meal_idx").on(plannedMeal.mealId),
    userIndex: index("planned_meals_user_idx").on(plannedMeal.userId),
  }),
);

export const plannedMealsRelations = relations(plannedMeals, ({ one }) => ({
  meal: one(meals, {
    fields: [plannedMeals.mealId],
    references: [meals.id],
  }),
  user: one(user, {
    fields: [plannedMeals.userId],
    references: [user.id],
  }),
}));

export const shoppingList = createTable(
  "shopping_list",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    ingredientId: uuid("ingredient_id")
      .notNull()
      .references(() => ingredients.id, { onDelete: "cascade" }),
    done: boolean("done").default(false).notNull(),
    userId: text("user_id")
      .notNull()
      .unique() // 👈 Ensures a 1:1 relationship
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (shoppingList) => ({
    ingredientIndex: index("shopping_list_ingredient_idx").on(
      shoppingList.ingredientId,
    ),
    ingredientUnique: unique("shopping_list_ingredient_unique").on(
      shoppingList.ingredientId,
    ),
    userIndex: index("shopping_list_user_idx").on(shoppingList.userId),
  }),
);

export const shoppingListRelations = relations(shoppingList, ({ one }) => ({
  ingredient: one(ingredients, {
    fields: [shoppingList.ingredientId],
    references: [ingredients.id],
  }),
  user: one(user, {
    fields: [shoppingList.userId],
    references: [user.id],
  }),
}));

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
