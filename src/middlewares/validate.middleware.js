export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const issues = error?.issues || error?.errors || [];

    const errors = issues.map((err) => ({
      field: err.path?.join('.') || 'unknown',
      message: err.message || 'Invalid value',
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  }
};