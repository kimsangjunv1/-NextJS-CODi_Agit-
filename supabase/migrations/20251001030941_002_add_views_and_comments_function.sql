-- 002_add_views_and_comments_function.sql
-- 1. comments 추가 컬럼
ALTER TABLE comments
ADD COLUMN is_secret boolean;

-- 2. views 테이블
CREATE TABLE views (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) NULL,
    post_id integer REFERENCES posts(idx),
    ip text NOT NULL,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT unique_view UNIQUE (post_id, ip, user_id)
);

-- 3. increment_view 함수
DROP FUNCTION IF EXISTS increment_view(integer, uuid, text);

CREATE OR REPLACE FUNCTION increment_view(
    p_post_id integer,
    p_user_id uuid,
    p_ip text
)
RETURNS void
LANGUAGE plpgsql
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