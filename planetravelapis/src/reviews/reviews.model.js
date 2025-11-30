const reviews = [
				{
					id: 1,
					pid: 2,
					note: 'Blue Jean are awesome',
					price: 42.12
				},
				{
					id: 2,
					pid: 1,
					note: 'Red shoes are awesome',
					price: 12.34
				}
			];

		
function getAllReviews(test) {
	if(test) {
		// console.log('Getting all reviews - test mode');
		return reviews;
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function getReviewsByProductID(pid,test=false) {
	if(test) {
		// console.log('Getting products by price range - test mode');
		return reviews.filter(review => review.pid === pid);
	}
	return null; // TODO - fetch from actual databse in real scenario
}

function addReview(note, pid) {
	const newReview = {
		id: reviews.length + 1,
		pid,
		note
	};
	reviews.push(newReview);
	return newReview;
}

module.exports = {
	getAllReviews,
	getReviewsByProductID,
	addReview
}