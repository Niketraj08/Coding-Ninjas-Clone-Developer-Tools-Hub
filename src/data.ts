import { Problem, Course } from "./types";

export const PROBLEMS: Problem[] = [
  {
    id: "find-unique",
    title: "Find Unique Element",
    difficulty: "Easy",
    category: "Arrays",
    solveTime: "15 mins",
    points: 40,
    successRate: "89.4%",
    statement: "You have been given an integer array/list of size N, where N is equal to [2M + 1]. In the given array/list, 'M' numbers are present twice and one number is present only once. You need to find and return that single unique element present in the array/list.",
    starterCode: {
      cpp: `int findUnique(int *arr, int size) {
    // Write your code here
    int unique = 0;
    for (int i = 0; i < size; i++) {
        unique ^= arr[i];
    }
    return unique;
}`,
      java: `public class Solution {  
    public static int findUnique(int[] arr) {
        // Write your code here
        int unique = 0;
        for (int val : arr) {
            unique ^= val;
        }
        return unique;
    }
}`,
      python: `def findUnique(arr, n) :
    # Write your code here
    unique = 0
    for val in arr:
        unique ^= val
    return unique`,
      javascript: `function findUnique(arr) {
    // Write your code here
    let unique = 0;
    for (let val of arr) {
        unique ^= val;
    }
    return unique;
}`
    },
    testCases: [
      { input: "[2, 3, 1, 6, 3, 6, 2]", expected: "1" },
      { input: "[1, 3, 1, 3, 5]", expected: "5" }
    ]
  },
  {
    id: "reverse-array",
    title: "Reverse The Array",
    difficulty: "Easy",
    category: "Arrays",
    solveTime: "10 mins",
    points: 30,
    successRate: "92.1%",
    statement: "Given an array of integers of size N, your task is to reverse the array in place and return it. Do not allocate extra space for another array; you must do this by modifying the input array in place with O(1) extra memory.",
    starterCode: {
      cpp: `void reverseArray(vector<int> &arr, int m) {
    // Write your code here
    int s = 0, e = arr.size() - 1;
    while(s < e) {
        swap(arr[s], arr[e]);
        s++; e--;
    }
}`,
      java: `import java.util.ArrayList;
public class Solution {
    public static void reverseArray(ArrayList<Integer> arr, int m) {
        // Write your code here
        int s = 0, e = arr.size() - 1;
        while (s < e) {
            int temp = arr.get(s);
            arr.set(s, arr.get(e));
            arr.set(e, temp);
            s++; e--;
        }
    }
}`,
      python: `def reverseArray(arr, m):
    # Write your code here
    s, e = 0, len(arr) - 1
    while s < e:
        arr[s], arr[e] = arr[e], arr[s]
        s += 1
        e -= 1
    return arr`,
      javascript: `function reverseArray(arr) {
    // Write your code here
    let s = 0, e = arr.length - 1;
    while (s < e) {
        let temp = arr[s];
        arr[s] = arr[e];
        arr[e] = temp;
        s++; e--;
    }
    return arr;
}`
    },
    testCases: [
      { input: "[1, 2, 3, 4, 5, 6]", expected: "[6, 5, 4, 3, 2, 1]" },
      { input: "[10, 20, 30]", expected: "[30, 20, 10]" }
    ]
  },
  {
    id: "two-sum",
    title: "Two Sum Problem",
    difficulty: "Moderate",
    category: "Hash Maps",
    solveTime: "25 mins",
    points: 80,
    successRate: "78.2%",
    statement: "You are given an array of integers 'ARR' of size 'N' and a target integer 'S'. Your task is to return a list of all pairs of elements such that their sum is equal to 'S'. Each pair should be sorted in non-decreasing order, and the final list of pairs should be sorted.",
    starterCode: {
      cpp: `vector<vector<int>> pairSum(vector<int> &arr, int s) {
    // Write your code here
    vector<vector<int>> ans;
    // ...
    return ans;
}`,
      java: `import java.util.* ;
public class Solution {
    public static List<int[]> pairSum(int[] arr, int s) {
        // Write your code here
        List<int[]> ans = new ArrayList<>();
        // ...
        return ans;
    }
}`,
      python: `def pairSum(arr, s):
    # Write your code here
    pass`,
      javascript: `function pairSum(arr, s) {
    // Write your code here
    let ans = [];
    arr.sort((a,b) => a-b);
    let left = 0, right = arr.length - 1;
    // Simple mock implementation
    return ans;
}`
    },
    testCases: [
      { input: "arr = [1, 2, 3, 4, 5], s = 5", expected: "[[1, 4], [2, 3]]" }
    ]
  },
  {
    id: "nth-fibonacci",
    title: "N-th Fibonacci Number",
    difficulty: "Easy",
    category: "Recursion",
    solveTime: "12 mins",
    points: 30,
    successRate: "85.3%",
    statement: "Write a function to find the N-th Fibonacci number. The Fibonacci sequence is defined as F(1) = 1, F(2) = 1, and F(N) = F(N-1) + F(N-2) for N > 2. Since the answer can be very large, return the output modulo 10^9 + 7.",
    starterCode: {
      cpp: `int fibonacci(int n) {
    // Write your code here
    if (n <= 2) return 1;
    long long a = 1, b = 1, c;
    for(int i = 3; i <= n; i++) {
        c = (a + b) % 1000000007;
        a = b;
        b = c;
    }
    return b;
}`,
      java: `public class Solution {
    public static int fibonacci(int n) {
        // Write your code here
        if (n <= 2) return 1;
        long a = 1, b = 1, c = 0;
        for (int i = 3; i <= n; i++) {
            c = (a + b) % 1000000007;
            a = b;
            b = c;
        }
        return (int)b;
    }
}`,
      python: `def fibonacci(n):
    # Write your code here
    if n <= 2:
        return 1
    a, b = 1, 1
    for i in range(3, n + 1):
        a, b = b, (a + b) % 1000000007
    return b`,
      javascript: `function fibonacci(n) {
    // Write your code here
    if (n <= 2) return 1;
    let a = 1, b = 1, c;
    for (let i = 3; i <= n; i++) {
        c = (a + b) % 1000000007;
        a = b;
        b = c;
    }
    return b;
}`
    },
    testCases: [
      { input: "6", expected: "8" },
      { input: "10", expected: "55" }
    ]
  }
];

