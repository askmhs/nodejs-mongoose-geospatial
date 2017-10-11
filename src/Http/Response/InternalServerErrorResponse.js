export default (res, message) => {
    res.status(500);
    res.json({
        success: false,
        message: message,
        error_code: 5,
        data: null
    });
}