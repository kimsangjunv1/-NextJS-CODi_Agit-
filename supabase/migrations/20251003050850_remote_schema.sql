


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."increment_view"("p_post_id" integer, "p_user_id" "uuid", "p_ip" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_view RECORD;
BEGIN
    SELECT * INTO existing_view
    FROM views
    WHERE post_id = p_post_id
      AND (user_id = p_user_id OR (p_user_id IS NULL AND ip = p_ip))
      AND created_at::date = now()::date
    LIMIT 1;

    IF NOT FOUND THEN
        INSERT INTO views (user_id, post_id, ip)
        VALUES (p_user_id, p_post_id, p_ip);

        UPDATE posts
        SET views = views + 1
        WHERE idx = p_post_id;
    END IF;
END;
$$;


ALTER FUNCTION "public"."increment_view"("p_post_id" integer, "p_user_id" "uuid", "p_ip" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."category" (
    "idx" integer NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"(),
    "user_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "is_enabled" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "sort_no" integer
);


ALTER TABLE "public"."category" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."category_idx_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."category_idx_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."category_idx_seq" OWNED BY "public"."category"."idx";



CREATE TABLE IF NOT EXISTS "public"."comments" (
    "idx" integer NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"(),
    "post_id" integer,
    "profile" integer DEFAULT 1,
    "author" "text",
    "msg" "text",
    "password" "text",
    "is_admin" boolean DEFAULT false,
    "is_modified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_secret" boolean
);


ALTER TABLE "public"."comments" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."comments_idx_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."comments_idx_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."comments_idx_seq" OWNED BY "public"."comments"."idx";



CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"(),
    "idx" integer NOT NULL,
    "category_idx" integer,
    "user_id" "uuid",
    "title" "text" NOT NULL,
    "thumbnail" "text",
    "contents" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "summary" "text",
    "views" integer DEFAULT 0
);


ALTER TABLE "public"."posts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."posts_idx_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."posts_idx_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."posts_idx_seq" OWNED BY "public"."posts"."idx";



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."views" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "post_id" integer,
    "ip" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."views" OWNER TO "postgres";


ALTER TABLE ONLY "public"."category" ALTER COLUMN "idx" SET DEFAULT "nextval"('"public"."category_idx_seq"'::"regclass");



ALTER TABLE ONLY "public"."comments" ALTER COLUMN "idx" SET DEFAULT "nextval"('"public"."comments_idx_seq"'::"regclass");



ALTER TABLE ONLY "public"."posts" ALTER COLUMN "idx" SET DEFAULT "nextval"('"public"."posts_idx_seq"'::"regclass");



ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_pkey" PRIMARY KEY ("idx");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("idx");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("idx");



ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "unique_view" UNIQUE ("post_id", "ip", "user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("idx");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_category_idx_fkey" FOREIGN KEY ("category_idx") REFERENCES "public"."category"("idx");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("idx");



ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."increment_view"("p_post_id" integer, "p_user_id" "uuid", "p_ip" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_view"("p_post_id" integer, "p_user_id" "uuid", "p_ip" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_view"("p_post_id" integer, "p_user_id" "uuid", "p_ip" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."category" TO "anon";
GRANT ALL ON TABLE "public"."category" TO "authenticated";
GRANT ALL ON TABLE "public"."category" TO "service_role";



GRANT ALL ON SEQUENCE "public"."category_idx_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."category_idx_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."category_idx_seq" TO "service_role";



GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comments_idx_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comments_idx_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comments_idx_seq" TO "service_role";



GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."posts_idx_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."posts_idx_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."posts_idx_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."views" TO "anon";
GRANT ALL ON TABLE "public"."views" TO "authenticated";
GRANT ALL ON TABLE "public"."views" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































RESET ALL;

