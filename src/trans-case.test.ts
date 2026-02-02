import { assertEquals } from "@std/assert";
import {
   camel2kebab,
   camel2pascal,
   camel2snake,
   kebab2camel,
   kebab2pascal,
   kebab2snake,
   pascal2camel,
   pascal2kebab,
   pascal2snake,
   snake2camel,
   snake2kebab,
   snake2pascal,
} from "./trans-case.ts";

Deno.test("trans-case", () => {
   const camel = "abcDefGhi";
   const pascal = "AbcDefGhi";
   const snake = "abc_def_ghi";
   const kebab = "abc-def-ghi";
   assertEquals(camel2pascal(camel), pascal);
   assertEquals(pascal2camel(pascal), camel);
   assertEquals(camel2snake(camel), snake);
   assertEquals(snake2camel(snake), camel);

   assertEquals(camel2kebab(camel), kebab);
   assertEquals(kebab2camel(kebab), camel);
   assertEquals(pascal2snake(pascal), snake);
   assertEquals(snake2pascal(snake), pascal);

   assertEquals(pascal2kebab(pascal), kebab);
   assertEquals(kebab2pascal(kebab), pascal);
   assertEquals(snake2kebab(snake), kebab);
   assertEquals(kebab2snake(kebab), snake);
});
