const router = require('express').Router();
const { JobListing } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try {
        const newJob = await JobListing.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newJob);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const jobData = await JobListing.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!jobData) {
            res.status(404).json({ message: 'No job listing found with this ID!'});
            return;
        }

        res.status(200).json(jobData);
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;