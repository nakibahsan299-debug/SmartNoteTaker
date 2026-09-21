import express from "express";
import { createNewNotes, displayNote, deleteNotes, displayAllNotes, updateNotes } from "../controller/notesController.js";
const router = express.Router();


//GET = Get post from Instagram
//POST = Create post on instagram
//PUT = Update post 
//DELETE = Delete post

//200 means code worked successfully

//An endpoint is a combination of URL+HTTP that let a client to interact with a specific resource.
//Since we prefixed api/notes in use() method. We will simply use / for every router CRUD methods.
//Now, we will use router object to redirect url request only. The control of specific operations of the endpoint will be performed by notesController.
//In order to do that we will import each corespondent functionality for each endpoint from notesController and call it here in the endpoint methods.
router.get('/', displayAllNotes)
router.get('/:id',displayNote)
router.post('/', createNewNotes)
router.put('/:id', updateNotes)
router.delete('/:id', deleteNotes)

export default router; 