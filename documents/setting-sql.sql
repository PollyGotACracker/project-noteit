CREATE DATABASE notedb;
USE notedb;

SELECT * FROM tbl_users;

DELETE FROM tbl_categories;
DELETE FROM tbl_subjects;
DELETE FROM tbl_keywords;

INSERT INTO tbl_users(u_userid, u_pwd, u_nickname, u_profileimg, u_profilestr) VALUES('polly@gmail.com', '1234', '앵무', '', '안녕!!');