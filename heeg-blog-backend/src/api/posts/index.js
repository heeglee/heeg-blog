const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
posts.patch('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

module.exports = posts;