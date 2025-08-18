export default function vaidate(schema) {
  return async function (req, res, next) {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        file: req.file,
      });

      req.validatedBody = validatedData.body;
      req.validatedFile = validatedData.file;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };
}
