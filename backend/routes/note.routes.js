const express = require("express")
const { NoteModel } = require("../model/note.model")

const noteRouter = express.Router()

noteRouter.get("/",async (req, res) => {
    const notes=await NoteModel.find()
    res.send(notes)
})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    const note = new NoteModel(payload)
    await note.save()
    res.send({ "msg": "Note created" })
})

noteRouter.patch("/update/:id", async (req, res) => {
    const noteID=req.params.id
    const payload=req.body
    await NoteModel.findByIdAndUpdate({_id:noteID},payload)
 
     res.send({"msg":`Note with id${noteID} has been updated`})
 })

noteRouter.delete("/delete/:id", async (req, res) => {
   const noteID=req.params.id
   await NoteModel.findByIdAndDelete({_id:noteID})

    res.send({"msg":`Note with id${noteID} has been Deleted`})
})

module.exports = {
    noteRouter
}