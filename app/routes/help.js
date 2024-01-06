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
        const data = saveData(req, res, 'create', req.body)
        if (data) {
            conexao.query('INSERT INTO duvidas SET ? ', [data], (error, results) => {
                if (error) {
                    return res.json({ error })
                }
                res.redirect(`/ajuda/${data.slug_duvida}`)
            })
        }
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
        const data = saveData(req, res, 'update', { ...req.body, id_duvida: id })
        if (data) {
            conexao.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id], (error, results) => {
                if (error) {
                    return res.json({ error })
                }
                res.redirect(`/ajuda/${data.slug_duvida}`)
            })
        }
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

const saveData = (req, res, type, quotes) => {
    if (!validationResult(req).isEmpty()) {
        res.render(`pages/ajuda-admin/${type}`, { errors: validationResult(req).mapped(), quotes })
        return
    }
    const { title, content } = req.body
    return {
        titulo_duvida: title,
        conteudo_duvida: sanitizeHTML(content),
        slug_duvida: slugify(title, { lower: true, strict: true })
    }
}

module.exports = router