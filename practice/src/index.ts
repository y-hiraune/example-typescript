import { createInterface } from "readline";

const message: string = "Hello, world!";

console.log(message);

const practice = (category: string, doing: Function): void => {
  console.log(`\n${category}`);
  doing();
};

practice("# 基本的な文法・型", () => {
  practice("## Number", () => {
    const width1 = 5;
    const width2 = 8;
    const height: number = 3;
    const area = ((width1 + width2) * height) / 2;
    console.log(area);

    // 2進 0b 8進 0o 16進 0x
    const binary = 0b1010;
    const octal = 0o755;
    const hexadecimal = 0xff;
    console.log(binary, octal, hexadecimal);

    // 指数 e
    const big = 1e8;
    const small = 4e-5;
    console.log(big, small);

    // 区切り
    const million = 1_000_000;
    console.log(million);

    // IEEE754倍制度浮動小数点数 53ビット
    console.log(9007199254740993);
    // 誤差
    console.log(0.1 + 0.2);
  });

  practice("## BigInt", () => {
    // 任意精度整数
    const bignum: bigint = (123n + 456n) * 2n;
    console.log(bignum);

    const result = 5n / 2n;
    console.log(result);
  });

  practice("## String", () => {
    console.log("Hello \\world/");

    const str1: string = "Hello";
    const str2: string = "world!";
    console.log(`${str1}, ${str2}`);
  });

  practice("## Escape sequence", () => {
    // Unicode ポイント
    console.log("Hello \u{796d} world!");
  });

  practice("boolean", () => {
    const no: boolean = false;
    const yes: boolean = true;

    console.log(yes, no);
  });

  practice("## null & undefined", () => {
    const n: null = null;
    const u: undefined = undefined;

    console.log(n, u);
  });

  // プリミティブ同士の変換
  practice("## Convert", () => {
    const num1 = Number(true);
    console.log(num1);

    const num2 = Number(false);
    console.log(num2);

    const num3 = Number(null);
    console.log(num3);

    const num4 = Number(undefined);
    console.log(num4);

    const bigint1 = Number("1234");
    console.log(bigint1);

    const bigint2 = Number("500");
    console.log(bigint2);

    const bigint3 = Number(true);
    console.log(bigint3);

    const secret = process.env.SECRET ?? "default";
    console.log(`secretは${secret}です`);
  });

  practice("## FizzBuzz", () => {
    let value: string = "";
    for (let i = 1; i <= 100; i++) {
      if (i > 1) {
        value += " ";
      }
      if (i % 3 === 0 && i % 5 === 0) {
        value += "FizzBuzz";
      } else if (i % 3 === 0) {
        value += "Fizz";
      } else if (i % 5 === 0) {
        value += "Buzz";
      } else {
        value += `${i}`;
      }
    }
    console.log(value);
  });
});

