CREATE DATABASE notedb;
USE notedb;

-- 관계테이블은 언제 생성? N:M 관계일 때? 여러 테이블을 참조해야 할 때?

-- 사용자정보
CREATE TABLE IF NOT EXISTS tbl_user(
	u_userid	VARCHAR(225)	NOT NULL,
	u_pwd	VARCHAR(225)	NOT NULL,
	u_nickname	VARCHAR(225)	NOT NULL,	
	u_date	VARCHAR(125),		
	u_cscore	INT	NOT NULL	DEFAULT 0,
	u_bgm	TINYINT	NOT NULL	DEFAULT 1,
	u_mode	TINYINT	NOT NULL	DEFAULT 0,
	PRIMARY KEY(u_userid)
);

-- 사용자점수
CREATE TABLE IF NOT EXISTS tbl_score(
	sc_scoid	VARCHAR(225)	NOT NULL,
	sc_userid	VARCHAR(225)	NOT NULL,
	sc_date	VARCHAR(125)	NOT NULL,
	sc_catid	VARCHAR(125)	NOT NULL,
	sc_category	VARCHAR(125)	NOT NULL,
	sc_score	INT	NOT NULL,
	PRIMARY KEY(sc_scoid),
	CONSTRAINT fk_usesco
	FOREIGN KEY(sc_userid) REFERENCES tbl_user(u_userid)
	ON DELETE CASCADE,
	CONSTRAINT fk_catsco
	FOREIGN KEY(sc_catid) REFERENCES tbl_categories(c_catid)
	ON DELETE CASCADE
);

-- 카테고리
CREATE TABLE IF NOT EXISTS tbl_categories(
	c_catid	VARCHAR(225)	NOT NULL,
	c_userid	VARCHAR(225)	NOT NULL,
	c_category	VARCHAR(125)	NOT NULL,
	c_checked	TINYINT	NOT NULL	DEFAULT 0,
	PRIMARY KEY(c_catid, c_userid),
	CONSTRAINT fk_usecat
	FOREIGN KEY(c_userid) REFERENCES tbl_user(u_userid)
	ON DELETE CASCADE
);

-- 주제
CREATE TABLE IF NOT EXISTS tbl_subjects(
	s_subid	VARCHAR(225)	NOT NULL,
	s_subject	VARCHAR(125)	NOT NULL,
	s_catid	VARCHAR(225)	NOT NULL,
	s_category	VARCHAR(125)	NOT NULL,	
	s_date	VARCHAR(10),
	s_time	VARCHAR(10),
	s_bookmark	TINYINT	NOT NULL	DEFAULT 0,
	s_content	TEXT,
	PRIMARY KEY(s_subid, s_catid),
	CONSTRAINT fk_catsub
	FOREIGN KEY(s_catid) REFERENCES tbl_categories(c_catid)
	ON DELETE CASCADE
);

-- 키워드
CREATE TABLE IF NOT EXISTS tbl_keywords(
	k_keyid	VARCHAR(225)	NOT NULL,
	k_subid	VARCHAR(225)	NOT NULL,
	k_keyword	VARCHAR(225)	NOT NULL,	
	k_desc	TEXT,
	PRIMARY KEY(k_keyid, k_subid),
	CONSTRAINT fk_subkey
	FOREIGN KEY(k_subid) REFERENCES tbl_subjects(s_subid)
	ON DELETE CASCADE
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS tbl_attachs(
	a_attid	VARCHAR(225)	NOT NULL,
	a_subid	VARCHAR(225)	NOT NULL,
	a_date	VARCHAR(10)	NOT NULL,
	a_time	VARCHAR(10)	NOT NULL,
	a_originalname	VARCHAR(225)	NOT NULL,
	a_savename	VARCHAR(225)	NOT NULL,
	a_ext	VARCHAR(10)	NOT NULL,
	PRIMARY KEY(a_attid, a_subid),
	CONSTRAINT fk_subatt
	FOREIGN KEY(a_subid) REFERENCES tbl_subjects(s_subid)
	ON DELETE CASCADE
);

-- 국경일
CREATE TABLE IF NOT EXISTS tbl_holidays(
	h_datename	VARCHAR(50)	NOT NULL,
	h_isholiday	VARCHAR(50)	NOT NULL,	
	h_locdate	INT	NOT NULL,
	PRIMARY KEY(h_locdate)
);