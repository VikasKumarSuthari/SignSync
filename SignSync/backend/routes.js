const router =require('express').Router();

const {saveTranscript,sendEmail}=require('./functions')

router.post('/transcript', saveTranscript);
router.post('/sendFeedbackEmail', async (req, res) => {
    try {
        const formData = req.body;
        await sendEmail(formData);
        res.json({success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({  success: false,error: "Failed to send email" });
    }
});


module.exports=router;