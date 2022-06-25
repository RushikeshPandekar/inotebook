const express = require('express');
const fetchuser = require('../middlewear/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const routes=express.Router();
 
routes.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Note.find({userId:req.user.id});
        res.json(notes);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})
routes.post('/addnote',fetchuser,[
    body("title","Title Should be of minimum length 3").isLength({ min: 3 }),
    body("description","Description Should be of minimum length 5").isLength({ min: 5 }),
],async(req,res)=>{
    try {
        const errors = validationResult(req);  // result of validation
        // if their are errors in validation return status code 400
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tags}=req.body;
        const note=new Note({title,description,tags,userId:req.user.id});
        const savedNote=await note.save();
        res.json(savedNote)
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})
routes.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(note.userId.toString() != req.user.id){
            return res.status(401).send("Access Denied");
        }
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        res.json({success:"Note Deleted Successfully",deletedNote});
    } catch (error) {
        
    }
})
routes.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        let {title,description,tags}=req.body;
        let newnote={}
        if(title) newnote.title = title
        if(description) newnote.description = description
        if(tags) newnote.tags = tags

        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(note.userId.toString() != req.user.id){
            return res.status(401).send("Access Denied");
        }
        const newNote=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        res.json(newNote);
    } catch (error) {
        
    }
})

module.exports=routes;