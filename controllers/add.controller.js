import addNumber from "../common/util";

class AddController {
  // Add digit
  static addDigit(req, res) {
    try {
      const { numbers } = req.body;

      if (typeof numbers !== "string") {
        return res
          .status(500)
          .json({ error: "Invalid input. Expected a comma-separated string." });
      }

      const result = addNumber(numbers);

      return res.status(200).json({ sum: result });
    } catch (err) {
      return res.status(500).json({
        error: err.message ? err.message : "something went wrong",
      });
    }
  }
}

export default AddController;
