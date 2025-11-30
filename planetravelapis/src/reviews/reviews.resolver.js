const { Mutation } = require('../products/products.resolver');
const reviewsModel = require('./reviews.model');

const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    Query: {
        reviews: () => {
            if(isProduction){
                // console.log('--------------- Fetching reviews --------------- ');
                return reviewsModel.getAllReviews();
            } else {
                // console.log('--------------- Fetching reviews in TEST mode --------------- ');
                return reviewsModel.getAllReviews(true);
            }
        },
        reviewsByProductID: (_, args) => { // firsta argument is parent is not being used so we use '_'
            const { pid  } = args;
            // console.log(`--------------- Fetching reviews for product ${pid} --------------- `);
            return reviewsModel.getReviewsByProductID(pid, !isProduction);
        }
    },
    Mutation: {
        addReview: (_, args) => {
            const { note, pid } = args;
            // console.log(`--------------- Adding review ${note} for product ${pid} --------------- `);
            return reviewsModel.addReview(note, pid);
        }
    }
}