const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
      }
      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = validationMiddleware;
