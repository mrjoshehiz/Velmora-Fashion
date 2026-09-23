import { integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(), slug: text("slug").notNull().unique(), name: text("name").notNull(),
  category: text("category").notNull(), price: integer("price").notNull(), stock: integer("stock").notNull(),
  color: text("color").notNull(), description: text("description").notNull(), image: text("image").notNull(),
  active: integer("active").notNull().default(1), rank: integer("rank").notNull().default(0),
}, (t) => [index("idx_products_category_active").on(t.category,t.active)]);

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), userId: text("user_id"), email: text("email").notNull(),
  fullName: text("full_name").notNull(), phone: text("phone").notNull(), address: text("address").notNull(),
  city: text("city").notNull(), state: text("state").notNull(), subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("delivery_fee").notNull(), total: integer("total").notNull(),
  status: text("status").notNull().default("Requested"), createdAt: text("created_at").notNull(),
}, (t) => [index("idx_orders_user_created").on(t.userId,t.createdAt),index("idx_orders_email_created").on(t.email,t.createdAt)]);

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({autoIncrement:true}), orderId: text("order_id").notNull().references(()=>orders.id),
  productId: text("product_id").notNull().references(()=>products.id), name: text("name").notNull(),
  image: text("image").notNull(), size: text("size").notNull(), price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
}, (t) => [index("idx_order_items_order").on(t.orderId)]);

export const wishlist = sqliteTable("wishlist", {
  id: integer("id").primaryKey({autoIncrement:true}), userId: text("user_id").notNull(),
  productId: text("product_id").notNull().references(()=>products.id),
}, (t) => [uniqueIndex("idx_wishlist_user_product").on(t.userId,t.productId)]);

export const adminMembers = sqliteTable("admin_members", {
  userId: text("user_id").primaryKey(), createdAt: text("created_at").notNull(),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(), productId: text("product_id").notNull().references(()=>products.id),
  orderId: text("order_id").notNull().references(()=>orders.id), displayName: text("display_name").notNull(),
  rating: integer("rating").notNull(), body: text("body").notNull(),
  status: text("status").notNull().default("Pending"), createdAt: text("created_at").notNull(),
}, (t) => [uniqueIndex("idx_reviews_order_product").on(t.orderId,t.productId),index("idx_reviews_product_status").on(t.productId,t.status)]);
