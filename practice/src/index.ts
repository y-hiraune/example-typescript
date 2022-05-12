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
