module.exports = class InitControllers {

  static async initInfoApp(req, res, next) {
    try {
      return res.status(200).json({message: "connect succeessfuly"});
    } catch (err) {
      next(err);
    }
  }
};
