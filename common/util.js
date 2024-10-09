const addNumber = (numbers) => {
  if (numbers === "") return 0;

  // Custom delimiter logic
  let delimiters = [",", "\n"]; // Default delimiters are comma and newline

  // Check for custom delimiter in the format "//[delimiter]\n[numbers…]"
  if (numbers.startsWith("//")) {
    const delimiterPart = numbers.split("\n")[0]; // Extract the delimiter definition
    const customDelimiter = delimiterPart.slice(2); // Get the part after "//"
    delimiters.push(customDelimiter); // Add the custom delimiter to delimiters list
    numbers = numbers.split("\n").slice(1).join("\n"); // Strip the delimiter part from the number string
  }

  // Create a regular expression to match any of the delimiters
  const delimiterRegex = new RegExp(`[${delimiters.join("")}]`);

  // Split the numbers string based on the delimiters
  const numberArray = numbers.split(delimiterRegex);

  // Check for negative numbers
  const negativeNumbers = numberArray.filter((n) => parseInt(n) < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }

  // Convert to numbers and sum them
  const sum = numberArray.reduce((acc, num) => acc + parseInt(num || 0), 0);

  return sum;
};

export default addNumber;
