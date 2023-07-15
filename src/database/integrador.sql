-- Active: 1686955395453@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        count_comments INTEGER,
        dislikes INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        id_post_comment TEXT,
        Foreign Key (creator_id) REFERENCES users(id) on Delete CASCADE,
        Foreign Key (id_post_comment) REFERENCES posts(id) on Delete CASCADE
    );

drop TABLE posts;

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULl,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        Foreign Key (user_id) REFERENCES users(id) on Delete CASCADE,
        Foreign Key (post_id) REFERENCES posts(id) on Delete CASCADE
    );

INSERT INTO
    posts (
        id,
        content,
        creator_id,
        dislikes,
        likes,
        count_comments
    )
VALUES (
        'post001',
        'meu primeiro Post',
        'e3cbaad6-a03d-4adb-be7d-e1b2d5cf547f',
        1,
        5,
        1
    );

INSERT INTO
    posts (
        id,
        content,
        creator_id,
        dislikes,
        likes,
        id_post_comment
    )
VALUES (
        'post005',
        'mais um',
        'e3cbaad6-a03d-4adb-be7d-e1b2d5cf547f',
        2,
        1,
        'post001'
    );

SELECT *
FROM posts
WHERE comments = 0
SELECT *
FROM posts
WHERE
    comments = 1
    AND id_post_comment = 'post001';

s 