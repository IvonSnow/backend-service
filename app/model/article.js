'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    article_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: "博文id",
      field: "article_id"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "标题",
      field: "title",
      unique: "title"
    },
    author: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "薛云峰",
      primaryKey: false,
      autoIncrement: false,
      comment: "作者",
      field: "author"
    },
    abstract: {
      type: DataTypes.STRING(900),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "摘要",
      field: "abstract"
    },
    labels: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "标签",
      field: "labels"
    },
    cover_url: {
      type: DataTypes.STRING(700),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "封面url",
      field: "cover_url"
    },
    content_md: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文章内容md",
      field: "content_md"
    },
    content_html: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文章内容html",
      field: "content_html"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "发布时间",
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "更新时间",
      field: "updated_at"
    },
    like_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "点赞数",
      field: "like_count"
    },
    comment_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "评论数",
      field: "comment_count"
    },
    read_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "浏览量",
      field: "read_count"
    },
    top_flag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "是否置顶",
      field: "top_flag"
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "是否发布",
      field: "status"
    }
  };
  const options = {
    tableName: "article",
    comment: "",
    indexes: []
  };
  const ArticleModel = sequelize.define("article_model", attributes, options);
  return ArticleModel;
};