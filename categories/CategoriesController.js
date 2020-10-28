const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify")

router.get("/categories", (req, res) => {
    res.send("<h1>Rota de categoria</h1>");
});

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if (title != undefined){
        
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/');
        })

    }else{
          res.redirect('/admin/categories/new');
    }
})

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories:categories
        });
    })
    
})


module.exports = router;