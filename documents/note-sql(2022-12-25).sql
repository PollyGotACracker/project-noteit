CREATE DATABASE notedb;
USE notedb;

-- 사용자정보
CREATE TABLE IF NOT EXISTS tbl_users(
	u_userid	VARCHAR(225)	NOT NULL,
	u_pwd	VARCHAR(225)	NOT NULL,
	u_nickname	VARCHAR(225)	NOT NULL UNIQUE,	
	u_profileimg	VARCHAR(225),	
    u_profilestr	VARCHAR(225),
	u_cscore	BIGINT	NOT NULL	DEFAULT 0,
	u_darkmode	TINYINT	NOT NULL	DEFAULT 0,
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
	FOREIGN KEY(sc_userid) REFERENCES tbl_users(u_userid)
	ON DELETE CASCADE,
	CONSTRAINT fk_catsco
	FOREIGN KEY(sc_catid) REFERENCES tbl_categories(c_catid)
	ON DELETE CASCADE
);

-- 카테고리
CREATE TABLE IF NOT EXISTS tbl_categories(
	c_catid	VARCHAR(225)	NOT NULL,
	c_userid	VARCHAR(225)	NOT NULL,
	c_category	VARCHAR(125)	NOT NULL UNIQUE,
    c_subcount	BIGINT	NOT NULL	DEFAULT 0,
	c_checked	TINYINT	NOT NULL	DEFAULT 0,
	PRIMARY KEY(c_catid, c_userid),
	CONSTRAINT fk_usecat
	FOREIGN KEY(c_userid) REFERENCES tbl_users(u_userid)
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
    s_keycount	BIGINT	NOT NULL	DEFAULT 0,
    s_views	BIGINT	NOT NULL	DEFAULT 0,
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
    k_index	INT	NOT NULL,
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

-- 할일
CREATE TABLE IF NOT EXISTS tbl_todo(
	t_todoid	BIGINT	AUTO_INCREMENT,
    t_userid	VARCHAR(225)	NOT NULL,
	t_date	VARCHAR(10)	NOT NULL,
	t_time	VARCHAR(10)	NOT NULL,	
	t_content	VARCHAR(225)	NOT NULL,	
	t_deadline	VARCHAR(10),
	t_prior	INT		DEFAULT 5,
	t_compdate	VARCHAR(10),
	t_comptime	VARCHAR(10),	
	PRIMARY KEY(t_todoid, t_userid),
	CONSTRAINT fk_usetodo
	FOREIGN KEY(t_userid) REFERENCES tbl_users(u_userid)
	ON DELETE CASCADE,
	CONSTRAINT valid_prior CHECK (t_prior >= 0 AND t_prior <= 5)	
);

-- 국경일
CREATE TABLE IF NOT EXISTS tbl_holidays(
	h_datename	VARCHAR(50)	NOT NULL,
	h_isholiday	VARCHAR(50)	NOT NULL,	
	h_locdate	INT	NOT NULL,
	PRIMARY KEY(h_locdate)
);