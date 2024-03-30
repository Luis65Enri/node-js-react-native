const multer = require ('multer');
const path = require ('path');

const almacenaProducto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img/productos'))
    },
    filename: (req, file, cb)=>{
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
            const random = Math.round(Math.random()*(99998-10001))+10001;
            cb(null,
                'producto-'+ Date.now()+'-'+random+req.query.id+'-'+file.mimetype.replace('/','.'));
        }
    }
});
exports.guardarImagenProducto = multer({
    storage: almacenaProducto,
    limits: {
        fileSize: 1000000,
    }
}).single('img');