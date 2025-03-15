import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    imageList: [
      {
        type: String,
        default: [],
      },
    ],
    isbn: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    genre: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: false,
    },
    expectedAvailable: {
      type: Date,
      default: null,
    },
    averageRating: {
      type: Number,
    },
    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
    lastUpdateBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("book", bookSchema); //books
