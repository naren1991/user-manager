const user = require('../controllers/user.controller.js');

router = require('express').Router();
    
router.post('/create', user.create);

router.post('/search', user.search);

router.put('/update/:userId', user.update);

router.get('/delete/:userId', user.delete);

module.exports = router;