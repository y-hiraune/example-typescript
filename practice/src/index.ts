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
