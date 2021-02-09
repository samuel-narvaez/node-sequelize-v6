const postRouter = require('./postRouter');
const userRouter = require('./userRouter');

module.exports = app => {
    app.use('/api/v1/post', postRouter);
    app.use('/api/v1/user', userRouter);
}