const express = require('express');
const router = express.Router(); // 대문자 Router여야 함 조심!
const controllers = require('./controllers');
require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config = require('./config/awsconfig.js');
const s3 = new aws.S3();

// 로컬에 저장하기 (테스트용, 폴더가 존재해야 업로드됩니다! 없으면 오류발생)
const upload = multer({ dest: 'uploads/' });

// S3에 업로드하기 (지갑을 지켜주세요)
// 사용하려면 config폴더에 awsconfig파일이 있어야 합니다(이미 3퍼 넘게 써버림 ㅎㅎ;)
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'nadri',
//         acl: 'public-read',
//         key: function(req, file, cb) {
//             cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
//         }
//     }),
//     limits: {
//         fileSize: 1000 * 1000 * 10
//     }
// });

/* ================================================================ */

// 라우터 입력 시작

router.post(
  '/post',
  upload.fields([
    { name: 'image', maxCount: 4 },
    { name: 'content', maxCount: 1 },
  ]),
  controllers.post
); // 이미지 업로드 테스트 중

// auth 라우터
router.post('/auth/code', controllers.code);
router.post('/auth/login', controllers.login);
router.post('/auth/logout', controllers.logout);
router.post('/auth/signup', controllers.signup);
router.delete('/auth/signout', controllers.signout);

// comment 라우터
router.get('/comment', controllers.comment.getUserComment); // 사용자 전체 댓글 조회
router.get('/comment/:id', controllers.comment.getPostComment); // 특정Post댓글 조회
router.post('/comment/:id', controllers.comment.postComment); // 특정Post댓글 작성
router.patch('/comment/:id', controllers.comment.modifyComment); // 특정 댓글 수정
router.delete('/comment/:id', controllers.comment.deleteComment); // 특정 댓글 삭제

// like 라우터
router.get('like', controllers.like.getLike)
router.post('like/:id', controllers.like.postLike)

// 라우터 입력 끝

module.exports = router;
