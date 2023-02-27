const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').
    catch(error => handleError(error));

const genNum = (max) => {
    num = []
    for (let i = 0; i < max; i++) {
        num.push(i);
    }
    return num;
}
const num1000 = genNum(1000);
const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const num = Math.floor(Math.random() * 1000);
        const numIndex = num1000.indexOf(num);
        if (numIndex !== -1) {
            const camp = new Campground({
                author: '63f9c3190c4f49a798b55f85',
                title: `${sample(descriptors)} ${sample(places)}`,
                location: `${cities[num].city}, ${cities[num].state}`,
                geometry: { type: 'Point', coordinates: [cities[num].longitude,cities[num].latitude] },
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis laborum mollitia molestias facere minus aperiam molestiae nulla consectetur blanditiis fugiat quidem illum, esse maiores nemo accusamus accusantium. Odio, rem sed!',
                images: [
                    {
                        url: 'https://res.cloudinary.com/dlvfbopo7/image/upload/v1677384409/YelpCamp/vafhxsai3szvlkqqopfa.jpg',
                        filename: 'YelpCamp/vafhxsai3szvlkqqopfa'
                    },
                    {
                        url: 'https://res.cloudinary.com/dlvfbopo7/image/upload/v1677348233/YelpCamp/dqrvbwqny5cfgx1qbqz0.jpg',
                        filename: 'YelpCamp/dqrvbwqny5cfgx1qbqz0'
                    }
                ],
                price: Math.floor(Math.random() * 30)
            })
            num1000.splice(numIndex, 1);
            await camp.save()
        } else {
            i--;
        }
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})