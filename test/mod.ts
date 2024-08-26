import cave, {indexed, nanoid, string, fk, many, uint8Array, createdAt } from "../mod.ts";
Deno.test("v0", async () => {
  const db = cave(await Deno.openKv(), {
    user: {
      id: indexed(nanoid()),
      name: string(),
      sessions: many('session', 'user')
    },
    session: {
      id: nanoid(),
      user: fk('user', 'id'),
    },
    secret: {
      id: indexed(nanoid()),
      data: uint8Array(),
      minted: createdAt(),
    },
  });

  const u = await db.user({ name: 'John Doe' });
  await db.tx(() => {
    // ...
  });
});

/* user's deno.json:
  imports: {
    "cave": "jsr:cavedb/cave@ver"
  },
  tasks: {
    migrate: "deno run -RW cave/migrate"
  }
*/
