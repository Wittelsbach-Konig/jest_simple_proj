# Краткое руководство по использованию Jest для тестирования функций

## Кратко про Jest

Jest — это популярный JavaScript-фреймворк для тестирования, который позволяет тестировать функции, модули и приложения. Рассмотрим основные шаги для тестирования.

Весь код будет доступен в [проекте](https://github.com/Wittelsbach-Konig/jest_simple_proj).

## Установка

Для установки Jest в наш проект:

```bash
npm install --save-dev jest
```

Или с помощью `yarn`:

```bash
yarn add --dev jest
```

Теперь необходимо добавить script в `package.json` :

```json
"scripts": {
    "test" : "jest"
}
```

Теперь можно использовать Jest, необходимо иметь хотя бы один тест для этого.

### ECMAScript Modules

Если в проекте используются модули ES6+, то необходима установка `babel` для правильной работы:

```bash
npm install --save-dev @babel/core @babel/preset-env babel-jest
```

И добавить соответствующую настройку в `package.json`:

```json
"babel":{
    "presets": ["@babel/preset-env"]
}
```

## Полезные расширения для VS Code

1. [Первое полезное расширение](https://marketplace.visualstudio.com/items?itemName=andys8.jest-snippets) - это сниппеты кода для Jest. Данные расширение позволяет ускорить написание бойлерного кода для тестов.
2. [Второе полезное расширение](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) - добавляет контекстное меню для запуска тестов Jest.

## Настройка Jest

Файл с конфигурацией Jest описывается в соответствующем файле - `jest.config.js` или `jest.config.mjs` если используем ECMAScript Modules. Команда для инициализации:

```bash
npm test -- --init
```

Можно также добавить настройки `Jest` в `package.json`.

```json
"jest": {

}
```

Подробнее про все опции можно прочитать [здесь](https://jestjs.io/docs/configuration). В проекте используются наиболее популярные и необходимые для тестирования:

1. `clearMocks` - Автоматически очищает мокированные вызовы, экземпляры, контексты и результаты перед каждым тестированием;
2. `verbose` - Указывает, следует ли сообщать о каждом отдельном тесте во время выполнения. Все ошибки также будут отображаться внизу после выполнения;
3. `testEnvironment` - Тестовая среда, которая будет использоваться для тестирования;
4. `testRegex` - Паттерн определения тестовых файлов.
5. `projects` - Необходим для запуска нескольких конфигураций;
6. `moduleNameMapper` - Это конфигурация, которая сообщает Jest, как манипулировать импортами. В том числе она помогает обрабатывать пути к alias-модулям.

Тесты по умолчанию должны заканчиваться на `.test.js` или `.spec.js`. В нашем проекте это изменено с помощью `projects` и `testRegex`. Все тесты так или иначе разделены на 2 подгруппы:

* Main - тесты функционала работающего в main процессе, заканчиваются на `.main.test.js`;

* Renderer - тесты функционала работающие в renderer процессе, заканчиваются на `.renderer.test.js`.

Это сделано прежде всего для того, чтобы разделить тестовое окружение `node` и `jsdom`.
Ниже представлена конфигурация Jest нашего проекта:

```javascript
/** @type {import('jest').Config} */
const config = {
	verbose: true,
	clearMocks: true,
	projects: [
		"<rootDir>/jest.main.config.mjs",
		"<rootDir>/jest.renderer.config.mjs",
	],
};

export default config;
```

main конфигурация:

```javascript
const config = {
	testRegex: "((\\.|/)(main.test))\\.(js|ts|tsx)?$",
	testEnvironment: "jest-environment-node",
};

export default config;
```

renderer конфигурация:

```javascript
import path from "path";

const config = {
	testRegex: "((\\.|/)(renderer.test))\\.(js|ts|tsx)?$",
	testEnvironment: "jest-environment-jsdom",
};
export default config;
```

## Базовая структура теста

Весь код изложенный здесь можно найти в [проекте](https://github.com/Wittelsbach-Konig/jest_simple_proj).

Возьмём в качестве примера следующий файл `math.js`

```javascript
//math.js
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

export { add, subtract };
```

Создадим файл с тестами `math.main.test.js`.

```javascript
//math.main.test.js
import { add, subtract } from "../../src/main/math";

describe("Math test", () => {
	it("func add(2, 3) should return 5", () => {
		expect(add(2, 3)).toBe(5);
	});
	it("func subtract(5,2) should return 3", () => {
		expect(subtract(5, 2)).toBe(3);
	});
});
```

Здесь остановимся по подробней:

* Для организации и группировки тестов используем describe();
* test() или it() определяет отдельный тест.
* expect(): Проверяет результат функции.
* toBe(value): Сравнение с ожидаемым значением.

Можно заметить что методы describe, expect, it не импортируются явно. Это связано с тем, что Jest автоматически добавляет их в глобальное окружение. Про другие методы, которые также импортируются неявно можно [здесь](https://jestjs.io/docs/api).

Результат:

```bash
 PASS  test/main/math.main.test.js
  Math test
    √ func add(2, 3) should return 5 (1 ms)
    √ func subtract(5,2) should return 3
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.577 s, estimated 1 s
Ran all test suites matching /math/i.
```

Если у нас есть более одного модуля с тестами, то для запуска отдельного модуля, можно использовать параметр `-t`, параметр должен совпадать с именем в describe или test:

```bash
npm test -- -t math
```

## Часто используемые утверждения

| Метод | Описание |
|:-:|:-|
|toBe(value)|Проверяет, что значение строго равно указанному.|
|toEqual(object)|Проверяет эквивалентность объектов или массивов.|
|toBeNull()|Проверяет, что значение равно null.|
|toBeDefined()|Проверяет, что значение определено.|
|toBeTruthy()|Проверяет, что значение истинно.|
|toBeFalsy()|Проверяет, что значение ложно.|
|toContain(item)|Проверяет, что массив или строка содержит указанный элемент.|
|toThrow()|Проверяет, что функция выбрасывает исключение.|
|toBeCloseTo(number, numDigits?)|Проверяет, приблизительное равенство вещественных чисел.|

## Тестирование асинхронных функций

Для тестирования асинхронных функций используем `async`/`await`.

```javascript
//asyncFetch.js
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function fetchData() {
	await sleep(2000);
	return "Hello, from async function!";
}
```

Помимо двух обычных параметров теста: `name` и `fn`. Будем использовать опциональный параметр `timeout` (по умолчанию он равен 5000 ms). Напишем 2 теста в одном установим `timeout = 1000` в другом `timeout = 3000`.

```javascript
//asyncFetch.main.test.js
import fetchData from "../../src/main/asyncFetch";

describe("asyncFetch test", () => {
	it("timeout = 1000 ms", async () => {
		const data = await fetchData();
		expect(data).toBe("Hello, from async function!");
	}, 1000);
	it("timeout = 3000 ms", async () => {
		const data = await fetchData();
		expect(data).toBe("Hello, from async function!");
	}, 3000);
});
```

А теперь покажем результат:

```bash
> jest_test@1.0.0 test C:\DevDir\jest_test
> jest "-t" "asyncfetch"

 FAIL  test/main/asyncFetch.main.test.js
  asyncFetch test
    × timeout = 1000 ms (1016 ms)
    √ timeout = 3000 ms (2017 ms)
  ● asyncFetch test › timeout = 1000 ms
    thrown: "Exceeded timeout of 1000 ms for a test.
     Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."
    2 |
    3 | describe("asyncFetch test", () => {
    4 |       it("timeout = 1000 ms", async () => {
      |       ^
    5 |               const data = await fetchData();
    6 |               expect(data).toBe("Hello, from async function!");
    7 |       }, 1000);

    at it (test/main/asyncFetch.main.test.js:4:2)
    at Object.describe (test/main/asyncFetch.main.test.js:3:1)
    Test Suites: 1 failed, 2 skipped, 1 of 3 total
    Tests:       1 failed, 3 skipped, 1 passed, 5 total
    Snapshots:   0 total
    Time:        4.012 s
    Ran all test suites with tests matching "asyncfetch".
    npm ERR! Test failed.  See above for more details.
```

Как и ожидалось тест с таймаутом 1000 ms провалился, так как в функции `sleep` мы поставили таймаут 2000 ms.

Подробней про работу с асинхронным кодом можно посмотреть в [документации](https://jestjs.io/docs/asynchronous).

## Тестирование приватных функций

Для тестирования приватных (неэкспортируемых) есть несколько решений, однако наиболее популярным является "временный" экспорт:

```javascript
//privateFunc.js
function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

export const _test = { toRadians }; // Экспорт только для тестов

export function cos(input) {
	const radians = toRadians(input);
	return Math.cos(radians);
}
```

Сам тест:

```javascript
import { cos, _test } from "../../src/main/privateFunc";

describe("cos test", () => {
	it("cos(180) should return -1", () => {
		expect(cos(180)).toBe(-1);
	});
	it("private toRadians(180) should return pi", () => {
		expect(_test.toRadians(180)).toBe(Math.PI);
	});
});
```

## Мокирование объектов

### Мокирование функций

Мока функций позволяет изолировать тесты и проверять их поведение.

Небольшой пример:

```javascript
//mockTest.main.test.js
const calculate = (a, b, callback) => {
	return callback(a, b);
};

it("mock callback function", () => {
	const mockCallback = jest.fn((a, b) => a + b);
	const result = calculate(2, 3, mockCallback);

	expect(mockCallback).toHaveBeenCalled();
	expect(mockCallback).toHaveBeenCalledWith(2, 3);
	expect(result).toBe(5);
});
```

В этой строчке мы замокировали функцию `callback`:

```javascript
const mockCallback = jest.fn((a, b) => a + b);
```

### Мокирование возвращаемых значений

Более сложный пример. У нас имеется функция `calculatePriceWithDiscount`, которая рассчитывает новую цену с учётом скидки, для получения значения скидки она использует функцию `getDiscount`.

```javascript
//calculate.js
import getDiscount from "./getDiscount";

const calculatePriceWithDiscount = (originalPrice) =>
	originalPrice * (1 - getDiscount());

export { calculatePriceWithDiscount };
```

```javascript
//getDiscount.js
export default function getDiscount() {
	return 0.1;
}
```

Чтобы изолировать `calculatePriceWithDiscount` от `getDiscount` воспользуемся `jest.mock`, который автоматически мокирует все функции из модуля:

```javascript
//calculateDiscount.main.test.js
import { calculatePriceWithDiscount } from "../../../src/main/discount/calculate";
import getDiscount from "../../../src/main/discount/getDiscount";

jest.mock("../../../src/main/discount/getDiscount");

describe("Discount test", () => {
	it("Скидка 50 процентов", () => {
		getDiscount.mockReturnValue(0.5);
		expect(calculatePriceWithDiscount(100)).toBe(50);
	});
});

```

В данной строчке мы устанавливаем возвращаемое значение мока:

```javascript
getDiscount.mockReturnValue(0.5);
```

Больше примеров по мокированию в [документации](https://jestjs.io/docs/mock-functions) и [статье](https://habr.com/ru/companies/otus/articles/788004/).

## Тестирование react компонента

Для тестирования React компонентов необходимо установить [Testing-library](https://testing-library.com/docs/react-testing-library/example-intro):

```bash
npm install --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom @babel/preset-react
```

И соответственно сам React.

```bash
npm install react-dom react
```

А также изменить конфигурацию `babel`.

```json
"babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
```

Сам тест будет выглядеть следующим образом:

```javascript
//helloWorld.js
import React from "react";
// Пример компонента
function HelloWorld({ name }) {
	return <h1>Hello, {name}!</h1>;
}
export { HelloWorld };


//reactSimple.renderer.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { HelloWorld } from "../../src/renderer/helloWorld";

describe("Renderer process tests", () => {
	test("Renders the HelloWorld component", () => {
		render(<HelloWorld name='Electron' />);

		const heading = screen.getByText("Hello, Electron!");
		expect(heading).toBeInTheDocument();
	});
});
```
