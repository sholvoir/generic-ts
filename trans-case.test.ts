import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import {
    camel2pascal, camel2snake, camel2kebab, pascal2snake, pascal2kebab, snake2kebab,
    pascal2camel, snake2camel, kebab2camel, snake2pascal, kebab2pascal, kebab2snake
} from './trans-case.ts';

Deno.test('trans-case', () => {
    const camel = 'abcDefGhi';
    const pascal = 'AbcDefGhi';
    const snake = 'abc_def_ghi';
    const kebab = 'abc-def-ghi';
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