import axios from 'axios';

axios.get('https://api.example.com/data').then(response => {
    console.log('Data received:', response.data);
}).catch(error => {
    console.error('Error fetching data:', error);
}). then(() => {
    console.log('Request completed.');
});
