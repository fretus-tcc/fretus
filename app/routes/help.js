var express = require("express")
var router = express.Router()

var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao()

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

router.get('/', function (req, res) {
    res.render('pages/ajuda')
})

router.get('/admin', function (req, res) {
    conexao.query('SELECT * FROM duvidas ORDER BY data_duvida DESC', (error, result) => {
        if (error) {
            return res.json({ error })
        }
        res.render('pages/ajuda-admin/read', { result })
    })
})

router.get('/admin/create', function (req, res) {
    res.render('pages/ajuda-admin/create', { errors: null, quotes: null })
})

router.post(
    '/admin/create',

    body('title').notEmpty().withMessage('Campo não preenchido').isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres'),
    body('content').notEmpty().withMessage('Campo não preenchido'),

    function (req, res) {
        if (!validationResult(req).isEmpty()) {
            return res.render('pages/ajuda-admin/create', { errors: validationResult(req).mapped(), quotes: req.body })
        }
        const { title, content } = req.body
        const data = {
            titulo_duvida: title,
            conteudo_duvida: sanitizeHTML(content),
            slug_duvida: slugify(title, { lower: true, strict: true })
        }
        conexao.query('INSERT INTO duvidas SET ? ', [data], (error, results) => {
            if (error) {
                return res.json({ error })
            }
            res.redirect(`/ajuda/${data.slug_duvida}`)
        })
    }
)

router.get('/:slug', function (req, res) {
    const { slug } = req.params
    conexao.query('SELECT * FROM duvidas WHERE slug_duvida = ?', [slug], (error, results) => {
        if (error) {
            return res.json({ error })
        } else if (!results.length) {
            return res.redirect('/ajuda')
        }
        res.render('pages/duvidas/duvida', { results: results[0], content: sanitizeHTML(marked.parse(results[0].conteudo_duvida)) })
    })
})

router.get('/admin/update/:id', function (req, res) {
    const { id } = req.params
    conexao.query('SELECT * FROM duvidas WHERE id_duvida = ?', [id], (error, results) => {
        if (error) {
            return res.json({ error })
        }
        res.render('pages/ajuda-admin/update', { errors: null, quotes: results[0] })
    })
})

router.put(
    '/admin/update/:id',
    
    body('title').notEmpty().withMessage('Campo não preenchido').isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres'),
    body('content').notEmpty().withMessage('Campo não preenchido'),

    function (req, res) {
        const { id } = req.params
        if (!validationResult(req).isEmpty()) {
            return res.render('pages/ajuda-admin/update', { errors: validationResult(req).mapped(), quotes: { ...req.body, id_duvida: id } })
        }
        const { title, content } = req.body
        const data = {
            titulo_duvida: title,
            conteudo_duvida: sanitizeHTML(content),
            slug_duvida: slugify(title, { lower: true, strict: true })
        }
        conexao.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id], (error, results) => {
            if (error) {
                return res.json({ error })
            }
            res.redirect(`/ajuda/${data.slug_duvida}`)
        })
    }
)

router.delete('/admin/delete/:id',  function (req, res) {
    const { id } = req.params
    conexao.query('DELETE FROM duvidas WHERE id_duvida = ?', [id], (error, results) => {
        if (error) {
            return res.json({ error })
        }
        res.redirect('/ajuda/admin')
    })
})

/* router.get('/duvida-1', function (req, res) {
    res.render('pages/duvidas/duvida-1')
})

router.get('/duvida-2', function (req, res) {
    res.render('pages/duvidas/duvida-2')
})

router.get('/duvida-3', function (req, res) {
    res.render('pages/duvidas/duvida-3')
})

router.get('/duvida-4', function (req, res) {
    res.render('pages/duvidas/duvida-4')
})

router.get('/duvida-5', function (req, res) {
    res.render('pages/duvidas/duvida-5')
})

router.get('/duvida-6', function (req, res) {
    res.render('pages/duvidas/duvida-6')
})
 */
module.exports = router