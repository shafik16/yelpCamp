const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_thumb,w_200,g_face');
})

const opts = {toJSON: {virtuals: true}};

const campgroundSchema = new Schema({
    title: {
        type: String,
    },
    images: [ImageSchema],
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true 
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]

}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<h5>${this.title}</h5>
    <div class="row">
  <span class="d-inline-block text-truncate" style="max-width:150px;">
  ${this.description}
  </span>
</div> 
    <a href="/campgrounds/${this._id}">Visit Page</a>`
})



campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    };
})

module.exports = mongoose.model('Campground', campgroundSchema);;