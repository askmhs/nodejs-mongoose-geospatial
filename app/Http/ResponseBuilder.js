export class ResponseBuilder {

    /**
     * Success response
     * 
     * @param {*} res 
     * @param {*} message 
     * @param {*} data 
     */
    success(res, message, data) {
        res.json({
            success: true,
            message: message,
            data: data
        });
    }

    /**
     * Internal server error response
     * 
     * @param {*} res 
     * @param {*} errors 
     * @param {*} error_code 
     */
    internalServerError(res, errors = [], error_code = 5) {
        res.status(500);
        res.json({
            success: false,
            message: "Whoops, something went wrong!",
            error_code: error_code,
            errors: errors
        });
    }
}