practice("# オブジェクト", () => {
  practice("## オブジェクトの型", () => {
    practice("### type", () => {
      type FooBarObj = {
        foo: number;
        bar: string;
      };
      const obj: FooBarObj = {
        foo: 123,
        bar: "Hello, world!",
      };
      console.log(obj);

      type UserId = string;
      const id: UserId = "uhyo";
      console.log(id);
    });

    practice("### interface", () => {
      // type が存在しない頃から定義されており、現在は type を使えば事足りる
      interface FooBarObj {
        foo: number;
        bar: string;
      }
      const obj: FooBarObj = {
        foo: 0,
        bar: "string",
      };
      console.log(obj);
    });

    practice("### Index Signature", () => {
      type PriceData = {
        [key: string]: number;
      };
      const data: PriceData = {
        apple: 220,
        coffee: 120,
        bento: 500,
      };
      data.chicken = 250;
      console.log(data);
      // コンパイルエラーにすべき未定義プロパティにアクセスできてしまい、型安全性が破壊される
      console.log(data.orange);
    });

    practice("### Optional Property", () => {
      type MyObj = {
        foo: boolean;
        bar: boolean;
        baz?: number;
      };
      const obj: MyObj = { foo: false, bar: true };
      const obj2: MyObj = { foo: true, bar: false, baz: 1234 };
      console.log(obj);
      console.log(obj2);
    });

    practice("### readonly", () => {
      type MyObj = {
        readonly foo: number;
      };
      const obj: MyObj = { foo: 123 };
      console.log(obj);
    });

    practice("### typeof", () => {
      const obj = {
        foo: 123,
        bar: "hi",
      };

      // 型推論を取り出すより、明示的に型を宣言した方がわかりやすい
      // 値が最上位の事実になる場合だけ有用
      type T = typeof obj;
      const obj2: T = {
        foo: -50,
        bar: "",
      };

      console.log(obj2);
    });
  });

  practice("## 部分型関係（構造的部分型）", () => {
    type FooBar = {
      foo: string;
      bar: number;
    };
    type FooBarBaz = {
      foo: string;
      bar: number;
      baz: boolean;
    };

    const obj: FooBarBaz = {
      foo: "hi",
      bar: 1,
      baz: false,
    };
    const obj2: FooBar = obj;
    console.log(obj);
    console.log(obj2);

    // ２つめの型は１つめの型のプロパティをすべてもち、すべて部分型である
    type Animal = {
      age: number;
    };
    type Human = {
      age: number;
      name: string;
    };
    type AnimalFamily = {
      familyName: string;
      mother: Animal;
      father: Animal;
      child: Animal;
    };
    type HumanFamily = {
      familyName: string;
      mother: Human;
      father: Human;
      child: Human;
    };

    practice("### 余剰プロパティのエラー", () => {
      type User = { name: string; age: number };
      // オブジェクトリテラルに対するエラーが発生するが、型安全性には影響がない
      // const u: User = {
      //   name: "uhyo",
      //   age: 26,
      //   telNumber: "09012345678",
      // };
      const obj = {
        name: "uhyo",
        age: 26,
        telNumber: "09012345678",
      };
      const u: User = obj;
      console.log(u);
    });
  });

  practice("## 型引数", () => {
    type Family<Parent, Child> = {
      mother: Parent;
      father: Parent;
      child: Child;
    };
    const obj: Family<number, string> = {
      mother: 0,
      father: 100,
      child: "1000",
    };
    console.log(obj);

    practice("### extends", () => {
      type HasName = {
        name: string;
      };
      type Family<Parent extends HasName, Child extends Parent> = {
        mother: Parent;
        father: Parent;
        child: Child;
      };

      type Animal = {
        name: string;
      };
      type Human = {
        name: string;
        age: number;
      };
      type T = Family<Animal, Human>;
      const bird: T = {
        mother: {
          name: "Chicken",
        },
        father: {
          name: "Chicken",
        },
        child: {
          name: "Chick",
          age: 5,
        },
      };
      console.log(bird);
    });

    practice("### optional", () => {
      type Animal = {
        name: string;
      };
      type Family<Parent = Animal, Child = Animal> = {
        mother: Parent;
        father: Parent;
        child: Child;
      };
      type S = Family<string, string>;
      type T = Family;
      type U = Family<string>;
    });
  });

  practice("## Array", () => {
    const arr: number[] = [1, 10, 100];
    console.log(arr);

    arr.push(1000);
    arr.unshift(0);
    console.log(arr);
    console.log(arr.includes(10));
    console.log(arr.includes(50));
    console.log(arr.indexOf(100));

    const arr1: readonly boolean[] = [false, true];
    const arr2: Array<{
      name: string;
    }> = [{ name: "山田さん" }, { name: "田中さん" }, { name: "鈴木さん" }];
    console.log(arr1);
    console.log(arr2);

    practice("### for-of", () => {
      const arr: number[] = [1, 10, 100];
      for (const elm of arr) {
        console.log(elm);
      }
    });

    practice("### Tuple", () => {
      let tuple: [string, number] = ["foo", 0];
      tuple = ["aiueo", -555];
      console.log(tuple);

      practice("#### labeled tuple types", () => {
        type User = [name: string, age: number];
        const uhyo: User = ["unhyo", 26];
        // あくまで配列のためプロパティ名でアクセスできない
        console.log(uhyo[1]);
      });

      practice("#### index access", () => {
        const arr = [1, 10, 100];
        // 配列型だと要素が何個あるかわからないため存在しない要素にアクセスできてしまう
        const num: number = arr[100];
        console.log(num);
      });
    });
  });

  practice("## 分割代入", () => {
    const obj = {
      str: "hello, world!",
      num: 1234,
    };

    // 型注釈はつけられない
    const nested = {
      num: 123,
      obj,
    };
    const {
      num,
      obj: { str },
    } = nested;
    console.log(num);
    console.log(str);

    const arr = [1, 2, 4, 8, 16, 32];
    const [, second, third] = arr;
    console.log(second);
    console.log(third);

    practice("### Default", () => {
      type Obj = { foo?: number };
      const obj1: Obj = {};
      const obj2: Obj = { foo: -1234 };

      const { foo = 500 } = obj1;
      console.log(foo);
      // undefined に対してだけデフォルト値が適用される
      const { foo: bar = 500 } = obj2;
      console.log(bar);
    });

    practice("### Rest", () => {
      const obj = {
        foo: 123,
        bar: "string",
        baz: false,
      };
      const { foo, ...restObj } = obj;
      console.log(foo);
      console.log(restObj);
    });
  });

  practice("## その他の組み込みオブジェクト", () => {
    practice("### Date", () => {
      const d = new Date("2020-02-03T15:00:00+09:00");
      console.log(d);
      console.log(Date.now());
    });

    practice("### Regex", () => {
      // new RegExp でs区政も可能だが、正規表現リテラルによって作る機会が多い
      const r = /^abc/;
      console.log(r.test("abcdefg"));
      console.log(r.test("Hello, abcdefg"));

      console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/, "foobar"));
      console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/g, "foobar"));

      const result = "Hello, abbbbbbc world! abc".match(/a(b+)c/);
      if (result !== null) {
        console.log(result[0]);
        console.log(result[1]);
      }

      practice("### 名前付きキャプチャリンググループ", () => {
        const result = "Hello, abbbbbbc world! abc".match(/a(?<worldName>b+)c/);
        if (result !== null) {
          console.log(result.groups);
        }
      });
    });

    practice("## Map", () => {
      const map: Map<string, number> = new Map();
      map.set("foo", 1234);

      // ガベージコレクトされるかもしれないオブジェクトをキーにする場合は、弱参照である WeekMap を使った方が良い
      console.log(map.get("foo"));
      console.log(map.get("bar"));
    });

    practice("## CSV", () => {
      type User = {
        name: string;
        age: number;
        premiumUser: boolean;
      };

      const data: string = `
uhyo,26,1
John Smith,17,0
Mary Sue,14,1
`;

      // const users: User[] = [];

      // const lines = data.split("\n");
      // for (const line of lines) {
      //   if (line === "") {
      //     continue;
      //   }
      //   const [name, age, premiumUser] = line.split(",");
      //   users.push({
      //     name,
      //     age: Number(age),
      //     premiumUser: premiumUser === "1",
      //   });
      // }
      const users: User[] = data
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => {
          const [name, age, premiumUser] = line.split(",");
          return {
            name,
            age: Number(age),
            premiumUser: premiumUser === "1",
          };
        });

      for (const user of users) {
        if (user.premiumUser) {
          console.log(`${user.name} (${user.age})はプレミアムユーザーです。`);
        } else {
          console.log(
            `${user.name} (${user.age})はプレミアムユーザーではありません。`
          );
        }
      }
    });
  });
});

