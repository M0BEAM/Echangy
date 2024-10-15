//--> private function working when the client has been successefully login
module.exports.private = (req,res) => {
    res.status(200).json({
        success:true,
        message:"you login successfully",
        client:req.client
    })
}