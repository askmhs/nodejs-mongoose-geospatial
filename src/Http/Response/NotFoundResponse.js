export default (res, message) => {
    res.status(404);
    res.json({
        success: false,
        message: message,
        error_code: 0,
        data: null
    });
}