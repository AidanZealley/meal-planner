// https://orm.drizzle.team/docs/sql-schema-declaration
import { PlannedMealStatusValues, ItemTypeValues } from "@/lib/enums";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
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
  mealItems: many(mealItems),
  plannedMeals: many(plannedMeals),
  user: one(user, {
    fields: [meals.userId],
    references: [user.id],
  }),
}));

export const items = createTable(
  "items",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    deleted: boolean("deleted").default(false).notNull(),
    amountAvailable: integer("amount_available").default(1).notNull(),
    type: varchar("type", {
      length: 32,
      enum: ItemTypeValues,
    })
      .default("boolean")
      .notNull(),
    unit: varchar("unit", { length: 16 }),
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
  (item) => ({
    nameIndex: index("item_name_idx").on(item.name),
    nameUnique: unique("item_name_unique").on(item.id),
    userIndex: index("item_user_idx").on(item.userId),
  }),
);

export const itemsRelations = relations(items, ({ one, many }) => ({
  mealItems: many(mealItems),
  shoppingListEntries: many(shoppingList),
  user: one(user, {
    fields: [items.userId],
    references: [user.id],
  }),
}));

export const mealItems = createTable(
  "meal_items",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    amountRequired: integer("amount_required").default(1).notNull(),
    mealId: uuid("meal_id")
      .notNull()
      .references(() => meals.id, { onDelete: "cascade" }),
    itemId: uuid("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (mealItem) => ({
    mealIndex: index("meal_items_meal_idx").on(mealItem.mealId),
    itemIndex: index("meal_items_item_idx").on(mealItem.itemId),
    userIndex: index("meal_items_user_idx").on(mealItem.userId),
  }),
);

export const mealItemsRelations = relations(mealItems, ({ one }) => ({
  meal: one(meals, {
    fields: [mealItems.mealId],
    references: [meals.id],
  }),
  item: one(items, {
    fields: [mealItems.itemId],
    references: [items.id],
  }),
  user: one(user, {
    fields: [mealItems.userId],
    references: [user.id],
  }),
}));

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
    itemId: uuid("item_id")
      .references(() => items.id, {
        onDelete: "cascade",
      })
      .notNull(),
    planned: boolean("planned").default(false).notNull(),
    done: boolean("done").default(false).notNull(),
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
  (shoppingList) => ({
    itemIndex: index("shopping_list_item_idx").on(shoppingList.itemId),
    userIndex: index("shopping_list_user_idx").on(shoppingList.userId),
  }),
);

export const shoppingListRelations = relations(shoppingList, ({ one }) => ({
  item: one(items, {
    fields: [shoppingList.itemId],
    references: [items.id],
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
