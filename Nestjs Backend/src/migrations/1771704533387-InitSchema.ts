import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1771704533387 implements MigrationInterface {
    name = 'InitSchema1771704533387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "weight" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_item_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" integer NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("Client_id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Email" character varying NOT NULL, "Password" character varying NOT NULL, "Phone_number" integer NOT NULL, "Business_name" character varying NOT NULL, "Business_Type" character varying NOT NULL, "Default_pickup_location" character varying NOT NULL, "COD_enabled" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL, "is_Approved" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "admin_id" integer, CONSTRAINT "PK_0e1e6143da3e565388e19da4ffd" PRIMARY KEY ("Client_id"))`);
        await queryRunner.query(`CREATE TABLE "warehouses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "pincode" integer NOT NULL, "capacity" integer NOT NULL, "current_load" integer NOT NULL, "contact_number" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_56ae21ee2432b2270b48867e4be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "warehouse_id" integer NOT NULL, "name" character varying NOT NULL, "phone_number" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracking" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "location" character varying NOT NULL, "UpdatedBy" TIMESTAMP NOT NULL DEFAULT now(), "remarks" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "shipment_id" integer, CONSTRAINT "PK_c6d380f3abe9852840e5aff1439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipments" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "pickup_location" character varying NOT NULL, "delivery_location" character varying NOT NULL, "weight" integer NOT NULL, "package_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "delivered_at" TIMESTAMP WITH TIME ZONE NOT NULL, "source_warehouse_id" integer, "destination_warehouse_id" integer, "driver_id" integer, CONSTRAINT "PK_6deda4532ac542a93eab214b564" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipment_items" ("id" SERIAL NOT NULL, "shipment_id" integer, CONSTRAINT "PK_7dfc873be1417190f0e5e001dd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "order_id" uuid, "shipment_item_id" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "payment_method" character varying NOT NULL, "payment_status" character varying NOT NULL, "paid_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_agents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" integer NOT NULL, "warehouse_id" integer NOT NULL, "vehicle_type" character varying NOT NULL, "availability_status" boolean NOT NULL, CONSTRAINT "PK_a7c2106d5b7261ca0afd794366c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PENDING', "totalAmount" numeric(10,2) NOT NULL, "paymentId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delivery_agent_id" integer, "customerId" integer, "payment_id" integer, CONSTRAINT "REL_5b3e94bd2aedc184f9ad8c1043" UNIQUE ("payment_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "pincode" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_8b8e55a04e51bc1dccb2bf481d6" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1fa70d92c557f96218823a9f079" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_5c3c1222543bb61754d9a8dfccf" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_552ca3cb0b0d6b9f89f3002c5ad" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_40f0dfb4d1a0052183b3c6728e1" FOREIGN KEY ("client_id") REFERENCES "clients"("Client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_f3d4daa9ba1fbc40249fdb5febb" FOREIGN KEY ("source_warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_69b171e925262fb3f5c098f2c68" FOREIGN KEY ("destination_warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_eb03f17f7070bb87f741a68684e" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_ccc68015ca35631ff542230b209" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_b1e3a2b7418f3ee9da38c50d2ae" FOREIGN KEY ("shipment_item_id") REFERENCES "shipment_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" ADD CONSTRAINT "FK_875b087b83063a0bf4c76a9bcce" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cba1a5c2951981382326644dd1a" FOREIGN KEY ("delivery_agent_id") REFERENCES "delivery_agents"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cba1a5c2951981382326644dd1a"`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" DROP CONSTRAINT "FK_875b087b83063a0bf4c76a9bcce"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_b1e3a2b7418f3ee9da38c50d2ae"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_ccc68015ca35631ff542230b209"`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_eb03f17f7070bb87f741a68684e"`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_69b171e925262fb3f5c098f2c68"`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_f3d4daa9ba1fbc40249fdb5febb"`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_40f0dfb4d1a0052183b3c6728e1"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_552ca3cb0b0d6b9f89f3002c5ad"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_5c3c1222543bb61754d9a8dfccf"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1fa70d92c557f96218823a9f079"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_8b8e55a04e51bc1dccb2bf481d6"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "delivery_agents"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "shipment_items"`);
        await queryRunner.query(`DROP TABLE "shipments"`);
        await queryRunner.query(`DROP TABLE "tracking"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "warehouses"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
