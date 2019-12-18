/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : qq

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 18/12/2019 21:34:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for add_friend
-- ----------------------------
DROP TABLE IF EXISTS `add_friend`;
CREATE TABLE `add_friend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'userID',
  `friend_id` int(11) NULL DEFAULT NULL COMMENT '目标用户ID',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '验证消息',
  `createtime` bigint(13) NULL DEFAULT NULL COMMENT '创建时间',
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  `status` int(2) NULL DEFAULT NULL COMMENT '1同意0拒绝-1等待验证',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of add_friend
-- ----------------------------
INSERT INTO `add_friend` VALUES (7, 100002, 100000, '我是13014700931', 1576587438822, '默认分组', '', 1);
INSERT INTO `add_friend` VALUES (8, 100000, 100004, '我是爱是一道光', 1576589715854, '默认分组', '', -1);
INSERT INTO `add_friend` VALUES (9, 100000, 100008, '我是爱是一道光', 1576589724764, '默认分组', '', -1);
INSERT INTO `add_friend` VALUES (10, 100001, 100002, '我是大头', 1576671293627, '默认分组', '', -1);

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `friend_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createtime` bigint(13) NULL DEFAULT NULL,
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES (1, 100002, 100000, '', 1576675965797, '默认分组');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `qq` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '头像',
  `Introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '简介',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `createtime` bigint(13) NULL DEFAULT NULL COMMENT '创建时间',
  `del` int(1) NULL DEFAULT NULL COMMENT '是否删除',
  `birthday` bigint(13) NULL DEFAULT NULL COMMENT '生日（时间戳）',
  `gender` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '\r\n性别',
  `office` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '职业',
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '公司',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '所在地',
  `hometown` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '家乡',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'email',
  `home_bg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '个人主页背景图片',
  PRIMARY KEY (`qq`) USING BTREE,
  UNIQUE INDEX `uniq_phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100020 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (100000, '13014700920', '爱是一道光', '\\upload\\upload_5b5bf26ef887dfc8e762d650d7647e51.jpg', '开发者一名', '8bc9f601cb0885a9b51bca4b40a9c70d', 1574684715263, NULL, 1497024000000, '男', 'IT', '硕橙科技', '安徽省-合肥市', '河南省-洛阳市', '873261648@qq.com', '\\upload\\upload_00a216e9f38258d39403635745a018b7.jpg');
INSERT INTO `users` VALUES (100001, '13014700932', '大头', '\\upload\\upload_9c32b175e69fe2556f7f733f59985a4b.jpg', '永远相信美好的事情即将发生', '8bc9f601cb0885a9b51bca4b40a9c70d', 1574416472629, NULL, 819043200000, '男', 'IT', NULL, '北京市-市辖区', '广东省-深圳市', NULL, '\\upload\\upload_7a9b48351d192b202208c55f5bb0c540.jpg');
INSERT INTO `users` VALUES (100002, '13014700931', '油闷大虾', '\\upload\\upload_04a5a62cef38dc2a55e4eb7fb80b472b.jpg', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666760247, NULL, 1513440000000, '男', '商业', NULL, '山西省-太原市', '山西省-晋城市', NULL, '\\upload\\upload_09b8b4022d182ee6029ccb80015d7508.jpg');
INSERT INTO `users` VALUES (100003, '13014700933', '13014700933', '/upload/default6.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666765288, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100004, '13014700934', '13014700934', '/upload/default5.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666768356, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100005, '13014700935', '13014700935', '/upload/default7.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666772287, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100006, '13014700936', '13014700936', '/upload/default2.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666777034, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100007, '13014700937', '13014700937', '/upload/default1.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666780164, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100008, '13014700938', '13014700938', '/upload/default9.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666783553, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100009, '13014700939', '13014700939', '/upload/default2.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666786128, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100010, '13014700930', '13014700930', '/upload/default5.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1574666791261, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (100019, '32133222222', '32133222222', '/upload/default1.png', NULL, '8bc9f601cb0885a9b51bca4b40a9c70d', 1575376292760, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