practice("# 関数", () => {
  function range(min: number, max: number): number[] {
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push(i);
    }
    // return と戻り値の間に改行を入れてしまうとコンパイルエラー
    return result;
  }

  console.log(range(5, 10));

  function helloWorldNTimes(n: number): void {
    // 早期リターン
    if (n >= 100) {
      console.log(`${n}回なんて無理です！！！`);
      return;
    }
    for (let i = 0; i < n; i++) {
      console.log("Hello, World!");
    }
  }

  helloWorldNTimes(5);
  helloWorldNTimes(150);

  practice("## 関数式で作る", () => {
    type Human = {
      height: number;
      weight: number;
    };
    const calcBMI = function ({ height, weight }: Human): number {
      return weight / height ** 2;
    };
    const uhyo: Human = { height: 1.84, weight: 72 };
    console.log(calcBMI(uhyo));
  });

  practice("## アロー関数式で作る", () => {
    type Human = {
      height: number;
      weight: number;
    };
    // オブジェクトリテラルを return する場合は、({ foo }) のように囲う必要がある
    const calcBMI = ({ height, weight }: Human): number => weight / height ** 2;
    const uhyo: Human = { height: 1.84, weight: 72 };
    console.log(calcBMI(uhyo));
  });

  practice("## メソッド記法で作る", () => {
    const obj = {
      // メソッド記法
      double(num: number): number {
        return num * 2;
      },
      // 通常の記法＋アロー関数
      double2: (num: number): number => num * 2,
    };

    console.log(obj.double(100));
    console.log(obj.double2(-50));
  });

  practice("## 可変長引数", () => {
    const sum = (...args: number[]): number => {
      let result = 0;
      for (const num of args) {
        result += num;
      }
      return result;
    };

    console.log(sum(1, 10, 100));
    console.log(sum(123, 456));
    console.log(sum());

    const nums = [1, 2, 3, 4, 5];
    console.log(sum(...nums));

    const sum3 = (a: number, b: number, c: number) => a + b + c;

    const nums3: [number, number, number] = [1, 2, 3];
    console.log(sum3(...nums3));
  });

  practice("## オプショナル引数", () => {
    // オプショナルな引数であれば前に定義できない
    const toLowerOrUpper = (str: string, upper: boolean = false): string => {
      if (upper) {
        return str.toUpperCase();
      } else {
        return str.toLowerCase();
      }
    };
    console.log(toLowerOrUpper("Hello"));
    console.log(toLowerOrUpper("Hello", false));
    console.log(toLowerOrUpper("Hello", true));
  });

  practice("## コールバック関数の引数", () => {
    type User = { name: string; age: number };
    const getName = (u: User): string => {
      console.log("u is", u);
      return u.name;
    };
    const users: User[] = [
      { name: "uhyo", age: 26 },
      { name: "John Smith", age: 15 },
    ];

    const names = users.map(getName);
    console.log(names);

    console.log(
      "20歳以上のユーザ",
      users.filter((user: User) => user.age >= 20)
    );
    console.log(
      "すべてのユーザが20際以上",
      users.every((user: User) => user.age >= 20)
    );
    console.log(
      "60歳以上のユーザが1人以上",
      users.some((user: User) => user.age >= 60)
    );
    console.log(
      "名前がJohnで始まるユーザ",
      users.find((user: User) => user.name.startsWith("John"))
    );
  });

  practice("## 関数の型", () => {
    // 引数名 repeatNum は型チェックに影響せず、コーディング支援の充実のために使える
    type F = (repeatNum: number) => string;

    // 引数の型は、型注釈Fによって型推論が行われるため省略可能（逆方向の推論 contextual typing）
    const xRepeat: F = (num): string => "x".repeat(num);
    console.log(xRepeat(3));

    // 戻り値の型注釈が無いとコンパイルエラーの発生箇所と内容が変わってしまう
    // 関数の中身が真実である場合以外は、基本的に戻り値の型を指定しておいた方が安全
    function range(min: number, max: number): number[] {
      const result = [];
      for (let i = min; i <= max; i++) {
        result.push(i);
      }
      return result;
    }
    const arr = range(5, 10);
    for (const value of arr) console.log(value);

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = nums.filter((x) => x % 3 === 0);
    console.log(arr2);

    practice("### コールシグネチャ", () => {
      type MyFunc = {
        isUsed?: boolean;
        (arg: number): void;
      };

      const double: MyFunc = (arg: number) => {
        console.log(arg * 2);
      };

      // プロパティを持つ関数としても呼び出せる
      double.isUsed = true;
      console.log(double.isUsed);
      double(1000);
    });
  });

  practice("## 関数型の部分型関係", () => {
    type HasName = {
      name: string;
    };
    type HasNameAndAge = {
      name: string;
      age: number;
    };

    const fromAge = (age: number): HasNameAndAge => ({
      name: "John Smith",
      age,
    });

    const f: (age: number) => HasName = fromAge;
    const obj: HasName = f(100);
    console.log(obj);

    const showName = (obj: HasName) => {
      console.log(obj.name);
    };
    const g: (obj: HasNameAndAge) => void = showName;

    g({
      name: "uhyo",
      age: 26,
    });

    type UnaryFanc = (age: number) => number;
    type BinaryFunc = (left: number, right: number) => number;
    const double: UnaryFanc = (age) => age * 2;
    const add: BinaryFunc = (left, right) => left + right;

    const bin: BinaryFunc = double;
    console.log(bin(10, 100));

    type Obj = {
      func: (arg: HasName) => string;
      // メソッド記法で宣言された関数型
      method(arg: HasName): string;
    };

    const something: Obj = {
      func: (user) => user.name,
      method: (user) => user.name,
    };

    const getAge = (user: HasNameAndAge) => String(user.age);

    // コンパイルエラー
    // something.func = getAge;
    // エラーが発生しないため、部分型関係成立の条件が緩くなってしまうため、メソッド記法で定義するのは避けた方がいい
    something.method = getAge;

    function sum(nums: readonly number[]): number {
      let result = 0;
      for (const num of nums) {
        result += num;
      }
      return result;
    }

    const nums1: readonly number[] = [1, 10, 100];
    console.log(sum(nums1));
    const nums2: number[] = [1, 1, 2, 3, 5, 8];
    console.log(sum(nums2));

    type User = { name: string };
    type ReadonlyUser = { readonly name: string };

    const uhyoify = (user: User) => {
      user.name = "uhyo";
    };

    const john: ReadonlyUser = {
      name: "John Smith",
    };
    //john.name = "Nanashi";

    // オブジェクトでは、 readonly が書き換わってしまう場合がある
    uhyoify(john);

    console.log(john.name);
  });

  practice("## ジェネリクス", () => {
    function repeat<T>(element: T, length: number): T[] {
      const result: T[] = [];
      for (let i = 0; i < length; i++) {
        result.push(element);
      }
      return result;
    }

    console.log(repeat<string>("a", 5));
    console.log(repeat<number>(123, 3));
    console.log(repeat("a", 5));
  });

  practice("## スコープ", () => {});

  practice("## FizzBuzz", () => {
    const sequence = (start: number, end: number): number[] => {
      const result: number[] = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    };
    const getFizzBuzzString = (i: number): string => {
      if (i % 3 === 0 && i % 5 === 0) {
        return "FizzBuzz";
      } else if (i % 3 === 0) {
        return "Fizz";
      } else if (i % 5 === 0) {
        return "Buzz";
      }
      return String(i);
    };
    for (const i of sequence(1, 100)) {
      const message = getFizzBuzzString(i);
      console.log(message);
    }
  });

  practice("## Custom Map", () => {
    function map<T, U>(array: T[], callback: (value: T) => U): U[] {
      const result: U[] = [];
      for (const element of array) {
        result.push(callback(element));
      }
      return result;
    }

    const data = [1, 1, 2, 3, 5, 8, 13];
    const result = map(data, (x) => x * 10);
    console.log(result);
  });
});

