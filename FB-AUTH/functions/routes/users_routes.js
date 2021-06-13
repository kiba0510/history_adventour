const {Router} = require('express');
const router = Router();

//Initialize firestore
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

router.post('/api/users', async (req, res) => {
    try {
        const document = firestore.collection('users').doc();
        await document.set({
            name: "",
            lastname: "",
            exp_granted: "",
            email: "",
        })
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get('/api/users/:user_id', async(req, res) => {
    try {
            const doc = firestore.collection('users').doc(req.params.user_id);
            const item = await doc.get()
            const response = item.data()
        return res.status(200).json(response)
        } catch (error) {
        return res.status(500).send(error);
        }
});

router.get("/api/users", async (req, res) => {
    try {
        const query = firestore.collection('users');
        const qs = await query.get();
        const docs = qs.docs;
        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }));

      return res.status(200).json(response);   
    } catch (error) {
      return res.status(500).json();
    }
});

router.delete ("/api/users/:user_id", async(req, res) => {
    try {
        const document = firestore.collection('users').doc(req.params.user_id);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.put("/api/users/:user_id", async (req, res) =>{
    try {
        const document = firestore.collection('users').doc(req.params.user_id);
        await document.update({
            name: req.body.name,
        });
        await document.update({
            lastname: req.body.lastname
         });
         await document.update({
            email: req.body.email
         });
         await document.update({
            exp_granted: req.body.exp_granted
         });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router

