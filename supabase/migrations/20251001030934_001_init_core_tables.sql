-- 001_init_core_tables.sql

-- 1. users 테이블
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 2. category 테이블
CREATE TABLE category (
    idx serial PRIMARY KEY,
    id uuid DEFAULT gen_random_uuid() UNIQUE,
    user_id uuid REFERENCES users(id),
    title text NOT NULL,
    description text NOT NULL,
    is_enabled boolean DEFAULT TRUE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    sort_no integer
);

-- 3. posts 테이블
CREATE TABLE posts (
    id uuid DEFAULT gen_random_uuid(),
    idx serial PRIMARY KEY,
    category_idx integer REFERENCES category(idx),
    user_id uuid REFERENCES users(id),
    title text NOT NULL,
    thumbnail text,
    contents jsonb,
    created_at timestamptz DEFAULT now(),
    summary text,
    views integer DEFAULT 0
);

-- 4. comments 테이블
CREATE TABLE comments (
    idx serial PRIMARY KEY,
    id uuid DEFAULT gen_random_uuid(),
    post_id integer REFERENCES posts(idx),
    profile integer DEFAULT 1,
    author text,
    msg text,
    password text,
    is_admin boolean DEFAULT FALSE,
    is_modified boolean DEFAULT FALSE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);