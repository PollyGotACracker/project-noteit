CREATE DATABASE notedb;
USE notedb;

delete from tbl_scores;

select * from tbl_users;
select * from tbl_keywords;
select * from tbl_subjects;
select * from tbl_categories;

INSERT INTO tbl_categories(c_catid,
c_userid,
c_category,
c_date,
c_subcount,
c_bookmark
) VALUES (
"a139f7bd", "polly@gmail.com", "정보처리기사", "2023-03-09", 7, 1
);

UPDATE tbl_users SET u_profileimg = "" WHERE u_userid="polly@gmail.com";
DELETE FROM tbl_categories;
DELETE FROM tbl_subjects;
DELETE FROM tbl_keywords;

INSERT INTO tbl_users(u_userid, u_pwd, u_nickname, u_profileimg, u_profilestr) VALUES('polly@gmail.com', '1234', '앵무', '', '안녕!!');