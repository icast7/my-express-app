const express = require( 'express' );
const router = express.Router();
const pets = require( './pets' );
const bodyParser = require( './my-body-parser' )();

router
    .get( '/count', ( req, res ) => {
        pets.getCount( ( err, count ) => {
        if ( err ) res.status(500).send( err );
            else res.send(count);
        });
    })
    .get( '/', ( req, res ) => {
        pets.getAll( ( err, pets ) => {
        if ( err ) res.status(500).send( err );
            else res.send( pets );
        });
    })
    .get( '/:idNumber', ( req, res ) => {
        pets.get( req.params.idNumber, ( err, pet ) => {
        if ( err ) res.status(500).send( err );
            else res.send( pet );
        });
    })
    .post( '/', bodyParser, ( req, res ) => {
        pets.add( req.body, ( err, pet ) => {
        if ( err ) res.status(500).send(err);
            else res.send( pet );
        })
    });

module.exports = router;