practice("# クラス", () => {
  practice("## クラス宣言", () => {
    class User {
      name: string = "";
      //    name?: string = "";
      //    readonly name: string = "";
      age: number = 0;

      isAdult(): boolean {
        return this.age >= 20;
      }

      setAge(newAge: number) {
        this.age = newAge;
      }
    }

    const uhyo = new User();
    console.log(uhyo.name);
    console.log(uhyo.age);

    //  uhyo.age = 26;
    //  console.log(uhyo.age);

    console.log(uhyo.isAdult());
    uhyo.setAge(26);
    console.log(uhyo.isAdult());

    practice("### コンストラクタ 静的プロパティ 静的メソッド", () => {
      class User {
        static adminName: string = "uhyo";
        static getAdminUser() {
          return new User(User.adminName, 26);
        }

        name: string;
        readonly age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
        }

        isAdult(): boolean {
          return this.age >= 20;
        }
      }

      console.log(User.adminName);
      const admin = User.getAdminUser();
      console.log(admin.age);
      console.log(admin.isAdult());

      const uhyo = new User("uhyo", 26);
      console.log(uhyo.name);
      console.log(uhyo.age);
    });

    practice("### アクセシビリティ修飾子", () => {
      class User {
        name: string;
        private age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
        }

        isAdult(): boolean {
          return this.age >= 20;
        }
      }

      const uhyo = new User("uhyo", 26);
      console.log(uhyo.name);
      console.log(uhyo.isAdult());
    });

    practice("### コンストラクタ引数でのプロパティ宣言", () => {
      class User {
        // TypeScript 特有の構文
        constructor(public name: string, private age: number) {}
      }
    });

    practice("### クラス式", () => {
      const User = class {
        name: string;
        age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
        }

        isAdult(): boolean {
          return this.age >= 20;
        }
      };
      const uhyo = new User("uhyo", 26);
      console.log(uhyo.name);
      console.log(uhyo.isAdult());
    });

    practice("### もう一つのプライベートなプロパティ", () => {
      class User {
        name: string;
        // JavaScript 由来でランタイム時にも有効なプライベート
        #age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.#age = age;
        }

        isAdult(): boolean {
          return this.#age >= 20;
        }
      }

      const uhyo = new User("uhyo", 26);
      console.log(uhyo.name);
      console.log(uhyo.isAdult());
    });

    practice("### 静的初期化ブロック", () => {
      class User {
        static adminUser: User;
        static {
          this.adminUser = new User();
          this.adminUser.#age = 9999;
        }

        #age: number = 0;
        getAge() {
          return this.#age;
        }
        setAge(age: number) {
          if (age < 0 || age > 150) {
            return;
          }
          this.#age = age;
        }
      }
      console.log(User.adminUser.getAge());
    });

    practice("### 型引数を持つクラス", () => {
      class User<T> {
        name: string;
        #age: number;
        readonly data: T;

        constructor(name: string, age: number, data: T) {
          this.name = name;
          this.#age = age;
          this.data = data;
        }

        public isAdult(): boolean {
          return this.#age >= 20;
        }
      }

      const uhyo = new User<string>("uhyo", 26, "追加データ");
      const data = uhyo.data;
      console.log(data);

      const john = new User("John Smith", 15, { num: 123 });
      const data2 = john.data;
      console.log(data2);
    });
  });

  practice("## クラスの型", () => {
    class User {
      name: string = "";
      age: number = 0;

      isAdult(): boolean {
        return this.age >= 20;
      }
    }

    const uhyo: User = new User();
    const john: User = {
      name: "John Smith",
      age: 15,
      isAdult: () => true,
    };
    console.log(uhyo);
    console.log(john);

    practice("### newシグネチャによるインスタンス可能性の表現", () => {
      class User {
        name: string = "";
        age: number = 0;
      }

//      type MyUserConstructor = new () => User;
      type MyUserConstructor = {
        new (): User;
      };

      const MyUser: MyUserConstructor = User;
      const u = new MyUser();
      console.log(u.name, u.age);
    });

    practice("### instanceof", () => {
      class User {
        name: string = "";
        age: number = 0;
      }

      const uhyo = new User();
      console.log(uhyo instanceof User);
      console.log({} instanceof User);

      const john: User = {
        name: "John Smith",
        age: 15,
      };
      // User クラスのインスタンスかどうかを判定しているため new User を指さないと false
      console.log(john instanceof User);

      practice("#### 型の絞込み", () => {
        type HasAge = {
          age: number;
        }
        class User {
          name: string = "";
          age: number = 0;
  
          constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
          }
        }
        
        function getPrice(customer: HasAge) {
          if (customer instanceof User && customer.name === "uhyo") {
            return 0;
          }
          return customer.age < 18 ? 1000: 1800;
        }

        const customer1: HasAge = { age: 15 };
        const customer2: HasAge = { age: 40 };
        const uhyo = new User("uhyo", 26);

        console.log(getPrice(customer1));
        console.log(getPrice(customer2));
        console.log(getPrice(uhyo));
      });
    });
  });

  practice("## クラスの継承", () => {
    class User {
      name: string;
      #age: number;

      constructor(name: string, age: number) {
        this.name = name;
        this.#age = age;
      }

      public isAdult(): boolean {
        return this.#age >= 20;
      }
    }

    class PremiumUser extends User {
      rank: number = 1;

      constructor(name: string, age: number, rank: number) {
        // this にアクセスするより先に super を呼び出す必要がある
        super(name, age);
        this.rank = rank;
      }

      // noImplicitOverride コンパイラオプションと組み合わせると付け忘れや意図しないオーバーライドをコンパイルエラーで検知できる
      public override isAdult(): boolean {
        return true;
      }
    }

    function getMessage(u: User) {
      return `こんにちは、${u.name}さん`;
    }

    const john = new User("John Smith", 15);
    const uhyo = new PremiumUser("uhyo", 26, 3);
    console.log(uhyo.rank);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
    console.log(getMessage(john));
    console.log(getMessage(uhyo));

    practice("### implements", () => {
      type HasName = {
        name: string;
      }

      class User implements HasName {
        name: string;
        #age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.#age = age;
        }

        public isAdult(): boolean {
          return this.#age >= 20;
        }
      }
    });
  });

  practice("## this", () => {
    const user = {
      name: "uhyo",
      age: 26,
      isAdult() {
        return this.age >= 20;
      }
    };

    // isAdult() と呼び出すとオブジェクトがなく undefined になってしまうため、メソッド記法で呼び出すことを推奨
    console.log(user.isAdult());
    user.age = 15;
    console.log(user.isAdult());

    practice("### アロー関数における this", () => {
      class User {
        name: string;
        #age: number;

        constructor(name: string, age: number) {
          this.name = name;
          this.#age = age;
        }

        public isAdult(): boolean {
          return this.#age >= 20;
        }

        public filterOlder(users: readonly User[]): User[] {
          // 外側の関数から this を受け継ぐアロー関数を推奨
          return users.filter(u => u.#age > this.#age);
        }
      }

      const uhyo = new User("uhyo", 25);
      const john = new User("John Smith", 15);
      const bob = new User("Bob", 40);

      const older = uhyo.filterOlder([john, bob]);
      console.log(older);
    });
  });

  practice("## 例外", () => {
    try {
      console.log("エラーを発生させます");
      throwError();
      console.log("エラーを発生させました");
    } catch (err) {
      console.log("エラーをキャッチさせました");
      console.log(err);
    } finally {
      console.log("finallyブロック");
    }
    console.log("おわり");

    function throwError() {
      const error = new Error("エラーが発生しました！！！！！");
      throw error;
    }

    try {
      throwNull();
    } catch (err) {
      console.log(err, "が投げられました");
    }

    function throwNull() {
      // エラー以外でなんでも投げられる
      throw null;
    }
  });

  practice("## object to class", () => {
    class User {
      readonly name: string;
      readonly age: number;

      constructor(name: string, age: number) {
        if (name === "") {
          throw new Error("名前は空にできません！");
        }
        this.name = name;
        this.age = age;
      }

      getMessage(message: string): string {
        return `${this.name} (${this.age}) 「${message}」`;
      }
    }

    const uhyo = new User("uhyo", 26);
    console.log(uhyo.getMessage("こんにちは"));

    practice("### Closure", () => {
      function createUser(name: string, age: number) {
        if (name === "") {
          throw new Error("名前は空にできません！");
        }
        return (message: string) => {
          return `${name} (${age}) 「${message}」`;
        };
      }
  
      const getMessage = createUser("uhyo", 26);
      console.log(getMessage("こんにちは"));  
    });
  });
});

practice("# Read line", () => {
  function getDefaultName() {
    return "名無し";
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("名前を入力してください:", (name) => {
    const displayName = name || getDefaultName();
    console.log(`こんにちは、${displayName}さん`);
    rl.close();
  });
});