export const COURSES: Course[] = [
  {
    id: "cpp-dsa",
    title: "C++ Foundation with Data Structures & Algorithms",
    tag: "MOST POPULAR",
    rating: 4.9,
    reviewsCount: "12,450",
    duration: "4 Months",
    features: ["150+ Coding Problems", "24/7 Doubt Resolution", "1:1 Mentor Support", "Resume Review Sessions"],
    originalPrice: 14999,
    discountedPrice: 8999,
    level: "Beginner",
    logo: "cpp"
  },
  {
    id: "java-dsa",
    title: "Java Foundation with Data Structures & Algorithms",
    tag: "RECOMMENDED FOR JOBS",
    rating: 4.8,
    reviewsCount: "9,820",
    duration: "4 Months",
    features: ["160+ Coding Problems", "Placement Cell Access", "Mock Interviews", "Live Project Building"],
    originalPrice: 15999,
    discountedPrice: 9499,
    level: "Beginner",
    logo: "java"
  },
  {
    id: "mern-fullstack",
    title: "Full Stack Web Development (MERN Course)",
    tag: "BEST SELLER",
    rating: 4.9,
    reviewsCount: "15,100",
    duration: "6 Months",
    features: ["Building 8+ Live Projects", "MongoDB, Express, React, Node", "System Design Basics", "Dedicated Placement Support"],
    originalPrice: 24999,
    discountedPrice: 14999,
    level: "Intermediate",
    logo: "web"
  },
  {
    id: "data-science",
    title: "Data Science & Machine Learning Bootcamp",
    tag: "TRENDING",
    rating: 4.7,
    reviewsCount: "6,410",
    duration: "5 Months",
    features: ["Python, SQL, Pandas, NumPy", "Predictive ML Modeling", "Deep Learning Foundations", "Advanced Statistics Track"],
    originalPrice: 19999,
    discountedPrice: 11999,
    level: "Intermediate",
    logo: "data"
  },
  {
    id: "competitive-programming",
    title: "Competitive Programming Masterclass",
    tag: "FOR EXPERTS",
    rating: 4.9,
    reviewsCount: "4,200",
    duration: "3 Months",
    features: ["Advanced Tree/Graph Algorithms", "Segment Trees & Fenwick Trees", "Monthly Mock Contests", "Codeforces/Codechef Preparation"],
    originalPrice: 12999,
    discountedPrice: 7999,
    level: "Advanced",
    logo: "cp"
  }
];

export const ALUMNI_COMPANIES = [
  { name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Adobe", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_Logo.svg" },
  { name: "Meta", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Salesforce", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "Samsung", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" }
];
