CREATE DATABASE vocadb;

USE vocadb;

-- 주제
CREATE TABLE IF NOT EXISTS tbl_subjects(
s_subid	VARCHAR(125)	NOT NULL	PRIMARY KEY,
s_subject VARCHAR(125)	NOT NULL,
s_catid	VARCHAR(125)	NOT NULL,
s_category	VARCHAR(125)	NOT NULL,
s_date	VARCHAR(10),
s_time	VARCHAR(10),
s_bookmark	TINYINT(1)	NOT NULL	DEFAULT 0,		
s_keyid	VARCHAR(125)	NOT NULL,	
s_content	TEXT,
s_attid	VARCHAR(125)	NOT NULL
);

-- 카테고리
CREATE TABLE IF NOT EXISTS tbl_categories(
c_catid	VARCHAR(125)	NOT NULL	PRIMARY KEY,
c_category	VARCHAR(125)	NOT NULL	
);

-- 키워드
CREATE TABLE IF NOT EXISTS tbl_keywords(
k_keyid	VARCHAR(125)	NOT NULL	PRIMARY KEY,
k_subid	VARCHAR(125)	NOT NULL,
k_keyword	VARCHAR(225)	NOT NULL	
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS tbl_attatchs(
a_attid	VARCHAR(125)	NOT NULL	PRIMARY KEY,
a_subid	VARCHAR(125)	NOT NULL,	
a_date	VARCHAR(10)	NOT NULL,	
a_time	VARCHAR(10)	NOT NULL,	
a_original_name	VARCHAR(225)	NOT NULL,	
a_save_name	VARCHAR(225)	NOT NULL,	
a_ext	VARCHAR(10)	NOT NULL	
);

-- 카테고리-주제
CREATE TABLE IF NOT EXISTS tbl_catsub(
cs_catid	VARCHAR(125)	NOT NULL,
cs_subid	VARCHAR(125)	NOT NULL
);

-- 주제-키워드
CREATE TABLE IF NOT EXISTS tbl_subkey(
sk_subid	VARCHAR(125)	NOT NULL,
sk_keyid	VARCHAR(125)	NOT NULL
);

-- 주제-첨부파일
CREATE TABLE IF NOT EXISTS tbl_subatt(
sa_subid	VARCHAR(125)	NOT NULL,
sa_attid	VARCHAR(125)	NOT NULL
);