CREATE DATABASE vocadb;

USE vocadb;

-- 관계테이블은 언제 생성해야 하는지?

-- 카테고리
CREATE TABLE IF NOT EXISTS tbl_categories(
c_catid	VARCHAR(125)	NOT NULL,
c_category	VARCHAR(125)	NOT NULL,
PRIMARY KEY(c_catid)
);

-- 주제
CREATE TABLE IF NOT EXISTS tbl_subjects(
s_subid	VARCHAR(125)	NOT NULL,
s_subject VARCHAR(125)	NOT NULL,
s_catid	VARCHAR(125)	NOT NULL,
s_category	VARCHAR(125)	NOT NULL,
s_date	VARCHAR(10),
s_time	VARCHAR(10),
s_bookmark	TINYINT	NOT NULL	DEFAULT 0,		
s_content	TEXT,
PRIMARY KEY(s_subid),
CONSTRAINT f_catsub
FOREIGN KEY(s_catid) REFERENCES tbl_categories(c_catid)
ON DELETE CASCADE
);

-- 키워드
CREATE TABLE IF NOT EXISTS tbl_keywords(
k_keyid	VARCHAR(125)	NOT NULL,
k_subid	VARCHAR(125)	NOT NULL,
k_keyword	VARCHAR(225)	NOT NULL,
PRIMARY KEY(k_keyid),
CONSTRAINT f_subkey
FOREIGN KEY(k_subid) REFERENCES tbl_subjects(s_subid)
ON DELETE CASCADE	
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS tbl_attatchs(
a_attid	VARCHAR(125)	NOT NULL,
a_subid	VARCHAR(125)	NOT NULL,	
a_date	VARCHAR(10)	NOT NULL,	
a_time	VARCHAR(10)	NOT NULL,	
a_original_name	VARCHAR(225)	NOT NULL,	
a_save_name	VARCHAR(225)	NOT NULL,	
a_ext	VARCHAR(10)	NOT NULL,
PRIMARY KEY(a_attid),
CONSTRAINT f_subatt
FOREIGN KEY(a_subid) REFERENCES tbl_subjects(s_subid)
ON DELETE CASCADE
);