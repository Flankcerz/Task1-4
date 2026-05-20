// Завдання 1: Масиви та функції вищого порядку
function analyzeScores(students) {
  if (!students || students.length === 0) {
    return { passed: [], failed: [], average: 0, best: null };
  }

  const passed = students.filter(s => s.score >= 60).map(s => s.name);
  const failed = students.filter(s => s.score < 60).map(s => s.name);
  
  const totalScore = students.reduce((sum, s) => sum + s.score, 0);
  const average = totalScore / students.length;

  const bestStudent = students.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  }, students[0]);

  return {
    passed: passed,
    failed: failed,
    average: Number(average.toFixed(2)),
    best: bestStudent.name
  };
}

// Завдання 2: Замикання
function createCounter(initial) {
  let count = initial;

  return {
    increment() { count += 1; return count; },
    decrement() { count -= 1; return count; },
    getValue() { return count; },
    reset() { count = initial; return count; }
  };
}

// Завдання 3: Проміси та async/await
async function fetchUserPosts(userId) {
  try {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userResponse.ok) throw new Error();
    const user = await userResponse.json();

    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!postsResponse.ok) throw new Error();
    const posts = await postsResponse.json();

    return {
      name: user.name,
      email: user.email,
      postsCount: posts.length
    };
  } catch (error) {
    return { error: "Не вдалося завантажити дані" };
  }
}

// Завдання 4: Класи та ООП
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  info() {
    return `${this.title} ${this.author} (${this.year})`;
  }
}

class EBook extends Book {
  constructor(title, author, year, fileSize) {
    super(title, author, year);
    this.fileSize = fileSize;
  }
  info() {
    return `${super.info()}, ${this.fileSize} MB`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  findByAuthor(author) {
    return this.books.filter(b => b.author === author);
  }
  getNewest() {
    if (this.books.length === 0) return null;
    return this.books.reduce((newest, current) => {
      return current.year > newest.year ? current : newest;
    }, this.books[0]);
  }
}

// ==========================================
// АВТОМАТИЧНИЙ ЗАПУСК ТЕСТІВ
// ==========================================
async function runTests() {
  console.log("=== ЗАВДАННЯ 1 ===");
  const students = [
    { name: "Іван", score: 85 },
    { name: "Марія", score: 42 },
    { name: "Олег", score: 93 },
    { name: "Анна", score: 55 }
  ];
  console.log(analyzeScores(students));

  console.log("\n=== ЗАВДАННЯ 2 ===");
  const counter = createCounter(10);
  console.log(counter.increment());
  console.log(counter.increment());
  console.log(counter.decrement());
  console.log(counter.getValue());
  counter.reset();
  console.log(counter.getValue());

  console.log("\n=== ЗАВДАННЯ 3 ===");
  console.log(await fetchUserPosts(1));

  console.log("\n=== ЗАВДАННЯ 4 ===");
  const lib = new Library();
  lib.addBook(new Book("Кобзар", "Шевченко", 1840));
  lib.addBook(new EBook("JS Guide", "MDN", 2024, 15));
  lib.addBook(new Book("Тіні забутих предків", "Коцюбинський", 1911));
  console.log(lib.findByAuthor("Шевченко"));
  console.log(lib.getNewest().info());
}

runTests();