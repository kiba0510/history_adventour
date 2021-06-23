const {Router} = require("express");
const router = Router();


//Initialize firestore
const {Firestore} = require("@google-cloud/firestore");
const firestore = new Firestore();

//Create new places
router.post("/api/places", async(req, res) => {
        try {
         // Enter new data into the document.
        const document = firestore.collection("sites").doc();
        await document.set({
            name: "",
            history: "",
            exp_granted: "",
            position: "",
        })
        console.log("Entered new data into the document");
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Query sites by sites_id
router.get("/api/places/:sites_id", async(req,res) => {
    try {
        const doc = firestore.collection("sites").doc(req.params.sites_id);
        const item = await doc.get()
        const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Query all places 
router.get("/api/places", async (req, res) => {
    try {
        const query = firestore.collection("sites");
        const qs = await query.get();
        const docs = qs.docs;
        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }))
        return res.status(200).json(response)
    }catch (error) {
        return res.status(500).send(error);
    }
});

//Delete sites by sites_id
router.delete("/api/places/:sites_id", async(req, res) => {
    try {
        const document = firestore.collection("sites").doc(req.params.sites_id);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Update sites by sites id
router.put("/api/places/:sites_id", async(req, res) => {
    try {
        const document = firestore.collection("sites").doc(req.params.sites_id);
        await document.update({
           history: req.body.history
        });
        await document.update({
            name: req.body.name
         });
         await document.update({
            exp_granted: req.body.exp_granted
         });
         await document.update({
            position: req.body.position
         });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
})


module.exports = router
