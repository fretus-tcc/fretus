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

router.get('/admin', async function (req, res) {
    try {
        const [ result ] = await conexao.query('SELECT * FROM duvidas ORDER BY data_duvida DESC')
        res.render('pages/ajuda-admin/read', { result: result })
    } catch (error) {
        return res.json({ error })
    }
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
            try {
                conexao.query('INSERT INTO duvidas SET ?', [data])
                res.redirect(`/ajuda/${data.slug_duvida}`)
            } catch (error) {
                return res.json({ error })
            }
        }
    }
)

router.get('/:slug', async function (req, res) {
    const { slug } = req.params
    try {
        const [ results ] = await conexao.query('SELECT * FROM duvidas WHERE slug_duvida = ?', [slug])
        if (!results.length) {
            return res.redirect('/ajuda')
        }
        res.render('pages/duvidas/duvida', { results: results[0], content: sanitizeHTML(marked.parse(results[0].conteudo_duvida)) })
    } catch (error) {
        return res.json({ error })
    }
})

router.get('/admin/update/:id', async function (req, res) {
    const { id } = req.params
    try {
        const [ results ] = await conexao.query('SELECT * FROM duvidas WHERE id_duvida = ?', [id])
        res.render('pages/ajuda-admin/update', { errors: null, quotes: results[0] })
    } catch (error) {
        return res.json({ error })
    }
})

router.put(
    '/admin/update/:id',
    
    body('title').notEmpty().withMessage('Campo não preenchido').isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres'),
    body('content').notEmpty().withMessage('Campo não preenchido'),

    function (req, res) {
        const { id } = req.params
        const data = saveData(req, res, 'update', { ...req.body, id_duvida: id })
        if (data) {
            try {
                conexao.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id])
                res.redirect(`/ajuda/${data.slug_duvida}`)
            } catch (error) {
                return res.json({ error })
            }
        }
    }
)

router.delete('/admin/delete/:id', function (req, res) {
    const { id } = req.params
    try {
        conexao.query('DELETE FROM duvidas WHERE id_duvida = ?', [id])
        res.redirect('/ajuda/admin')
    } catch (error) {
        return res.json({ error })
    }
})

const saveData = (req, res, type, quotes) => {
    if (!validationResult(req).isEmpty()) {
        res.render(`pages/ajuda-admin/${type}`, { errors: validationResult(req).mapped(), quotes })
        return
    }
    const { title, content } = req.body

    /* const isRepeated = conexao.query('SELECT * FROM duvidas WHERE titulo_duvida = ?', [title], (error, results) => {
        if (error) {
            res.json({ error })
            return
        } else if (results.length) {
            console.log(1)
            return results.length
        }
    })

    console.log(isRepeated) */

    return {
        titulo_duvida: title,
        conteudo_duvida: sanitizeHTML(content),
        slug_duvida: slugify(title, { lower: true, strict: true })
    }
}

module.exports = router