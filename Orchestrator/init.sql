CREATE TABLE IF NOT EXISTS `Workers`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `log_level` INT NULL,
    `log_levelname` CHAR(32) NULL,
    `log` TEXT(2048) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `created_by` CHAR(32) NOT NULL,
    `type` CHAR(32) NOT NULL,
    `name` CHAR(32) NOT NULL,
    PRIMARY KEY (`id`)
);