CREATE DATABASE noteit;
USE noteit;

-- 사용자정보
CREATE TABLE IF NOT EXISTS tbl_users(
	u_userid	VARCHAR(225)	NOT NULL,
	u_password	VARCHAR(225)	NOT NULL,
	u_nickname	VARCHAR(225)	NOT NULL UNIQUE,	
	u_profileimg	VARCHAR(225),	
    u_profilestr	VARCHAR(225),
	u_score	BIGINT	NOT NULL	DEFAULT 0,
	PRIMARY KEY(u_userid)
);

-- 사용자점수
CREATE TABLE IF NOT EXISTS tbl_scores(
	sc_scoid	VARCHAR(225)	NOT NULL,
	sc_userid	VARCHAR(225)	NOT NULL,
	sc_date	VARCHAR(125)	NOT NULL,
	sc_time	VARCHAR(125)	NOT NULL,
	sc_duration	VARCHAR(125)	NOT NULL,
	sc_catid	VARCHAR(125)	NOT NULL,
	sc_category	VARCHAR(125)	NOT NULL,
	sc_score	INT	NOT NULL,
    sc_totalscore	INT	NOT NULL,
	PRIMARY KEY(sc_scoid)
-- 	CONSTRAINT fk_usesco
-- 	FOREIGN KEY(sc_userid) REFERENCES tbl_users(u_userid)
-- 	ON DELETE CASCADE
);

-- 카테고리
CREATE TABLE IF NOT EXISTS tbl_categories(
	c_catid	VARCHAR(225)	NOT NULL,
	c_userid	VARCHAR(225)	NOT NULL,
	c_category	VARCHAR(125)	NOT NULL UNIQUE,
    c_date	VARCHAR(10) NOT NULL,
	c_quizdate	VARCHAR(10),
    c_subcount	BIGINT	NOT NULL	DEFAULT 0,
	c_bookmark	TINYINT	NOT NULL	DEFAULT 0,
	PRIMARY KEY(c_catid, c_userid)
-- 	CONSTRAINT fk_usecat
-- 	FOREIGN KEY(c_userid) REFERENCES tbl_users(u_userid)
-- 	ON DELETE CASCADE
);

-- 주제
CREATE TABLE IF NOT EXISTS tbl_subjects(
	s_subid	VARCHAR(225)	NOT NULL,
    s_userid	VARCHAR(225)	NOT NULL,
	s_subject	VARCHAR(125)	NOT NULL,
	s_catid	VARCHAR(225)	NOT NULL,
	s_category	VARCHAR(125)	NOT NULL,	
	s_date	VARCHAR(10) NOT NULL,
    s_keycount	BIGINT	NOT NULL	DEFAULT 0,
	s_bookmark	TINYINT	NOT NULL	DEFAULT 0,
	s_content	TEXT,
	PRIMARY KEY(s_subid, s_catid, s_userid)
-- 	CONSTRAINT fk_catsub
-- 	FOREIGN KEY(s_catid) REFERENCES tbl_categories(c_catid)
-- 	ON DELETE CASCADE
);

-- 키워드
CREATE TABLE IF NOT EXISTS tbl_keywords(
	k_keyid	VARCHAR(225)	NOT NULL,
    k_userid	VARCHAR(225)	NOT NULL,
	k_subid	VARCHAR(225)	NOT NULL,
    k_index	INT	NOT NULL,
    k_wrongcount	BIGINT	NOT NULL	DEFAULT 0,
	k_keyword	VARCHAR(225)	NOT NULL,	
	k_desc	TEXT,
	PRIMARY KEY(k_keyid, k_subid, k_userid)
-- 	CONSTRAINT fk_subkey
-- 	FOREIGN KEY(k_subid) REFERENCES tbl_subjects(s_subid)
-- 	ON DELETE CASCADE
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS tbl_attachs(
	a_attid	VARCHAR(225)	NOT NULL,
    a_userid	VARCHAR(225)	NOT NULL, 
	a_subid	VARCHAR(225),
	a_date	VARCHAR(10)	NOT NULL,
	a_time	VARCHAR(10)	NOT NULL,
	a_originalname	VARCHAR(225)	NOT NULL,
	a_savename	VARCHAR(225)	NOT NULL,
	a_ext	VARCHAR(10)	NOT NULL,
	PRIMARY KEY(a_attid, a_subid, a_userid)
-- 	CONSTRAINT fk_subatt
-- 	FOREIGN KEY(a_subid) REFERENCES tbl_subjects(s_subid)
-- 	ON DELETE CASCADE
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
	PRIMARY KEY(t_todoid, t_userid)
-- 	CONSTRAINT fk_usetodo
-- 	FOREIGN KEY(t_userid) REFERENCES tbl_users(u_userid)
-- 	ON DELETE CASCADE,
-- 	CONSTRAINT valid_prior CHECK (t_prior >= 0 AND t_prior <= 5)	
);

-- 알림
CREATE TABLE IF NOT EXISTS tbl_notification(
	n_notid	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
	n_userid	VARCHAR(225)	NOT NULL,
	n_hour	INT	NOT NULL,
	n_endpoint	TEXT	NOT NULL,	
	n_authkey	VARCHAR(225)	NOT NULL,	
	n_p256dhkey	VARCHAR(225)	NOT NULL,	
	PRIMARY KEY(n_notid)
-- CONSTRAINT fk_usenot
-- FOREIGN KEY(n_userid) REFERENCES tbl_users(u_userid)
-- ON DELETE CASCADE,
-- CONSTRAINT valid_hour CHECK (n_hour >= 0 AND n_hour <= 23)
);