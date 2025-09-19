import { relations } from "drizzle-orm";
import { index, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

//#region src/tables.ts
const userTable = pgTable("user_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	userName: varchar("user_name", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({
	emailIdx: index("user_email_idx").on(table.email),
	userNameIdx: index("user_user_name_idx").on(table.userName)
}));
const organizationTable = pgTable("organization_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull(),
	userId: uuid("user_id").notNull().references(() => userTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({ userIdIdx: index("organization_user_id_idx").on(table.userId) }));
const roleTable = pgTable("role_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	organizationId: uuid("organization_id").notNull().references(() => organizationTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({ orgIdx: index("role_organization_id_idx").on(table.organizationId) }));
const organizationUsersTable = pgTable("organization_users_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	userId: uuid("user_id").notNull().references(() => userTable.id),
	roleId: uuid("role_id").notNull().references(() => roleTable.id),
	organizationId: uuid("organization_id").notNull().references(() => organizationTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({
	userIdIdx: index("org_users_user_id_idx").on(table.userId),
	orgIdIdx: index("org_users_org_id_idx").on(table.organizationId),
	roleIdIdx: index("org_users_role_id_idx").on(table.roleId)
}));
const permissionTable = pgTable("permission_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
});
const rolePermissionTable = pgTable("role_permission_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	roleId: uuid("role_id").notNull().references(() => roleTable.id),
	permissionId: uuid("permission_id").notNull().references(() => permissionTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({
	roleIdIdx: index("role_perm_role_id_idx").on(table.roleId),
	permissionIdIdx: index("role_perm_permission_id_idx").on(table.permissionId)
}));
const chatTable = pgTable("chat_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull().unique(),
	organizationId: uuid("organization_id").notNull().references(() => organizationTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({ orgIdx: index("chat_organization_id_idx").on(table.organizationId) }));
const llmModelsTable = pgTable("llm_models_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	provider: varchar("provider", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	contextLimit: integer("context_limit").notNull(),
	tokenPrice: integer("token_price").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
});
const messageTable = pgTable("message_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	type: varchar("type", { length: 255 }).notNull(),
	content: text("content").notNull(),
	metadata: jsonb("metadata").notNull(),
	userId: uuid("user_id").notNull().references(() => userTable.id),
	chatId: uuid("chat_id").notNull().references(() => chatTable.id),
	modelId: uuid("model_id").notNull().references(() => llmModelsTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({
	userIdIdx: index("message_user_id_idx").on(table.userId),
	chatIdIdx: index("message_chat_id_idx").on(table.chatId),
	modelIdIdx: index("message_model_id_idx").on(table.modelId)
}));
const feedbackTable = pgTable("feedback_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	userId: uuid("user_id").notNull().references(() => userTable.id),
	messageId: uuid("message_id").notNull().references(() => messageTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
}, (table) => ({
	userIdIdx: index("feedback_user_id_idx").on(table.userId),
	messageIdIdx: index("feedback_message_id_idx").on(table.messageId)
}));
const wishlistTable = pgTable("wishlist_table", {
	id: uuid("id").primaryKey().$default(() => uuidv7()),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 0
	}).notNull().defaultNow()
});
const userRelations = relations(userTable, ({ many }) => ({
	organizations: many(organizationTable),
	organizationUsers: many(organizationUsersTable),
	messages: many(messageTable),
	feedbacks: many(feedbackTable)
}));
const organizationRelations = relations(organizationTable, ({ one, many }) => ({
	owner: one(userTable, {
		fields: [organizationTable.userId],
		references: [userTable.id]
	}),
	roles: many(roleTable),
	chats: many(chatTable),
	users: many(organizationUsersTable)
}));
const roleRelations = relations(roleTable, ({ one, many }) => ({
	organization: one(organizationTable, {
		fields: [roleTable.organizationId],
		references: [organizationTable.id]
	}),
	organizationUsers: many(organizationUsersTable),
	permissions: many(rolePermissionTable)
}));
const organizationUsersRelations = relations(organizationUsersTable, ({ one }) => ({
	user: one(userTable, {
		fields: [organizationUsersTable.userId],
		references: [userTable.id]
	}),
	organization: one(organizationTable, {
		fields: [organizationUsersTable.organizationId],
		references: [organizationTable.id]
	}),
	role: one(roleTable, {
		fields: [organizationUsersTable.roleId],
		references: [roleTable.id]
	})
}));
const permissionRelations = relations(permissionTable, ({ many }) => ({ roles: many(rolePermissionTable) }));
const rolePermissionRelations = relations(rolePermissionTable, ({ one }) => ({
	role: one(roleTable, {
		fields: [rolePermissionTable.roleId],
		references: [roleTable.id]
	}),
	permission: one(permissionTable, {
		fields: [rolePermissionTable.permissionId],
		references: [permissionTable.id]
	})
}));
const chatRelations = relations(chatTable, ({ one, many }) => ({
	organization: one(organizationTable, {
		fields: [chatTable.organizationId],
		references: [organizationTable.id]
	}),
	messages: many(messageTable)
}));
const llmModelRelations = relations(llmModelsTable, ({ many }) => ({ messages: many(messageTable) }));
const messageRelations = relations(messageTable, ({ one }) => ({
	user: one(userTable, {
		fields: [messageTable.userId],
		references: [userTable.id]
	}),
	chat: one(chatTable, {
		fields: [messageTable.chatId],
		references: [chatTable.id]
	}),
	model: one(llmModelsTable, {
		fields: [messageTable.modelId],
		references: [llmModelsTable.id]
	})
}));
const feedbackRelations = relations(feedbackTable, ({ one }) => ({
	user: one(userTable, {
		fields: [feedbackTable.userId],
		references: [userTable.id]
	}),
	message: one(messageTable, {
		fields: [feedbackTable.messageId],
		references: [messageTable.id]
	})
}));
const _relations = {
	userRelations,
	organizationRelations,
	roleRelations,
	organizationUsersRelations,
	permissionRelations,
	rolePermissionRelations,
	chatRelations,
	llmModelRelations,
	messageRelations,
	feedbackRelations
};
const tables = {
	userTable,
	organizationTable,
	organizationUsersTable,
	roleTable,
	permissionTable,
	rolePermissionTable,
	chatTable,
	llmModelsTable,
	messageTable,
	feedbackTable,
	wishlistTable
};

//#endregion
export { _relations, chatRelations, chatTable, feedbackRelations, feedbackTable, llmModelRelations, llmModelsTable, messageRelations, messageTable, organizationRelations, organizationTable, organizationUsersRelations, organizationUsersTable, permissionRelations, permissionTable, rolePermissionRelations, rolePermissionTable, roleRelations, roleTable, tables, userRelations, userTable, wishlistTable };