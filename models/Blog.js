const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../config/db") 

function createSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/đ/g, "d") 
    .replace(/Đ/g, "D") 
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") 
    .replace(/^-+|-+$/g, "") 
    .trim()
}

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT, 
    },
    content: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    readTime: {
      type: DataTypes.STRING, 
      defaultValue: "2 phút"
    },
  },
  {
    tableName: "Blogs",
    timestamps: true, 
     hooks: {
      // Hook to generate slug before creating a new blog
      beforeCreate: async (blog, options) => {
        if (blog.title && !blog.slug) {
          const baseSlug = createSlug(blog.title)
          let slug = baseSlug
          let counter = 1

          // Check if slug already exists and make it unique
          while (await Blog.findOne({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`
            counter++
          }

          blog.slug = slug
        }
      },
      beforeUpdate: async (blog, options) => {
        if (blog.changed("title")) {
          const baseSlug = createSlug(blog.title)
          let slug = baseSlug
          let counter = 1

          while (
            await Blog.findOne({
              where: {
                slug,
                id: { [Sequelize.Op.ne]: blog.id },
              },
            })
          ) {
            slug = `${baseSlug}-${counter}`
            counter++
          }

          blog.slug = slug
        }
      },
    },
  },
)

module.exports = Blog
