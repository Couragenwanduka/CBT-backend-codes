
 export const errorHander= (err, req, res, next) => {
    const errorSatus= err.statusCode|| 500;
    const errorMessage= err.message|| "Something went wrong";
    res.status(errorSatus).json({
        success:false,
        error: errorMessage
    })
};
