const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        },

        company: {
        type: String,
        required: true,
        },

        location: {
        type: String,
        required: true,
        },

        salary: {
        type: String,
        },

        description: {
        type: String,
        required: true,
        },

        skillsRequired: {
        type: [String],
        default: [],
        },

        createdBy: {
        type: mongoose.Schema.Types.ObjectId, //“This field stores MongoDB document IDs”
        ref: "User", //“This ObjectId belongs to User model”
        required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);