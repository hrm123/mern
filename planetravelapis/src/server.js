const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const launchesRouter = require('./routes/launches');
const planetsRouter = require('./routes/planets');
const customersRouter = require('./routes/customers');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Mount routes under /apis base URL
app.use('/apis', launchesRouter);
app.use('/apis', planetsRouter);
app.use('/apis', customersRouter);

const PORT = process.env.PORT || 8000;

// Export app for testing. Only listen when run directly.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;