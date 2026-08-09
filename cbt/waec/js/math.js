export const mathematicsQuestions = [
    {
        id: "m1",
        textHTML: "Simplify: 3<sup>2</sup> &times; 3<sup>-3</sup>", 
        topic: "Indices",
        options: ["21 cm", "14 cm", "28 cm", "42 cm"],
        answer: 0,
        explanation: "According to the laws of indices, when multiplying with the same base, you add the powers: 2 + (-3) = -1. Therefore, 3<sup>-1</sup> = 1/3."
    },
    {
        id: "m2",
        textHTML: "A bag contains 4 red, 3 green and 5 blue balls. If a ball is picked at random, what is the probability that it is NOT green?",
        topic: "Probability",
        options: ["3/12", "1/4", "3/4", "9/12"],
        answer: 2,
        explanation: "Total balls = 4 + 3 + 5 = 12. Number of green balls = 3. Number of non-green balls = 12 - 3 = 9. Probability = 9/12, which simplifies to 3/4."
    },
    {
        id: "m3",
        textHTML: "If 2x + 3y = 10 and x - y = 0, find the value of x.",
        topic: "Algebra (Simultaneous Equations)",
        options: ["1", "2", "3", "4"],
        answer: 1,
        explanation: "From the second equation, x = y. Substitute y for x in the first equation: 2x + 3x = 10. Therefore, 5x = 10, meaning x = 2."
    },
    {
        id: "m4",
        textHTML: "Calculate the area of a circle whose radius is 7cm. (Take &pi; = 22/7)",
        topic: "Mensuration",
        options: ["44 cm<sup>2</sup>", "154 cm<sup>2</sup>", "308 cm<sup>2</sup>", "616 cm<sup>2</sup>"],
        answer: 1,
        explanation: "Area of a circle = &pi;r<sup>2</sup>. Area = (22/7) &times; 7 &times; 7 = 22 &times; 7 = 154 cm<sup>2</sup>."
    },
    {
        id: "m5",
        textHTML: "Find the median of the following set of numbers: 8, 2, 5, 5, 10, 12, 1.",
        topic: "Statistics",
        options: ["5", "6", "8", "2"],
        answer: 0,
        explanation: "First, arrange the numbers in ascending order: 1, 2, 5, 5, 8, 10, 12. Since there are 7 numbers, the median is the 4th number, which is 5."
    }
];