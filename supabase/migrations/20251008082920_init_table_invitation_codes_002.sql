CREATE TABLE invite_codes (
    id SERIAL PRIMARY KEY,           -- 내부용 PK
    code VARCHAR(32) NOT NULL UNIQUE, -- 초대코드 (중복 방지)
    is_used BOOLEAN DEFAULT FALSE,    -- 사용 여부
    used_by UUID NULL,                -- 사용한 유저 ID (Supabase auth UID)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), -- 생성일시
    is_active BOOLEAN DEFAULT TRUE,   -- 활성/비활성 여부
    expire_at TIMESTAMP WITH TIME ZONE NULL -- 유효기간 (NULL이면 무제한)
);